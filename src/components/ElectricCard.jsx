// src/components/ElectricCard.jsx

import { useEffect, useId, useLayoutEffect, useRef } from 'react';
import './ElectricCard.css'; // Будем использовать свои стили
import ElasticSlider from './ElasticSlider';
import { setVolume01, getVolume01 } from '../lib/audioController';

// Иконки Play/Pause, как в старой карусели
const PlayIcon = () => <svg width="60" height="60" viewBox="0 0 24 24" fill="white"><path d="M8 5V19L19 12L8 5Z" /></svg>;
const PauseIcon = () => <svg width="60" height="60" viewBox="0 0 24 24" fill="white"><path d="M6 19H10V5H6V19ZM14 5V19H18V5H14Z" /></svg>;

const ElectricCard = ({ track, isPlaying, isActive, onClick, color = '#5227FF', speed = 1, chaos = 1, thickness = 2 }) => {
  const rawId = useId().replace(/[:]/g, '');
  const filterId = `turbulent-displace-${rawId}`;
  const svgRef = useRef(null);
  const rootRef = useRef(null);
  const strokeRef = useRef(null);

  // ... (весь код updateAnim из ElectricBorder остаётся здесь без изменений)
  const updateAnim = () => {
    const svg = svgRef.current;
    const host = rootRef.current;
    if (!svg || !host) return;
    if (strokeRef.current) { strokeRef.current.style.filter = `url(#${filterId})`; }
    const width = Math.max(1, Math.round(host.clientWidth));
    const height = Math.max(1, Math.round(host.clientHeight));
    const dyAnims = Array.from(svg.querySelectorAll('feOffset > animate[attributeName="dy"]'));
    if (dyAnims.length >= 2) { dyAnims[0].setAttribute('values', `${height}; 0`); dyAnims[1].setAttribute('values', `0; -${height}`); }
    const dxAnims = Array.from(svg.querySelectorAll('feOffset > animate[attributeName="dx"]'));
    if (dxAnims.length >= 2) { dxAnims[0].setAttribute('values', `${width}; 0`); dxAnims[1].setAttribute('values', `0; -${width}`); }
    const dur = Math.max(0.001, 6 / (speed || 1));
    [...dyAnims, ...dxAnims].forEach(a => a.setAttribute('dur', `${dur}s`));
    const disp = svg.querySelector('feDisplacementMap');
    if (disp) disp.setAttribute('scale', String(30 * (chaos || 1)));
    const filterEl = svg.querySelector(`#${CSS.escape(filterId)}`);
    if (filterEl) { filterEl.setAttribute('x', '-200%'); filterEl.setAttribute('y', '-200%'); filterEl.setAttribute('width', '500%'); filterEl.setAttribute('height', '500%'); }
    requestAnimationFrame(() => { [...dyAnims, ...dxAnims].forEach(a => { if (typeof a.beginElement === 'function') { try { a.beginElement(); } catch { console.warn('...'); } } }); });
  };
  useEffect(() => { updateAnim(); }, [speed, chaos]);
  useLayoutEffect(() => {
    if (!rootRef.current) return;
    const ro = new ResizeObserver(() => updateAnim());
    ro.observe(rootRef.current);
    updateAnim();
    return () => ro.disconnect();
  }, []);

  const vars = { ['--electric-border-color']: color, ['--eb-border-width']: `${thickness}px` };

  const rootClass = `electric-card${isActive ? ' is-active' : ''}${isPlaying ? ' is-playing' : ''}`;

  return (
    <div ref={rootRef} className={rootClass} style={vars} onClick={onClick}>
      {/* SVG-фильтр, который создаёт магию */}
      <svg ref={svgRef} className="eb-svg"><defs><filter id={filterId} colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%"><feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="1" /><feOffset in="noise1" dx="0" dy="0" result="offsetNoise1"><animate attributeName="dy" values="700; 0" dur="6s" repeatCount="indefinite" /></feOffset><feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="1" /><feOffset in="noise2" dx="0" dy="0" result="offsetNoise2"><animate attributeName="dy" values="0; -700" dur="6s" repeatCount="indefinite" /></feOffset><feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="2" /><feOffset in="noise1" dx="0" dy="0" result="offsetNoise3"><animate attributeName="dx" values="490; 0" dur="6s" repeatCount="indefinite" /></feOffset><feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="2" /><feOffset in="noise2" dx="0" dy="0" result="offsetNoise4"><animate attributeName="dx" values="0; -490" dur="6s" repeatCount="indefinite" /></feOffset><feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" /><feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" /><feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise" /><feDisplacementMap in="SourceGraphic" in2="combinedNoise" scale="30" xChannelSelector="R" yChannelSelector="B" /></filter></defs></svg>
      
      {/* Слои для рамки и свечения */}
      <div className="eb-layers"><div ref={strokeRef} className="eb-stroke" /><div className="eb-glow-1" /><div className="eb-glow-2" /><div className="eb-background-glow" /></div>
      
      {/* А вот, блядь, наш контент: обложка и иконка Play/Pause */}
      <div className="eb-content">
        <img src={track.cover} alt="Album Cover" className="album-cover" />
        <div className="overlay">
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
          <div style={{ position: 'absolute', bottom: 10 }} onClick={(e) => e.stopPropagation()}>
            <ElasticSlider
              startingValue={0}
              defaultValue={Math.round(getVolume01() * 100)}
              maxValue={100}
              isStepped
              stepSize={1}
              onChange={(val) => setVolume01(val / 100)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectricCard;