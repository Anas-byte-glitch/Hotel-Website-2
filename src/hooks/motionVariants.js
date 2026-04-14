// src/hooks/motionVariants.js
// Reusable Framer Motion variants — import anywhere

// Page-level enter/exit
export const pageVariants = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, y: -12, transition: { duration: 0.35, ease: [0.87, 0, 0.13, 1] } },
}

// Fade up — used for text blocks
export const fadeUp = {
  initial: { opacity: 0, y: 50 },
  animate: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay },
  }),
}

// Fade in from left
export const fadeLeft = {
  initial: { opacity: 0, x: -50 },
  animate: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1], delay },
  }),
}

// Fade in from right
export const fadeRight = {
  initial: { opacity: 0, x: 50 },
  animate: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1], delay },
  }),
}

// Stagger container
export const staggerContainer = {
  initial: {},
  animate: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

// Stagger child (used inside staggerContainer)
export const staggerChild = {
  initial: { opacity: 0, y: 36 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
}

// Scale in
export const scaleIn = {
  initial: { opacity: 0, scale: 0.92 },
  animate: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1], delay },
  }),
}

// Image reveal (clip-path wipe)
export const imageReveal = {
  initial: { clipPath: 'inset(100% 0% 0% 0%)' },
  animate: (delay = 0) => ({
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1], delay },
  }),
}