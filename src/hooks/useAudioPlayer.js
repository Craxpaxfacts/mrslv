// src/hooks/useAudioPlayer.js
import { useEffect, useState, useCallback } from 'react';
import * as globalAudio from '../lib/audioController';

// keyNamespace helps differentiate multiple carousels/tracks on the page
export function useAudioPlayer(keyNamespace = 'default') {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const unsub = globalAudio.subscribe(({ currentKey, isPlaying, currentTime }) => {
      const belongsToNs = currentKey?.startsWith(keyNamespace + ':');
      if (belongsToNs) {
        const idxStr = currentKey.split(':')[1];
        const idx = Number(idxStr);
        setCurrentIndex(Number.isNaN(idx) ? null : idx);
        setIsPlaying(isPlaying);
        setCurrentTime(currentTime || 0);
      } else {
        setIsPlaying(false);
        setCurrentTime(0);
      }
    });
    return unsub;
  }, [keyNamespace]);

  const playAt = useCallback((src, index, options = {}) => {
    const key = `${keyNamespace}:${index}`;
    // preload neighbors to reduce audible gap on next swipe
    try {
      const nextSrc = typeof src === 'string' ? src : null;
      if (nextSrc) globalAudio.preload(nextSrc);
    } catch {}

    const payload = { resumeTime: options.resumeTime ?? 0 };
    // Always use play() when resumeTime is specified, otherwise use toggle
    if (options.force || typeof options.resumeTime === 'number') {
      globalAudio.play(src, key, payload);
    } else {
      globalAudio.toggle(src, key, payload);
    }
  }, [keyNamespace]);

  const pause = useCallback(() => {
    globalAudio.pause();
  }, []);

  return { isPlaying, currentIndex, currentTime, playAt, pause };
}

export default useAudioPlayer;


