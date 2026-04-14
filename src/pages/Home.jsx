// src/pages/Home.jsx
import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  motion, useInView, useScroll, useTransform, AnimatePresence
} from 'framer-motion'
import { pageVariants, staggerContainer, staggerChild, fadeUp, fadeLeft, fadeRight, imageReveal } from '../hooks/motionVariants'
import './Home.css'

/* ── Images ── */
const IMG = {
  hero:       'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1800&q=85',
  about1:     'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=700&q=80',
  about2:     'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=700&q=80',
  story:      'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=900&q=80',
  vision:     'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=900&q=80',
  venice:     'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
  promenade:  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80',
  restaurant: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
}

const FAQS = [
  { q: 'How can I make a reservation?', a: 'Reserve directly through our website, by phone, or via email. We also accept bookings on major third-party platforms.' },
  { q: 'What is your cancellation policy?', a: 'Free cancellation up to 48 hours before check-in. Late cancellations are subject to one night\'s charge.' },
  { q: 'What amenities are included?', a: 'All stays include beach access, pool, spa facilities, high-speed WiFi, and complimentary breakfast.' },
  { q: 'Do you offer room service?', a: 'Yes — 24/7 in-room dining is available for all room categories.' },
  { q: 'What room types do you offer?', a: 'We offer Standard, Deluxe, Presidential Suite, and our flagship Royal Penthouse.' },
  { q: 'Smoking or non-smoking rooms?', a: 'All indoor spaces are non-smoking. Designated outdoor areas are available.' },
]

