document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get('fontFamily', ({ fontFamily }) => {
    if (fontFamily) {
      document.getElementById(fontFamily).checked = true;
    }
  });

  document.getElementById('save').addEventListener('click', () => {
    const selectedFont = document.querySelector('input[name="fontFamily"]:checked').value;
    chrome.storage.sync.set({ fontFamily: selectedFont });
  });
});
