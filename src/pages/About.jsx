import React from "react"
import { motion } from "framer-motion"
import useMobile from "../hooks/useMobile"

const fadeInUp = { hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }

export default function About() {
  const isMobile = useMobile()

  const timeline = [
    { year: "1989", event: "Founded", detail: "Established as a mechanical contractor serving Singapore's emerging industrial gas sector" },
    { year: "1995", event: "First Major Fab Project", detail: "Secured first semiconductor gas distribution project, launching our UHP expertise" },
    { year: "2003", event: "ISO Certification", detail: "Achieved ISO 9001:2000 certification, formalising quality management systems" },
    { year: "2010", event: "Hydrogen Testing Facility", detail: "Commissioned dedicated tube trailer testing facility in Tuas, first of its kind in Singapore" },
    { year: "2018", event: "Safety Milestone", detail: "Reached 2 million safe manhours without lost-time incident across active projects" },
    { year: "2024", event: "New Energy Expansion", detail: "Expanded capabilities into hydrogen infrastructure for data centre fuel cells and clean energy" },
  ]

  return (
    <div>
      {/* Hero */}
      <section style={{ padding: "0", background: "#0F172A", color: "#FFF", borderBottom: "2px solid #DC2626" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "40% 60%", minHeight: isMobile ? "200px" : "500px" }}>
          <div style={{ padding: isMobile ? "60px 20px 40px" : "100px 60px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 style={{ fontSize: isMobile ? "40px" : "56px", fontWeight: 900, lineHeight: 1.1, fontFamily: "Archivo, sans-serif" }}>About Us</h1>
            </motion.div>
          </div>
          {!isMobile && (
            <div style={{ background: "#E5E7EB", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "12px", fontWeight: 700, color: "#64748B", letterSpacing: "0.1em" }}>[ ABOUT IMAGE ]</div>
            </div>
          )}
        </div>
      </section>

      {/* Vision / Mission / Core Values */}
      <section style={{ padding: isMobile ? "48px 20px" : "80px 32px", background: "#0F172A", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: "24px" }}>
            {[
              {
                icon: (<svg width="64" height="64" viewBox="0 0 40 40" fill="none" stroke="#DC2626" strokeWidth="2"><path d="M4 20 C9 11 31 11 36 20 C31 29 9 29 4 20 Z" /><circle cx="20" cy="20" r="6" /><circle cx="20" cy="20" r="2.5" fill="#DC2626" stroke="none" /></svg>),
                pillar: "Our Vision",
                text: "To be the preferred Engineering Company that gives total Customer Satisfaction with Quality products & Excellent Service."
              },
              {
                icon: (<svg width="64" height="64" viewBox="0 0 40 40" fill="none" stroke="#DC2626" strokeWidth="2"><circle cx="20" cy="20" r="15" /><line x1="20" y1="5" x2="20" y2="35" /><line x1="5" y1="20" x2="35" y2="20" /><circle cx="20" cy="20" r="2.5" fill="#DC2626" stroke="none" /></svg>),
                pillar: "Our Mission",
                text: "To be a Customer focus organization, providing total solutions with Quality products & Excellent Service exceeding customer's expectation."
              },
              {
                icon: (<svg width="64" height="64" viewBox="0 0 40 40" fill="none" stroke="#DC2626" strokeWidth="2"><polygon points="20,4 23,14.5 34,14.5 25.5,21 28,32 20,25.5 12,32 14.5,21 6,14.5 17,14.5" /></svg>),
                pillar: "Our Core Values",
                text: "We shall be innovative & proactive in our work."
              }
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }}
                style={{ padding: isMobile ? "28px 20px" : "40px", border: "1px solid rgba(255,255,255,0.1)", transition: "all 0.3s" }}
                onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.04)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                <div style={{ marginBottom: "20px" }}>{item.icon}</div>
                <div style={{ fontFamily: "Archivo, sans-serif", fontSize: isMobile ? "20px" : "26px", fontWeight: 900, color: "#FFF", textTransform: "uppercase", marginBottom: "14px" }}>{item.pillar}</div>
                <p style={{ fontSize: "16px", color: "#94A3B8", lineHeight: 1.8, margin: 0 }}>{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeInUp}
        style={{ padding: isMobile ? "48px 20px" : "100px 32px", background: "#FFF" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.5fr", gap: isMobile ? "24px" : "80px", alignItems: "start" }}>
            <div>
              <h2 style={{ fontSize: isMobile ? "32px" : "42px", fontWeight: 900, marginBottom: "16px", lineHeight: 1.1 }}>How We Got Here</h2>
              <p style={{ fontSize: "14px", color: "#DC2626", fontWeight: 600, fontFamily: "IBM Plex Mono", letterSpacing: "0.05em", textTransform: "uppercase" }}>1989 to Present</p>
            </div>
            <div style={{ fontSize: "16px", color: "#64748B", lineHeight: 1.8 }}>
              <p style={{ marginBottom: "20px" }}>L.S. Lee started in 1989 as a three-person mechanical contractor doing piping work for industrial gas plants. The semiconductor boom had not hit Singapore yet. Data centres were not burning gigawatts. Hydrogen was something you learned about in chemistry class, not something you moved around in 40-foot tube trailers at 250 bar.</p>
              <p style={{ marginBottom: "20px" }}>We grew by doing one thing well and then doing it again. UHP gas distribution for one fab became UHP for twelve fabs. Plant turnarounds became long-term maintenance contracts. One-off tube trailer testing became Singapore's first dedicated hydrogen testing facility.</p>
              <p style={{ marginBottom: "20px" }}>Today we are a 50-person team with in-house design capability, fabrication shop, testing facility, and maintenance crews running 24/7 support contracts.</p>
              <p>The industry changed. We changed with it. What did not change: if your name goes on the drawing, you own the outcome.</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Milestones */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp}
        style={{ padding: isMobile ? "48px 20px" : "100px 32px", background: "#F8F9FA", borderTop: "2px solid #0F172A", borderBottom: "2px solid #0F172A" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2 style={{ fontSize: isMobile ? "28px" : "42px", fontWeight: 900, marginBottom: isMobile ? "32px" : "60px", textAlign: "center" }}>Key Milestones</h2>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: isMobile ? "24px" : "40px" }}>
            {timeline.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{ padding: "28px", background: "#FFF", border: "2px solid #0F172A", position: "relative" }}>
                <div style={{ position: "absolute", top: "-12px", left: "24px", background: "#DC2626", color: "#FFF", padding: "4px 12px", fontFamily: "IBM Plex Mono", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em" }}>{item.year}</div>
                <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "10px", marginTop: "8px" }}>{item.event}</h3>
                <p style={{ fontSize: "14px", color: "#64748B", lineHeight: 1.6 }}>{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Clients Carousel */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp}
        style={{ padding: isMobile ? "48px 20px" : "100px 32px", background: "#0F172A", color: "#FFF" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", marginBottom: "40px" }}>
          <h2 style={{ fontSize: isMobile ? "28px" : "42px", fontWeight: 900, marginBottom: "16px", fontFamily: "Archivo" }}>Our Presence</h2>
          <div style={{ width: "60px", height: "4px", background: "#DC2626" }} />
        </div>
        <div style={{ overflow: "hidden", position: "relative" }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "80px", background: "linear-gradient(to right, #0F172A, transparent)", zIndex: 2 }} />
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "80px", background: "linear-gradient(to left, #0F172A, transparent)", zIndex: 2 }} />
          <div style={{ display: "flex", gap: "16px", animation: "scroll 30s linear infinite", width: "max-content", alignItems: "center" }}>
            {[...Array(3)].map((_, repeatIndex) => (
              [
                { src: `${import.meta.env.BASE_URL}clients/DayOne (1).png`, alt: "DayOne", height: "60px" },
                { src: `${import.meta.env.BASE_URL}clients/Iwatani (1).png`, alt: "Iwatani", height: "60px" },
                { src: `${import.meta.env.BASE_URL}clients/Linde (1).png`, alt: "The Linde Group", height: "60px" },
                { src: `${import.meta.env.BASE_URL}clients/SSMC (1).png`, alt: "SSMC", height: "60px" },
                { src: `${import.meta.env.BASE_URL}clients/Soitec (1).png`, alt: "Soitec", height: "60px" },
                { src: `${import.meta.env.BASE_URL}clients/Global_Foundaries.png`, alt: "GlobalFoundries", height: "40px" },
                { src: `${import.meta.env.BASE_URL}clients/UMC (1).png`, alt: "UMC", height: "60px" },
                { src: `${import.meta.env.BASE_URL}clients/Siltronic_Logo (1).png`, alt: "Siltronic", height: "60px" },
                { src: `${import.meta.env.BASE_URL}clients/Micron (1).png`, alt: "Micron", height: "60px" },
                { src: `${import.meta.env.BASE_URL}clients/air_liquide_compact.png`, alt: "Air Liquide", height: "60px" },
              ].map((logo, i) => (
                <div key={`${repeatIndex}-${i}`} style={{ display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, padding: "0 20px" }}>
                  <img src={logo.src} alt={logo.alt} style={{ height: logo.height, width: "auto", maxWidth: "160px", objectFit: "contain", filter: "brightness(0) invert(1)", opacity: 0.8 }} />
                </div>
              ))
            ))}
          </div>
        </div>
        <style>{`@keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
      </motion.section>

      {/* CTA */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={fadeInUp}
        style={{ padding: isMobile ? "48px 20px" : "100px 32px", background: "#DC2626", color: "#FFF", textAlign: "center" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ fontSize: isMobile ? "28px" : "42px", fontWeight: 900, marginBottom: "24px", lineHeight: 1.2 }}>
            Talk to Someone Who Has Actually Done This Before
          </h2>
          <a href="/Contact"
            style={{ display: "inline-flex", alignItems: "center", gap: "12px", padding: isMobile ? "14px 28px" : "18px 40px", background: "#FFF", color: "#DC2626", border: "2px solid #FFF", fontWeight: 700, fontSize: "15px", textTransform: "uppercase", letterSpacing: "0.05em", textDecoration: "none", cursor: "pointer", transition: "all 0.3s", fontFamily: "Archivo" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#0F172A"; e.currentTarget.style.color = "#FFF"; e.currentTarget.style.borderColor = "#0F172A" }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#FFF"; e.currentTarget.style.color = "#DC2626"; e.currentTarget.style.borderColor = "#FFF" }}>
            Get in Touch
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="2"><line x1="0" y1="5" x2="13" y2="5" /><polyline points="9,1 13,5 9,9" /></svg>
          </a>
        </div>
      </motion.section>
    </div>
  )
}
