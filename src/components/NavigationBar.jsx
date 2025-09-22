// src/components/NavigationBar.jsx
import React from 'react';
import { asset } from '../lib/utils.js';
import './NavigationBar.css';

const NavigationBar = () => {
  return (
    <button className="social-button">
      <span>FOLLOW</span>
      <div className="container">
        <a href="https://t.me/your_channel" target="_blank" rel="noopener noreferrer">
          <img src={asset('/assets/logos/telegram.svg')} alt="Telegram" />
        </a>
        <a href="https://instagram.com/your_profile" target="_blank" rel="noopener noreferrer">
          <img src={asset('/assets/logos/instagram.svg')} alt="Instagram" />
        </a>
        <a href="https://x.com/your_profile" target="_blank" rel="noopener noreferrer">
          <img src={asset('/assets/logos/twitter-x.svg')} alt="X (Twitter)" />
        </a>
        <a href="https://reddit.com/u/your_profile" target="_blank" rel="noopener noreferrer">
          <img src={asset('/assets/logos/reddit.svg')} alt="Reddit" />
        </a>
        <a href="https://tiktok.com/@your_profile" target="_blank" rel="noopener noreferrer">
          <img src={asset('/assets/logos/tik-tok.svg')} alt="TikTok" />
        </a>
      </div>
    </button>
  );
};

export default NavigationBar;
