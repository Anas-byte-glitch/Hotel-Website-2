// src/pages/Rooms.jsx
import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { pageVariants, staggerContainer, staggerChild } from '../hooks/motionVariants'
import './Rooms.css'

const IMG = {
  hero:          'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1800&q=85',
  penthouse:     'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
  presidential:  'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
  deluxe:        'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80',
  standard:      'https://images.unsplash.com/photo-1576354302919-96748cb8299e?w=800&q=80',
}

const ROOMS = [
  { id: 1, name: 'Royal Penthouse',    img: IMG.penthouse,    beds: '3 King Beds',  guests: '6 Person', price: '$1,200', desc: 'Our flagship suite on the top floor — panoramic ocean views, private terrace, butler service, and every conceivable luxury.' },
  { id: 2, name: 'Presidential Suite', img: IMG.presidential, beds: '2 King Beds',  guests: '4 Person', price: '$850',   desc: 'Grand living area, private dining room, marble bathroom, and breathtaking views of the coastline.' },
  { id: 3, name: 'Deluxe Room',        img: IMG.deluxe,       beds: '1 King Bed',   guests: '2 Person', price: '$420',   desc: 'Sophisticated comfort meets refined style. Premium bedding, curated artwork, and a spacious en-suite bathroom.' },
  { id: 4, name: 'Standard Room',      img: IMG.standard,     beds: '1 Queen Bed',  guests: '2 Person', price: '$220',   desc: 'The perfect home-away-from-home — everything you need for a restful, comfortable stay at HotelBeach.' },
]

function BedIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 20V14a2 2 0 012-2h16a2 2 0 012 2v6M2 14V9a2 2 0 012-2h3M22 14V9a2 2 0 00-2-2h-3M7 7h10v5H7zM2 20h20"/>
    </svg>
  )
}
function PersonIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  )
}

function Reveal({ children, delay = 0, variant = 'up', className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const variants = {
    up:   { initial: { opacity: 0, y: 50 }, animate: { opacity: 1, y: 0 } },
    left: { initial: { opacity: 0, x: -50 }, animate: { opacity: 1, x: 0 } },
  }
  return (
    <motion.div ref={ref} className={className}
      variants={variants[variant]} initial="initial"
      animate={inView ? 'animate' : 'initial'}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay }}
    >{children}</motion.div>
  )
}

function ParallaxHero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  return (
    <section className="hero rooms-hero" ref={ref}>
      <motion.div className="hero__bg" style={{ backgroundImage: `url(${IMG.hero})`, y }} />
      <div className="hero__overlay rooms-overlay" />
      <div className="hero__content">
        <motion.span className="hero__eyebrow"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        >Select Your Sanctuary</motion.span>
        <motion.h1 className="hero__title"
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.65 }}
        >Rooms</motion.h1>
      </div>
    </section>
  )
}

export default function Rooms() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <ParallaxHero />

      {/* ── ROOM CARDS ── */}
      <section className="section rooms-grid-section">
        <div className="container">
          <Reveal>
            <span className="divider" style={{ marginBottom: '24px' }} />
            <h2 className="display-title" style={{ marginBottom: '56px' }}>Choose Your Room</h2>
          </Reveal>
          <div className="rooms-grid">
            {ROOMS.map((room, i) => (
              <Reveal key={room.id} delay={i * 0.08} className="room-card">
                {/* Image */}
                <div className="room-card__img-wrap img-wrap">
                  <img src={room.img} alt={room.name} loading="lazy" className="room-card__img" />
                  {/* overlay bar */}
                  <div className="room-card__bar">
                    <h2 className="room-card__name">{room.name}</h2>
                    <div className="room-card__meta">
                      <span><BedIcon /> {room.beds}</span>
                      <span><PersonIcon /> {room.guests}</span>
                    </div>
                  </div>
                </div>
                {/* Body */}
                <div className="room-card__body">
                  <p className="room-card__desc">{room.desc}</p>
                  <div className="room-card__footer">
                    <div className="room-card__price">
                      {room.price} <span>/night</span>
                    </div>
                    <Link to="/contact">
                      <motion.button
                        className="btn btn--outline"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        style={{ padding: '10px 22px', fontSize: '11px' }}
                      >Book Now</motion.button>
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="section section--cream rooms-features">
        <div className="container">
          <Reveal>
            <span className="divider" style={{ marginBottom: '24px' }} />
            <h2 className="display-title" style={{ marginBottom: '14px' }}>All Rooms Include</h2>
            <p className="body-text" style={{ marginBottom: '56px' }}>
              Every room at HotelBeach is curated for comfort, style, and indulgence.
            </p>
          </Reveal>
          <motion.div
            className="rooms-features__grid"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-60px' }}
          >
            {[
              { icon: '☀', label: 'Ocean or Garden View' },
              { icon: '✦', label: 'Premium Bedding' },
              { icon: '◈', label: 'High-Speed WiFi' },
              { icon: '◉', label: '24/7 Room Service' },
              { icon: '◎', label: 'Smart TV & Entertainment' },
              { icon: '✧', label: 'Luxury Bath Amenities' },
            ].map((f, i) => (
              <motion.div key={i} className="feature-pill" variants={staggerChild}
                whileHover={{ y: -5, transition: { type: 'spring', stiffness: 400 } }}
              >
                <span className="feature-pill__icon">{f.icon}</span>
                <p className="feature-pill__label">{f.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}