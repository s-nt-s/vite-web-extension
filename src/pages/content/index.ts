import './style.css';

const div = document.createElement('div');
div.id = '__root';
div.className = 'absolute bottom-0 left-0 text-lg text-black bg-amber-400 z-50';
div.innerHTML = `content script <span class='your-class'>loaded</span>`;
document.body.appendChild(div);

try {
  console.log('content script loaded');
} catch (e) {
  console.error(e);
}
