import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLocation, Link } from 'react-router-dom'
import useMobile from '../hooks/useMobile'

const Icon = {
  Chip: () => (<svg width="48" height="48" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2"><rect x="7" y="7" width="14" height="14" /><rect x="10" y="10" width="8" height="8" /><line x1="4" y1="10" x2="7" y2="10" /><line x1="4" y1="14" x2="7" y2="14" /><line x1="4" y1="18" x2="7" y2="18" /><line x1="21" y1="10" x2="24" y2="10" /><line x1="21" y1="14" x2="24" y2="14" /><line x1="21" y1="18" x2="24" y2="18" /><line x1="10" y1="4" x2="10" y2="7" /><line x1="14" y1="4" x2="14" y2="7" /><line x1="18" y1="4" x2="18" y2="7" /><line x1="10" y1="21" x2="10" y2="24" /><line x1="14" y1="21" x2="14" y2="24" /><line x1="18" y1="21" x2="18" y2="24" /></svg>),
  Server: () => (<svg width="48" height="48" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="5" width="20" height="6" /><rect x="4" y="13" width="20" height="6" /><rect x="4" y="21" width="20" height="2" /><circle cx="8" cy="8" r="0.8" fill="currentColor" /><circle cx="11" cy="8" r="0.8" fill="currentColor" /><circle cx="8" cy="16" r="0.8" fill="currentColor" /><circle cx="11" cy="16" r="0.8" fill="currentColor" /><line x1="17" y1="8" x2="21" y2="8" /><line x1="17" y1="16" x2="21" y2="16" /></svg>),
  Plant: () => (<svg width="48" height="48" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 24 V12 L8 14 V9 L13 12 V7 L18 11 V14 H25 V24 Z" /><line x1="6" y1="20" x2="6" y2="22" /><line x1="11" y1="18" x2="11" y2="22" /><line x1="16" y1="18" x2="16" y2="22" /><line x1="21" y1="18" x2="21" y2="22" /><line x1="2" y1="24" x2="26" y2="24" /></svg>),
  H2: () => (<svg width="48" height="48" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="14" cy="14" r="10" /><text x="14" y="18" fontSize="11" fontWeight="700" fontFamily="Archivo" textAnchor="middle" fill="currentColor" stroke="none">H₂</text></svg>),
  Check: () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="3,10 8,15 17,4" /></svg>),
}

const fadeInUp = { hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } } }

