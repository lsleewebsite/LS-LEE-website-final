import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation, Link } from 'react-router-dom'
import useMobile from '../hooks/useMobile'

const Icon = {
  Wrench: (p) => (<svg width="40" height="40" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2" {...p}><path d="M20 4 L24 8 L20 12 L18 10 L14 14 L18 18 L22 14 L24 16 L20 20 L24 24" /><path d="M14 14 L4 24" /><circle cx="4.5" cy="23.5" r="1.2" /></svg>),
  Lego: (p) => (<svg width="40" height="40" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2" {...p}><rect x="2" y="17" width="16" height="9" /><rect x="4" y="13" width="4" height="4" /><rect x="10" y="8" width="16" height="9" /><rect x="12" y="4" width="4" height="4" /><rect x="19" y="4" width="4" height="4" /></svg>),
  Gauge: (p) => (<svg width="40" height="40" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2" {...p}><path d="M4 18 A10 10 0 0 1 24 18" /><line x1="4" y1="18" x2="24" y2="18" /><line x1="14" y1="18" x2="20" y2="11" strokeWidth="2.5" /><circle cx="14" cy="18" r="1.5" fill="currentColor" /><line x1="7" y1="14" x2="8.5" y2="15" /><line x1="14" y1="9" x2="14" y2="11" /><line x1="21" y1="14" x2="19.5" y2="15" /></svg>),
  Trailer: (p) => (<svg width="40" height="40" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2" {...p}><rect x="2" y="10" width="18" height="8" rx="0" /><circle cx="20" cy="22" r="2.5" /><circle cx="7" cy="22" r="2.5" /><line x1="2" y1="20" x2="4.5" y2="20" /><line x1="9.5" y1="20" x2="17.5" y2="20" /><line x1="22.5" y1="20" x2="26" y2="20" /><line x1="6" y1="13" x2="6" y2="15" /><line x1="10" y1="13" x2="10" y2="15" /><line x1="14" y1="13" x2="14" y2="15" /></svg>),
  Snow: (p) => (<svg width="40" height="40" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2" {...p}><line x1="14" y1="3" x2="14" y2="25" /><line x1="3" y1="14" x2="25" y2="14" /><line x1="6" y1="6" x2="22" y2="22" /><line x1="22" y1="6" x2="6" y2="22" /><circle cx="14" cy="14" r="2" /></svg>),
  Bolt: (p) => (<svg width="40" height="40" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2" {...p}><polygon points="16,3 7,16 13,16 11,25 21,12 15,12" strokeLinejoin="round" /></svg>),
  Arrow: (p) => (<svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="2" {...p}><line x1="0" y1="5" x2="13" y2="5" /><polyline points="9,1 13,5 9,9" /></svg>),
  Check: (p) => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" {...p}><polyline points="3,10 8,15 17,4" /></svg>),
  Cube: (p) => (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><polygon points="12,3 21,8 21,16 12,21 3,16 3,8" /><polyline points="3,8 12,13 21,8" /><line x1="12" y1="13" x2="12" y2="21" /></svg>),
  Spark: (p) => (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="12" y1="2" x2="12" y2="8" /><line x1="12" y1="16" x2="12" y2="22" /><line x1="2" y1="12" x2="8" y2="12" /><line x1="16" y1="12" x2="22" y2="12" /><line x1="5" y1="5" x2="9" y2="9" /><line x1="15" y1="15" x2="19" y2="19" /><line x1="5" y1="19" x2="9" y2="15" /><line x1="15" y1="9" x2="19" y2="5" /></svg>),
  Pipe: (p) => (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="2" y1="9" x2="22" y2="9" /><line x1="2" y1="14" x2="22" y2="14" /><line x1="6" y1="7" x2="6" y2="16" /><line x1="18" y1="7" x2="18" y2="16" /><line x1="1" y1="20" x2="23" y2="20" strokeDasharray="2.5 2.5" /></svg>),
  Beam: (p) => (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="5" y1="4" x2="19" y2="4" /><line x1="5" y1="20" x2="19" y2="20" /><line x1="12" y1="4" x2="12" y2="20" /></svg>),
  Skid: (p) => (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="4" width="18" height="16" rx="1" /><circle cx="12" cy="13" r="4.5" /><line x1="12" y1="13" x2="14.5" y2="10.2" /><line x1="9" y1="7" x2="9" y2="4" /><line x1="15" y1="7" x2="15" y2="4" /></svg>),
  Install: (p) => (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="5" y="9" width="14" height="11" rx="1" /><polyline points="9,14 11.3,16.3 15.5,11.5" /><line x1="12" y1="1.5" x2="12" y2="6.5" /><polyline points="9,4 12,1.5 15,4" /></svg>),
  Calendar: (p) => (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="5" width="18" height="16" rx="1" /><line x1="3" y1="10" x2="21" y2="10" /><line x1="7" y1="2" x2="7" y2="6" /><line x1="17" y1="2" x2="17" y2="6" /><polyline points="8,15 11,18 16,12" /></svg>),
  PowerOff: (p) => (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="12" y1="3" x2="12" y2="11" /><path d="M7 6.5 A8 8 0 1 0 17 6.5" /></svg>),
  Alert: (p) => (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3 L22 20 L2 20 Z" /><line x1="12" y1="9" x2="12" y2="14" /><circle cx="12" cy="17" r="0.6" fill="currentColor" stroke="none" /></svg>),
  Rotate: (p) => (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 12 A8 8 0 0 1 18.5 6.5" /><polyline points="18,2 18.5,6.5 14,7" /><path d="M20 12 A8 8 0 0 1 5.5 17.5" /><polyline points="6,22 5.5,17.5 10,17" /></svg>),
  Pressure: (p) => (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 19 A9 9 0 0 1 19 19" /><line x1="5" y1="19" x2="19" y2="19" /><line x1="12" y1="19" x2="16.5" y2="11.5" strokeWidth="2.4" /><circle cx="12" cy="19" r="1.3" fill="currentColor" stroke="none" /><line x1="8" y1="14" x2="9.3" y2="15.3" /><line x1="16" y1="14" x2="14.7" y2="15.3" /></svg>),
  Seal: (p) => (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="9" r="6.5" /><polyline points="9,9 11,11.3 15.3,6.5" /><path d="M8 14.5 L6 21.5 L12 18.5 L18 21.5 L16 14.5" /></svg>),
  TubeBundle: (p) => (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="8" cy="9" r="3" /><circle cx="16" cy="9" r="3" /><circle cx="8" cy="17" r="3" /><circle cx="16" cy="17" r="3" /></svg>),
  Hose: (p) => (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 17 C3 17 3 7 9 7 C15 7 15 17 21 17" /><circle cx="3" cy="17" r="1.7" /><circle cx="21" cy="17" r="1.7" /></svg>),
  VacuumLine: (p) => (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="2" y1="9" x2="22" y2="9" /><line x1="2" y1="15" x2="22" y2="15" /><line x1="2" y1="6" x2="22" y2="6" strokeDasharray="1.5 2" opacity="0.45" /><line x1="2" y1="18" x2="22" y2="18" strokeDasharray="1.5 2" opacity="0.45" /></svg>),
  Fitting: (p) => (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="2" y="9" width="6" height="6" /><rect x="16" y="9" width="6" height="6" /><line x1="8" y1="12" x2="11" y2="12" /><line x1="13" y1="12" x2="16" y2="12" /><circle cx="12" cy="12" r="1.6" /></svg>),
  Swap: (p) => (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 8 H16" /><polyline points="13,4 17,8 13,12" /><path d="M20 16 H8" /><polyline points="11,20 7,16 11,12" /></svg>),
  Panel: (p) => (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="2" width="18" height="20" rx="1" /><circle cx="8" cy="8" r="1.8" /><circle cx="16" cy="8" r="1.8" /><line x1="6" y1="14" x2="18" y2="14" /><line x1="6" y1="18" x2="18" y2="18" /></svg>),
  Dial: (p) => (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="9" /><line x1="12" y1="12" x2="16" y2="7.5" /><circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none" /><line x1="12" y1="4.3" x2="12" y2="6" /><line x1="19.7" y1="12" x2="18" y2="12" /></svg>),
  Chip: (p) => (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="7" y="7" width="10" height="10" rx="1" /><rect x="10" y="10" width="4" height="4" /><line x1="9" y1="2" x2="9" y2="7" /><line x1="15" y1="2" x2="15" y2="7" /><line x1="9" y1="17" x2="9" y2="22" /><line x1="15" y1="17" x2="15" y2="22" /><line x1="2" y1="9" x2="7" y2="9" /><line x1="2" y1="15" x2="7" y2="15" /><line x1="17" y1="9" x2="22" y2="9" /><line x1="17" y1="15" x2="22" y2="15" /></svg>),
  Loop: (p) => (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M8 6 H14 A6 6 0 1 1 14 18 H8 A6 6 0 1 1 8 6 Z" /><polyline points="12,3.3 15.3,6 12,8.7" /></svg>),
  Cable: (p) => (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="2" y1="6" x2="22" y2="6" /><line x1="2" y1="18" x2="22" y2="18" /><line x1="5" y1="6" x2="5" y2="18" /><line x1="10" y1="6" x2="10" y2="18" /><line x1="14" y1="6" x2="14" y2="18" /><line x1="19" y1="6" x2="19" y2="18" /></svg>),
  Hazard: (p) => (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 2 L22 20 L2 20 Z" /><text x="12" y="17.3" fontSize="8" fontWeight="700" textAnchor="middle" fill="currentColor" stroke="none" fontFamily="Archivo, sans-serif">Ex</text></svg>),
}

const services = [
  {
    id: 'project-engineering', num: '01', icon: <Icon.Lego />,
    title: 'Project Engineering', description: 'Complete project lifecycle management from engineering through commissioning.',
    capabilities: [
      { icon: Icon.Cube, name: 'Process Plant Installation and Integration' },
      { icon: Icon.Spark, name: 'Platform and Structures' },
      { icon: Icon.Pipe, name: 'Equipment Installation & Commissioning' },
      { icon: Icon.Beam, name: 'Pipeline Network Fabrication and Commissioning' },
      { icon: Icon.Skid, name: 'Underground Piping Network & Metering Systems' },
      { icon: Icon.Install, name: 'Cryogenic Network and Insulation' },
    ]
  },
  {
    id: 'plant-maintenance', num: '02', icon: <Icon.Gauge />,
    title: 'Plant Maintenance', description: 'Comprehensive maintenance programs to maximize uptime and asset life.',
    capabilities: [
      { icon: Icon.Calendar, name: 'Preventive Maintenance Program' },
      { icon: Icon.PowerOff, name: 'Shutdown Planning and Emergency Repairs' },
      { icon: Icon.Alert, name: 'Addition and Alteration Works' },
      { icon: Icon.Rotate, name: 'Pipeline Network Inspection, Protection & Testing' },
    ]
  },
  {
    id: 'servicing-testing', num: '03', icon: <Icon.Trailer />,
    title: 'Servicing & Testing', description: 'Specialised testing and certification for high pressure tube trailers.',
    capabilities: [
      { icon: Icon.Pressure, name: 'High Pressure Hydrostatic Testing' },
      { icon: Icon.Seal, name: 'Non-Destructive Testing (NDT)' },
      { icon: Icon.TubeBundle, name: 'ISO Tube Skid and Bundle Fabrication' },
      { icon: Icon.Check, name: 'Inspection and Testing' },
      { icon: Icon.Seal, name: 'PE Endorsement' },
      { icon: Icon.Check, name: 'Valve & Manifold Fabrication and Testing' },
    ]
  },
  {
    id: 'cryogenic-storage', num: '04', icon: <Icon.Snow />,
    title: 'Cryogenic Storage & Hoses', filterKey: 'Cryogenic Storages & Hoses',
    description: 'Custom fabrication and maintenance for cryogenic applications.',
    capabilities: [
      { icon: Icon.Hose, name: 'Cryogenic Hose Fabrication and Repair' },
      { icon: Icon.VacuumLine, name: 'Vacuum-Insulated Lines' },
      { icon: Icon.Fitting, name: 'Testing and Certification' },
      { icon: Icon.Swap, name: 'Emergency Replacement' },
    ]
  },
  {
    id: 'electrical-instrumentation', num: '05', icon: <Icon.Bolt />,
    title: 'Electrical & Instrumentation', filterKey: 'Electrical & Instrumental',
    description: 'Instrumentation, controls and electrical installation for process plants.',
    capabilities: [
      { icon: Icon.Panel, name: 'Engineering, installation and maintenance services' },
      { icon: Icon.Dial, name: 'Supply of process instruments and field products' },
      { icon: Icon.Chip, name: 'Field and Bench Calibration Services' },
      { icon: Icon.Loop, name: 'Emergency On-Call Services' },
      { icon: Icon.Cable, name: 'Plant E&I Maintenance Program' },
    ]
  }
]

const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } }

export default function Services() {
  const location = useLocation()
  const isMobile = useMobile()
  const [selectedId, setSelectedId] = useState('project-engineering')

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const serviceParam = params.get('service')
    const hashId = location.hash ? location.hash.replace('#', '') : null
    let targetId = 'project-engineering'
    let hasDeepLink = false
    if (serviceParam && services.some((s) => s.id === serviceParam)) { targetId = serviceParam; hasDeepLink = true }
    else if (hashId && services.some((s) => s.id === hashId)) { targetId = hashId; hasDeepLink = true }
    setSelectedId(targetId)
    if (hasDeepLink) {
      setTimeout(() => {
        const el = document.getElementById('services-panel')
        if (el) { const y = el.getBoundingClientRect().top + window.pageYOffset - 140; window.scrollTo({ top: y, behavior: 'smooth' }) }
      }, 100)
    } else { window.scrollTo({ top: 0, behavior: 'smooth' }) }
  }, [location])

  const selectedIndex = Math.max(0, services.findIndex((s) => s.id === selectedId))
  const service = services[selectedIndex]

  return (
    <div>
      <section style={{ padding: isMobile ? '60px 20px 40px' : '100px 32px 80px', background: '#0F172A', color: '#FFF', borderBottom: '2px solid #DC2626' }}>
        <div style={{ maxWidth: '1360px', margin: '0 auto', textAlign: 'center' }}>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            style={{ fontSize: isMobile ? '36px' : '56px', fontWeight: 900, marginBottom: '24px', lineHeight: 1.1, fontFamily: 'Archivo, sans-serif' }}>
            Engineering Services
          </motion.h1>
        </div>
      </section>

      <section id="services-panel" style={{ padding: isMobile ? '24px 16px' : '80px 32px', background: '#F8F9FA' }}>
        <div style={{
          maxWidth: '1200px', margin: '0 auto',
          display: 'flex', flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'stretch', gap: isMobile ? '0' : '40px',
          height: isMobile ? 'auto' : '700px'
        }}>
          {/* Sidebar / Tab bar */}
          <div style={{
            position: 'relative',
            width: isMobile ? '100%' : '420px',
            flexShrink: 0,
            background: '#FFF',
            border: '2px solid #E5E7EB',
            overflow: 'hidden'
          }}>
            {!isMobile && (
              <div style={{
                position: 'absolute', left: 0, right: 0,
                top: `${selectedIndex * 20}%`, height: '20%',
                background: 'rgba(220,38,38,0.06)', border: '2px solid #DC2626',
                transition: 'top 0.4s cubic-bezier(0.4,0,0.2,1)',
                pointerEvents: 'none', zIndex: 0, boxSizing: 'border-box'
              }} />
            )}
            <div style={{
              position: 'relative', zIndex: 1,
              display: 'flex',
              flexDirection: isMobile ? 'row' : 'column',
              height: isMobile ? 'auto' : '100%',
              overflowX: isMobile ? 'auto' : 'visible'
            }}>
              {services.map((s, i) => {
                const isActive = s.id === selectedId
                return (
                  <button key={s.id} onClick={() => setSelectedId(s.id)}
                    style={{
                      flex: isMobile ? '0 0 auto' : 1,
                      display: 'flex',
                      flexDirection: isMobile ? 'column' : 'row',
                      alignItems: 'center',
                      gap: isMobile ? '6px' : '20px',
                      padding: isMobile ? '12px 16px' : '0 32px',
                      background: isMobile && isActive ? 'rgba(220,38,38,0.06)' : 'transparent',
                      border: 'none',
                      borderBottom: isMobile ? 'none' : (i < services.length - 1 ? '1px solid #E5E7EB' : 'none'),
                      borderRight: isMobile ? (i < services.length - 1 ? '1px solid #E5E7EB' : 'none') : 'none',
                      borderTop: isMobile && isActive ? '3px solid #DC2626' : (isMobile ? '3px solid transparent' : 'none'),
                      textAlign: isMobile ? 'center' : 'left',
                      cursor: 'pointer', fontFamily: 'inherit',
                      minWidth: isMobile ? '72px' : 'auto'
                    }}>
                    <div style={{ color: isActive ? '#DC2626' : '#94A3B8', flexShrink: 0, transition: 'color 0.3s' }}>
                      {React.cloneElement(s.icon, { width: isMobile ? 24 : 40, height: isMobile ? 24 : 40 })}
                    </div>
                    {!isMobile && (
                      <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '22px', fontWeight: 700, color: isActive ? '#DC2626' : '#CBD5E1', width: '28px', flexShrink: 0 }}>
                        {s.num}
                      </span>
                    )}
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 800, fontSize: isMobile ? '10px' : '17px', lineHeight: 1.25, color: isActive ? '#0F172A' : '#64748B', transition: 'color 0.3s' }}>
                        {isMobile ? s.title.split(' ')[0] : s.title}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Content */}
          <div style={{ flex: 1 }}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={service.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                style={{
                  height: isMobile ? 'auto' : '100%',
                  background: '#FFF', border: '2px solid #E5E7EB',
                  padding: isMobile ? '24px 20px' : '56px',
                  boxSizing: 'border-box', display: 'flex', flexDirection: 'column',
                  overflowY: isMobile ? 'visible' : 'auto'
                }}>
                <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '12px', color: '#94A3B8', marginBottom: '8px' }}>{service.num} / 05</div>
                <h2 style={{ fontFamily: 'Archivo, sans-serif', fontSize: isMobile ? '26px' : '40px', fontWeight: 900, color: '#0F172A', marginBottom: '10px', lineHeight: 1.15 }}>
                  {service.title}
                </h2>
                <p style={{ fontSize: isMobile ? '15px' : '18px', color: '#475569', lineHeight: 1.8, marginBottom: '24px' }}>{service.description}</p>
                <div style={{ padding: isMobile ? '20px' : '28px', background: '#0F172A', marginBottom: '24px' }}>
                  <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#FFF', marginBottom: '16px' }}>Key Services</div>
                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '12px' }}>
                    {service.capabilities.map((cap, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: isMobile ? '13px' : '16px', color: '#FFF', lineHeight: 1.4 }}>
                        <div style={{ color: '#DC2626', flexShrink: 0 }}><Icon.Check /></div>
                        <span>{cap.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Link to={`/Projects?category=${encodeURIComponent(service.filterKey || service.title)}`}
                  style={{ marginTop: isMobile ? '0' : 'auto', display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '14px 28px', background: 'transparent', color: '#0F172A', border: '2px solid #0F172A', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', textDecoration: 'none', transition: 'all 0.3s', cursor: 'pointer', width: 'fit-content' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#DC2626'; e.currentTarget.style.color = '#FFF'; e.currentTarget.style.borderColor = '#DC2626' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#0F172A'; e.currentTarget.style.borderColor = '#0F172A' }}>
                  View Related Projects <Icon.Arrow />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={fadeInUp}
        style={{ padding: isMobile ? '48px 20px' : '80px 32px', background: '#DC2626', color: '#FFF', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: isMobile ? '28px' : '36px', fontWeight: 800, marginBottom: '24px', fontFamily: 'Archivo, sans-serif' }}>Tell Us About Your Needs</h2>
          <Link to="/Contact"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: isMobile ? '14px 28px' : '16px 36px', background: '#FFF', color: '#DC2626', border: '2px solid #FFF', fontWeight: 700, fontSize: '15px', textTransform: 'uppercase', letterSpacing: '0.05em', textDecoration: 'none', cursor: 'pointer', transition: 'all 0.3s' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#0F172A'; e.currentTarget.style.color = '#FFF'; e.currentTarget.style.borderColor = '#0F172A' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#FFF'; e.currentTarget.style.color = '#DC2626'; e.currentTarget.style.borderColor = '#FFF' }}>
            Contact Us <Icon.Arrow />
          </Link>
        </div>
      </motion.section>
    </div>
  )
}
