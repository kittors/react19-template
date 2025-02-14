// utils/cacheUtils.ts

const localStorageAvailable = (): boolean => {
  try {
    const storage = window.localStorage;
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e: any) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      Storage &&
      Storage.length !== 0
    );
  }
};

const sessionStorageAvailable = (): boolean => {
  try {
    const storage = window.sessionStorage;
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e: any) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      Storage &&
      Storage.length !== 0
    );
  }
};

const canUseLocalStorage: boolean = localStorageAvailable();
const canUseSessionStorage: boolean = sessionStorageAvailable();

type StorageType = "localStorage" | "sessionStorage";

interface CacheItem<T> {
  value: T;
  expirationTime: number | null;
}

/**
 * 设置缓存
 * @param {string} key 缓存的键
 * @param {T} value 缓存的值 (会被 JSON.stringify)
 * @param {StorageType} storageType 缓存类型，'localStorage' 或 'sessionStorage'，默认为 'localStorage'
 * @param {number} [expirationTime=null] 过期时间，单位为秒。 如果为 null，则永不过期
 */
export const setCache = <T>(
  key: string,
  value: T,
  storageType: StorageType = "localStorage",
  expirationTime: number | null = null,
): void => {
  const storage =
    storageType === "localStorage"
      ? window.localStorage
      : window.sessionStorage;
  const canUseStorage =
    storageType === "localStorage" ? canUseLocalStorage : canUseSessionStorage;

  if (!canUseStorage) {
    console.warn(`${storageType} is not available. Cache will not be set.`);
    return;
  }

  try {
    const item: CacheItem<T> = {
      value: value,
      expirationTime: expirationTime
        ? Date.now() + expirationTime * 1000
        : null,
    };
    storage.setItem(key, JSON.stringify(item));
  } catch (error) {
    console.error("Failed to set cache:", error);
  }
};

/**
 * 获取缓存
 * @param {string} key 缓存的键
 * @param {StorageType} storageType 缓存类型，'localStorage' 或 'sessionStorage'，默认为 'localStorage'
 * @returns {T | null} 缓存的值，如果缓存不存在或已过期，则返回 null
 */
export const getCache = <T>(
  key: string,
  storageType: StorageType = "localStorage",
): T | null => {
  const storage =
    storageType === "localStorage"
      ? window.localStorage
      : window.sessionStorage;
  const canUseStorage =
    storageType === "localStorage" ? canUseLocalStorage : canUseSessionStorage;

  if (!canUseStorage) {
    console.warn(
      `${storageType} is not available. Cache will not be retrieved.`,
    );
    return null;
  }

  try {
    const serializedItem: string | null = storage.getItem(key);
    if (!serializedItem) {
      return null;
    }

    const item: CacheItem<T> = JSON.parse(serializedItem);

    if (item.expirationTime && Date.now() > item.expirationTime) {
      // 缓存已过期，清除缓存
      removeCache(key, storageType);
      return null;
    }

    return item.value;
  } catch (error) {
    console.error("Failed to get cache:", error);
    return null;
  }
};

/**
 * 移除缓存
 * @param {string} key 缓存的键
 * @param {StorageType} storageType 缓存类型，'localStorage' 或 'sessionStorage'，默认为 'localStorage'
 */
export const removeCache = (
  key: string,
  storageType: StorageType = "localStorage",
): void => {
  const storage =
    storageType === "localStorage"
      ? window.localStorage
      : window.sessionStorage;
  const canUseStorage =
    storageType === "localStorage" ? canUseLocalStorage : canUseSessionStorage;

  if (!canUseStorage) {
    console.warn(`${storageType} is not available. Cache will not be removed.`);
    return;
  }

  try {
    storage.removeItem(key);
  } catch (error) {
    console.error("Failed to remove cache:", error);
  }
};

/**
 * 清除所有缓存
 * @param {StorageType} storageType 缓存类型，'localStorage' 或 'sessionStorage'，默认为 'localStorage'
 */
export const clearCache = (storageType: StorageType = "localStorage"): void => {
  const storage =
    storageType === "localStorage"
      ? window.localStorage
      : window.sessionStorage;
  const canUseStorage =
    storageType === "localStorage" ? canUseLocalStorage : canUseSessionStorage;

  if (!canUseStorage) {
    console.warn(`${storageType} is not available. Cache will not be cleared.`);
    return;
  }

  try {
    storage.clear();
  } catch (error) {
    console.error("Failed to clear cache:", error);
  }
};
