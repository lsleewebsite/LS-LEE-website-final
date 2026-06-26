import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useMobile from './hooks/useMobile'

export default function Layout({ currentPageName, children }) {
  const [showIndustriesDropdown, setShowIndustriesDropdown] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const isMobile = useMobile()

  const industries = [
    { id: 'semiconductor', name: 'Semiconductor' },
    { id: 'datacenter', name: 'Data Center' },
    { id: 'industrial-gas', name: 'Industrial Gas & Process' },
    { id: 'hydrogen', name: 'New Energy / Hydrogen' }
  ]

  const navLinks = ['Home', 'About', 'Industries', 'Services', 'Projects', 'Certifications']

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        backgroundColor: '#FFFFFF', borderBottom: '2px solid #0A1628',
        fontFamily: 'IBM Plex Sans, system-ui, sans-serif'
      }}>
        <div style={{
          maxWidth: '1360px', margin: '0 auto',
          padding: isMobile ? '0 20px' : '0 32px',
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', height: isMobile ? '70px' : '110px'
        }}>
          <Link to="/Home" style={{ textDecoration: 'none' }}>
            <img src="/LS-LEE-TECH-1/logo.png" alt="LS Lee Technology"
              style={{ height: isMobile ? '50px' : '80px', width: 'auto', marginLeft: isMobile ? '0' : '-25px' }} />
          </Link>

          {isMobile ? (
            <button onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ display: 'block', width: '24px', height: '2px', background: '#0A1628', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
              <span style={{ display: 'block', width: '24px', height: '2px', background: '#0A1628', transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
              <span style={{ display: 'block', width: '24px', height: '2px', background: '#0A1628', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              <Link to="/Home"
                style={{ textDecoration: 'none', padding: '12px 18px', fontSize: '17px', fontWeight: 600, position: 'relative', color: currentPageName === 'Home' ? '#DC2626' : '#0A1628', transition: 'color 0.15s' }}
                onMouseEnter={(e) => e.target.style.color = '#DC2626'}
                onMouseLeave={(e) => e.target.style.color = currentPageName === 'Home' ? '#DC2626' : '#0A1628'}>
                Home
                {currentPageName === 'Home' && <div style={{ position: 'absolute', left: '18px', right: '18px', bottom: '-35px', height: '2px', background: '#DC2626' }} />}
              </Link>
              <Link to="/About"
                style={{ textDecoration: 'none', padding: '12px 18px', fontSize: '17px', fontWeight: 600, position: 'relative', color: currentPageName === 'About' ? '#DC2626' : '#0A1628', transition: 'color 0.15s' }}
                onMouseEnter={(e) => e.target.style.color = '#DC2626'}
                onMouseLeave={(e) => e.target.style.color = currentPageName === 'About' ? '#DC2626' : '#0A1628'}>
                About
                {currentPageName === 'About' && <div style={{ position: 'absolute', left: '18px', right: '18px', bottom: '-35px', height: '2px', background: '#DC2626' }} />}
              </Link>
              <div style={{ position: 'relative' }}
                onMouseEnter={() => setShowIndustriesDropdown(true)}
                onMouseLeave={() => setShowIndustriesDropdown(false)}>
                <Link to="/Industries"
                  style={{ textDecoration: 'none', padding: '12px 18px', fontSize: '17px', fontWeight: 600, position: 'relative', color: currentPageName === 'Industries' ? '#DC2626' : '#0A1628', transition: 'color 0.15s', display: 'flex', alignItems: 'center', gap: '6px' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#DC2626'}
                  onMouseLeave={(e) => e.currentTarget.style.color = currentPageName === 'Industries' ? '#DC2626' : '#0A1628'}>
                  Industries <span style={{ fontSize: '11px' }}>▼</span>
                  {currentPageName === 'Industries' && <div style={{ position: 'absolute', left: '18px', right: '18px', bottom: '-35px', height: '2px', background: '#DC2626' }} />}
                </Link>
                {showIndustriesDropdown && (
                  <div style={{ position: 'absolute', top: '100%', left: 0, background: '#FFF', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', minWidth: '280px', zIndex: 100 }}>
                    {industries.map((ind, idx) => (
                      <Link key={ind.id} to={`/Industries#${ind.id}`}
                        style={{ display: 'block', padding: '16px 20px', fontSize: '16px', fontWeight: 500, color: '#0A1628', textDecoration: 'none', borderBottom: idx < industries.length - 1 ? '1px solid #E6E8EB' : 'none', transition: 'all 0.15s' }}
                        onMouseEnter={(e) => { e.target.style.background = '#F4F5F7'; e.target.style.color = '#DC2626'; e.target.style.paddingLeft = '28px' }}
                        onMouseLeave={(e) => { e.target.style.background = '#FFF'; e.target.style.color = '#0A1628'; e.target.style.paddingLeft = '20px' }}>
                        {ind.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              {['Services', 'Projects', 'Certifications'].map((item) => (
                <Link key={item} to={`/${item}`}
                  style={{ textDecoration: 'none', padding: '12px 18px', fontSize: '17px', fontWeight: 600, position: 'relative', color: currentPageName === item ? '#DC2626' : '#0A1628', transition: 'color 0.15s' }}
                  onMouseEnter={(e) => e.target.style.color = '#DC2626'}
                  onMouseLeave={(e) => e.target.style.color = currentPageName === item ? '#DC2626' : '#0A1628'}>
                  {item}
                  {currentPageName === item && <div style={{ position: 'absolute', left: '18px', right: '18px', bottom: '-35px', height: '2px', background: '#DC2626' }} />}
                </Link>
              ))}
              <Link to="/Contact">
                <button style={{ padding: '14px 24px', background: '#0A1628', color: '#FFF', border: '2px solid #0A1628', fontWeight: 700, fontSize: '15px', letterSpacing: '0.04em', transition: 'all 0.15s', cursor: 'pointer', marginLeft: '8px', fontFamily: 'IBM Plex Sans, system-ui, sans-serif' }}
                  onMouseEnter={(e) => { e.target.style.background = '#DC2626'; e.target.style.borderColor = '#DC2626' }}
                  onMouseLeave={(e) => { e.target.style.background = '#0A1628'; e.target.style.borderColor = '#0A1628' }}>
                  CONTACT →
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobile && menuOpen && (
          <div style={{
            position: 'fixed', top: '70px', left: 0, right: 0, bottom: 0,
            background: '#0A1628', zIndex: 100, overflowY: 'auto',
            padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: '8px'
          }}>
            {navLinks.map((item) => (
              <Link key={item} to={`/${item}`} onClick={() => setMenuOpen(false)}
                style={{ display: 'block', padding: '16px 0', fontSize: '24px', fontWeight: 700, color: currentPageName === item ? '#DC2626' : '#FFF', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                {item}
              </Link>
            ))}
            <Link to="/Contact" onClick={() => setMenuOpen(false)}
              style={{ marginTop: '24px', display: 'block', padding: '18px 32px', background: '#DC2626', color: '#FFF', textDecoration: 'none', fontWeight: 700, fontSize: '16px', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'center' }}>
              Contact Us →
            </Link>
          </div>
        )}
      </nav>

      <main style={{ flex: 1 }}>{children}</main>

      <footer style={{ backgroundColor: '#FFFFFF', borderTop: '10px solid #0A1628' }}>
        <div style={{
          maxWidth: '1360px', margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr 1fr' : '1.4fr 1fr 1fr 1fr 1fr',
          gap: 0, borderBottom: '2px solid #0A1628'
        }}>
          <div style={{ padding: isMobile ? '32px 20px' : '48px 32px', borderRight: '2px solid #0A1628', gridColumn: isMobile ? '1 / -1' : 'auto' }}>
            <img src="/LS-LEE-TECH-1/logo.png" alt="LS Lee Technology" style={{ height: '50px', width: 'auto' }} />
            <p style={{ fontSize: '13px', color: '#5B6573', lineHeight: 1.6, margin: '12px 0 0' }}>
              Mechanical engineering contractor serving Singapore's gas and process industries since 2003.
            </p>
          </div>
          <div style={{ padding: isMobile ? '24px 20px' : '48px 32px', borderRight: '2px solid #0A1628', borderTop: isMobile ? '2px solid #0A1628' : 'none' }}>
            <h5 style={{ fontFamily: 'IBM Plex Mono', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#5B6573', marginBottom: '16px' }}>Industries</h5>
            {industries.map((ind) => (
              <Link key={ind.id} to={`/Industries#${ind.id}`}
                style={{ display: 'block', padding: '6px 0', fontSize: '13px', fontWeight: 500, textDecoration: 'none', color: '#0A1628', transition: 'color 0.15s' }}
                onMouseEnter={(e) => e.target.style.color = '#DC2626'}
                onMouseLeave={(e) => e.target.style.color = '#0A1628'}>
                {ind.name}
              </Link>
            ))}
          </div>
          <div style={{ padding: isMobile ? '24px 20px' : '48px 32px', borderRight: isMobile ? 'none' : '2px solid #0A1628', borderTop: isMobile ? '2px solid #0A1628' : 'none' }}>
            <h5 style={{ fontFamily: 'IBM Plex Mono', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#5B6573', marginBottom: '16px' }}>Services</h5>
            {[
              { name: 'Project Engineering', id: 'project-engineering' },
              { name: 'Plant Maintenance', id: 'plant-maintenance' },
              { name: 'Servicing & Testing', id: 'servicing-testing' },
              { name: 'Cryogenic Storage & Hoses', id: 'cryogenic-storage' },
              { name: 'Electrical & Instrumentation', id: 'electrical-instrumentation' },
            ].map((s) => (
              <Link key={s.id} to={`/Services?service=${s.id}`}
                style={{ display: 'block', padding: '6px 0', fontSize: '13px', fontWeight: 500, textDecoration: 'none', color: '#0A1628', transition: 'color 0.15s' }}
                onMouseEnter={(e) => e.target.style.color = '#DC2626'}
                onMouseLeave={(e) => e.target.style.color = '#0A1628'}>
                {s.name}
              </Link>
            ))}
          </div>
          {!isMobile && (
            <>
              <div style={{ padding: '48px 32px', borderRight: '2px solid #0A1628' }}>
                <h5 style={{ fontFamily: 'IBM Plex Mono', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#5B6573', marginBottom: '24px' }}>Company</h5>
                {[{ name: 'About', to: '/About' }, { name: 'Projects', to: '/Projects' }].map((item) => (
                  <Link key={item.name} to={item.to}
                    style={{ display: 'block', padding: '8px 0', fontSize: '14px', fontWeight: 500, textDecoration: 'none', color: '#0A1628', transition: 'color 0.15s' }}
                    onMouseEnter={(e) => e.target.style.color = '#DC2626'}
                    onMouseLeave={(e) => e.target.style.color = '#0A1628'}>
                    {item.name}
                  </Link>
                ))}
              </div>
              <div style={{ padding: '48px 32px' }}>
                <h5 style={{ fontFamily: 'IBM Plex Mono', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#5B6573', marginBottom: '24px' }}>Contact</h5>
                <Link to="/Contact"
                  style={{ display: 'block', padding: '8px 0', fontSize: '14px', fontWeight: 500, textDecoration: 'none', color: '#0A1628', transition: 'color 0.15s' }}
                  onMouseEnter={(e) => e.target.style.color = '#DC2626'}
                  onMouseLeave={(e) => e.target.style.color = '#0A1628'}>
                  Start Enquiry
                </Link>
                <Link to="/Contact"
                  style={{ display: 'block', padding: '8px 0', fontSize: '14px', fontWeight: 500, textDecoration: 'none', color: '#0A1628', transition: 'color 0.15s' }}
                  onMouseEnter={(e) => e.target.style.color = '#DC2626'}
                  onMouseLeave={(e) => e.target.style.color = '#0A1628'}>
                  Get in Touch
                </Link>
              </div>
            </>
          )}
        </div>
        <div style={{ background: '#0A1628', color: 'rgba(255,255,255,0.6)', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'IBM Plex Mono', fontSize: '11px', letterSpacing: '0.1em', flexWrap: 'wrap', gap: '8px' }}>
          <span>© 2026 LS LEE TECHNOLOGY PTE. LTD.</span>
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="#" style={{ color: 'rgba(255,255,255,0.6)' }} onMouseEnter={(e) => e.target.style.color = '#DC2626'} onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.6)'}>PRIVACY</a>
            <a href="#" style={{ color: 'rgba(255,255,255,0.6)' }} onMouseEnter={(e) => e.target.style.color = '#DC2626'} onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.6)'}>TERMS</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
