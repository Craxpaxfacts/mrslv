import * as RadixSlider from '@radix-ui/react-slider';
import clsx from 'clsx';

import React from 'react';
import { selectionTick } from '../../lib/haptics';

function Slider({ value, className, onTick, ...props }) {
  const hideTimerRef = React.useRef(null);
  const rootRef = React.useRef(null);
  const lastStepRef = React.useRef(null);

  const triggerTick = React.useCallback(() => {
    const el = rootRef.current;
    if (!el) return;
    el.classList.remove('mobile-slider-tick');
    void el.offsetWidth; // restart animation
    el.classList.add('mobile-slider-tick');
    try { selectionTick(); } catch {}
    onTick?.();
  }, [onTick]);

  const handleValueChange = (vals) => {
    props.onValueChange?.(vals);
    const step = vals?.[0];
    if (step != null) {
      const rounded = Math.round(step / 5) * 5; // tick every 5 units
      if (lastStepRef.current !== rounded) {
        lastStepRef.current = rounded;
        triggerTick();
      }
    }
  };

  const handleValueCommit = (vals) => {
    props.onValueCommit?.(vals);
  };

  React.useEffect(() => () => { if (hideTimerRef.current) clearTimeout(hideTimerRef.current); }, []);

  return (
    <RadixSlider.Root
      {...props}
      ref={rootRef}
      value={value}
      className={clsx('mobile-slider-root', className)}
      onValueChange={handleValueChange}
      onValueCommit={handleValueCommit}
    >
      <RadixSlider.Track className="mobile-slider-track">
        <RadixSlider.Range className="mobile-slider-range" />
      </RadixSlider.Track>
      <RadixSlider.Thumb
        className="mobile-slider-thumb"
        aria-label="Volume"
      />
    </RadixSlider.Root>
  );
}

export { Slider };
export default Slider;

