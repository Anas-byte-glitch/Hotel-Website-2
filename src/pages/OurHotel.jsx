// src/pages/OurHotel.jsx
import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { pageVariants, staggerContainer, staggerChild } from '../hooks/motionVariants'
import './OurHotel.css'

const IMG = {
  hero:   'https://images.unsplash.com/photo-1468824357306-a439d58ccb1c?w=1800&q=85',
  pool:   'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=900&q=80',
  ocean:  'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=900&q=80',
  lobby:  'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=900&q=80',
  spa:    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=700&q=80',
  dining: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=80',
  beach:  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700&q=80',
  rooms:  'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=700&q=80',
}

function Reveal({ children, delay = 0, variant = 'up', className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const variants = {
    up:    { initial: { opacity: 0, y: 50 }, animate: { opacity: 1, y: 0 } },
    left:  { initial: { opacity: 0, x: -50 }, animate: { opacity: 1, x: 0 } },
    right: { initial: { opacity: 0, x: 50 }, animate: { opacity: 1, x: 0 } },
  }
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants[variant]}
      initial="initial"
      animate={inView ? 'animate' : 'initial'}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

function ParallaxHero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  return (
    <section className="hero ourhotel-hero" ref={ref}>
      <motion.div className="hero__bg" style={{ backgroundImage: `url(${IMG.hero})`, y }} />
      <div className="hero__overlay" />
      <div className="hero__content">
        <motion.span className="hero__eyebrow"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        >Our Story &amp; Philosophy</motion.span>
        <motion.h1 className="hero__title"
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.65 }}
        >Our Hotel</motion.h1>
      </div>
    </section>
  )
}

export default function OurHotel() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <ParallaxHero />

      {/* ── INTRO ── */}
      <section className="section oh-intro">
        <div className="container">
          <div className="oh-intro__grid">
            <Reveal variant="left">
              <span className="divider" style={{ marginBottom: '28px' }} />
              <h2 className="display-title" style={{ marginBottom: '24px' }}>
                Welcome to<br /><em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>HotelBeach</em>
              </h2>
              <p className="body-text" style={{ maxWidth: '460px', marginBottom: '32px' }}>
                Nestled between pristine shores and lush tropical gardens, HotelBeach is more
                than a destination — it is an experience that redefines what luxury hospitality
                truly means. Every detail has been thoughtfully crafted for your comfort.
              </p>
              <Link to="/rooms">
                <motion.button
                  className="btn btn--outline"
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                >Explore Our Rooms</motion.button>
              </Link>
            </Reveal>
            <Reveal variant="right" className="oh-intro__img img-wrap">
              <img src={IMG.pool} alt="Hotel pool surrounded by palms" loading="lazy" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── QUOTE ── */}
      <section className="section section--cream oh-quote">
        <div className="container">
          <Reveal>
            <blockquote className="oh-quote__text">
              "Our story is one of passion for travel, a love for exceptional destinations,
              and an unwavering commitment to providing you with the ultimate hospitality experience."
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* ── STORY ── */}
      <section className="section oh-story">
        <div className="container">
          <div className="oh-story__grid">
            <Reveal variant="left" className="oh-story__img img-wrap">
              <img src={IMG.ocean} alt="Crystal ocean waters" loading="lazy" />
            </Reveal>
            <Reveal variant="right">
              <span className="divider" style={{ marginBottom: '28px' }} />
              <h2 className="display-title" style={{ marginBottom: '24px' }}>Our Story</h2>
              <p className="body-text" style={{ marginBottom: '20px' }}>
                Our story started decades ago, with a single boutique hotel nestled in a pristine
                coastal town. Over the years, we expanded our footprint, curating a collection of
                exceptional properties in some of the world's most sought-after destinations.
              </p>
              <p className="body-text">
                Along the way, we've welcomed countless travelers, created special moments, and
                built a legacy of warmth and hospitality that has become our defining hallmark.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── AMENITIES ── */}
      <section className="section section--cream oh-amenities">
        <div className="container">
          <Reveal>
            <span className="divider" style={{ marginBottom: '24px' }} />
            <h2 className="display-title" style={{ marginBottom: '14px' }}>Our Amenities</h2>
            <p className="body-text" style={{ marginBottom: '56px' }}>
              Every amenity is designed to elevate your stay into something truly memorable.
            </p>
          </Reveal>
          <motion.div
            className="oh-amenities__grid"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-60px' }}
          >
            {[
              { img: IMG.spa,    title: 'Luxury Spa',    desc: 'Holistic treatments in serene, purpose-built spaces.' },
              { img: IMG.dining, title: 'Fine Dining',   desc: 'Award-winning chefs, farm-to-table ingredients.' },
              { img: IMG.beach,  title: 'Private Beach', desc: 'Exclusive beachfront, turquoise water, white sand.' },
              { img: IMG.pool,   title: 'Infinity Pool', desc: 'Horizon-edge pool blending seamlessly with the sea.' },
            ].map((a, i) => (
              <motion.div key={i} className="amenity-card" variants={staggerChild}>
                <div className="amenity-card__img img-wrap">
                  <img src={a.img} alt={a.title} loading="lazy" />
                </div>
                <h3 className="amenity-card__title">{a.title}</h3>
                <p className="amenity-card__desc">{a.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── VISION ── */}
      <section className="section oh-vision">
        <div className="container">
          <div className="oh-vision__grid">
            <Reveal>
              <span className="divider" style={{ marginBottom: '28px' }} />
              <h2 className="display-title" style={{ marginBottom: '24px' }}>Our Vision</h2>
              <p className="body-text" style={{ marginBottom: '20px' }}>
                At HotelBeach, our vision is to redefine the art of hospitality, setting new
                standards of excellence in the industry. We aspire to be more than just a place
                to stay — a destination in itself.
              </p>
              <p className="body-text">
                We believe in sustainable luxury — preserving the natural beauty that makes each
                of our locations extraordinary, while delivering impeccable service.
              </p>
            </Reveal>
            <Reveal variant="right" className="oh-vision__img img-wrap">
              <img src={IMG.lobby} alt="Hotel lobby" loading="lazy" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="oh-cta">
        <motion.div
          className="oh-cta__bg"
          style={{ backgroundImage: `url(${IMG.ocean})` }}
        />
        <div className="oh-cta__overlay" />
        <div className="oh-cta__inner">
          <Reveal>
            <h2 className="oh-cta__title">Begin Your Story</h2>
            <p className="oh-cta__sub">Every journey to HotelBeach becomes an unforgettable chapter.</p>
            <Link to="/contact">
              <motion.button
                className="btn btn--outline-light"
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              >Book Your Stay</motion.button>
            </Link>
          </Reveal>
        </div>
      </section>
    </motion.div>
  )
}