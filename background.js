chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ fontFamily: '' });
});

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content.js']
  });
});