/* Reusable in-view wrapper */
function Reveal({ children, delay = 0, variant = 'up', className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const variants = {
    up:    { initial: { opacity: 0, y: 48 }, animate: { opacity: 1, y: 0 } },
    left:  { initial: { opacity: 0, x: -48 }, animate: { opacity: 1, x: 0 } },
    right: { initial: { opacity: 0, x: 48 }, animate: { opacity: 1, x: 0 } },
    scale: { initial: { opacity: 0, scale: 0.93 }, animate: { opacity: 1, scale: 1 } },
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants[variant]}
      initial="initial"
      animate={inView ? 'animate' : 'initial'}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

/* Parallax hero image */
function ParallaxHero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])

  return (
    <section className="hero home-hero" ref={ref}>
      <motion.div
        className="hero__bg"
        style={{ backgroundImage: `url(${IMG.hero})`, y }}
      />
      <div className="hero__overlay" />
      <div className="hero__content">
        <motion.span
          className="hero__eyebrow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        >
          Luxury Beachfront Hospitality
        </motion.span>
        <motion.h1
          className="hero__title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.65 }}
        >
          Our Hotel
        </motion.h1>
      </div>
    </section>
  )
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <ParallaxHero />

      {/* ── INTRO ── */}
      <section className="section home-about">
        <div className="container">
          <div className="home-about__grid">
            {/* Left image */}
            <Reveal variant="left" className="home-about__img-wrap img-wrap">
              <img src={IMG.about1} alt="Tropical beach view" loading="lazy" />
            </Reveal>

            {/* Center text */}
            <div className="home-about__text">
              <Reveal delay={0.1}>
                <p className="home-about__intro">
                  Welcome to <strong>HotelBeach.</strong> where every story begins with a journey,
                  and every journey becomes an <em>unforgettable tale.</em> Our story is one of passion
                  for travel, a love for exceptional destinations, and an unwavering commitment
                  to providing you with the ultimate hospitality experience.
                </p>
              </Reveal>
              <Reveal delay={0.22}>
                <div className="home-about__actions">
                  <Link to="/rooms">
                    <motion.button
                      className="btn btn--outline"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Reserve Luxury Today
                    </motion.button>
                  </Link>
                  <motion.div
                    className="btn-circle"
                    whileHover={{ scale: 1.1, rotate: 15 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    →
                  </motion.div>
                </div>
              </Reveal>
            </div>

            {/* Right image */}
            <Reveal variant="right" className="home-about__img-wrap img-wrap">
              <img src={IMG.about2} alt="Resort pool view" loading="lazy" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── OUR STORY ── */}
      <section className="section section--cream home-story">
        <div className="container">
          <div className="home-story__grid">
            {/* Left */}
            <div className="home-story__left">
              <Reveal>
                <span className="divider" style={{ marginBottom: '24px' }} />
                <h2 className="display-title" style={{ marginBottom: '20px' }}>Our Story</h2>
                <p className="body-text">
                  Our story started decades ago, with a single boutique hotel nestled in a pristine
                  coastal town. Over the years, we expanded our footprint, curating a collection of
                  exceptional properties in some of the world's most sought-after destinations.
                </p>
              </Reveal>
              <Reveal delay={0.18} className="home-story__img img-wrap">
                <img src={IMG.story} alt="Hotel pool with palm trees" loading="lazy" />
              </Reveal>
            </div>

            {/* Right */}
            <div className="home-story__right">
              <Reveal variant="right" className="home-story__img-top img-wrap">
                <img src={IMG.vision} alt="Clear ocean waters" loading="lazy" />
              </Reveal>
              <Reveal variant="right" delay={0.15}>
                <span className="divider" style={{ marginBottom: '24px' }} />
                <h2 className="display-title" style={{ marginBottom: '20px' }}>Our Vision</h2>
                <p className="body-text">
                  At HotelBeach, our vision is to redefine the art of hospitality. We aspire to be
                  more than just a place to stay — a destination in itself, where every guest is
                  embraced by natural beauty and genuine warmth.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section home-testimonials">
        <div className="container">
          <Reveal>
            <span className="divider" style={{ marginBottom: '24px' }} />
            <h2 className="display-title" style={{ marginBottom: '56px' }}>Hear from our Guests</h2>
          </Reveal>
          <motion.div
            className="home-testimonials__grid"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-60px' }}
          >
            {[
              { quote: '"HotelBeach was the perfect destination for our family getaway. From the moment we arrived, we were enveloped in a sense of tranquility and wonder..."', name: 'Michael & Lea H.', from: 'Sydney · Trustpilot 5 Star' },
              { quote: '"Waking up to the ocean from our room was something I\'ll cherish forever. The staff\'s attention to detail was extraordinary."', name: 'Sarah T.', from: 'London · Trustpilot 5 Star' },
            ].map((t, i) => (
              <motion.div key={i} className="testimonial-card" variants={staggerChild}>
                <p className="testimonial-card__stars">★★★★★</p>
                <p className="testimonial-card__quote">{t.quote}</p>
                <div className="testimonial-card__author">
                  <p className="testimonial-card__name">{t.name}</p>
                  <p className="testimonial-card__from">{t.from}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ATTRACTIONS ── */}
      <section className="section section--cream home-attractions">
        <div className="container">
          <Reveal>
            <span className="divider" style={{ marginBottom: '24px' }} />
            <h2 className="display-title" style={{ marginBottom: '52px' }}>Location &amp; Attractions</h2>
          </Reveal>
          <motion.div
            className="home-attractions__grid"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-60px' }}
          >
            {[
              { img: IMG.venice,     name: 'Venice Beach',           desc: 'Bohemian spirit, colorful boardwalk, and eclectic street art — just minutes away.' },
              { img: IMG.promenade,  name: 'Third Street Promenade', desc: 'A bustling pedestrian shopping and dining district with street performers and boutiques.' },
              { img: IMG.restaurant, name: 'Monica Restaurant',      desc: 'Farm-to-table dining featuring seasonal dishes and locally sourced ingredients.' },
            ].map((a, i) => (
              <motion.div key={i} className="attraction-card" variants={staggerChild}>
                <div className="attraction-card__img img-wrap">
                  <img src={a.img} alt={a.name} loading="lazy" />
                </div>
                <div className="attraction-card__body">
                  <h3>{a.name}</h3>
                  <p>{a.desc}</p>
                  <motion.button
                    className="attraction-card__link"
                    whileHover={{ x: 6 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    View on map →
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section home-faq">
        <div className="container">
          <Reveal>
            <span className="divider" style={{ marginBottom: '24px' }} />
            <h2 className="display-title" style={{ marginBottom: '56px' }}>Frequently Asked Questions</h2>
          </Reveal>
          <div className="home-faq__grid">
            {[FAQS.slice(0, 3), FAQS.slice(3)].map((col, ci) => (
              <div key={ci} className="faq-col">
                {col.map((faq, ri) => {
                  const idx = ci * 3 + ri
                  const isOpen = openFaq === idx
                  return (
                    <motion.div
                      key={idx}
                      className="faq-item"
                      onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                      whileHover={{ x: 4 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      <div className="faq-item__header">
                        <p className="faq-item__q">{faq.q}</p>
                        <motion.span
                          className="faq-item__icon"
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          +
                        </motion.span>
                      </div>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.p
                            className="faq-item__a"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          >
                            {faq.a}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  )
}