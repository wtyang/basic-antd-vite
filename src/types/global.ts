// 全局类型声明

// 通用记录类型
export type RecordAny = Record<string, unknown>;

// 可选属性工具类型
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
