import { APP } from "../../app";

console.log('background script loaded');

chrome.runtime.onStartup.addListener(() => {
    APP.showStatus();
});
chrome.runtime.onInstalled.addListener(() => {
    APP.showStatus();
});