import React from 'react';
import { cn } from '../lib/utils';
import './SocialTooltip.css';

// Типы из TS упрощены до JSDoc-комментариев
/**
 * @typedef {Object} SocialItem
 * @property {string} href
 * @property {string} ariaLabel
 * @property {string} tooltip
 * @property {string} svgUrl
 * @property {string} color
 */

/**
 * @param {{ items: SocialItem[], className?: string } & React.HTMLAttributes<HTMLUListElement>} props
 */
const SocialTooltip = React.forwardRef(function SocialTooltip({ className = '', items = [], ...props }, ref) {
  const baseIconStyles = 'relative flex items-center justify-center w-12 h-12 rounded-full bg-background overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-lg';
  const baseSvgStyles = 'relative z-10 w-7 h-7 text-foreground transition-colors duration-300 ease-in-out group-hover:text-white';
  const baseFilledStyles = 'absolute bottom-0 left-0 w-full h-0 transition-all duration-300 ease-in-out group-hover:h-full';
  const baseTooltipStyles = 'absolute bottom-[-40px] left-1/2 -translate-x-1/2 px-2.5 py-1.5 text-sm text-white whitespace-nowrap rounded-md opacity-0 invisible transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:visible group-hover:bottom-[-50px]';

  return (
    <ul ref={ref} className={cn('social-tooltip-list', className)} {...props}>
      {items.map((item, index) => (
        <li key={index} className="relative group">
          <a href={item.href} aria-label={item.ariaLabel} className={cn(baseIconStyles)} target="_blank" rel="noopener noreferrer">
            <div className={cn(baseFilledStyles)} style={{ backgroundColor: item.color }} />
            <img src={item.svgUrl} alt={item.ariaLabel} className={cn(baseSvgStyles)} />
          </a>
          <div className={cn(baseTooltipStyles)} style={{ backgroundColor: item.color }}>
            {item.tooltip}
          </div>
        </li>
      ))}
    </ul>
  );
});

export { SocialTooltip };








