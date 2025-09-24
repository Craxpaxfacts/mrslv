// src/lib/audioController.js

const globalAudio = new Audio();
let currentKey = null;
let volume01 = 1;
const preloadCache = new Map(); // src -> HTMLAudioElement
let userInteracted = false;

// Initialize audio on first user interaction
function initAudioOnInteraction() {
  if (userInteracted) return;
  userInteracted = true;

  try {
    const silentAudio = new Audio();
    silentAudio.muted = true;
    silentAudio.preload = 'auto';
    silentAudio.src = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';
    silentAudio.play().catch(() => {});
  } catch {}
}

const emitter = new EventTarget();

const notify = () => {
  emitter.dispatchEvent(new CustomEvent('change', { detail: { currentKey, isPlaying: !globalAudio.paused } }));
};

globalAudio.addEventListener('ended', () => {
  currentKey = null;
  notify();
});

export function play(src, key) {
  // Initialize audio on first interaction
  initAudioOnInteraction();
  
  if (currentKey && currentKey !== key) {
    try { globalAudio.pause(); } catch {}
  }
  if (globalAudio.src !== src) {
    globalAudio.src = src;
  }
  globalAudio.volume = volume01;
  currentKey = key;
  const playPromise = globalAudio.play();
  if (playPromise && typeof playPromise.then === 'function') {
    playPromise.catch(() => {
      // Retry once after a short delay (for iOS quirks)
      setTimeout(() => {
        try { globalAudio.play(); } catch {}
      }, 50);
    });
  }
  notify();
}

export function toggle(src, key) {
  const isSameTrack = currentKey === key;
  if (isSameTrack) {
    if (globalAudio.paused) {
      play(src, key);
    } else {
      pause();
    }
  } else {
    play(src, key);
  }
}

export function pause() {
  try { globalAudio.pause(); } catch {}
  notify();
}

export function subscribe(listener) {
  const handler = (e) => listener(e.detail);
  emitter.addEventListener('change', handler);
  // immediate sync
  listener({ currentKey, isPlaying: !globalAudio.paused });
  return () => emitter.removeEventListener('change', handler);
}

export function getState() {
  return { currentKey, isPlaying: !globalAudio.paused };
}

export function setVolume01(v) {
  volume01 = Math.min(1, Math.max(0, v));
  globalAudio.volume = volume01;
}

export function getVolume01() { return volume01; }

// Best-effort preload to reduce start delay on swipe
export function preload(src) {
  try {
    if (!src || preloadCache.has(src)) return;
    const a = new Audio();
    a.preload = 'auto';
    a.src = src;
    // Kick off loading right away for instant start later
    try { a.load(); } catch {}
    preloadCache.set(src, a);
    // simple LRU cap to 4 items
    if (preloadCache.size > 4) {
      const firstKey = preloadCache.keys().next().value;
      preloadCache.delete(firstKey);
    }
  } catch {}
}

// Preload all tracks for instant switching
export function preloadAll(tracks) {
  try {
    if (!Array.isArray(tracks)) return;
    tracks.forEach(track => {
      if (track?.audio) {
        preload(track.audio);
      }
    });
  } catch {}
}

export default { play, toggle, pause, subscribe, getState, setVolume01, getVolume01, preload, preloadAll };


