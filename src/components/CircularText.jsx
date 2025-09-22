// src/components/CircularText.jsx

import { useEffect } from 'react';
import { motion, useAnimation, useMotionValue } from 'motion/react';
import './CircularText.css';

// ... функции getRotationTransition и getTransition не меняем ...
const getRotationTransition = (duration, from, loop = true) => ({
    from, to: from + 360, ease: 'linear', duration, type: 'tween', repeat: loop ? Infinity : 0
});
const getTransition = (duration, from) => ({
    rotate: getRotationTransition(duration, from),
    scale: { type: 'spring', damping: 20, stiffness: 300 }
});

const CircularText = ({ text, spinDuration = 20, onHover = 'speedUp', className = '', logoSrc }) => {
    const letters = Array.from(text);
    const textControls = useAnimation(); // Контроллер для текста
    const wrapperControls = useAnimation(); // Контроллер для всего блока (для сжатия)
    const rotation = useMotionValue(0);

    useEffect(() => {
        const start = rotation.get();
        textControls.start({ rotate: start + 360, transition: getRotationTransition(spinDuration, start) });
    }, [spinDuration, text, onHover, textControls, rotation]);

    const handleHoverStart = () => {
        const start = rotation.get();
        if (!onHover) return;
        let textTransitionConfig;
        let wrapperScaleVal = 1;

        switch (onHover) {
            case 'slowDown': textTransitionConfig = getRotationTransition(spinDuration * 2, start); break;
            case 'speedUp': textTransitionConfig = getRotationTransition(spinDuration / 4, start); break;
            case 'pause': textTransitionConfig = { type: 'spring', damping: 20, stiffness: 300 }; break;
            case 'goBonkers':
                textTransitionConfig = getRotationTransition(spinDuration / 20, start);
                wrapperScaleVal = 0.85; // <-- ВОТ ОНО, СЖАТИЕ!
                break;
            default: textTransitionConfig = getRotationTransition(spinDuration, start);
        }
        textControls.start({ rotate: start + 360, transition: textTransitionConfig });
        wrapperControls.start({ scale: wrapperScaleVal, transition: { type: 'spring', damping: 15, stiffness: 400 } });
    };

    const handleHoverEnd = () => {
        const start = rotation.get();
        textControls.start({ rotate: start + 360, transition: getRotationTransition(spinDuration, start) });
        wrapperControls.start({ scale: 1, transition: { type: 'spring', damping: 15, stiffness: 400 } });
    };

    return (
        // --- 👇 ЭТОТ БЛОК ТЕПЕРЬ ОТВЕЧАЕТ ЗА СЖАТИЕ ВСЕЙ КОМПОЗИЦИИ ---
        <motion.div
            className={`circular-text ${className}`}
            animate={wrapperControls}
            onMouseEnter={handleHoverStart}
            onMouseLeave={handleHoverEnd}
        >
            {logoSrc && <img src={logoSrc} alt="logo" className="circular-text-logo" />}
            
            {/* --- 👇 А ЭТОТ, КАК И РАНЬШЕ, ТОЛЬКО ЗА ВРАЩЕНИЕ ТЕКСТА --- */}
            <motion.div
                className="text-wrapper"
                style={{ rotate: rotation }}
                animate={textControls}
            >
                {letters.map((letter, i) => {
                    const rotationDeg = (360 / letters.length) * i;
                    return (
                        <span
                            key={i}
                            style={{ transform: `translateX(-50%) rotate(${rotationDeg}deg)` }}
                        >
                            {letter === ' ' ? '\u00A0' : letter}
                        </span>
                    );
                })}
            </motion.div>
        </motion.div>
    );
};

export default CircularText;