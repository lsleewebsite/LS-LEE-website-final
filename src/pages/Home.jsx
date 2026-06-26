import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import useMobile from '../hooks/useMobile'

const I = {
  Chip: (p) => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <rect x="7" y="7" width="14" height="14" /><rect x="10" y="10" width="8" height="8" />
      <line x1="4" y1="10" x2="7" y2="10" /><line x1="4" y1="14" x2="7" y2="14" /><line x1="4" y1="18" x2="7" y2="18" />
      <line x1="21" y1="10" x2="24" y2="10" /><line x1="21" y1="14" x2="24" y2="14" /><line x1="21" y1="18" x2="24" y2="18" />
      <line x1="10" y1="4" x2="10" y2="7" /><line x1="14" y1="4" x2="14" y2="7" /><line x1="18" y1="4" x2="18" y2="7" />
      <line x1="10" y1="21" x2="10" y2="24" /><line x1="14" y1="21" x2="14" y2="24" /><line x1="18" y1="21" x2="18" y2="24" />
    </svg>
  ),
  Server: (p) => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <rect x="4" y="5" width="20" height="6" /><rect x="4" y="13" width="20" height="6" /><rect x="4" y="21" width="20" height="2" />
      <circle cx="8" cy="8" r="0.8" fill="currentColor" /><circle cx="11" cy="8" r="0.8" fill="currentColor" />
      <circle cx="8" cy="16" r="0.8" fill="currentColor" /><circle cx="11" cy="16" r="0.8" fill="currentColor" />
      <line x1="17" y1="8" x2="21" y2="8" /><line x1="17" y1="16" x2="21" y2="16" />
    </svg>
  ),
  Plant: (p) => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <path d="M3 24 V12 L8 14 V9 L13 12 V7 L18 11 V14 H25 V24 Z" />
      <line x1="6" y1="20" x2="6" y2="22" /><line x1="11" y1="18" x2="11" y2="22" /><line x1="16" y1="18" x2="16" y2="22" /><line x1="21" y1="18" x2="21" y2="22" />
      <line x1="2" y1="24" x2="26" y2="24" />
    </svg>
  ),
  H2: (p) => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <circle cx="14" cy="14" r="10" />
      <text x="14" y="18" fontSize="11" fontWeight="700" fontFamily="Archivo" textAnchor="middle" fill="currentColor" stroke="none">H₂</text>
    </svg>
  ),
  Lego: (p) => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <rect x="2" y="17" width="16" height="9" /><rect x="4" y="13" width="4" height="4" />
      <rect x="10" y="8" width="16" height="9" /><rect x="12" y="4" width="4" height="4" /><rect x="19" y="4" width="4" height="4" />
    </svg>
  ),
  Gauge: (p) => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <path d="M4 18 A10 10 0 0 1 24 18" /><line x1="4" y1="18" x2="24" y2="18" />
      <line x1="14" y1="18" x2="20" y2="11" strokeWidth="2.5" />
      <circle cx="14" cy="18" r="1.5" fill="currentColor" />
      <line x1="7" y1="14" x2="8.5" y2="15" /><line x1="14" y1="9" x2="14" y2="11" /><line x1="21" y1="14" x2="19.5" y2="15" />
    </svg>
  ),
  Trailer: (p) => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <rect x="2" y="10" width="18" height="8" rx="0" />
      <circle cx="20" cy="22" r="2.5" /><circle cx="7" cy="22" r="2.5" />
      <line x1="2" y1="20" x2="4.5" y2="20" /><line x1="9.5" y1="20" x2="17.5" y2="20" /><line x1="22.5" y1="20" x2="26" y2="20" />
      <line x1="6" y1="13" x2="6" y2="15" /><line x1="10" y1="13" x2="10" y2="15" /><line x1="14" y1="13" x2="14" y2="15" />
    </svg>
  ),
  Snow: (p) => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <line x1="14" y1="3" x2="14" y2="25" /><line x1="3" y1="14" x2="25" y2="14" />
      <line x1="6" y1="6" x2="22" y2="22" /><line x1="22" y1="6" x2="6" y2="22" />
      <circle cx="14" cy="14" r="2" />
    </svg>
  ),
  Bolt: (p) => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <polygon points="16,3 7,16 13,16 11,25 21,12 15,12" strokeLinejoin="round" />
    </svg>
  ),
  Arrow: (p) => (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <line x1="0" y1="5" x2="13" y2="5" /><polyline points="9,1 13,5 9,9" />
    </svg>
  ),
}

