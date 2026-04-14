// src/pages/Admin.jsx
import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AdminSidebar from '../components/dashboard/AdminSidebar'
import AdminTopbar from '../components/dashboard/AdminTopbar'
import UsersTable from '../components/dashboard/UsersTable'
import './Admin.css'

const FAKE_CREDENTIALS = { email: 'admin@hotelbeach.com', password: 'admin123' }

function LoginPage({ onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    setTimeout(() => {
      if (form.email === FAKE_CREDENTIALS.email && form.password === FAKE_CREDENTIALS.password) {
        onLogin()
      } else {
        setError('Invalid credentials. Try admin@hotelbeach.com / admin123')
        setLoading(false)
      }
    }, 800)
  }

  return (
    <div className="admin-login">
      <div className="admin-login__bg" />
      <div className="admin-login__overlay" />

      <motion.div
        className="admin-login__card"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="admin-login__brand">
          <span className="divider" style={{ marginBottom: '20px' }} />
          <h1>HotelBeach<span>.</span></h1>
          <p>Admin Portal</p>
        </div>

        <form className="admin-login__form" onSubmit={handleSubmit}>
          <div className="admin-field">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="admin@hotelbeach.com"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              autoComplete="email"
            />
          </div>
          <div className="admin-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              autoComplete="current-password"
            />
          </div>

          <AnimatePresence>
            {error && (
              <motion.p
                className="admin-login__error"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            className="admin-login__btn"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? <span className="admin-login__spinner" /> : 'Sign In'}
          </motion.button>
        </form>

        <p className="admin-login__hint">
          Use <strong>admin@hotelbeach.com</strong> / <strong>admin123</strong>
        </p>
      </motion.div>
    </div>
  )
}

export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('hb_admin') === 'true')
  const [activePage, setActivePage] = useState('users')

  const handleLogin = () => {
    sessionStorage.setItem('hb_admin', 'true')
    setAuthed(true)
  }

  const handleLogout = () => {
    sessionStorage.removeItem('hb_admin')
    setAuthed(false)
  }

  if (!authed) return <LoginPage onLogin={handleLogin} />

  return (
    <motion.div
      className="admin-shell"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AdminSidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="admin-main">
        <AdminTopbar onLogout={handleLogout} />
        <div className="admin-content">
          <AnimatePresence mode="wait">
            {activePage === 'users' && (
              <motion.div
                key="users"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <UsersTable />
              </motion.div>
            )}
            {activePage === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="admin-overview"
              >
                <div className="admin-page-header">
                  <span className="divider" style={{ marginBottom: '16px' }} />
                  <h2 className="admin-page-title">Overview</h2>
                  <p className="admin-page-sub">Welcome back to the HotelBeach admin portal.</p>
                </div>
                <div className="overview-cards">
                  {[
                    { label: 'Registered Users', value: JSON.parse(localStorage.getItem('hb_users') || '[]').length, icon: '◉' },
                    { label: 'Active Bookings', value: 24, icon: '◈' },
                    { label: 'Rooms Available', value: 8, icon: '✦' },
                    { label: 'Monthly Revenue', value: '$48,200', icon: '✧' },
                  ].map((card, i) => (
                    <motion.div
                      key={i}
                      className="overview-card"
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <span className="overview-card__icon">{card.icon}</span>
                      <p className="overview-card__value">{card.value}</p>
                      <p className="overview-card__label">{card.label}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}