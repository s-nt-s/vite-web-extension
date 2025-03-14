import '@assets/styles/main.css';
import '@pages/options/index.css';
import { APP } from "../../app";

console.log('options tab loaded');

document.addEventListener("DOMContentLoaded", async() => {
    APP.showStatus();
});
