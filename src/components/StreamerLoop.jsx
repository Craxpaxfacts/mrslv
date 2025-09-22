// src/components/StreamerLoop.jsx

import React from 'react';
import './StreamerLoop.css';

const StreamerLoop = ({ links }) => {
  // Дублируем массив, чтобы анимация была бесшовной
  const extendedLinks = [...links, ...links];

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
          >
            <img src={link.src} alt={link.alt} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default StreamerLoop;