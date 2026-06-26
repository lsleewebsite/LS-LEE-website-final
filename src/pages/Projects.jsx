import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import useMobile from '../hooks/useMobile'

const NOTION_KEY = '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'
const DATABASE_ID = '37c7a921a23080cfa710e56c146ae5a1'
const PROXY = 'https://corsproxy.io/?'
const INDUSTRIES = ['Semiconductor', 'Data Centres', 'Industrial Gas', 'New Energy']
const SERVICES = ['Project Engineering', 'Plant Maintenance', 'Servicing & Testing', 'Cryogenic Storages & Hoses', 'Electrical & Instrumental']
const PLACEHOLDER_IMAGES = [
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
  'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80',
  'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=800&q=80',
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
  'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?w=800&q=80',
]

function getPlaceholder(id) { return PLACEHOLDER_IMAGES[id.charCodeAt(0) % PLACEHOLDER_IMAGES.length] }

const fadeInUp = { hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } } }

function parseProjects(results) {
  return results.filter(p => p.properties?.Published?.checkbox === true).map(page => {
    const p = page.properties
    const imagesRaw = (p.Images?.rich_text || []).map(rt => rt.text?.content || '').join('')
    const images = imagesRaw.split(',').map(u => u.trim()).filter(u => u.length > 0)
    return {
      id: page.id,
      title: p.Title?.title?.[0]?.text?.content || 'Untitled',
      categories: p.Category?.multi_select?.map(c => c.name) || [],
      year: p.Year?.number || '',
      image: p.Image?.url || null,
      images,
      description: p.Description?.rich_text?.[0]?.text?.content || ''
    }
  })
}