const fadeInUp = { hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0 } }
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } }
const cardVariant = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }
const MotionLink = motion(Link)

export default function Home() {
  const isMobile = useMobile()

  return (
    <div>
      {/* HERO */}
      <section style={{ background: '#0F172A', position: 'relative', overflow: 'hidden' }}>
        {isMobile ? (
          <div style={{ padding: '60px 20px 48px', display: 'flex', flexDirection: 'column' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '8px 16px', background: 'rgba(255,255,255,0.1)', border: '2px solid rgba(255,255,255,0.2)', marginBottom: '24px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#DC2626' }} />
                <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', fontWeight: 700, color: '#FFF', letterSpacing: '0.12em', textTransform: 'uppercase' }}>EST. 1999 — SINGAPORE</span>
              </div>
              <h1 style={{ fontFamily: 'Archivo, sans-serif', fontSize: '32px', fontWeight: 900, color: '#FFF', lineHeight: 1.15, marginBottom: '16px' }}>
                Delivering Mechanical & Structural Solutions for the Process Industry
              </h1>
              <p style={{ fontSize: '18px', color: '#94A3B8', lineHeight: 1.6, marginBottom: '32px' }}>
                Where experience meets uncompromised quality and safety.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a href="#industries" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '16px', background: '#DC2626', color: '#FFF', border: '2px solid #DC2626', fontFamily: 'Archivo, sans-serif', fontWeight: 700, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em', textDecoration: 'none' }}>
                  Explore Our Industries <I.Arrow />
                </a>
                <a href="#/Projects" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '16px', background: 'transparent', color: '#FFF', border: '2px solid rgba(255,255,255,0.3)', fontFamily: 'Archivo, sans-serif', fontWeight: 700, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em', textDecoration: 'none' }}>
                  View Projects
                </a>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }} style={{ marginTop: '40px', height: '220px', overflow: 'hidden', position: 'relative' }}>
              <img src={`${import.meta.env.BASE_URL}HeroImage.png`} alt="LS Lee Technology" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, #0F172A 100%)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: '#DC2626' }} />
            </motion.div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '45% 55%', minHeight: '700px' }}>
            <div style={{ padding: '100px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '16px', padding: '12px 24px', background: 'rgba(255,255,255,0.1)', border: '2px solid rgba(255,255,255,0.2)', marginBottom: '32px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#DC2626' }} />
                  <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '13px', fontWeight: 700, color: '#FFF', letterSpacing: '0.15em', textTransform: 'uppercase' }}>EST. 1999 — SINGAPORE</span>
                </div>
                <h1 style={{ fontFamily: 'Archivo, sans-serif', fontSize: '52px', fontWeight: 900, color: '#FFF', lineHeight: 1.1, marginBottom: '24px' }}>
                  Delivering Mechanical & Structural Solutions for the Process Industry
                </h1>
                <p style={{ fontSize: '26px', color: '#94A3B8', lineHeight: 1.6, marginBottom: '40px' }}>
                  Where experience meets uncompromised quality and safety.
                </p>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <a href="#industries" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '18px 40px', background: '#DC2626', color: '#FFF', border: '2px solid #DC2626', fontFamily: 'Archivo, sans-serif', fontWeight: 700, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em', textDecoration: 'none', transition: 'all 0.3s' }}
                    onMouseEnter={(e) => { e.target.style.background = '#FFF'; e.target.style.color = '#DC2626' }}
                    onMouseLeave={(e) => { e.target.style.background = '#DC2626'; e.target.style.color = '#FFF' }}>
                    Explore Our Industries <I.Arrow />
                  </a>
                  <a href="#/Projects" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '18px 40px', background: 'transparent', color: '#FFF', border: '2px solid rgba(255,255,255,0.3)', fontFamily: 'Archivo, sans-serif', fontWeight: 700, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em', textDecoration: 'none', transition: 'all 0.3s' }}
                    onMouseEnter={(e) => { e.target.style.borderColor = '#FFF'; e.target.style.background = 'rgba(255,255,255,0.1)' }}
                    onMouseLeave={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.3)'; e.target.style.background = 'transparent' }}>
                    View Projects
                  </a>
                </div>
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} style={{ position: 'relative', overflow: 'hidden' }}>
              <img src={`${import.meta.env.BASE_URL}HeroImage.png`} alt="LS Lee Technology" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #0F172A 0%, rgba(15,23,42,0.4) 30%, rgba(15,23,42,0.05) 100%)', zIndex: 1 }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: '#DC2626', zIndex: 2 }} />
            </motion.div>
            <svg style={{ position: 'absolute', left: '45%', top: 0, height: '100%', width: '100px', transform: 'translateX(-100%)', zIndex: 1 }} viewBox="0 0 100 700" preserveAspectRatio="none">
              <path d="M 0 0 Q 100 350, 0 700 L 0 0 Z" fill="#0F172A" />
            </svg>
          </div>
        )}
      </section>

      {/* CERTIFICATIONS CAROUSEL */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }} variants={fadeInUp}
        style={{ background: '#F1F5F9', padding: isMobile ? '48px 0' : '80px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto 32px', padding: isMobile ? '0 20px' : '0 32px', textAlign: 'center' }}>
          <h2 style={{ fontSize: isMobile ? '24px' : '32px', fontWeight: 900, color: '#0F172A', fontFamily: 'Archivo, sans-serif', marginBottom: '12px' }}>
            Certified. Compliant. <span style={{ color: '#DC2626' }}>Trusted.</span>
          </h2>
          <div style={{ width: '60px', height: '4px', background: '#DC2626', margin: '0 auto' }} />
        </div>
        <div style={{ overflow: 'hidden', position: 'relative' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px', background: 'linear-gradient(to right, #F1F5F9, transparent)', zIndex: 2 }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px', background: 'linear-gradient(to left, #F1F5F9, transparent)', zIndex: 2 }} />
          <div style={{ display: 'flex', gap: '16px', animation: 'certScroll 25s linear infinite', width: 'max-content', padding: '8px 0' }}>
            {[...Array(4)].map((_, ri) => (
              [
                { name: 'ISO 9001' },
                { name: 'ISO 45001' },
                { name: 'Biz Safe Star' },
                { name: 'Non-Destructive Testing (NDT) Level II/III' },
                { name: 'ASME' },
              ].map((cert, i) => (
                <div key={`${ri}-${i}`}
                  style={{ minWidth: isMobile ? '160px' : '220px', padding: isMobile ? '16px 12px' : '28px 24px', background: '#FFF', border: '2px solid #E5E7EB', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ fontFamily: 'Archivo, sans-serif', fontSize: isMobile ? '14px' : '22px', fontWeight: 900, color: '#DC2626', textAlign: 'center' }}>{cert.name}</div>
                </div>
              ))
            ))}
          </div>
        </div>
        <style>{`@keyframes certScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
      </motion.section>

      {/* INDUSTRIES */}
      <motion.section id="industries" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }} variants={fadeInUp}
        style={{ background: '#FFF', padding: isMobile ? '48px 20px' : '80px 32px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: isMobile ? '32px' : '60px' }}>
            <h2 style={{ fontSize: isMobile ? '32px' : '48px', fontWeight: 900, marginBottom: '16px', fontFamily: 'Archivo, sans-serif' }}>
              Supporting <span style={{ color: '#DC2626' }}>Key Industries</span>
            </h2>
          </div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
            style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: isMobile ? '16px' : '32px' }}>
            {[
              { icon: <I.Chip style={{ width: isMobile ? 48 : 80, height: isMobile ? 48 : 80 }} />, title: 'Semiconductor', anchor: 'semiconductor' },
              { icon: <I.Server style={{ width: isMobile ? 48 : 80, height: isMobile ? 48 : 80 }} />, title: 'Data Center', anchor: 'datacenter' },
              { icon: <I.Plant style={{ width: isMobile ? 48 : 80, height: isMobile ? 48 : 80 }} />, title: 'Industrial Gas', anchor: 'industrial-gas' },
              { icon: <I.H2 style={{ width: isMobile ? 48 : 80, height: isMobile ? 48 : 80 }} />, title: 'New Energy', anchor: 'new-energy' },
            ].map((it, i) => (
              <MotionLink to={{ pathname: '/Industries', hash: `#${it.anchor}` }} key={i} variants={cardVariant} transition={{ duration: 0.5 }}
                style={{ padding: isMobile ? '28px 16px' : '60px 32px', background: '#FFF', border: '2px solid #E5E7EB', textAlign: 'center', textDecoration: 'none', color: 'inherit', transition: 'all 0.3s', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: isMobile ? '12px' : '24px' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#DC2626'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.querySelector('.ind-icon').style.color = '#DC2626' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.querySelector('.ind-icon').style.color = '#0F172A' }}>
                <div className="ind-icon" style={{ color: '#0F172A', transition: 'color 0.3s' }}>{it.icon}</div>
                <h3 style={{ fontFamily: 'Archivo, sans-serif', fontSize: isMobile ? '16px' : '24px', fontWeight: 900, color: '#0F172A' }}>{it.title}</h3>
              </MotionLink>
            ))}
          </motion.div>
          <div style={{ textAlign: 'center', marginTop: isMobile ? '24px' : '48px' }}>
            <a href="#/Industries" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: isMobile ? '14px 24px' : '18px 40px', background: '#DC2626', color: '#FFF', border: '2px solid #DC2626', fontFamily: 'Archivo, sans-serif', fontWeight: 700, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em', textDecoration: 'none', transition: 'all 0.3s' }}
              onMouseEnter={(e) => { e.target.style.background = '#FFF'; e.target.style.color = '#DC2626' }}
              onMouseLeave={(e) => { e.target.style.background = '#DC2626'; e.target.style.color = '#FFF' }}>
              Explore All Industries <I.Arrow />
            </a>
          </div>
        </div>
      </motion.section>

      {/* SERVICES */}
      <motion.section id="services" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }} variants={fadeInUp}
        style={{ background: '#0F172A', color: '#FFF', padding: isMobile ? '48px 20px' : '80px 32px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: isMobile ? '32px' : '48px' }}>
            <h2 style={{ fontSize: isMobile ? '32px' : '48px', fontWeight: 900, marginBottom: '16px', color: '#FFF', fontFamily: 'Archivo, sans-serif' }}>
              Integrated <span style={{ color: '#DC2626' }}>Engineering Services</span>
            </h2>
            {!isMobile && <p style={{ fontSize: '18px', color: '#94A3B8', maxWidth: '700px', margin: '0 auto' }}>Five core capabilities delivering turnkey mechanical and electrical solutions</p>}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '16px', marginBottom: '16px' }}>
            {[
              { icon: <I.Lego />, title: 'Project Engineering', tag: 'Turnkey Mechanical Structural', id: 'project-engineering' },
              { icon: <I.Gauge />, title: 'Plant Maintenance', tag: '24/7 Operations Support', id: 'plant-maintenance' },
            ].map((it, i) => (
              <MotionLink to={`/Services?service=${it.id}`} key={i} variants={cardVariant} transition={{ duration: 0.5 }}
                style={{ padding: isMobile ? '24px' : '36px', background: 'rgba(255,255,255,0.05)', border: '2px solid rgba(255,255,255,0.1)', textDecoration: 'none', color: 'inherit', transition: 'all 0.3s', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '12px' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#DC2626'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ color: '#FFF' }}>{React.cloneElement(it.icon, { width: 40, height: 40 })}</div>
                  <div style={{ fontFamily: 'Archivo, sans-serif', fontSize: '32px', fontWeight: 900, color: 'rgba(255,255,255,0.1)', lineHeight: 1 }}>{String(i + 1).padStart(2, '0')}</div>
                </div>
                <div>
                  <h3 style={{ fontFamily: 'Archivo, sans-serif', fontSize: isMobile ? '20px' : '24px', fontWeight: 900, marginBottom: '6px', color: '#FFF' }}>{it.title}</h3>
                  <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', fontWeight: 700, color: '#DC2626', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{it.tag}</div>
                </div>
              </MotionLink>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '16px' }}>
            {[
              { icon: <I.Trailer />, title: 'Servicing & Testing', tag: 'Destructive & Non-Destructive Testing', id: 'servicing-testing' },
              { icon: <I.Snow />, title: 'Cryogenic Storage & Hoses', tag: 'Vacuum-Insulated Equipment', id: 'cryogenic-storage' },
              { icon: <I.Bolt />, title: 'Electrical & Instrumentation', tag: 'Controls & Automation', id: 'electrical-instrumentation' },
            ].map((it, i) => (
              <MotionLink to={`/Services?service=${it.id}`} key={i} variants={cardVariant} transition={{ duration: 0.5 }}
                style={{ padding: isMobile ? '24px' : '32px 28px', background: 'rgba(255,255,255,0.05)', border: '2px solid rgba(255,255,255,0.1)', textDecoration: 'none', color: 'inherit', transition: 'all 0.3s', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '12px' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#DC2626'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ color: '#FFF' }}>{React.cloneElement(it.icon, { width: 36, height: 36 })}</div>
                  <div style={{ fontFamily: 'Archivo, sans-serif', fontSize: '28px', fontWeight: 900, color: 'rgba(255,255,255,0.1)', lineHeight: 1 }}>{String(i + 3).padStart(2, '0')}</div>
                </div>
                <div>
                  <h3 style={{ fontFamily: 'Archivo, sans-serif', fontSize: isMobile ? '18px' : '19px', fontWeight: 900, marginBottom: '6px', color: '#FFF' }}>{it.title}</h3>
                  <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', fontWeight: 700, color: '#DC2626', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{it.tag}</div>
                </div>
              </MotionLink>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <a href="#/Services" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: isMobile ? '14px 24px' : '18px 40px', background: '#DC2626', color: '#FFF', border: '2px solid #DC2626', fontFamily: 'Archivo, sans-serif', fontWeight: 700, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em', textDecoration: 'none', transition: 'all 0.3s' }}
              onMouseEnter={(e) => { e.target.style.background = '#FFF'; e.target.style.color = '#DC2626' }}
              onMouseLeave={(e) => { e.target.style.background = '#DC2626'; e.target.style.color = '#FFF' }}>
              View All Services <I.Arrow />
            </a>
          </div>
        </div>
      </motion.section>

      {/* PROJECTS */}
      <motion.section id="projects" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }} variants={fadeInUp}
        style={{ background: '#FFF', padding: isMobile ? '48px 20px' : '80px 32px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: isMobile ? '32px' : '48px' }}>
            <h2 style={{ fontSize: isMobile ? '32px' : '48px', fontWeight: 900, marginBottom: '16px', fontFamily: 'Archivo, sans-serif' }}>
              Engineering That <span style={{ color: '#DC2626' }}>Delivers</span>
            </h2>
            {!isMobile && <p style={{ fontSize: '18px', color: '#64748B', maxWidth: '700px', margin: '0 auto' }}>From concept to commissioning across Singapore's critical infrastructure</p>}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '20px', marginBottom: '24px' }}>
            {[
              { tag: 'PROJECT ENGINEERING', title: 'Fab-14 UHP Gas Distribution', desc: 'Design, fabrication, and installation of ultra-high-purity gas distribution network.', loc: 'Woodlands · 2024' },
              { tag: 'MAINTENANCE', title: 'ASU Plant Turnaround', desc: 'Major shutdown coordination across air separation unit.', loc: '' },
              { tag: 'TESTING & CERTIFICATION', title: 'H₂ Tube Trailer Recertification', desc: 'DOT recertification program for fleet of 40+ trailers.', loc: 'Tuas · 2024' },
              { tag: 'CRYOGENIC SYSTEMS', title: 'LNG Transfer Line Fabrication', desc: 'Vacuum-insulated transfer lines for LNG operations.', loc: '' },
            ].map((proj, i) => (
              <div key={i} style={{ background: '#FFF', border: '2px solid #E5E7EB', overflow: 'hidden', transition: 'all 0.3s', cursor: 'pointer' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#DC2626'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.transform = 'translateY(0)' }}>
                <div style={{ height: '160px', background: '#E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '2px solid #E5E7EB' }}>
                  <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', fontWeight: 700, color: '#64748B', letterSpacing: '0.1em' }}>[ PROJECT ]</div>
                </div>
                <div style={{ padding: '20px' }}>
                  <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', fontWeight: 700, color: '#DC2626', letterSpacing: '0.12em', marginBottom: '8px' }}>{proj.tag}</div>
                  <h3 style={{ fontFamily: 'Archivo, sans-serif', fontSize: '18px', fontWeight: 900, marginBottom: '8px', lineHeight: 1.2, color: '#0F172A' }}>{proj.title}</h3>
                  <p style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.5, marginBottom: proj.loc ? '8px' : '0' }}>{proj.desc}</p>
                  {proj.loc && <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', fontWeight: 600, color: '#0F172A' }}>{proj.loc}</div>}
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <MotionLink to="/Projects"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: isMobile ? '14px 24px' : '18px 40px', background: '#0F172A', color: '#FFF', border: '2px solid #0F172A', fontFamily: 'Archivo, sans-serif', fontWeight: 700, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em', textDecoration: 'none', transition: 'all 0.3s' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#DC2626'; e.currentTarget.style.borderColor = '#DC2626' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#0F172A'; e.currentTarget.style.borderColor = '#0F172A' }}>
              View All Projects <I.Arrow />
            </MotionLink>
          </div>
        </div>
      </motion.section>

      {/* CONTACT */}
      <motion.section id="contact" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }} variants={fadeInUp}
        style={{ padding: isMobile ? '48px 20px' : '80px 32px', background: '#0F172A', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Archivo, sans-serif', fontSize: isMobile ? '28px' : '48px', fontWeight: 900, marginBottom: '24px', color: '#FFF', lineHeight: 1.2 }}>
            Ready to Discuss <span style={{ color: '#DC2626' }}>Your Project?</span>
          </h2>
          <a href="mailto:projects@lslee.com.sg" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: isMobile ? '14px 24px' : '18px 40px', background: '#DC2626', color: '#FFF', border: '2px solid #DC2626', fontFamily: 'Archivo, sans-serif', fontWeight: 700, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em', textDecoration: 'none', transition: 'all 0.3s' }}
            onMouseEnter={(e) => { e.target.style.background = '#FFF'; e.target.style.color = '#DC2626' }}
            onMouseLeave={(e) => { e.target.style.background = '#DC2626'; e.target.style.color = '#FFF' }}>
            Get in Touch <I.Arrow />
          </a>
        </div>
      </motion.section>
    </div>
  )
}
