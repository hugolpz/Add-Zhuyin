
chrome.storage.sync.get('fontFamily', ({ fontFamily }) => {
console.log('Content script is running2');

  /* BASE TOOLS ****************************** * /
  // Inject default CSS file reference
  let link = document.getElementById('add-zhuyin-file');
  if (!link) {
    link = document.createElement('link');
    link.id = 'add-zhuyin-file';
    link.rel = 'stylesheet';
    link.href = chrome.runtime.getURL('css/styles.css');
    document.body.appendChild(link);
  }

  // List references to fonts
  const fonts = [
    {
      family: 'kaishu',
      files: [
        { url: 'https://www.chinois-sans-frontieres.tw/fonts/kaishu/AR_PL_ZenKai_Uni.woff2', format:'woff2' },
        { url: 'https://www.chinois-sans-frontieres.tw/fonts/kaishu/AR_PL_ZenKai_Uni.woff', format:'woff' },
        { url: 'https://www.chinois-sans-frontieres.tw/fonts/kaishu/AR_PL_ZenKai_Uni.ttf', format:'ttf' },
      ]
    },
    {
      family: 'zhuyin',
      files: [
        { url: chrome.runtime.getURL('css/HanWangKaiMediumChuIn.woff2'), format:'woff2' },
        { url: chrome.runtime.getURL('css/HanWangKaiMediumChuIn.woff')}, format:'woff' },
        //{ url: 'https://www.chinois-sans-frontieres.tw/fonts/zhuyin/HanWangKaiMediumChuIn.ttf', format:'ttf' },
        { url: chrome.runtime.getURL('css/HanWangKaiMediumChuIn.ttf'), format:'ttf' },
      ]
    }
  ];
  // Inject references to fonts
  fonts.forEach(font => {
    font.files.forEach(file => {
      let fontLink = document.createElement('link');
      fontLink.rel = 'preload';
      fontLink.href = file.url;
      fontLink.as = 'font';
      fontLink.type = 'font/'+file.format;
      // fontLink.crossOrigin = 'anonymous';
      document.head.appendChild(fontLink);
    });
  });

  /* ADVANCED ****************************** */
  if (fontFamily && fontFamily !== 'none') {
    console.log('fontFamily:', fontFamily);
  // Purge font-family styles from the DOM when loaded
    console.log('Purge font-family styles from the DOM when loaded');
    // Methode 1
    const html = document.documentElement.outerHTML.replace(/font-family:.+?;/g, '');
    document.documentElement.innerHTML = html;
    // Method 2
    const elements = document.querySelectorAll('*');
    elements.forEach(element => {
      element.style.fontFamily = '';
      // element.classList.add('lang-zh');
    });

    // Inject font-family styles into the DOM
    let style = document.getElementById('add-zhuyin');
    if (!style) {
      style = document.createElement('style');
      style.id = 'add-zhuyin';
      document.body.appendChild(style);
    }
    // http://hugolpz.github.io/hanwangfonts/HanWangKai-Font.ttf
    style.textContent = `
    @font-face {
      font-family: 'kaishu';
      src: url('https://www.chinois-sans-frontieres.tw/fonts/kaishu/AR_PL_ZenKai_Uni.woff2') format('woff2'),
          url('https://www.chinois-sans-frontieres.tw/fonts/kaishu/AR_PL_ZenKai_Uni.woff') format('woff'),
          url('https://www.chinois-sans-frontieres.tw/fonts/kaishu/AR_PL_ZenKai_Uni.ttf') format('ttf');
      font-weight: 700;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'zhuyin';
      src: url('https://www.chinois-sans-frontieres.tw/fonts/zhuyin/HanWangKaiMediumChuIn.woff2') format('woff2'),
           url('https://www.chinois-sans-frontieres.tw/fonts/zhuyin/HanWangKaiMediumChuIn.woff') format('woff'),
           url('https://www.chinois-sans-frontieres.tw/fonts/zhuyin/HanWangKaiMediumChuIn.ttf') format('ttf');
      font-weight: 500;
      font-style: normal;
      font-display: swap;
    }
    :lang(zh) *,
    :lang(zh-Hant) *,
    :lang(zh-Hant-TW) *,
    :lang(zh-Hant-HK) * ,
    :lang(zh-Hant-MO) *,
    :lang(zh-Hans) *,
    :lang(zh-Hans-CN) * ,
    :lang(zh-Hans-MY) * ,
    :lang(zh-Hans-SG) * { 
      font-family: '${fontFamily}' !important;
    }`
  }

});
