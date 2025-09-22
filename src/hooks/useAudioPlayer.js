// src/hooks/useAudioPlayer.js
import { useEffect, useState, useCallback } from 'react';
import * as globalAudio from '../lib/audioController';

// keyNamespace helps differentiate multiple carousels/tracks on the page
export function useAudioPlayer(keyNamespace = 'default') {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

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

  const playAt = useCallback((src, index) => {
    const key = `${keyNamespace}:${index}`;
    globalAudio.toggle(src, key);
  }, [keyNamespace]);

  const pause = useCallback(() => {
    globalAudio.pause();
  }, []);

  return { isPlaying, currentIndex, playAt, pause };
}

export default useAudioPlayer;


