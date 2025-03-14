import { Storage } from "./storage";

function __safe_get(id: string) {
    if (typeof document == "undefined") return null;
    const n = document.getElementById(id);
    if (n instanceof HTMLElement) return n;
    return null;
}


export class APP {
    static async showStatus() {
        const data_click = "data-click";
        const isDisable = await Storage.getBool("disable");
        if (isDisable) {
            chrome.action.setBadgeText({ text: "OFF" });
            chrome.action.setBadgeBackgroundColor({ color: "gray" });
        } else {
            chrome.action.setBadgeText({ text: "" });
        }
        const btn = __safe_get("toggle-extension");
        if (btn != null) {
            btn.innerHTML = chrome.i18n.getMessage(isDisable?'enable':'disable');
            if (!btn.getAttribute(data_click)) btn.addEventListener('click', APP.toggleStatus);
            btn.setAttribute(data_click, data_click);
        }
    }
    static async toggleStatus() {
        const disable = !await Storage.getBool("disable");
        await Storage.set("disable", disable);
        APP.showStatus();
    }
}