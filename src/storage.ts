export class Storage {
    static set<T>(key: string, value: T): Promise<void> {
        if (value === null || value === undefined) return Storage.remove(key);
        return new Promise((resolve, reject) => {
            chrome.storage.local.set({ [key]: value }, () => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                } else {
                    resolve();
                }
            });
        });
    }

    static remove(key: string): Promise<void> {
        return new Promise((resolve, reject) => {
            chrome.storage.local.remove(key, () => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                } else {
                    resolve();
                }
            });
        });
    }

    static clear(): Promise<void> {
        return new Promise((resolve, reject) => {
            chrome.storage.local.clear(() => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                } else {
                    resolve();
                }
            });
        });
    }

    static get(key: string): Promise<unknown> {
        return new Promise((resolve, reject) => {
            chrome.storage.local.get(key, (result) => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                } else {
                    const v = result[key] ?? null;
                    resolve(v as unknown);
                }
            });
        });
    }

    private static async __get<T>(key: string, default_value: T) {
        const v = await Storage.get(key);
        if (v == null) return default_value;
        if ((typeof v) != (typeof default_value)) return default_value
        return v as T
    }

    static getBool(key: string) {
        return Storage.__get(key, false);
    }

    static async getNum(key: string) {
        return Storage.__get(key, NaN);
    }

    static async getStr(key: string) {
        return Storage.__get(key, '');
    }
}
