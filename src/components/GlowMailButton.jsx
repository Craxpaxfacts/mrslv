import React from 'react';
import './GlowMailButton.css';

export default function GlowMailButton({ mail = 'booking@yourdomain.com', children = 'Email me' }) {
  return (
    <div className="mail-container">
      <a href={`mailto:${mail}`} className="mail-button" aria-label="Email">
        <svg className="mail-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5h13A2.5 2.5 0 0 1 21 7.5v9A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5v-9Z" stroke="currentColor" strokeWidth="1.6"/>
          <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>{children}</span>
      </a>
    </div>
  );
}


