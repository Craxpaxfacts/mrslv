import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import Lenis from '@studio-freight/lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// Initialize Lenis smooth scrolling and sync with GSAP ScrollTrigger
try {
  // Prevent CSS smooth-behavior conflicts
  document.documentElement.style.scrollBehavior = 'auto';

  const lenis = new Lenis({
    // Native scroll – no wrapper transform → crisp text
    wrapper: window,
    content: document.documentElement,
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false,
    touchMultiplier: 1.2,
  });

  // Expose for debugging if needed
  window.__lenis = lenis;

  lenis.on('scroll', () => {
    try { ScrollTrigger.update(); } catch {}
  });

  const raf = (time) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
} catch {}