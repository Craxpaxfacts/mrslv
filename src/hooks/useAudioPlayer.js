// src/hooks/useAudioPlayer.js
import { useEffect, useState, useCallback, useRef } from 'react';
import * as globalAudio from '../lib/audioController';

// keyNamespace helps differentiate multiple carousels/tracks on the page
export function useAudioPlayer(keyNamespace = 'default') {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const lastPlayRef = useRef({ src: null, key: null });

  useEffect(() => {
    const unsub = globalAudio.subscribe(({ currentKey, isPlaying }) => {
      const belongsToNs = currentKey?.startsWith(keyNamespace + ':');
      if (belongsToNs) {
        const idxStr = currentKey.split(':')[1];
        const idx = Number(idxStr);
        setCurrentIndex(Number.isNaN(idx) ? null : idx);
        setIsPlaying(isPlaying);
      } else {
        setIsPlaying(false);
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

    const last = lastPlayRef.current;
    const isSameTrack = last.src === src && last.key === key;

    if (!isSameTrack || options.force) {
      globalAudio.play(src, key);
      lastPlayRef.current = { src, key };
    } else {
      globalAudio.toggle(src, key);
    }
  }, [keyNamespace]);

  const pause = useCallback(() => {
    globalAudio.pause();
  }, []);

  return { isPlaying, currentIndex, playAt, pause };
}

export default useAudioPlayer;


