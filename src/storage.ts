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

    static async getBool(key: string) {
        const v = await Storage.get<unknown>(key);
        if (typeof v == "boolean") return v;
        return false;
    }

    static async getNum(key: string) {
        const v = await Storage.get<unknown>(key);
        if (typeof v == "number") return v;
        return NaN;
    }

    static async getStr(key: string) {
        const v = await Storage.get<unknown>(key);
        if (typeof v == "string") return v;
        return '';
    }
}
