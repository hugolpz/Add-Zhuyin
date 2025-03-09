chrome.storage.sync.get('fontFamily', ({ fontFamily }) => {
  if (fontFamily) {
    const style = document.createElement('style');
    style.textContent = `:lang(zh-Hant) * { font-family: '${fontFamily}' !important; }`;
    document.head.append(style);
  }
});
