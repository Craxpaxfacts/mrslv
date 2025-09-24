import NumberFlow from '@number-flow/react';
import * as RadixSlider from '@radix-ui/react-slider';
import clsx from 'clsx';

import React from 'react';

function Slider({ value, className, onTick, ...props }) {
  const [showValue, setShowValue] = React.useState(false);
  const hideTimerRef = React.useRef(null);
  const rootRef = React.useRef(null);
  const lastStepRef = React.useRef(null);

  const triggerTick = React.useCallback(() => {
    const el = rootRef.current;
    if (!el) return;
    el.classList.remove('mobile-slider-tick');
    void el.offsetWidth; // restart animation
    el.classList.add('mobile-slider-tick');
    onTick?.();
  }, [onTick]);

  const handleValueChange = (vals) => {
    props.onValueChange?.(vals);
    setShowValue(true);
    const step = vals?.[0];
    if (step != null) {
      const rounded = Math.round(step / 5) * 5; // tick every 5 units
      if (lastStepRef.current !== rounded) {
        lastStepRef.current = rounded;
        triggerTick();
      }
    }
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => setShowValue(false), 900);
  };

  const handleValueCommit = (vals) => {
    props.onValueCommit?.(vals);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => setShowValue(false), 700);
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
      onPointerDown={() => setShowValue(true)}
      onPointerUp={() => {
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        hideTimerRef.current = setTimeout(() => setShowValue(false), 700);
      }}
      onTouchEnd={() => {
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        hideTimerRef.current = setTimeout(() => setShowValue(false), 700);
      }}
      onBlur={() => {
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        hideTimerRef.current = setTimeout(() => setShowValue(false), 500);
      }}
    >
      <RadixSlider.Track className="mobile-slider-track">
        <RadixSlider.Range className="mobile-slider-range" />
      </RadixSlider.Track>
      <RadixSlider.Thumb
        className="mobile-slider-thumb"
        aria-label="Volume"
      >
        {showValue && value?.[0] != null && (
          <NumberFlow
            willChange
            value={value[0]}
            isolate
            continuous
            opacityTiming={{
              duration: 250,
              easing: 'ease-out',
            }}
            transformTiming={{
              easing:
                'linear(0, 0.0033 0.8%, 0.0263 2.39%, 0.0896 4.77%, 0.4676 15.12%, 0.5688, 0.6553, 0.7274, 0.7862, 0.8336 31.04%, 0.8793, 0.9132 38.99%, 0.9421 43.77%, 0.9642 49.34%, 0.9796 55.71%, 0.9893 62.87%, 0.9952 71.62%, 0.9983 82.76%, 0.9996 99.47%)',
              duration: 500,
            }}
            className="mobile-slider-value"
          />
        )}
      </RadixSlider.Thumb>
    </RadixSlider.Root>
  );
}

export { Slider };
export default Slider;

