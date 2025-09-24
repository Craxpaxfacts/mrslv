// Safe haptics helpers for Capacitor builds. No-ops on the web.
// We intentionally avoid importing '@capacitor/haptics' to keep web build lean
// and prevent bundler errors if Capacitor isn't installed.

const isCapacitorNative = () => {
  try {
    const c = typeof window !== 'undefined' ? window.Capacitor : undefined;
    if (!c) return false;
    if (typeof c.isNativePlatform === 'function') return !!c.isNativePlatform();
    // Fallback heuristic
    return c?.platform && c.platform !== 'web';
  } catch {
    return false;
  }
};

export function selectionTick() {
  try {
    // 1) Capacitor native: prefer Taptic selectionChanged
    if (isCapacitorNative()) {
      const plugin = window?.Capacitor?.Plugins?.Haptics;
      if (plugin && typeof plugin.selectionChanged === 'function') {
        plugin.selectionChanged();
        return;
      }
      // Some older builds expose impact
      if (plugin && typeof plugin.impact === 'function') {
        plugin.impact({ style: 'light' });
        return;
      }
    }

    // 2) Web fallback (Android Chrome typically): short vibrate
    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
      navigator.vibrate(10);
    }
  } catch {
    // swallow errors to avoid breaking UI
  }
}

export default { selectionTick };


