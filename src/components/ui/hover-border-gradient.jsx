import React from 'react';
import './hover-border-gradient.css';

export function HoverBorderGradient({ as: Component = 'button', className = '', containerClassName = '', children, ...props }) {
  return (
    <div className={`hbg-container ${containerClassName}`}>
      <Component className={`hbg-button ${className}`} {...props}>
        {children}
      </Component>
    </div>
  );
}

export default HoverBorderGradient;








