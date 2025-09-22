// src/lib/audioController.js

const globalAudio = new Audio();
let currentKey = null;
let volume01 = 1;

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
  globalAudio.volume = volume01;
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
  globalAudio.volume = volume01;
}

export function getVolume01() { return volume01; }

export default { play, toggle, pause, subscribe, getState, setVolume01, getVolume01 };


