// src/App.jsx

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
// Временно отключаем Chakra UI для отладки
import Section from './components/Section.jsx';
import LiquidEther from './components/LiquidEther.jsx';
import './App.css';
import { projects } from './data/projects.js';
import GradientMenu from './components/GradientMenu.jsx';
import { SocialTooltip } from './components/SocialTooltip.jsx';
import NavigationBar from './components/NavigationBar.jsx';


gsap.registerPlugin(ScrollTrigger);


function App() {
  const sectionsRef = useRef([]);

  useGSAP(() => {
    sectionsRef.current.forEach((section) => {
      if (section) {
        gsap.fromTo(
          section,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });
  }, { dependencies: [projects] });

  return (
    <>
      {/* --- Плавный переход фонового эффекта --- */}
      <div 
        className="liquid-ether-container"
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100vh',
          zIndex: -1
        }}
      >
        <LiquidEther
          mouseForce={16}
          cursorSize={90}
          isViscous={true}
          isBounce={false}
          autoDemo={true}
          colors={['#0000FF', '#00AEEF', '#F0F0FF']}
          resolution={0.35}
          viscous={22}
          iterationsViscous={20}
          iterationsPoisson={20}
        />
        {/* Градиентная маска для плавного перехода */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '200px',
          background: 'linear-gradient(to top, #000000 0%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0.4) 70%, transparent 100%)',
          pointerEvents: 'none'
        }} />
      </div>

      <div className="app">
        {projects.map((project, index) => (
          <div key={project.id}>
            <Section
              ref={(el) => (sectionsRef.current[index] = el)}
              {...project}
            />
            {index < projects.length - 1 && <div className="divider" />}
          </div>
        ))}
        
        <footer className="app-footer" style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          padding: '40px 20px',
          marginTop: '-110px'
        }}>
          <NavigationBar />
        </footer>
      </div>
    </>
  );
}

export default App;