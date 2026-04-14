// src/components/dashboard/AdminTopbar.jsx
import React from 'react'
import { motion } from 'framer-motion'
import './AdminTopbar.css'

export default function AdminTopbar({ onLogout }) {
  const now = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  })

  return (
    <motion.header
      className="admin-topbar"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
    >
      <div className="admin-topbar__left">
        <p className="admin-topbar__date">{now}</p>
      </div>
      <div className="admin-topbar__right">
        <div className="admin-topbar__admin">
          <div className="admin-topbar__avatar">A</div>
          <span className="admin-topbar__name">Administrator</span>
        </div>
        <button className="admin-topbar__logout" onClick={onLogout}>
          Sign Out
        </button>
      </div>
    </motion.header>
  )
}