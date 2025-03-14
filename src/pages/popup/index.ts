import '@assets/styles/main.css';
import '@pages/popup/index.css';
import { APP } from "../../app";

console.log('popup loaded');

document.addEventListener("DOMContentLoaded", async() => {
    APP.showStatus();
});
