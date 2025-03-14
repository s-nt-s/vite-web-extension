import { Storage } from "./storage";

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
        const btn = document.getElementById("toggle-extension");
        if (btn instanceof HTMLButtonElement) {
            btn.innerHTML = isDisable?'enable':'disable';
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