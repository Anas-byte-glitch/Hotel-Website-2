// src/pages/Contact.jsx
import React, { useState, useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  pageVariants,
  staggerContainer,
  staggerChild,
} from "../hooks/motionVariants";
import "./Contact.css";

const IMG = {
  hero: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1800&q=85",
  lobby: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=900&q=80",
};

const SUBJECTS = [
  "General Inquiry",
  "Room Reservation",
  "Events & Weddings",
  "Restaurant Booking",
  "Feedback",
  "Other",
];

function LocationIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.22 2.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.56-.56a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

function Reveal({ children, delay = 0, variant = "up", className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const variants = {
    up: { initial: { opacity: 0, y: 50 }, animate: { opacity: 1, y: 0 } },
    left: { initial: { opacity: 0, x: -50 }, animate: { opacity: 1, x: 0 } },
    right: { initial: { opacity: 0, x: 50 }, animate: { opacity: 1, x: 0 } },
  };
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants[variant]}
      initial="initial"
      animate={inView ? "animate" : "initial"}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function ParallaxHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  return (
    <section className="hero contact-hero" ref={ref}>
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
          Get In Touch
        </motion.span>
        <motion.h1
          className="hero__title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.65 }}
        >
          Contact
        </motion.h1>
      </div>
    </section>
  );
}

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = "Valid email is required";
    if (!form.subject) e.subject = "Please select a subject";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <ParallaxHero />

      {/* ── INFO BAR ── */}
      <section className="section contact-info">
        <div className="container">
          <motion.div
            className="contact-info__grid"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-60px" }}
          >
            {[
              {
                icon: <LocationIcon />,
                label: "3891 Ranchview Dr. Richardson,\nCalifornia 62639",
              },
              {
                icon: <MailIcon />,
                label: "info@hotelbeach.com",
                href: "mailto:info@hotelbeach.com",
              },
              {
                icon: <PhoneIcon />,
                label: "(603) 555-0123",
                href: "tel:+16035550123",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="contact-info__item"
                variants={staggerChild}
              >
                <div className="contact-info__icon">{item.icon}</div>
                {item.href ? (
                  <a href={item.href} className="contact-info__text">
                    {item.label}
                  </a>
                ) : (
                  <p
                    className="contact-info__text"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {item.label}
                  </p>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FORM + IMAGE ── */}
      <section className="contact-form-section">
        {/* Lobby image */}
        <Reveal variant="left" className="contact-form-section__img img-wrap">
          <img src={IMG.lobby} alt="HotelBeach lobby" loading="lazy" />
        </Reveal>

        {/* Form */}
        <div className="contact-form-section__right">
          <Reveal className="contact-form-wrap">
            <span className="divider" style={{ marginBottom: "28px" }} />
            <h2 className="display-title" style={{ marginBottom: "12px" }}>
              Request Info
            </h2>
            <p className="body-text" style={{ marginBottom: "36px" }}>
              Have a question or need assistance? We're here to help — reach out
              below.
            </p>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  className="contact-success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <motion.div
                    className="contact-success__icon"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      duration: 0.5,
                      ease: [0.34, 1.56, 0.64, 1],
                      delay: 0.1,
                    }}
                  >
                    ✓
                  </motion.div>
                  <h3>Thank you!</h3>
                  <p>We'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  className="contact-form"
                  onSubmit={handleSubmit}
                  noValidate
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {[
                    {
                      id: "name",
                      label: "Name",
                      type: "text",
                      placeholder: "Jane Smith",
                    },
                    {
                      id: "email",
                      label: "Email",
                      type: "email",
                      placeholder: "jane@example.com",
                    },
                  ].map((f) => (
                    <div key={f.id} className="form-group">
                      <label htmlFor={f.id} className="form-label">
                        {f.label}
                      </label>
                      <input
                        id={f.id}
                        name={f.id}
                        type={f.type}
                        className={`form-input ${errors[f.id] ? "form-input--err" : ""}`}
                        placeholder={f.placeholder}
                        value={form[f.id]}
                        onChange={handleChange}
                        autoComplete={f.id}
                      />
                      {errors[f.id] && (
                        <span className="form-err">{errors[f.id]}</span>
                      )}
                    </div>
                  ))}

                  <div className="form-group">
                    <label htmlFor="subject" className="form-label">
                      Subject
                    </label>
                    <div className="form-select-wrap">
                      <select
                        id="subject"
                        name="subject"
                        className={`form-select ${errors.subject ? "form-input--err" : ""}`}
                        value={form.subject}
                        onChange={handleChange}
                      >
                        <option value="">Select...</option>
                        {SUBJECTS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      <span className="form-select-arrow">›</span>
                    </div>
                    {errors.subject && (
                      <span className="form-err">{errors.subject}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">
                      Your message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      className={`form-textarea ${errors.message ? "form-input--err" : ""}`}
                      placeholder="Type your message here..."
                      value={form.message}
                      onChange={handleChange}
                    />
                    {errors.message && (
                      <span className="form-err">{errors.message}</span>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    className="contact-submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Submit
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </section>

      {/* ── MAP ── */}
      {/* ── MAP ── */}
      <section className="section contact-map-section">
        <div className="container">
          <div className="contact-map">
            <iframe
              title="HotelBeach Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3355.239!2d-96.7304!3d32.9483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDU2JzUzLjkiTiA5NsKwNDMnNDkuNCJX!5e0!3m2!1sen!2sus!4v1620000000000"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </motion.div>
  );
}
