import './GlareHover.css';
import React from 'react';

const GlareHover = React.forwardRef(({
  width = '500px',
  height = '500px',
  background = '#000',
  borderRadius = '10px',
  borderColor = '#333',
  children,
  glareColor = '#ffffff',
  glareOpacity = 0.5,
  glareAngle = -45,
  glareSize = 250,
  transitionDuration = 1100,
  playOnce = false,
  autoPlay = true,
  autoPlayInterval = 7000,
  className = '',
  style = {}
}, ref) => {
  const hex = glareColor.replace('#', '');
  let rgba = glareColor;
  if (/^[0-9A-Fa-f]{6}$/.test(hex)) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
  } else if (/^[0-9A-Fa-f]{3}$/.test(hex)) {
    const r = parseInt(hex[0] + hex[0], 16);
    const g = parseInt(hex[1] + hex[1], 16);
    const b = parseInt(hex[2] + hex[2], 16);
    rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
  }

  const vars = {
    '--gh-width': width,
    '--gh-height': height,
    '--gh-bg': background,
    '--gh-br': borderRadius,
    '--gh-angle': `${glareAngle}deg`,
    '--gh-duration': `${transitionDuration}ms`,
    '--gh-size': `${glareSize}%`,
    '--gh-rgba': rgba,
    '--gh-border': borderColor
  };

  const rootRef = React.useRef(null);
  const timeoutRef = React.useRef(null);

  const runOnce = React.useCallback(() => {
    if (!rootRef.current) return;
    const el = rootRef.current;
    // Restart animation even if already running
    if (el.classList.contains('glare-hover--run')) {
      el.classList.remove('glare-hover--run');
      // Force reflow to reset animation state
      void el.offsetWidth;
    }
    el.classList.add('glare-hover--run');
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (!rootRef.current) return;
      rootRef.current.classList.remove('glare-hover--run');
    }, transitionDuration + 50);
  }, [transitionDuration]);

  React.useImperativeHandle(ref, () => ({ runOnce }), [runOnce]);

  React.useEffect(() => {
    if (playOnce) return;
    if (!autoPlay) return;
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return; // respect reduced motion
    }
    const el = rootRef.current;
    if (!el) return;
    let timer;
    runOnce();
    timer = setInterval(runOnce, Math.max(transitionDuration + 800, autoPlayInterval));
    return () => { if (timer) clearInterval(timer); };
  }, [autoPlay, autoPlayInterval, playOnce, transitionDuration]);

  return (
    <div
      ref={rootRef}
      className={`glare-hover ${playOnce ? 'glare-hover--play-once' : ''} ${className}`}
      style={{ ...vars, ...style }}
      onPointerDown={runOnce}
      onTouchStart={runOnce}
      onClick={runOnce}
    >
      {children}
    </div>
  );
});

export default GlareHover;


