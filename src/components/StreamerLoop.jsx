// src/components/StreamerLoop.jsx

import React from 'react';
import './StreamerLoop.css';

// ===== ВРЕМЕННО: ОТКЛЮЧЕНИЕ ПЕРЕХОДОВ ПО ССЫЛКАМ =====
// Чтобы вернуть - измени на true
const LINKS_ENABLED = false;

const StreamerLoop = ({ links }) => {
  // Дублируем массив, чтобы анимация была бесшовной
  const extendedLinks = [...links, ...links];

  const handleLinkClick = (e) => {
    if (!LINKS_ENABLED) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  };

  return (
    <div className="streamer-loop-container">
      <div className="streamer-track">
        {extendedLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="streamer-item"
            aria-label={link.alt}
            onClick={handleLinkClick}
          >
            <img src={link.src} alt={link.alt} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default StreamerLoop;