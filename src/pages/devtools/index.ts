import Browser from 'webextension-polyfill';

Browser
  .devtools
  .panels
  .create('TS Extensión Dev Tools', 'icon-32.png', 'src/pages/devtools/index.html')
  .catch(console.error);