export default function Industries() {
  const location = useLocation()
  const isMobile = useMobile()

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '')
      setTimeout(() => {
        const el = document.getElementById(id)
        if (el) {
          const y = el.getBoundingClientRect().top + window.pageYOffset - 180
          window.scrollTo({ top: y, behavior: 'smooth' })
        }
      }, 100)
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [location])

  const industries = [
    {
      id: 'semiconductor', icon: <Icon.Chip />, title: 'Semiconductor',
      tagline: 'Ultra-High-Purity Gas Systems for Wafer Fabrication',
      description: 'Construction, Integration and Maintenance of gas process plant for semiconductor manufacturing facilities.',
      capabilities: ['UHP gas distribution piping', 'Tool hook-up and integration', 'Gas panel fabrication and installation', 'VMB and gas cabinet systems', 'Leak testing and qualification', 'Preventive maintenance programs']
    },
    {
      id: 'datacenter', icon: <Icon.Server />, title: 'Data Centres',
      tagline: 'Hydrogen Infrastructure for Next-Gen Power Systems',
      description: 'Hydrogen pipeline infrastructure and gas systems support for data centre energy requirements.',
      capabilities: ['Hydrogen pipeline design and installation', 'Fuel cell integration support', 'Safety system installation', 'Leak detection systems', 'Emergency shutdown integration', 'Compliance and certification']
    },
    {
      id: 'industrial-gas', icon: <Icon.Plant />, title: 'Industrial Gas',
      tagline: 'Full-Scope Mechanical Engineering for Industrial Gas Facilities',
      description: 'Turnkey project engineering, plant integration and maintenance for gas and process plants.',
      capabilities: ['HP tube testing & Certification', 'Preventive Maintenance', 'ISO tube trailer fabrication', 'Shutdown and turnaround support', 'Design & Fabrication of metering skids']
    },
    {
      id: 'new-energy', icon: <Icon.H2 />, title: 'New Energy',
      tagline: 'Tube Trailer Testing and Hydrogen Infrastructure',
      description: 'Hydrogen trailer testing, servicing, refurbishment and certification support.',
      capabilities: ['Hydrostatic and pneumatic testing', 'DOT and ISO recertification', 'Valve and manifold servicing', 'Tube bundle refurbishment', 'Leak testing and repair', 'Fleet management support']
    }
  ]

  return (
    <div>
      {/* Hero */}
      <section style={{ padding: isMobile ? '60px 20px 40px' : '100px 32px 80px', background: '#0F172A', color: '#FFF', borderBottom: '2px solid #DC2626' }}>
        <div style={{ maxWidth: '1360px', margin: '0 auto', textAlign: 'center' }}>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            style={{ fontSize: isMobile ? '36px' : '56px', fontWeight: 900, marginBottom: '24px', lineHeight: 1.1 }}>
            Industries We Serve
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            style={{ fontSize: isMobile ? '16px' : '18px', color: '#94A3B8', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
            Four high-stakes verticals where uptime, purity, and pressure integrity are non-negotiable.
          </motion.p>
        </div>
      </section>

      {/* Sub-nav */}
      <div style={{
        position: 'sticky', top: isMobile ? '70px' : '110px', zIndex: 40,
        background: '#FFF', borderBottom: '2px solid #0F172A',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)', overflowX: 'auto'
      }}>
        <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: isMobile ? 'flex-start' : 'center', minWidth: 'max-content' }}>
          {industries.map((industry) => (
            <a key={industry.id} href={`#${industry.id}`}
              style={{ padding: isMobile ? '16px 20px' : '24px 40px', fontSize: isMobile ? '14px' : '16px', fontWeight: 600, color: '#0F172A', textDecoration: 'none', borderBottom: '3px solid transparent', transition: 'all 0.2s', fontFamily: 'IBM Plex Sans, system-ui, sans-serif', whiteSpace: 'nowrap' }}
              onMouseEnter={(e) => { e.target.style.color = '#DC2626'; e.target.style.borderBottomColor = '#DC2626' }}
              onMouseLeave={(e) => { e.target.style.color = '#0F172A'; e.target.style.borderBottomColor = 'transparent' }}
              onClick={(e) => {
                e.preventDefault()
                const el = document.getElementById(industry.id)
                if (el) { const y = el.getBoundingClientRect().top + window.pageYOffset - 180; window.scrollTo({ top: y, behavior: 'smooth' }) }
              }}>
              {industry.title}
            </a>
          ))}
        </div>
      </div>

      {/* Industry Sections */}
      {industries.map((industry, index) => (
        <motion.section key={industry.id} id={industry.id}
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp}
          style={{ padding: isMobile ? '48px 20px' : '100px 32px', background: index % 2 === 0 ? '#FFF' : '#F8F9FA', borderBottom: '2px solid #0F172A' }}>
          <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr', gap: isMobile ? '32px' : '80px', alignItems: 'start' }}>
              <div>
                <div style={{ width: isMobile ? '80px' : '120px', height: isMobile ? '80px' : '120px', border: '3px solid #0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', color: '#0F172A' }}>
                  {industry.icon}
                </div>
                <h2 style={{ fontSize: isMobile ? '28px' : '42px', fontWeight: 900, marginBottom: '12px', lineHeight: 1.1 }}>{industry.title}</h2>
                <p style={{ fontSize: '15px', color: '#DC2626', fontWeight: 600, marginBottom: '16px' }}>{industry.tagline}</p>
                <p style={{ fontSize: '15px', color: '#64748B', lineHeight: 1.7 }}>{industry.description}</p>
              </div>
              <div>
                <div style={{ padding: isMobile ? '24px' : '48px', background: '#0F172A', color: '#FFF', marginBottom: '24px' }}>
                  <h3 style={{ fontSize: isMobile ? '18px' : '24px', fontWeight: 900, marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#FFF' }}>Our Capabilities</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '16px' }}>
                    {industry.capabilities.map((cap, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'start', gap: '12px', fontSize: isMobile ? '14px' : '17px', color: '#FFF', lineHeight: 1.5 }}>
                        <div style={{ color: '#DC2626', marginTop: '2px', flexShrink: 0 }}><Icon.Check /></div>
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Link to={`/Projects?category=${encodeURIComponent(industry.title)}`}
                  style={{ display: 'inline-block', padding: '14px 24px', background: 'transparent', color: '#0F172A', border: '2px solid #0F172A', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', textDecoration: 'none', transition: 'all 0.3s', cursor: 'pointer' }}
                  onMouseEnter={(e) => { e.target.style.background = '#DC2626'; e.target.style.color = '#FFF'; e.target.style.borderColor = '#DC2626' }}
                  onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#0F172A'; e.target.style.borderColor = '#0F172A' }}>
                  View {industry.title} Projects →
                </Link>
              </div>
            </div>
          </div>
        </motion.section>
      ))}

      {/* CTA */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={fadeInUp}
        style={{ padding: isMobile ? '48px 20px' : '80px 32px', background: '#DC2626', color: '#FFF', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: isMobile ? '28px' : '36px', fontWeight: 800, marginBottom: '24px' }}>Ready to Discuss Your Needs?</h2>
          <Link to="/Contact"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: isMobile ? '14px 28px' : '16px 36px', background: '#FFF', color: '#DC2626', border: '2px solid #FFF', fontWeight: 700, fontSize: '15px', textTransform: 'uppercase', letterSpacing: '0.05em', textDecoration: 'none', cursor: 'pointer', transition: 'all 0.3s' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#0F172A'; e.currentTarget.style.color = '#FFF'; e.currentTarget.style.borderColor = '#0F172A' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#FFF'; e.currentTarget.style.color = '#DC2626'; e.currentTarget.style.borderColor = '#FFF' }}>
            Contact Our Team
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="2"><line x1="0" y1="5" x2="13" y2="5" /><polyline points="9,1 13,5 9,9" /></svg>
          </Link>
        </div>
      </motion.section>
    </div>
  )
}
