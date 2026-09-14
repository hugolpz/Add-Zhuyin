(() => {
  const originalText = new Map();
  const convertToTraditional = OpenCC.Converter({ from: 'cn', to: 'tw' });

  function isConvertibleTextNode(node) {
    const parent = node.parentElement;
    return parent && !parent.closest('script, style, textarea, input, select, option, [data-add-zhuyin]');
  }

  function convertPage() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;

    while ((node = walker.nextNode())) {
      if (!isConvertibleTextNode(node) || !node.nodeValue.trim()) {
        continue;
      }

      if (!originalText.has(node)) {
        originalText.set(node, node.nodeValue);
      }
      node.nodeValue = convertToTraditional(originalText.get(node));
    }
  }

  function restorePage() {
    for (const [node, value] of originalText) {
      if (node.isConnected) {
        node.nodeValue = value;
      }
    }
    originalText.clear();
  }

  function applyConversion(fontFamily) {
    if (fontFamily === 'zhuyin') {
      convertPage();
    } else {
      restorePage();
    }
  }

  chrome.storage.sync.get('fontFamily', ({ fontFamily }) => {
    applyConversion(fontFamily);
  });

  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === 'sync' && changes.fontFamily) {
      applyConversion(changes.fontFamily.newValue);
    }
  });
})();
