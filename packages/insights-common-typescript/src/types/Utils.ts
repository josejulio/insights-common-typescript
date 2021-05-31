// Partial all but specified properties
export type SemiPartial<T, K extends keyof T> = Pick<T, K> & Partial<Omit<T, K>>;
