// src/components/dashboard/UsersTable.jsx
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './UsersTable.css'

// Seed some demo users if localStorage is empty
function seedUsers() {
  const existing = localStorage.getItem('hb_users')
  if (!existing) {
    const demo = [
      { id: '1', name: 'Sophie Beaumont',  email: 'sophie@example.com',   registeredAt: '2025-11-03T08:22:00Z' },
      { id: '2', name: 'James Whitfield',  email: 'jwhit@example.com',    registeredAt: '2025-11-14T14:05:00Z' },
      { id: '3', name: 'Amira Osei',       email: 'amira.o@example.com',  registeredAt: '2025-12-01T09:48:00Z' },
      { id: '4', name: 'Luca De Rossi',    email: 'luca@example.com',     registeredAt: '2026-01-07T17:30:00Z' },
      { id: '5', name: 'Mei Lin Zhang',    email: 'meilin@example.com',   registeredAt: '2026-01-22T11:15:00Z' },
      { id: '6', name: 'Carlos Navarro',   email: 'cnavarro@example.com', registeredAt: '2026-02-10T16:00:00Z' },
    ]
    localStorage.setItem('hb_users', JSON.stringify(demo))
    return demo
  }
  return JSON.parse(existing)
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  })
}

export default function UsersTable() {
  const [users, setUsers] = useState(() => seedUsers())
  const [search, setSearch] = useState('')
  const [toDelete, setToDelete] = useState(null)

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  const confirmDelete = (id) => setToDelete(id)

  const handleDelete = () => {
    const updated = users.filter(u => u.id !== toDelete)
    setUsers(updated)
    localStorage.setItem('hb_users', JSON.stringify(updated))
    setToDelete(null)
  }

  return (
    <div className="users-section">
      {/* Header */}
      <div className="admin-page-header">
        <span className="divider" style={{ marginBottom: '16px' }} />
        <h2 className="admin-page-title">Registered Users</h2>
        <p className="admin-page-sub">{users.length} total users — manage and review below.</p>
      </div>

      {/* Toolbar */}
      <div className="users-toolbar">
        <div className="users-search">
          <span className="users-search__icon">⌕</span>
          <input
            type="text"
            placeholder="Search by name or email…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button className="users-search__clear" onClick={() => setSearch('')}>✕</button>
          )}
        </div>
        <p className="users-count">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</p>
      </div>

      {/* Table */}
      <div className="users-table-wrap">
        <table className="users-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Registered</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '48px', color: 'var(--ink-light)', fontSize: '14px' }}>
                    No users match your search.
                  </td>
                </tr>
              ) : (
                filtered.map((user, i) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                    className="users-table__row"
                  >
                    <td className="users-table__num">{i + 1}</td>
                    <td className="users-table__name">
                      <div className="users-table__avatar">
                        {user.name.charAt(0)}
                      </div>
                      {user.name}
                    </td>
                    <td className="users-table__email">{user.email}</td>
                    <td className="users-table__date">{formatDate(user.registeredAt)}</td>
                    <td className="users-table__actions">
                      <button
                        className="users-table__delete"
                        onClick={() => confirmDelete(user.id)}
                        title="Delete user"
                      >
                        Delete
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Delete Confirm Modal */}
      <AnimatePresence>
        {toDelete && (
          <motion.div
            className="users-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setToDelete(null)}
          >
            <motion.div
              className="users-modal"
              initial={{ opacity: 0, scale: 0.93, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={e => e.stopPropagation()}
            >
              <span className="divider" style={{ marginBottom: '20px' }} />
              <h3>Remove User</h3>
              <p>Are you sure you want to delete this user? This action cannot be undone.</p>
              <div className="users-modal__actions">
                <button className="users-modal__cancel" onClick={() => setToDelete(null)}>
                  Cancel
                </button>
                <button className="users-modal__confirm" onClick={handleDelete}>
                  Delete User
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}