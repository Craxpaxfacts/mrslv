// src/components/ui/Button.jsx
import React from 'react';

export const Button = ({ as: Component = 'button', className = '', children, ...rest }) => {
  return (
    <Component className={`ui-btn ${className}`} {...rest}>
      {children}
    </Component>
  );
};

export default Button;




