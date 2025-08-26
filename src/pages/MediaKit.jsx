// src/pages/MediaKitPDF.jsx — PDF‑Template Generator (Browser‑only)
// -----------------------------------------------------------------------------
// ✅ Ziel: Nur EIN PDF‑Template laden, Text‑Tags über AcroForm‑Felder ersetzen
//    und ein hochgeladenes Bild (mit Zuschneiden) im PDF ersetzen.
//
// 🧩 Voraussetzungen fürs Template (mediakit.pdf):
// 1) Lege ein PDF mit AcroForm‑Feldern an (z.B. in Adobe Acrobat → Werkzeuge → Formular vorbereiten).
// 2) Textfelder exakt so benennen: name, tagline, bio, email, phone, website,
//    instagram, youtube, spotify, city, country
// 3) Für das Bild einen „Schaltfläche/Push Button“ mit dem Namen: photo
//    (Diese Fläche ist der Bild‑Platzhalter. Größe/Position bestimmst du im Template.)
// 4) Template in dein Projekt legen: /public/templates/mediakit.pdf
//
// 🔁 Ablauf:
// - Nutzer füllt Felder + lädt Bild hoch → wählt Zuschneide‑Ausschnitt →
// - Wir laden /templates/mediakit.pdf → füllen AcroForm‑Felder → ersetzen photo‑Button‑Bild
// - Formular wird „flach“ gemacht (flatten), dann Download als PDF
//
// 📦 Genutzte Libs: pdf-lib, react-easy-crop, file-saver, React
//    (Alle im Browser nutzbar; keine Server‑Side Abhängigkeiten.)
// -----------------------------------------------------------------------------

import React, { useCallback, useMemo, useRef, useState } from "react";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";
import Cropper from "react-easy-crop";

const TEMPLATE_URL = "/templates/mediakit.pdf";

