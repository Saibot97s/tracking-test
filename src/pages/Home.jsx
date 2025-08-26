import { useState } from 'react'
import { Link } from 'react-router-dom'
import PreviewModal from '../components/PreviewModal'
import LogoLeiste from '../components/LogoLeiste'

export default function Home() {
  const [showPreview, setShowPreview] = useState(false)

  return (
    <main>




      {/* HERO v2 — Split Layout (minimal) */}
      <section className="hero hero--split" aria-label="Mediakit Generator – Hero">
        <div className="container hero-grid">
          {/* Copy left */}
          <div className="hero-copy">
            <h1 className="hero-title">
              <span className="gradient-title">Erstelle DEIN Media Kit</span>
              <span className="title-shadow">Erstelle DEIN Media Kit</span>
            </h1>
            <h1>und hole dir die Gigs.</h1>

            <p className="hero-lead">
              Erstelle mit unserem kostenlosen Generator in wenigen Klicks ein professionelles Media Kit, das Booker lieben.
              Mit Vorlage, Auto-Layout und 1-Klick-Export als PDF.
            </p>


            <br />    <br />


            <br />

            {/* CTA */}
            <form
              className="cta-form"
              onSubmit={(e) => {
                e.preventDefault();
                // TODO: handle subscribe + redirect/open generator
              }}
            >
              <label htmlFor="cta-email" className="sr-only">E-Mail</label>
              <input
                id="cta-email"
                type="email"
                inputMode="email"
                name="email"
                placeholder="Deine E-Mail-Adresse"
                required
                aria-required="true"
              />
              <button type="submit" aria-label="Jetzt kostenlos starten">
                Jetzt kostenlos starten
              </button>
            </form>

   <br />
            <div className="proof" aria-live="polite">
              <div className="faces" aria-hidden="true">
                <span className="face f1" />
                <span className="face f2" />
                <span className="face f3" />
                <span className="face f4" />
              </div>
              <span><strong>3.000+ Artists</strong> haben diesen Monat gestartet.</span>
            </div>
          </div>

          {/* Media right */}
          <div className="hero-media">
            <div className="device img-overlay" role="img" aria-label="Vorschau deines Media Kits">
              <img className="device-img" src="/img2.jpeg" alt="Mediakit Vorschau" loading="eager" />
              <button
                className="play-btn play-btn--center"
                aria-label="Vorschauvideo abspielen"
                onClick={() => setShowPreview(true)}
              >
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M8 5v14l11-7L8 5z" fill="white" />
                </svg>
              </button>
            </div>

            {/* Mini-benefits */}
            <div className="mini-benefits">
              <div className="mini">
                <strong>0€</strong>
                <span>Kostenlos starten</span>
              </div>
              <div className="mini">
                <strong>15&nbsp;Min</strong>
                <span>Zur fertigen Datei</span>
              </div>
              <div className="mini">
                <strong>1-Klick</strong>
                <span>PDF Export</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Cue */}
        <button className="scroll-cue" aria-label="Weiter scrollen">
          <span className="chev" aria-hidden="true">▾</span>
        </button>
      </section>





      <br /><br /><br /><br /><br />


      {/* WAS IST EIN MEDIAKIT */}
      <section className="container section" aria-labelledby="mediakit-title">
        <div className="grid" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px', alignItems: 'center' }}>
          <div>
            <img src="/mediakit-sample.png" alt="Beispiel eines Mediakit" style={{ width: '100%', borderRadius: '12px' }} />
          </div>
          <div>
            <h2 id="mediakit-title">Was ist ein Mediakit?</h2>

            <p>
              Ein <strong>Mediakit</strong> ist deine digitale Visitenkarte als Musiker:in. Es fasst alle wichtigen Infos über dich, deine Musik und deine Auftritte in einem professionellen Dokument zusammen – klar, ansprechend und überzeugend.
            </p>
            <ul>
              <li> Vorstellung deiner Person und deiner Musik</li>
              <li> Hochwertige Fotos & Videos</li>
              <li> Referenzen & bisherige Auftritte</li>
              <li> Kontaktdaten & Buchungsinfos</li>
            </ul>
            <p>
              Mit einem Mediakit überzeugst du Veranstalter, Hotels oder Firmen auf den ersten Blick – und erhöhst so deine Chancen auf neue Auftritte und Kooperationen.
            </p>
          </div>
        </div>
      </section>





      {/* SIRUS – PORTRAIT*/}
      <section className="container section" aria-labelledby="sirus-title">

        <div
          className="grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '20px',
            alignItems: 'center',
          }}
        >
          <div>

            {/* Großes Zitat */}
            <blockquote
              style={{
                position: 'relative',
                margin: '0 0 28px 0',
                padding: '28px 24px 24px 72px',
                lineHeight: 1.3,
                background: 'linear-gradient(135deg, #4f46e5 0%, #ec4899 100%)',
                color: '#fff',
                borderRadius: '16px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                overflow: 'hidden',
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: '20px',
                  top: '6px',
                  fontSize: 'clamp(3rem, 8vw, 6rem)',
                  lineHeight: 1,
                  opacity: 0.25,
                  fontWeight: 900,
                }}
              >
                “
              </span>
              <p style={{ margin: 0, fontWeight: 700, fontSize: 'clamp(1.4rem, 3.2vw, 2rem)' }}>
                Ich treffe soo viele gute Künstler, leider versteht nicht mal die Hälte etwas vom Musikgeschäft.
              </p>
              <p>
                Sirus Madjderey
              </p>
            </blockquote>

            <p>
              Ich bin <strong>Musiker</strong>, <strong>Bestsellerautor</strong>,{" "}
              <strong>Unternehmer</strong>, <strong>Kreativer</strong> – und ja: auch{" "}
              <strong>Business-Mensch</strong>.
              Meine Überzeugung:{" "}
              <strong>Wer Kunst macht, muss das Business dahinter verstehen</strong>.{" "}
              Daran scheitern leider viele.
            </p>

            <p>
              Vor einigen Jahren habe ich ein ungewöhnliches Handwerk für mich entdeckt:{" "}
              <strong>das Pfeifen</strong>. Ja, richtig gehört – ich{" "}
              <strong>pfeife auf der Bühne</strong>.
              Und klar, du fragst dich: <strong>Wer engagiert einen Pfeifer?</strong>{" "}
              Am Anfang war das genau <strong>mein Problem</strong>.
              Doch mit <strong>viel Arbeit</strong> und <strong>Ausdauer</strong>{" "}
              habe ich es geschafft: <strong>den Weg ins Rampenlicht</strong>.
              Ich habe gelernt, aus mir <strong>eine Show</strong> zu machen – und{" "}
              <strong>genau das kannst du auch</strong>.
            </p>
            <h4>Du kennst mich vielleicht aus:</h4>

          </div>

          <div>
            <img
              src="/sirus-portrait.jpg"
              alt="Sirus – Kunstpfeiffer, Business-Mensch und Bestseller-Autor"
              style={{ width: '100%', borderRadius: '12px', boxShadow: '0 6px 20px rgba(0,0,0,0.1)' }}
            />
          </div>
        </div>


        {/* LOGO-REIHE – sehr schmales Foto */}
        <LogoLeiste></LogoLeiste>
      </section>



      {/* BENEFITS */}
      {/*
      <section className="container section" aria-labelledby="benefits-title">
        <h2 id="benefits-title">Was ist ein Media Kit und was sind die Vorteile?</h2>
        <div className="benefits-grid">
          <div className="benefit"><div className="benefit-icon">💡</div>Schritt für Schitt zu deinem eigenen Mediakit</div>
          <div className="benefit"><div className="benefit-icon">🎵</div>Praxisnah und speziell für Musiker & DJs</div>
          <div className="benefit"><div className="benefit-icon">⭐⭐⭐⭐⭐</div>Top Bewertung von über 300 KundInnen</div>
          <div className="benefit"><div className="benefit-icon">🚀</div>Direkt umsetzbares Wissen für deinen Karriereweg</div>
          <div className="benefit"><div className="benefit-icon">📜</div>Steuertipps, Vorlagen und vieles mehr</div>
        </div>
      </section>  */}

      <section className="section" aria-label="Problem-Lösung-Vergleich">
        <div className="container">
          <section className="flow-box" role="group">

            <div className="flow-cols" aria-label="Spaltenüberschriften">
              <div className="colhead left"><span className="pill big">Ohne Mediakit</span></div>
              <div className="colspacer" aria-hidden="true"></div>
              <div className="colhead right"><span className="pill big good">Mit Mediakit</span></div>
            </div>

            <div role="list">
              <div className="flow-row" role="listitem">
                <div className="p-card">
                  <h3>❌  Keine regelmäßigen Auftritte</h3>
                  <p className="muted">Kannst singen, aber weißt nicht wie du es zu regelmäßigen Auftritten schaffst.</p>
                </div>
                <div className="bridge" aria-hidden="true">
                  <svg viewBox="0 0 60 70" className="arrow" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                    <defs>
                      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--brand)" />
                        <stop offset="100%" stopColor="var(--brand-2)" />
                      </linearGradient>
                    </defs>
                    <polygon points="55,35 5,5 5,65" fill="url(#grad1)" opacity="0.98" />
                  </svg>


                </div>
                <div className="s-card">
                  <h3>🎤  Regelmäßige Auftritte durch Schritt für schrittan</h3>
                  <p className="muted">Findest deine Nieche und gehst professionell auf Hotels etc. zu</p>
                </div>
              </div>

              <hr className="divider" />

              <div className="flow-row" role="listitem">
                <div className="p-card">
                  <h3>❌ Shows ohne Konzept</h3>
                  <p className="muted">Ein großes Prortfolio an Stücken reicht nicht aus, um eine ganze Show auf die Beine zu stellen.</p>
                </div>
                <div className="bridge" aria-hidden="true">
                  <svg viewBox="0 0 60 70" className="arrow" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                    <defs>
                      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--brand)" />
                        <stop offset="100%" stopColor="var(--brand-2)" />
                      </linearGradient>
                    </defs>
                    <polygon points="55,35 5,5 5,65" fill="url(#grad1)" opacity="0.98" />
                  </svg>

                </div>
                <div className="s-card">
                  <h3>Durchdachtes Showkonzept, mit Aufbau und konkreter Regie</h3>
                  <p className="muted">Beschreibung</p>
                </div>
              </div>

              <hr className="divider" />


              <div className="flow-row" role="listitem">
                <div className="p-card">
                  <h3>❌ Unkonkreter Preis</h3>
                  <p className="muted">Beschreibung</p>
                </div>
                <div className="bridge" aria-hidden="true">
                  <svg viewBox="0 0 60 70" className="arrow" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                    <defs>
                      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--brand)" />
                        <stop offset="100%" stopColor="var(--brand-2)" />
                      </linearGradient>
                    </defs>
                    <polygon points="55,35 5,5 5,65" fill="url(#grad1)" opacity="0.98" />
                  </svg>

                </div>
                <div className="s-card">
                  <h3>Klares und faires Pricing deiner Leistung und stuerliche Optimierung</h3>
                  <p className="muted">Tipps der ältersten Steuerkanzlei Wien</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>


      {/* SALES/CTA SECTION – farbig, prominent */}
      <section className="container section cta-hero" aria-labelledby="mediakit-cta">
        <div className="cta-wrap">
          {/* Links: Produktmockup */}
          <div className="cta-left">
            <img
              src="/mockup-mediakit.png"
              alt="Produktmockup: Mediakit-Generator"
            />
          </div>

          {/* Rechts: Claim + Vorteile + Newsletter/Generator-CTA */}
          <div className="cta-right">
            <span className="badge" aria-hidden>
              KOSTENLOS
            </span>
            <h2 id="mediakit-cta">Erstelle dein Mediakit in Minuten</h2>
            <p className="lead">
              Sofortiger Zugang zum <strong>Mediakit‑Generator</strong> – gratis. Melde dich an und erhalte zusätzlich kompakte Profi‑Tipps & Vorlagen per Newsletter.
            </p>
            <ul className="benefits" aria-label="Vorteile">
              <li>Direkt im Browser, ohne Software</li>
              <li>Export als Link oder PDF</li>
              <li>Bewährte Layouts für Booking & PR</li>
              <li>In 5–10 Minuten einsatzbereit</li>
            </ul>

            <form
              className="cta-form"
              onSubmit={(e) => {
                e.preventDefault();
                // TODO: handle subscribe + redirect/open generator
              }}
            >
              <label htmlFor="cta-email" className="sr-only">E‑Mail</label>
              <input
                id="cta-email"
                type="email"
                inputMode="email"
                name="email"
                placeholder="Deine E‑Mail-Adresse"
                required
                aria-required="true"
              />
              <button type="submit">
                Jetzt kostenlos starten
              </button>
            </form>
          </div>
        </div>
      </section>


      {/* KURSE */}
      <section id="kurse" className="container section" aria-labelledby="kurse-title">
        <h2 id="kurse-title">Vielleicht ineressieren dich auch unsere Kurse:</h2>
        <div className="grid">
          <article className="card">
            <div className="thumb" role="img" aria-label="Kursbild – Steuern & Finanzen"></div>
            <div className="content">
              <div className="title">Steuern &amp; Finanzen für Musiker</div>
              <div className="meta">8 Stunden • Praxisnahe Tipps • Vorlagen</div>
              <div className="price">€ 99</div>
              <div className="actions">
                <Link to="/kurs/steuern-finanzen" className="btn primary">Mehr zum Kurs</Link>
              </div>
            </div>
          </article>
          <article className="card">
            <div className="thumb" role="img" aria-label="Kursbild – Marketing und Vertrieb"></div>
            <div className="content">
              <div className="title">Marketing &amp; Vertrieb für Musiker</div>
              <div className="meta">10 Stunden • Social Media • Fans gewinnen</div>
              <div className="price">€ 129</div>
              <div className="actions">
                <Link to="/kurs/marketing-vertrieb" className="btn primary">Mehr zum Kurs</Link>
              </div>
            </div>
          </article>
          <article className="card">
            <div className="thumb" role="img" aria-label="Kursbild – Bühnenshows und Entertainment"></div>
            <div className="content">
              <div className="title">Bühnenshows &amp; Entertainment</div>
              <div className="meta">12 Stunden • Performance • Publikumsbindung</div>
              <div className="price">€ 139</div>
              <div className="actions">
                <Link to="/kurs/buehnenshows" className="btn primary">Mehr zum Kurs</Link>
              </div>
            </div>
          </article>
          <article className="card">
            <div className="thumb" role="img" aria-label="Kursbild – Steuern & Finanzen"></div>
            <div className="content">
              <div className="title">Steuern &amp; Finanzen für Musiker</div>
              <div className="meta">8 Stunden • Praxisnahe Tipps • Vorlagen</div>
              <div className="price">€ 99</div>
              <div className="actions">
                <Link to="/kurs/steuern-finanzen" className="btn primary">Mehr zum Kurs</Link>
              </div>
            </div>
          </article>
        </div>
      </section>


      <PreviewModal open={showPreview} onClose={() => setShowPreview(false)} />
    </main>
  )
}
