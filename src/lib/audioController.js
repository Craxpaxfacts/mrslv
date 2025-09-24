// src/lib/audioController.js

const globalAudio = new Audio();
let currentKey = null;
let volume01 = 1;
const preloadCache = new Map(); // src -> HTMLAudioElement

// --- WebAudio pipeline for reliable volume control (iOS-safe) ---
let audioCtx = null;
let gainNode = null;
let mediaSource = null;

function ensureAudioGraph() {
  try {
    if (!audioCtx) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return false;
      audioCtx = new Ctx();
    }
    if (!mediaSource) {
      mediaSource = audioCtx.createMediaElementSource(globalAudio);
    }
    if (!gainNode) {
      gainNode = audioCtx.createGain();
      gainNode.gain.value = volume01;
    }
    // Connect once
    if (mediaSource && gainNode) {
      try { mediaSource.disconnect(); } catch {}
      try { gainNode.disconnect(); } catch {}
      mediaSource.connect(gainNode);
      gainNode.connect(audioCtx.destination);
    }
    return true;
  } catch { return false; }
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
  if (currentKey && currentKey !== key) {
    try { globalAudio.pause(); } catch {}
  }
  if (globalAudio.src !== src) {
    globalAudio.src = src;
  }
  // Ensure WebAudio graph is ready so volume works everywhere
  const ok = ensureAudioGraph();
  if (ok && audioCtx?.state === 'suspended') {
    try { audioCtx.resume(); } catch {}
  }
  if (gainNode) {
    try { gainNode.gain.value = volume01; } catch {}
  } else {
    globalAudio.volume = volume01;
  }
  currentKey = key;
  globalAudio.play();
  notify();
}

export function toggle(src, key) {
  if (currentKey === key && !globalAudio.paused) {
    pause();
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
  // Route to WebAudio GainNode if available; fallback to element volume
  if (gainNode) {
    try { gainNode.gain.value = volume01; } catch { globalAudio.volume = volume01; }
  } else {
    globalAudio.volume = volume01;
  }
}

export function getVolume01() { return volume01; }

// Best-effort preload to reduce start delay on swipe
export function preload(src) {
  try {
    if (!src || preloadCache.has(src)) return;
    const a = new Audio();
    a.preload = 'auto';
    a.src = src;
    // kick off download
    if (typeof a.load === 'function') {
      a.load();
    }
    preloadCache.set(src, a);
    // simple LRU cap to 4 items
    if (preloadCache.size > 4) {
      const firstKey = preloadCache.keys().next().value;
      preloadCache.delete(firstKey);
    }
  } catch {}
}

export default { play, toggle, pause, subscribe, getState, setVolume01, getVolume01, preload };


