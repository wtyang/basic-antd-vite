// 格式化工具

/**
 * 格式化价格（分 → 元）
 */
export function formatPrice(
  price: number,
  options: { unit?: '分' | '元'; decimal?: number } = {},
): string {
  const { unit = '分', decimal = 2 } = options;
  const value = unit === '分' ? price / 100 : price;
  return `¥${value.toFixed(decimal)}`;
}

/**
 * 格式化日期
 */
export function formatDate(
  date: string | number | Date,
  format = 'YYYY-MM-DD HH:mm:ss',
): string {
  const d = new Date(date);
  const map: Record<string, string> = {
    YYYY: String(d.getFullYear()),
    MM: String(d.getMonth() + 1).padStart(2, '0'),
    DD: String(d.getDate()).padStart(2, '0'),
    HH: String(d.getHours()).padStart(2, '0'),
    mm: String(d.getMinutes()).padStart(2, '0'),
    ss: String(d.getSeconds()).padStart(2, '0'),
  };
  let result = format;
  Object.entries(map).forEach(([key, value]) => {
    result = result.replace(key, value);
  });
  return result;
}

/**
 * 格式化文件大小
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${units[i]}`;
}