export default function MediaKitPDF() {
  const [data, setData] = useState({
    name: "",
    tagline: "",
    bio: "",
    email: "",
    phone: "",
    website: "",
    instagram: "",
    youtube: "",
    spotify: "",
    city: "",
    country: "",
  });

  const [busy, setBusy] = useState(false);
  const [imgSrc, setImgSrc] = useState(null); // original upload (object URL)
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const croppedBlobRef = useRef(null);

  const fields = useMemo(
    () => [
      { name: "name", label: "Künstler*in / Bandname", required: true },
      { name: "tagline", label: "Tagline / kurzer Pitch" },
      { name: "bio", label: "Kurz‑Biografie", type: "textarea", required: true },
      { title: "Kontakt & Socials" },
      { name: "email", label: "E‑Mail" },
      { name: "phone", label: "Telefon" },
      { name: "website", label: "Website" },
      { name: "instagram", label: "Instagram" },
      { name: "youtube", label: "YouTube" },
      { name: "spotify", label: "Spotify" },
      { title: "Ort" },
      { name: "city", label: "Stadt" },
      { name: "country", label: "Land" },
    ],
    []
  );

  function onChange(e) {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }

  function slugify(s) {
    return (s || "media-kit")
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[^a-z0-9]+/gi, "-")
      .replace(/(^-|-$)/g, "");
  }

  // ---- Image Crop Helpers ---------------------------------------------------
  const onCropComplete = useCallback((_, cropped) => {
    setCroppedAreaPixels(cropped);
  }, []);

  async function getCroppedBlob() {
    if (!imgSrc || !croppedAreaPixels) return null;
    const image = await loadImage(imgSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = Math.max(1, Math.floor(croppedAreaPixels.width));
    canvas.height = Math.max(1, Math.floor(croppedAreaPixels.height));
    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      canvas.width,
      canvas.height
    );
    return await new Promise((resolve) => canvas.toBlob(resolve, "image/png", 0.95));
  }

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.crossOrigin = "anonymous";
      img.src = src;
    });
  }

  function onImageSelected(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImgSrc(url);
  }

  // ---- PDF Generation --------------------------------------------------------
  async function generatePdf() {
    setBusy(true);
    try {
      const res = await fetch(TEMPLATE_URL);
      if (!res.ok) throw new Error(`Template nicht gefunden unter ${TEMPLATE_URL}`);
      const templateBytes = await res.arrayBuffer();

      const pdfDoc = await PDFDocument.load(templateBytes);
      const form = pdfDoc.getForm();

      // 1) Textfelder ausfüllen (falls im Template vorhanden)
      Object.entries(data).forEach(([key, value]) => {
        try {
          // generisch greifen: egal ob TextField, Dropdown etc. – sofern setText existiert
          const field = form.getField(key);
          if (field && typeof field.setText === "function") {
            field.setText(value ?? "");
          }
        } catch (_) {
          // Feld fehlt im Template → einfach überspringen
        }
      });

      // 2) Bild ersetzen, falls es einen Button "photo" gibt und ein Crop existiert
      const cropped = croppedBlobRef.current || (await getCroppedBlob());
      if (cropped) {
        croppedBlobRef.current = cropped;
        const imgBytes = new Uint8Array(await cropped.arrayBuffer());
        // primitive PNG/JPG Erkennung für Einbettung
        const isPng = imgBytes[0] === 0x89 && imgBytes[1] === 0x50 && imgBytes[2] === 0x4e && imgBytes[3] === 0x47;
        const embedded = isPng
          ? await pdfDoc.embedPng(imgBytes)
          : await pdfDoc.embedJpg(imgBytes);

        try {
          const btn = form.getButton("photo");
          // pdf-lib unterstützt setImage auf Button‑Feldern → ersetzt die Appearance
          btn.setImage(embedded);
        } catch (_) {
          // Fallback: Wenn kein Button existiert, legen wir das Bild auf Seite 1 oben links ab
          const [page] = pdfDoc.getPages();
          const { width, height } = embedded.scale(1);
          page.drawImage(embedded, { x: 36, y: page.getHeight() - 36 - height, width, height });
        }
      }

      // 3) Formular „flatten“, damit nichts mehr editierbar ist
      try {
        form.flatten();
      } catch (_) { /* falls kein Formular existiert */ }

      const outBytes = await pdfDoc.save();
      const base = slugify(data.name);
      const outBlob = new Blob([outBytes], { type: "application/pdf" });
      saveAs(outBlob, `${base || "mediakit"}.pdf`);
    } catch (err) {
      console.error(err);
      alert(err.message || "Fehler beim Erzeugen des PDFs.");
    } finally {
      setBusy(false);
    }
  }

  // ---- Render ---------------------------------------------------------------
  const blocks = [
    { title: "1. Basisdaten", render: () => (<div className="grid gap-4 md:grid-cols-2">{fields.slice(0, 3).map(renderField)}</div>) },
    { title: "2. Kontakt & Socials", render: () => (<div className="grid gap-4 md:grid-cols-2">{fields.slice(4, 10).map(renderField)}</div>) },
    { title: "3. Ort", render: () => (<div className="grid gap-4 md:grid-cols-2">{fields.slice(10, 12).map(renderField)}</div>) },
    { title: "4. Bild hochladen & zuschneiden", render: renderImageCropper },
  ];

  function renderField(f) {
    if (f.title) return null;
    return (
      <label key={f.name} className="block">
        <span className="block font-semibold mb-1">{f.label}{f.required ? " *" : ""}</span>
        {f.type === "textarea" ? (
          <textarea
            name={f.name}
            value={data[f.name]}
            onChange={onChange}
            required={f.required}
            rows={6}
            className="w-full rounded-2xl border border-gray-300 p-3"
          />
        ) : (
          <input
            type="text"
            name={f.name}
            value={data[f.name]}
            onChange={onChange}
            required={f.required}
            className="w-full rounded-2xl border border-gray-300 p-3"
          />
        )}
      </label>
    );
  }

  function renderImageCropper() {
    return (
      <div className="space-y-4">
        <div>
          <input type="file" accept="image/*" onChange={onImageSelected} />
          <p className="text-sm text-gray-500 mt-1">
            Tipp: Lade ein hochauflösendes Bild hoch. Der sichtbare Ausschnitt wird ins PDF eingesetzt.
          </p>
        </div>

        {imgSrc && (
          <div className="rounded-2xl overflow-hidden border border-gray-200" style={{ position: "relative", width: "100%", height: 320 }}>
            <Cropper
              image={imgSrc}
              crop={crop}
              zoom={zoom}
              aspect={4 / 3}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              cropShape="rect"
              showGrid
            />
          </div>
        )}

        {imgSrc && (
          <div className="flex items-center gap-4">
            <label className="text-sm">Zoom</label>
            <input type="range" min={1} max={3} step={0.01} value={zoom} onChange={(e) => setZoom(Number(e.target.value))} />
            <button
              type="button"
              className="ml-auto px-4 py-2 rounded-2xl border border-gray-300 hover:bg-gray-50"
              onClick={async () => {
                const b = await getCroppedBlob();
                if (b) { croppedBlobRef.current = b; alert("Ausschnitt gespeichert. Erzeuge nun das PDF, um das Bild zu sehen."); }
              }}
            >
              Ausschnitt übernehmen
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Media‑Kit (PDF‑Template)</h1>
        <p className="text-gray-600">Wir ersetzen die AcroForm‑Felder im PDF‑Template und setzen ein zugeschnittenes Bild ein.</p>
      </header>

      <section className="space-y-8 bg-white p-6 rounded-3xl shadow-sm">
        {blocks.map((b, idx) => (
          <div key={idx} className="space-y-3">
            <h2 className="text-xl font-semibold">{b.title}</h2>
            {b.render()}
          </div>
        ))}

        <div className="flex gap-3 pt-2">
          <button
            className="px-5 py-3 rounded-2xl bg-black text-white disabled:opacity-50"
            onClick={generatePdf}
            disabled={busy}
          >
            {busy ? "Erzeuge…" : "PDF erzeugen"}
          </button>
          <a
            className="px-5 py-3 rounded-2xl border border-gray-300 hover:bg-gray-50"
            href={TEMPLATE_URL}
            download
          >
            Template herunterladen
          </a>
        </div>
      </section>

      <footer className="text-xs text-gray-500 mt-6">
        Hinweis: Stelle sicher, dass dein Template die oben genannten Feld‑Namen besitzt. Der Bild‑Platzhalter ist ein Button‑Feld namens <code>photo</code>.
      </footer>
    </main>
  );
}
