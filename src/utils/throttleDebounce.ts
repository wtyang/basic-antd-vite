// 节流防抖工具

/**
 * 防抖 — 延迟执行，在最后一次调用后等待 delay 毫秒
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return function (...args: Parameters<T>) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
      timer = null;
    }, delay);
  };
}

/**
 * 节流 — 限制执行频率，在 interval 毫秒内最多执行一次
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  interval: number,
): (...args: Parameters<T>) => void {
  let lastTime = 0;
  return function (...args: Parameters<T>) {
    const now = Date.now();
    if (now - lastTime >= interval) {
      lastTime = now;
      fn(...args);
    }
  };
}
