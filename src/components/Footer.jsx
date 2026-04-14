// src/components/Footer.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const BEACH = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1800&q=85'

export default function Footer() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <footer>
      {/* CTA beach banner */}
      <div className="footer-cta" ref={ref}>
        <div
          className="footer-cta__bg"
          style={{ backgroundImage: `url(${BEACH})` }}
        />
        <div className="footer-cta__overlay" />

        <motion.h2
          className="footer-cta__brand"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          HotelBeach.
        </motion.h2>

        <Link to="/contact">
          <motion.button
            className="footer-cta__book"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            whileHover={{ scale: 1.06 }}
          >
            Book Your<br />Stay
          </motion.button>
        </Link>
      </div>

      {/* Links grid */}
      <div className="footer-links">
        <div className="footer-links__grid">
          <div>
            <p className="footer-col__label">Pages</p>
            <ul className="footer-col__list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/rooms">Rooms</Link></li>
              <li><Link to="/our-hotel">Services</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <p className="footer-col__label">Explore</p>
            <ul className="footer-col__list">
              <li><Link to="/our-hotel">Our Hotel</Link></li>
              <li><Link to="/rooms">Events</Link></li>
              <li><Link to="/rooms">Restaurant</Link></li>
            </ul>
          </div>
          <div>
            <p className="footer-col__label">Email</p>
            <p className="footer-col__info">info@hotelbeach.com</p>
            <br />
            <p className="footer-col__label">Phone</p>
            <p className="footer-col__info">(603) 555-0123</p>
          </div>
          <div>
            <p className="footer-col__label">Address</p>
            <p className="footer-col__info">3891 Ranchview Dr.<br />Richardson, California<br />62639</p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="footer-bottom__inner">
          <span className="footer-bottom__brand">HotelBeach ℠</span>
          <div className="footer-social">
            <a href="https://x.com" target="_blank" rel="noopener noreferrer">X</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  )
}