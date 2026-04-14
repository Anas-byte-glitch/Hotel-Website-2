// src/components/dashboard/AdminSidebar.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './AdminSidebar.css'

const NAV = [
  { id: 'overview', label: 'Overview',  icon: '◉' },
  { id: 'users',    label: 'Users',     icon: '◈' },
]

export default function AdminSidebar({ activePage, setActivePage }) {
  return (
    <motion.aside
      className="admin-sidebar"
      initial={{ x: -260 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Brand */}
      <div className="admin-sidebar__brand">
        <Link to="/" className="admin-sidebar__logo">
          HotelBeach<span>.</span>
        </Link>
        <p className="admin-sidebar__tagline">Admin Portal</p>
      </div>

      <span className="admin-sidebar__divider" />

      {/* Nav */}
      <nav className="admin-sidebar__nav">
        <p className="admin-sidebar__section-label">Navigation</p>
        <ul>
          {NAV.map((item) => (
            <li key={item.id}>
              <button
                className={`admin-sidebar__link ${activePage === item.id ? 'admin-sidebar__link--active' : ''}`}
                onClick={() => setActivePage(item.id)}
              >
                <span className="admin-sidebar__link-icon">{item.icon}</span>
                {item.label}
                {activePage === item.id && (
                  <motion.span
                    className="admin-sidebar__link-bar"
                    layoutId="sidebar-active"
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="admin-sidebar__footer">
        <span className="admin-sidebar__divider" />
        <Link to="/" className="admin-sidebar__back">
          ← Back to Website
        </Link>
      </div>
    </motion.aside>
  )
}