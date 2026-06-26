import React, { useState } from 'react'
import { motion } from 'framer-motion'
import useMobile from '../hooks/useMobile'

const fadeInUp = { hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } } }
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xdavvrpg'

export default function Contact() {
  const isMobile = useMobile()
  const [formData, setFormData] = useState({ name: '', company: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({})

  const handleChange = (field) => (e) => setFormData(prev => ({ ...prev, [field]: e.target.value }))

  const handlePhoneChange = (e) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 8)
    setFormData(prev => ({ ...prev, phone: digits }))
    setErrors(prev => ({ ...prev, phone: digits.length > 0 && digits.length < 8 ? 'Please enter a valid 8-digit phone number' : '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.phone && formData.phone.replace(/\D/g, '').length !== 8) {
      setErrors(prev => ({ ...prev, phone: 'Please enter a valid 8-digit phone number' }))
      return
    }
    setStatus('sending')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(e.target) })
      if (res.ok) { setStatus('success'); setErrors({}); setFormData({ name: '', company: '', email: '', phone: '', message: '' }) }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  const inputStyle = (hasError) => ({
    width: '100%', boxSizing: 'border-box', padding: '14px 16px',
    border: `2px solid ${hasError ? '#DC2626' : '#E5E7EB'}`,
    fontSize: '14px', fontFamily: 'IBM Plex Sans'
  })

  const labelStyle = {
    display: 'block', fontSize: '12px', fontWeight: 700, color: '#0F172A',
    marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em'
  }

  return (
    <div>
      {/* Hero */}
      <section style={{ padding: isMobile ? '60px 20px 40px' : '100px 32px 80px', background: '#0F172A', color: '#FFF', borderBottom: '2px solid #DC2626' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 style={{ fontSize: isMobile ? '36px' : '56px', fontWeight: 900, marginBottom: '20px', lineHeight: 1.1, fontFamily: 'Archivo, sans-serif' }}>
              Get In <span style={{ color: '#DC2626' }}>Touch</span>
            </h1>
            <p style={{ fontSize: isMobile ? '16px' : '20px', color: '#94A3B8', maxWidth: '800px', lineHeight: 1.7 }}>
              Have a project in mind or need to discuss a maintenance contract? Reach out and our team will get back to you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: isMobile ? '40px 20px' : '100px 32px', background: '#FFF' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '40px' : '80px', alignItems: 'start' }}>

            {/* Contact Info */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeInUp}>
              <h2 style={{ fontSize: isMobile ? '26px' : '36px', fontWeight: 900, marginBottom: '20px', fontFamily: 'Archivo, sans-serif', color: '#0F172A' }}>
                Contact Information
              </h2>
              <div style={{ width: '60px', height: '4px', background: '#DC2626', marginBottom: '28px' }} />
              <div style={{ display: 'flex', gap: '16px', alignItems: 'start', marginBottom: '32px' }}>
                <div style={{ width: '44px', height: '44px', background: '#F8F9FA', border: '2px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#94A3B8', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px', fontFamily: 'IBM Plex Mono' }}>Address</div>
                  <div style={{ fontSize: '15px', color: '#0F172A', lineHeight: 1.6 }}>12 Tech Park Crescent<br />Singapore 638120</div>
                </div>
              </div>
              <div style={{ border: '2px solid #0F172A', overflow: 'hidden', height: isMobile ? '220px' : '320px' }}>
                <iframe
                  title="LS Lee Technology Office Location"
                  width="100%" height="100%"
                  style={{ border: 0, display: 'block' }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps?q=12+Tech+Park+Crescent+Singapore+638120&output=embed"
                />
              </div>
            </motion.div>

            {/* Form */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeInUp}>
              <h2 style={{ fontSize: isMobile ? '26px' : '36px', fontWeight: 900, marginBottom: '20px', fontFamily: 'Archivo, sans-serif', color: '#0F172A' }}>
                Send Us a Message
              </h2>
              <div style={{ width: '60px', height: '4px', background: '#DC2626', marginBottom: '28px' }} />

              {status === 'success' ? (
                <div style={{ padding: '40px', background: '#F0FDF4', border: '2px solid #16A34A', textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: 900, color: '#16A34A', marginBottom: '8px', fontFamily: 'Archivo' }}>Message Sent</div>
                  <p style={{ fontSize: '14px', color: '#475569' }}>Thank you for reaching out. Our team will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={labelStyle}>Name *</label>
                      <input type="text" name="name" required value={formData.name} onChange={handleChange('name')} style={inputStyle(false)} />
                    </div>
                    <div>
                      <label style={labelStyle}>Company</label>
                      <input type="text" name="company" value={formData.company} onChange={handleChange('company')} style={inputStyle(false)} />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={labelStyle}>Email *</label>
                      <input type="email" name="email" required value={formData.email} onChange={handleChange('email')} style={inputStyle(false)} />
                    </div>
                    <div>
                      <label style={labelStyle}>Phone</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handlePhoneChange} placeholder="e.g. 9123 4567" maxLength={9} style={inputStyle(!!errors.phone)} />
                      {errors.phone && <div style={{ color: '#DC2626', fontSize: '12px', marginTop: '6px' }}>{errors.phone}</div>}
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Message *</label>
                    <textarea name="message" required rows={6} value={formData.message} onChange={handleChange('message')} style={{ ...inputStyle(false), resize: 'vertical' }} />
                  </div>

                  {status === 'error' && (
                    <div style={{ padding: '12px 16px', background: '#FEF2F2', border: '2px solid #DC2626', fontSize: '13px', color: '#DC2626' }}>
                      Something went wrong. Please try again.
                    </div>
                  )}

                  <button type="submit" disabled={status === 'sending'}
                    style={{ padding: '16px 32px', background: '#DC2626', color: '#FFF', border: '2px solid #DC2626', fontWeight: 700, fontSize: '15px', textTransform: 'uppercase', letterSpacing: '0.05em', cursor: status === 'sending' ? 'not-allowed' : 'pointer', transition: 'all 0.3s', opacity: status === 'sending' ? 0.7 : 1 }}
                    onMouseEnter={(e) => { if (status !== 'sending') { e.currentTarget.style.background = '#0F172A'; e.currentTarget.style.borderColor = '#0F172A' } }}
                    onMouseLeave={(e) => { if (status !== 'sending') { e.currentTarget.style.background = '#DC2626'; e.currentTarget.style.borderColor = '#DC2626' } }}>
                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
