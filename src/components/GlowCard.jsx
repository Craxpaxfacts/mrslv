// Эффект свечения для карточек (адаптировано под JS, без TypeScript)
import React, { useEffect, useRef } from 'react';
import './GlowCard.css';

const glowColorMap = {
  blue: { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green: { base: 120, spread: 200 },
  red: { base: 0, spread: 200 },
  orange: { base: 30, spread: 200 },
};

export default function GlowCard({
  children,
  className = '',
  glowColor = 'purple',
  size = 'md',
  width,
  height,
  customSize = true,
}) {
  const cardRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    // Глобальный трекинг с rAF: обновляем свечение ТОЛЬКО если курсор внутри rect карточки
    const card = cardRef.current;
    if (!card) return;
    let rect = card.getBoundingClientRect();
    let rafId = null;
    let lastEvent = null;

    const update = () => {
      rafId = null;
      if (!lastEvent) return;
      // Пере вычисляем rect на каждый кадр — позиция слайдов меняется трансформациями Swiper
      rect = card.getBoundingClientRect();
      const { clientX, clientY } = lastEvent;
      const inside = clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom;
      if (!inside) return;
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const xp = Math.max(0, Math.min(1, x / Math.max(1, rect.width)));
      const yp = Math.max(0, Math.min(1, y / Math.max(1, rect.height)));
      card.style.setProperty('--x', x.toFixed(2));
      card.style.setProperty('--y', y.toFixed(2));
      card.style.setProperty('--xp', xp.toFixed(2));
      card.style.setProperty('--yp', yp.toFixed(2));
    };

    const onPointerMoveDoc = (e) => {
      // Кэшируем последние координаты глобально — пригодится для ресинхронизации при свайпе
      try {
        window.__lastPointerX = e.clientX;
        window.__lastPointerY = e.clientY;
      } catch {}
      lastEvent = e;
      if (rafId == null) rafId = requestAnimationFrame(update);
    };
    const onResize = () => { rect = card.getBoundingClientRect(); };
    const ro = new ResizeObserver(onResize);
    ro.observe(card);
    window.addEventListener('scroll', onResize, { capture: true, passive: true });
    document.addEventListener('pointermove', onPointerMoveDoc, { passive: true });

    return () => {
      ro.disconnect();
      window.removeEventListener('scroll', onResize, true);
      document.removeEventListener('pointermove', onPointerMoveDoc);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const { base, spread } = glowColorMap[glowColor] || glowColorMap.purple;

  const getInlineStyles = () => {
    const baseStyles = {
      ['--base']: base,
      ['--spread']: spread,
      ['--radius']: '14',
      ['--border']: '3',
      ['--backdrop']: 'hsl(0 0% 60% / 0.12)',
      ['--backup-border']: 'var(--backdrop)',
      ['--size']: '200',
      ['--outer']: '1',
      // Усиливаем видимость свечения по умолчанию
      ['--bg-spot-opacity']: '0.25',
      ['--border-spot-opacity']: '0.9',
      ['--border-light-opacity']: '0.8',
      ['--border-size']: 'calc(var(--border, 2) * 1px)',
      ['--spotlight-size']: 'calc(var(--size, 150) * 1px)',
      ['--hue']: 'calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))',
      backgroundImage: `radial-gradient(var(--spotlight-size) var(--spotlight-size) at calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px), hsl(var(--hue, 210) 100% 70% / var(--bg-spot-opacity, 0.25)), transparent)`,
      backgroundColor: 'var(--backdrop, transparent)',
      backgroundSize: 'calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))',
      backgroundPosition: '50% 50%',
      backgroundAttachment: 'local',
      border: 'var(--border-size) solid var(--backup-border)',
      position: 'relative',
      touchAction: 'none',
    };

    // Если не customSize — задаём размеры через width/height, иначе занимаем 100% контейнера
    if (customSize) {
      baseStyles.width = '100%';
      baseStyles.height = '100%';
    } else {
      if (width !== undefined) baseStyles.width = typeof width === 'number' ? `${width}px` : width;
      if (height !== undefined) baseStyles.height = typeof height === 'number' ? `${height}px` : height;
    }

    return baseStyles;
  };

  const beforeAfterStyles = `
    [data-glow]::before,
    [data-glow]::after {
      pointer-events: none;
      content: "";
      position: absolute;
      inset: calc(var(--border-size) * -1);
      border: var(--border-size) solid transparent;
      border-radius: calc(var(--radius) * 1px);
      background-attachment: fixed;
      background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
      background-repeat: no-repeat;
      background-position: 50% 50%;
      -webkit-mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
      mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
      -webkit-mask-clip: padding-box, border-box;
      mask-clip: padding-box, border-box;
      -webkit-mask-composite: source-in;
    }
    [data-glow]::before {
      background-image: radial-gradient(calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px), hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 50) * 1%) / var(--border-spot-opacity, 1)), transparent 100%);
      filter: brightness(2);
    }
    [data-glow]::after {
      background-image: radial-gradient(calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px), hsl(0 100% 100% / var(--border-light-opacity, 1)), transparent 100%);
    }
    [data-glow] [data-glow] {
      position: absolute;
      inset: 0;
      will-change: filter;
      opacity: var(--outer, 1);
      border-radius: calc(var(--radius) * 1px);
      border-width: calc(var(--border-size) * 20);
      filter: blur(calc(var(--border-size) * 10));
      background: none;
      pointer-events: none;
      border: none;
    }
    [data-glow] > [data-glow]::before { inset: -10px; border-width: 10px; }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: beforeAfterStyles }} />
      <div
        ref={cardRef}
        data-glow
        style={getInlineStyles()}
        className={`glow-card ${className}`}
      >
        <div ref={innerRef} data-glow></div>
        {children}
      </div>
    </>
  );
}

export { GlowCard };


