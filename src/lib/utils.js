// Утилита для объединения классов
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function asset(path) {
  if (!path) {
    return import.meta.env.BASE_URL || '/';
  }
  
  // В Vite файлы из public/ доступны напрямую по абсолютным путям
  // Просто нормализуем путь: убираем лишние слэши
  let cleanPath = String(path).trim();
  
  // Убираем leading slash если есть
  if (cleanPath.startsWith('/')) {
    cleanPath = cleanPath.slice(1);
  }
  
  // Получаем base URL
  const base = import.meta.env.BASE_URL;
  
  // Если base не определен или корневой, возвращаем путь с ведущим слэшем
  if (!base || base === '/' || base === '') {
    return `/${cleanPath}`;
  }
  
  // Если base определен и не корневой (для GitHub Pages), добавляем его
  const cleanBase = base.replace(/\/$/, '');
  return `${cleanBase}/${cleanPath}`;
}

export default { cn, asset };








