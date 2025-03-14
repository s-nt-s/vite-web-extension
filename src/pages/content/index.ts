import './style.css';

const div = document.createElement('div');
div.id = 'extension_content_script';
div.innerHTML='Content injected by extension'
document.body.appendChild(div);

console.log('content script loaded');
