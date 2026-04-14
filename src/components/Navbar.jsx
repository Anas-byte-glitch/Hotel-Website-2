// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import './Navbar.css'

const LINKS = [
  { to: '/',          label: 'Home',      end: true },
  { to: '/our-hotel', label: 'Our Hotel', end: false },
  { to: '/rooms',     label: 'Rooms',     end: false },
  { to: '/contact',   label: 'Contact',   end: false },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isAdminLogged, setIsAdminLogged] = useState(false)

  const location = useLocation()

  // Detect scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 55)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => { 
    setMenuOpen(false) 
  }, [location.pathname])

  // ✅ Check admin session
  useEffect(() => {
    const adminSession = sessionStorage.getItem('admin_logged')
    setIsAdminLogged(adminSession === 'true')
  }, [location.pathname])

  return (
    <>
      <motion.nav
        className={`nav ${scrolled ? 'nav--solid' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        <div className="nav__inner">
          {/* Logo */}
          <Link to="/" className="nav__logo">HotelBeach.</Link>

          {/* Desktop links */}
          <ul className="nav__links">
            {LINKS.map(({ to, label, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `nav__link${isActive ? ' nav__link--active' : ''}`
                  }
                >
                  {label}
                  <span className="nav__link-dot" />
                </NavLink>
              </li>
            ))}

            {/* ✅ Dashboard link يظهر فقط إذا الأدمن مسجل */}
            {isAdminLogged && (
              <li>
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    `nav__link${isActive ? ' nav__link--active' : ''}`
                  }
                >
                  Dashboard
                  <span className="nav__link-dot" />
                </NavLink>
              </li>
            )}
          </ul>

          {/* Right side */}
          <div className="nav__right">
            <Link to="/contact" className="nav__cta">Book Now</Link>
            <button
              className={`nav__burger ${menuOpen ? 'nav__burger--open' : ''}`}
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="nav__mobile"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="nav__mobile-list">
              {LINKS.map(({ to, label }, i) => (
                <motion.li
                  key={to}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link to={to} className="nav__mobile-link">{label}</Link>
                </motion.li>
              ))}

              {/* ✅ Dashboard للموبايل */}
              {isAdminLogged && (
                <motion.li
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <Link to="/admin" className="nav__mobile-link">
                    Dashboard
                  </Link>
                </motion.li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}