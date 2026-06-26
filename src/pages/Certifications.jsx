import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useMobile from '../hooks/useMobile'

const NOTION_KEY = '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'
const DATABASE_ID = '37c7a921a230808d9e92d444f1b62d44'
const PROXY = 'https://corsproxy.io/?'

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
}

function parseCerts(results) {
  return results
    .filter(page => page.properties?.Published?.checkbox === true)
    .map(page => {
      const p = page.properties
      return {
        id: page.id,
        name: p.Name?.title?.[0]?.text?.content || 'Untitled',
        body: p.Body?.rich_text?.[0]?.text?.content || '',
        issuedBy: p.IssuedBy?.rich_text?.[0]?.text?.content || '',
        scope: p.Scope?.rich_text?.[0]?.text?.content || '',
        certNumber: p.CertNumber?.rich_text?.[0]?.text?.content || '',
        validFrom: p.ValidFrom?.date?.start || '',
        validTo: p.ValidTo?.date?.start || '',
        certificate: p.Certificate?.url || null,
      }
    })
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

function Modal({ cert, onClose, isMobile }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = 'unset' }
  }, [])

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: isMobile ? '16px' : '32px' }}>
        <motion.div initial={{ opacity: 0, y: 40, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 40, scale: 0.95 }} transition={{ duration: 0.3 }} onClick={(e) => e.stopPropagation()}
          style={{ background: '#FFF', width: '100%', maxWidth: '860px', maxHeight: '90vh', overflow: 'auto', position: 'relative', border: '2px solid #0F172A' }}>
          <button onClick={onClose}
            style={{ position: 'absolute', top: '16px', right: '16px', width: '44px', height: '44px', background: '#DC2626', color: '#FFF', border: 'none', fontSize: '22px', cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, transition: 'background 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#0F172A'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#DC2626'}>
            ×
          </button>

          <div style={{ height: isMobile ? '220px' : '500px', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '2px solid #E5E7EB', position: 'relative', overflow: 'hidden' }}>
            {cert.certificate ? (
              <>
                <img src={cert.certificate} alt={cert.name} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} onError={(e) => { e.target.style.display = 'none' }} />
                <a href={cert.certificate} target="_blank" rel="noopener noreferrer"
                  style={{ position: 'absolute', top: '16px', right: '70px', padding: '10px 20px', background: '#DC2626', color: '#FFF', fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em', fontFamily: 'IBM Plex Mono', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  OPEN FULL IMAGE
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15,3 21,3 21,9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                </a>
              </>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', fontWeight: 900, color: '#CBD5E1', fontFamily: 'Archivo', marginBottom: '12px' }}>—</div>
                <div style={{ fontFamily: 'IBM Plex Mono', fontSize: '13px', color: '#94A3B8', letterSpacing: '0.1em' }}>[ CERTIFICATE PREVIEW ]</div>
              </div>
            )}
          </div>

          <div style={{ padding: isMobile ? '24px 20px' : '48px' }}>
            <h2 style={{ fontSize: isMobile ? '24px' : '34px', fontWeight: 900, marginBottom: '12px', fontFamily: 'Archivo, sans-serif', color: '#0F172A', lineHeight: 1.2 }}>{cert.name}</h2>
            {cert.issuedBy && (
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#DC2626', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'IBM Plex Mono', marginBottom: '20px' }}>
                ISSUED BY {cert.issuedBy}
              </div>
            )}
            {cert.body && <p style={{ fontSize: isMobile ? '15px' : '18px', color: '#475569', lineHeight: 1.8, marginBottom: '24px' }}>{cert.body}</p>}
            {cert.scope && (
              <div style={{ padding: '20px 24px', background: '#F8F9FA', border: '2px solid #E5E7EB', marginBottom: '20px' }}>
                <div style={{ fontFamily: 'IBM Plex Mono', fontSize: '12px', fontWeight: 700, color: '#94A3B8', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px' }}>Certification Scope</div>
                <div style={{ fontSize: '16px', color: '#0F172A', lineHeight: 1.7 }}>{cert.scope}</div>
              </div>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '16px' }}>
              {cert.certNumber && (
                <div style={{ padding: '20px 24px', background: '#F8F9FA', border: '2px solid #E5E7EB' }}>
                  <div style={{ fontFamily: 'IBM Plex Mono', fontSize: '12px', fontWeight: 700, color: '#94A3B8', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px' }}>Certificate Number</div>
                  <div style={{ fontSize: '17px', fontWeight: 700, color: '#0F172A', fontFamily: 'IBM Plex Mono' }}>{cert.certNumber}</div>
                </div>
              )}
              {(cert.validFrom || cert.validTo) && (
                <div style={{ padding: '20px 24px', background: '#F8F9FA', border: '2px solid #E5E7EB' }}>
                  <div style={{ fontFamily: 'IBM Plex Mono', fontSize: '12px', fontWeight: 700, color: '#94A3B8', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px' }}>Validity Period</div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', fontFamily: 'IBM Plex Mono' }}>{formatDate(cert.validFrom)} — {formatDate(cert.validTo)}</div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function Certifications() {
  const isMobile = useMobile()
  const [certs, setCerts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCert, setSelectedCert] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    async function fetchCerts() {
      try {
        const res = await fetch(`${PROXY}https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${NOTION_KEY}`, 'Notion-Version': '2022-06-28', 'Content-Type': 'application/json' },
          body: JSON.stringify({})
        })
        if (!res.ok) throw new Error(`Notion API error: ${res.status}`)
        const data = await res.json()
        setCerts(parseCerts(data.results))
      } catch (err) { setError(err.message) } finally { setLoading(false) }
    }
    fetchCerts()
  }, [])

  const prev = () => setActiveIndex(i => i === 0 ? certs.length - 1 : i - 1)
  const next = () => setActiveIndex(i => i === certs.length - 1 ? 0 : i + 1)

  return (
    <div>
      {/* Hero */}
      <section style={{ padding: isMobile ? '60px 20px 40px' : '100px 32px 80px', background: '#0F172A', color: '#FFF', borderBottom: '2px solid #DC2626' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 style={{ fontSize: isMobile ? '36px' : '56px', fontWeight: 900, marginBottom: '28px', lineHeight: 1.1, fontFamily: 'Archivo, sans-serif' }}>
              Our <span style={{ color: '#DC2626' }}>Certifications</span>
            </h1>
            <p style={{ fontSize: isMobile ? '16px' : '20px', color: '#94A3B8', maxWidth: '800px', lineHeight: 1.7 }}>
              Industry-recognised certifications demonstrating our commitment to quality, safety, and technical excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Carousel */}
      <section style={{ padding: isMobile ? '48px 20px' : '100px 32px', background: '#F1F5F9' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: isMobile ? '40px' : '60px' }}>
            <h2 style={{ fontSize: isMobile ? '28px' : '42px', fontWeight: 900, marginBottom: '12px', fontFamily: 'Archivo, sans-serif', color: '#0F172A' }}>
              Certified Safety & Quality Systems
            </h2>
            <p style={{ fontSize: '15px', color: '#64748B', fontFamily: 'IBM Plex Sans' }}>Click any certificate to view full documentation</p>
          </div>

          {loading && (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <div style={{ width: '48px', height: '48px', border: '4px solid #E5E7EB', borderTopColor: '#DC2626', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 24px' }} />
              <div style={{ fontFamily: 'IBM Plex Mono', fontSize: '13px', color: '#64748B' }}>Loading certifications...</div>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          )}

          {error && (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <div style={{ fontFamily: 'IBM Plex Mono', fontSize: '13px', color: '#DC2626', marginBottom: '8px' }}>Failed to load certifications</div>
              <div style={{ fontSize: '13px', color: '#64748B' }}>{error}</div>
            </div>
          )}

          {!loading && !error && certs.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <div style={{ fontFamily: 'IBM Plex Mono', fontSize: '13px', color: '#64748B', letterSpacing: '0.1em' }}>NO CERTIFICATIONS AVAILABLE</div>
            </div>
          )}

          {!loading && !error && certs.length > 0 && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: isMobile ? '16px' : '32px', padding: isMobile ? '20px 0' : '40px 0' }}>
                <button onClick={prev}
                  style={{ width: isMobile ? '44px' : '56px', height: isMobile ? '44px' : '56px', background: '#0F172A', color: '#FFF', border: 'none', fontSize: '20px', cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#DC2626'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#0F172A'}>
                  ←
                </button>

                <div style={{ position: 'relative', width: '100%', maxWidth: isMobile ? '280px' : '1100px', height: isMobile ? '360px' : '560px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {certs.map((cert, i) => {
                    const total = certs.length
                    let offset = i - activeIndex
                    if (offset > total / 2) offset -= total
                    if (offset < -total / 2) offset += total
                    const isActive = offset === 0
                    const isVisible = Math.abs(offset) <= (isMobile ? 0 : 1)
                    if (!isVisible) return null

                    return (
                      <motion.div key={cert.id}
                        onClick={() => isActive ? setSelectedCert(cert) : setActiveIndex(i)}
                        animate={{
                          scale: isActive ? 1 : 0.75,
                          opacity: isActive ? 1 : 0.4,
                          x: offset * (isMobile ? 0 : 280),
                          zIndex: isActive ? 2 : 1
                        }}
                        transition={{ duration: 0.4 }}
                        style={{
                          width: isMobile ? '260px' : '420px',
                          height: isMobile ? '340px' : '560px',
                          background: '#F8F9FA',
                          border: `2px solid ${isActive ? '#0F172A' : '#E5E7EB'}`,
                          cursor: 'pointer', position: 'absolute',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          overflow: 'hidden',
                          boxShadow: isActive ? '0 24px 80px rgba(0,0,0,0.18)' : 'none'
                        }}>
                        {cert.certificate ? (
                          <img src={cert.certificate} alt={cert.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} onError={(e) => { e.target.style.display = 'none' }} />
                        ) : (
                          <div style={{ textAlign: 'center', padding: '40px' }}>
                            <div style={{ fontSize: isMobile ? '48px' : '96px', fontWeight: 900, color: '#E2E8F0', fontFamily: 'Archivo', lineHeight: 1, marginBottom: '20px' }}>{String(i + 1).padStart(2, '0')}</div>
                            <div style={{ fontFamily: 'IBM Plex Mono', fontSize: '10px', color: '#94A3B8', letterSpacing: '0.1em' }}>[ CERTIFICATE PREVIEW ]</div>
                          </div>
                        )}
                      </motion.div>
                    )
                  })}
                </div>

                <button onClick={next}
                  style={{ width: isMobile ? '44px' : '56px', height: isMobile ? '44px' : '56px', background: '#0F172A', color: '#FFF', border: 'none', fontSize: '20px', cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#DC2626'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#0F172A'}>
                  →
                </button>
              </div>

              {certs[activeIndex] && (
                <motion.div key={activeIndex} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
                  style={{ textAlign: 'center', marginTop: '16px' }}>
                  <h3 style={{ fontSize: isMobile ? '20px' : '28px', fontWeight: 900, marginBottom: '8px', fontFamily: 'Archivo', color: '#0F172A' }}>{certs[activeIndex].name}</h3>
                  {certs[activeIndex].issuedBy && (
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#DC2626', fontFamily: 'IBM Plex Mono', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{certs[activeIndex].issuedBy}</div>
                  )}
                </motion.div>
              )}

              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '28px' }}>
                {certs.map((_, i) => (
                  <button key={i} onClick={() => setActiveIndex(i)}
                    style={{ width: activeIndex === i ? '24px' : '8px', height: '8px', background: activeIndex === i ? '#DC2626' : '#CBD5E1', border: 'none', borderRadius: '4px', cursor: 'pointer', transition: 'all 0.3s', padding: 0 }} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {selectedCert && <Modal cert={selectedCert} onClose={() => setSelectedCert(null)} isMobile={isMobile} />}

      {/* CTA */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={fadeInUp}
        style={{ padding: isMobile ? '48px 20px' : '100px 32px', background: '#DC2626', color: '#FFF', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: isMobile ? '28px' : '42px', fontWeight: 900, marginBottom: '24px', lineHeight: 1.2, fontFamily: 'Archivo' }}>
            Questions About Our Certifications?
          </h2>
          <a href="/Contact"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: isMobile ? '14px 28px' : '18px 40px', background: '#FFF', color: '#DC2626', border: '2px solid #FFF', fontWeight: 700, fontSize: '15px', textTransform: 'uppercase', letterSpacing: '0.05em', textDecoration: 'none', cursor: 'pointer', transition: 'all 0.3s', fontFamily: 'IBM Plex Sans' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#0F172A'; e.currentTarget.style.color = '#FFF'; e.currentTarget.style.borderColor = '#0F172A' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#FFF'; e.currentTarget.style.color = '#DC2626'; e.currentTarget.style.borderColor = '#FFF' }}>
            Get in Touch
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="2"><line x1="0" y1="5" x2="13" y2="5" /><polyline points="9,1 13,5 9,9" /></svg>
          </a>
        </div>
      </motion.section>
    </div>
  )
}
