// src/lib/audioController.js

const globalAudio = new Audio();
let currentKey = null;
let volume01 = 1;
const preloadCache = new Map(); // src -> HTMLAudioElement
let userInteracted = false;

let audioCtx = null;
let gainNode = null;
let mediaSource = null;

function ensureAudioGraph() {
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return false;
  if (!audioCtx) {
    try {
      audioCtx = new Ctx();
    } catch {
      return false;
    }
  }
  if (!mediaSource) {
    try {
      mediaSource = audioCtx.createMediaElementSource(globalAudio);
    } catch (err) {
      // Safari throws if called twice; ignore
    }
  }
  if (!gainNode && audioCtx) {
    gainNode = audioCtx.createGain();
    gainNode.gain.value = volume01;
  }
  if (mediaSource && gainNode) {
    try { mediaSource.disconnect(); } catch {}
    try { gainNode.disconnect(); } catch {}
    try {
      mediaSource.connect(gainNode);
      gainNode.connect(audioCtx.destination);
    } catch {}
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    try { audioCtx.resume(); } catch {}
  }
  return true;
}

// Initialize audio on first user interaction
function initAudioOnInteraction() {
  if (userInteracted) return;
  userInteracted = true;
  const ok = ensureAudioGraph();
  if (ok && audioCtx?.state === 'suspended') {
    try { audioCtx.resume(); } catch {}
  }
}

const emitter = new EventTarget();

const notify = () => {
  emitter.dispatchEvent(new CustomEvent('change', { detail: { currentKey, isPlaying: !globalAudio.paused, currentTime: globalAudio.currentTime } }));
};

globalAudio.addEventListener('ended', () => {
  currentKey = null;
  notify();
});

export function play(src, key, opts = {}) {
  // Initialize audio on first interaction
  initAudioOnInteraction();
  
  const ok = ensureAudioGraph();
  if (ok && audioCtx?.state === 'suspended') {
    try { audioCtx.resume(); } catch {}
  }
  const switchingTrack = currentKey && currentKey !== key;
  let resumeTime = 0;
  
  if (switchingTrack) {
    try { globalAudio.pause(); } catch {}
    resumeTime = 0;
  } else if (globalAudio.src === src && !globalAudio.paused) {
    // Same track is already playing, don't change currentTime
    resumeTime = globalAudio.currentTime;
  } else if (typeof opts.resumeTime === 'number') {
    resumeTime = opts.resumeTime;
  } else if (globalAudio.src === src) {
    // Same track but paused, keep current position
    resumeTime = globalAudio.currentTime;
  }
  
  // Check if we need to change src (normalize paths for comparison)
  const currentSrc = globalAudio.src;
  const normalizedCurrentSrc = currentSrc ? new URL(currentSrc, window.location.href).pathname : '';
  const normalizedNewSrc = new URL(src, window.location.href).pathname;
  
  if (normalizedCurrentSrc !== normalizedNewSrc) {
    globalAudio.src = src;
    resumeTime = 0;
  }
  
  if (gainNode) {
    try { gainNode.gain.value = volume01; } catch {}
  }
  globalAudio.volume = volume01;
  currentKey = key;
  
  // Only set currentTime if we need to change it
  if (resumeTime !== globalAudio.currentTime) {
    try {
      globalAudio.currentTime = resumeTime;
    } catch {}
  }
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

export function toggle(src, key, opts = {}) {
  const isSameTrack = currentKey === key;
  
  if (isSameTrack) {
    if (globalAudio.paused) {
      const resumeTime = opts.resumeTime ?? globalAudio.currentTime;
      play(src, key, { resumeTime });
    } else {
      pause();
    }
    return;
  }

  play(src, key, { resumeTime: opts.resumeTime ?? 0 });
}

export function pause() {
  try { globalAudio.pause(); } catch {}
  notify();
}

export function subscribe(listener) {
  const handler = (e) => listener(e.detail);
  emitter.addEventListener('change', handler);
  // immediate sync
  listener({ currentKey, isPlaying: !globalAudio.paused, currentTime: globalAudio.currentTime });
  return () => emitter.removeEventListener('change', handler);
}

export function getState() {
  return { currentKey, isPlaying: !globalAudio.paused, currentTime: globalAudio.currentTime };
}

export function setVolume01(v) {
  volume01 = Math.min(1, Math.max(0, v));
  if (gainNode) {
    try { gainNode.gain.value = volume01; } catch {}
  }
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


