// src/components/ShareButton.jsx

import React, { useState } from 'react';
import { Link as LinkIcon } from 'lucide-react';
import './ShareButton.css'; // Наши кастомные стили

const ShareButton = ({ links, children, className }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Простая утилита для классов, вместо Tailwind
  const cn = (...classes) => classes.filter(Boolean).join(' ');

  return (
    <div
      className="share-button-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Главная кнопка */}
      <button
        className={cn(
          "main-button",
          isHovered ? "is-hidden" : "",
          className
        )}
      >
        <span className="button-content">{children}</span>
      </button>

      {/* Выезжающие иконки */}
      <div className="hover-links">
        {links.map((link, index) => {
          const Icon = link.icon;
          const delayClass = `delay-${index}`;
          return (
            <button
              type="button"
              key={index}
              onClick={link.onClick}
              aria-label={link.label}
              className={cn(
                "icon-button",
                isHovered ? "is-visible" : "",
                delayClass
              )}
            >
              <Icon className="icon" />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ShareButton;