function Modal({ project, onClose, isMobile }) {
  const [currentImage, setCurrentImage] = useState(0)
  const allImages = project.images.length > 0 ? project.images : [project.image || getPlaceholder(project.id)]

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = 'unset' }
  }, [])

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: isMobile ? '16px' : '32px' }}>
        <motion.div initial={{ opacity: 0, y: 40, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 40, scale: 0.95 }} transition={{ duration: 0.3 }} onClick={(e) => e.stopPropagation()}
          style={{ background: '#FFF', width: '100%', maxWidth: '1000px', maxHeight: '90vh', overflow: 'auto', position: 'relative', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr' }}>
          <button onClick={onClose}
            style={{ position: 'absolute', top: '16px', right: '16px', width: '40px', height: '40px', background: '#0F172A', color: '#FFF', border: 'none', fontSize: '24px', cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}
            onMouseEnter={(e) => e.target.style.background = '#DC2626'}
            onMouseLeave={(e) => e.target.style.background = '#0F172A'}>
            ×
          </button>
          <div style={{ position: 'relative', height: isMobile ? '220px' : '560px', background: '#E5E7EB', overflow: 'hidden' }}>
            <img src={allImages[currentImage]} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} onError={(e) => { e.target.src = getPlaceholder(project.id) }} />
            {allImages.length > 1 && (
              <>
                <button onClick={() => setCurrentImage(p => p === 0 ? allImages.length - 1 : p - 1)}
                  style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '36px', height: '36px', background: 'rgba(0,0,0,0.5)', color: '#FFF', border: 'none', fontSize: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5 }}>‹</button>
                <button onClick={() => setCurrentImage(p => p === allImages.length - 1 ? 0 : p + 1)}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', width: '36px', height: '36px', background: 'rgba(0,0,0,0.5)', color: '#FFF', border: 'none', fontSize: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5 }}>›</button>
              </>
            )}
          </div>
          <div style={{ padding: isMobile ? '24px 20px' : '48px 40px', overflowY: 'auto', maxHeight: isMobile ? 'none' : '560px' }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
              {project.categories.map((cat, ci) => (
                <div key={ci} style={{ padding: '4px 10px', background: '#0F172A', color: '#FFF', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', fontFamily: 'IBM Plex Mono' }}>{cat.toUpperCase()}</div>
              ))}
              {project.year && (
                <div style={{ padding: '4px 10px', background: '#F8F9FA', border: '2px solid #E5E7EB', fontSize: '10px', fontWeight: 700, color: '#64748B', fontFamily: 'IBM Plex Mono' }}>{project.year}</div>
              )}
            </div>
            <h2 style={{ fontSize: isMobile ? '22px' : '28px', fontWeight: 900, marginBottom: '16px', lineHeight: 1.2, fontFamily: 'Archivo, sans-serif', color: '#0F172A' }}>{project.title}</h2>
            <div style={{ width: '60px', height: '4px', background: '#DC2626', marginBottom: '20px' }} />
            {project.description && <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.8 }}>{project.description}</p>}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function Projects() {
  const location = useLocation()
  const isMobile = useMobile()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeFilters, setActiveFilters] = useState([])
  const [filterOpen, setFilterOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const cat = params.get('category')
    if (cat) setActiveFilters([cat])
  }, [location.search])

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch(`${PROXY}https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${NOTION_KEY}`, 'Notion-Version': '2022-06-28', 'Content-Type': 'application/json' },
          body: JSON.stringify({ sorts: [{ property: 'Year', direction: 'descending' }] })
        })
        if (!res.ok) throw new Error(`Notion API error: ${res.status}`)
        const data = await res.json()
        setProjects(parseProjects(data.results))
      } catch (err) { setError(err.message) } finally { setLoading(false) }
    }
    fetchProjects()
  }, [])

  const toggleFilter = (v) => setActiveFilters(prev => prev.includes(v) ? prev.filter(f => f !== v) : [...prev, v])
  const clearFilters = () => setActiveFilters([])
  const filtered = activeFilters.length === 0 ? projects : projects.filter(p => activeFilters.some(f => p.categories.includes(f)))

  return (
    <div>
      <section style={{ padding: isMobile ? '60px 20px 40px' : '100px 32px 80px', background: '#0F172A', color: '#FFF', borderBottom: '2px solid #DC2626' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 style={{ fontSize: isMobile ? '36px' : '56px', fontWeight: 900, marginBottom: '28px', lineHeight: 1.1, fontFamily: 'Archivo, sans-serif' }}>
              Our <span style={{ color: '#DC2626' }}>Projects</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section style={{ padding: isMobile ? '16px 20px' : '32px', background: '#FFF', borderBottom: '2px solid #E5E7EB', position: 'sticky', top: isMobile ? '70px' : '110px', zIndex: 30 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'center' }}>
          <div style={{ position: 'relative' }}>
            <button onClick={() => setFilterOpen(!filterOpen)}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: isMobile ? '10px 20px' : '14px 28px', background: activeFilters.length > 0 ? '#DC2626' : '#FFF', color: activeFilters.length > 0 ? '#FFF' : '#0F172A', border: `2px solid ${activeFilters.length > 0 ? '#DC2626' : '#0F172A'}`, fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'IBM Plex Sans, sans-serif' }}>
              {activeFilters.length === 0 ? 'Filter Projects' : `${activeFilters.length} Filter${activeFilters.length > 1 ? 's' : ''} Applied`}
              <span style={{ fontSize: '11px' }}>{filterOpen ? '▲' : '▼'}</span>
            </button>
            {filterOpen && (
              <div style={{ position: 'absolute', top: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)', background: '#FFF', border: '2px solid #0F172A', minWidth: isMobile ? '260px' : '320px', boxShadow: '0 12px 32px rgba(0,0,0,0.15)', zIndex: 50, padding: '20px' }}>
                <div style={{ fontFamily: 'IBM Plex Mono', fontSize: '10px', fontWeight: 700, color: '#94A3B8', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>Industries</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '16px' }}>
                  {INDUSTRIES.map(ind => {
                    const isActive = activeFilters.includes(ind)
                    return (
                      <button key={ind} onClick={() => toggleFilter(ind)}
                        style={{ width: '100%', textAlign: 'left', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '10px', background: isActive ? '#DC2626' : 'transparent', color: isActive ? '#FFF' : '#DC2626', border: 'none', fontWeight: 600, fontSize: '13px', cursor: 'pointer', fontFamily: 'IBM Plex Sans' }}>
                        <span style={{ width: '14px', height: '14px', border: `2px solid ${isActive ? '#FFF' : '#DC2626'}`, background: isActive ? '#FFF' : 'transparent', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {isActive && <span style={{ width: '8px', height: '8px', background: '#DC2626' }} />}
                        </span>
                        {ind}
                      </button>
                    )
                  })}
                </div>
                <div style={{ fontFamily: 'IBM Plex Mono', fontSize: '10px', fontWeight: 700, color: '#94A3B8', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px', paddingTop: '8px', borderTop: '1px solid #E5E7EB' }}>Services</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: activeFilters.length > 0 ? '16px' : '0' }}>
                  {SERVICES.map(svc => {
                    const isActive = activeFilters.includes(svc)
                    return (
                      <button key={svc} onClick={() => toggleFilter(svc)}
                        style={{ width: '100%', textAlign: 'left', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '10px', background: isActive ? '#DC2626' : 'transparent', color: isActive ? '#FFF' : '#DC2626', border: 'none', fontWeight: 600, fontSize: '13px', cursor: 'pointer', fontFamily: 'IBM Plex Sans' }}>
                        <span style={{ width: '14px', height: '14px', border: `2px solid ${isActive ? '#FFF' : '#DC2626'}`, background: isActive ? '#FFF' : 'transparent', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {isActive && <span style={{ width: '8px', height: '8px', background: '#DC2626' }} />}
                        </span>
                        {svc}
                      </button>
                    )
                  })}
                </div>
                {activeFilters.length > 0 && (
                  <button onClick={clearFilters}
                    style={{ width: '100%', padding: '10px 12px', background: '#F8F9FA', border: '2px solid #E5E7EB', fontWeight: 700, fontSize: '12px', color: '#64748B', cursor: 'pointer', fontFamily: 'IBM Plex Sans', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Clear All Filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        {!loading && (
          <div style={{ textAlign: 'center', marginTop: '8px', fontSize: '12px', color: '#64748B', fontFamily: 'IBM Plex Mono' }}>
            {filtered.length} {filtered.length === 1 ? 'project' : 'projects'}
          </div>
        )}
      </section>

      {/* Grid */}
      <section style={{ padding: isMobile ? '32px 16px' : '80px 32px', background: '#F8F9FA', minHeight: '400px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {loading && (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <div style={{ width: '48px', height: '48px', border: '4px solid #E5E7EB', borderTopColor: '#DC2626', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 24px' }} />
              <div style={{ fontFamily: 'IBM Plex Mono', fontSize: '13px', color: '#64748B' }}>Loading projects...</div>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          )}
          {error && <div style={{ textAlign: 'center', padding: '80px 0', fontFamily: 'IBM Plex Mono', fontSize: '13px', color: '#DC2626' }}>Failed to load projects</div>}
          {!loading && !error && filtered.length === 0 && <div style={{ textAlign: 'center', padding: '80px 0', fontFamily: 'IBM Plex Mono', fontSize: '13px', color: '#64748B' }}>No projects found</div>}
          {!loading && !error && filtered.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(320px, 1fr))', gap: isMobile ? '20px' : '32px' }}>
              {filtered.map((project, i) => (
                <motion.div key={project.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.05 }}
                  onClick={() => setSelectedProject(project)}
                  style={{ background: '#FFF', border: '2px solid #0F172A', overflow: 'hidden', transition: 'all 0.3s', cursor: 'pointer' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#DC2626'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#0F172A'; e.currentTarget.style.transform = 'translateY(0)' }}>
                  <div style={{ height: isMobile ? '180px' : '220px', overflow: 'hidden', borderBottom: '2px solid #0F172A' }}>
                    <img src={project.image || getPlaceholder(project.id)} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} onError={(e) => { e.target.src = getPlaceholder(project.id) }} />
                  </div>
                  <div style={{ padding: isMobile ? '16px' : '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px', gap: '8px' }}>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {project.categories.map((cat, ci) => (
                          <div key={ci} style={{ padding: '3px 8px', background: '#0F172A', color: '#FFF', fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em', fontFamily: 'IBM Plex Mono' }}>{cat.toUpperCase()}</div>
                        ))}
                      </div>
                      {project.year && <div style={{ fontSize: '12px', color: '#64748B', fontFamily: 'IBM Plex Mono', flexShrink: 0 }}>{project.year}</div>}
                    </div>
                    <h3 style={{ fontSize: isMobile ? '16px' : '20px', fontWeight: 900, lineHeight: 1.2, fontFamily: 'Archivo, sans-serif', color: '#0F172A' }}>{project.title}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedProject && <Modal project={selectedProject} onClose={() => setSelectedProject(null)} isMobile={isMobile} />}

      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={fadeInUp}
        style={{ padding: isMobile ? '48px 20px' : '100px 32px', background: '#DC2626', color: '#FFF', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: isMobile ? '28px' : '42px', fontWeight: 900, marginBottom: '24px', lineHeight: 1.2, fontFamily: 'Archivo' }}>Ready to Start Your Project?</h2>
          <a href="#/Contact"
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
