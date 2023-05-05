const LOCAL_STORAGE = typeof window !== 'undefined' ? window.localStorage : null;

export const storage = {
  get: (key: string): string | null => {
    if (LOCAL_STORAGE) {
      return LOCAL_STORAGE.getItem(key);
    } else {
      return null;
    }
  },
  set: (key: string, value: string): void => {
    if (LOCAL_STORAGE) {
      LOCAL_STORAGE.setItem(key, value);
    }
  },
  remove: (key: string): void => {
    if (LOCAL_STORAGE) {
      LOCAL_STORAGE.removeItem(key);
    }
  },
  clear: (): void => {
    if (LOCAL_STORAGE) {
      LOCAL_STORAGE.clear();
    }
  },
};
