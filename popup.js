document.getElementById('kaishu').addEventListener('click', () => {
  chrome.storage.sync.set({ fontFamily: 'kaishu' });
});

document.getElementById('zhuyin').addEventListener('click', () => {
  chrome.storage.sync.set({ fontFamily: 'zhuyin' });
});

document.getElementById('none').addEventListener('click', () => {
  chrome.storage.sync.set({ fontFamily: '' });
});
