// src/App.jsx  ── MODIFIED VERSION (add Admin route)
import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import OurHotel from './pages/OurHotel'
import Rooms from './pages/Rooms'
import Contact from './pages/Contact'
import Admin from './pages/Admin'   // ← ADD THIS IMPORT

function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    })
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])
  return null
}

function ScrollReset() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

// ── NEW: wrapper that hides Navbar/Footer on /admin ──
function Layout() {
  const { pathname } = useLocation()
  const isAdmin = pathname.startsWith('/admin')

  return (
    <>
      {!isAdmin && <Navbar />}
      <main>
        <AnimatePresence mode="wait">
          <Routes location={useLocation()} key={useLocation().pathname}>
            <Route path="/"          element={<Home />} />
            <Route path="/our-hotel" element={<OurHotel />} />
            <Route path="/rooms"     element={<Rooms />} />
            <Route path="/contact"   element={<Contact />} />
            <Route path="/admin"     element={<Admin />} />   {/* ← ADD THIS */}
          </Routes>
        </AnimatePresence>
      </main>
      {!isAdmin && <Footer />}
    </>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"          element={<Home />} />
        <Route path="/our-hotel" element={<OurHotel />} />
        <Route path="/rooms"     element={<Rooms />} />
        <Route path="/contact"   element={<Contact />} />
        <Route path="/admin"     element={<Admin />} />   {/* ← ADD THIS */}
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll />
      <ScrollReset />

      {/* ✅ USE THIS */}
      <Layout />

    </BrowserRouter>
  )
}