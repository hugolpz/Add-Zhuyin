function setFontFamilyAndReload(fontFamily) {
  document.getElementById(fontFamily).addEventListener('click', () => {
    chrome.storage.sync.set({ fontFamily }, () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
            chrome.tabs.reload(tabs[0].id);
        }
      });
    });
    console.log(`Switch to: ${fontFamily}`);
  })
}

setFontFamilyAndReload('kaishu');
setFontFamilyAndReload('zhuyin');
setFontFamilyAndReload('none');
