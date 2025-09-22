// Утилита для объединения классов
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function asset(path) {
  const base = import.meta.env.BASE_URL || '/';
  if (!path) return base;
  return `${base.replace(/\/$/, '')}/${String(path).replace(/^\//, '')}`;
}

export default { cn, asset };








