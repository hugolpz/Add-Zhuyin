


chrome.storage.sync.get('fontFamily', ({ fontFamily }) => {
console.log('Content script is running2');


  function UpdateRibbon(fontFamily) {
    let ribbon = document.querySelector('.webext-ribon');
    if (!ribbon) {
      ribbon = document.createElement('div');
      ribbon.style.height = '4px';
      ribbon.style.width = '100%';
      ribbon.className = `webext-ribon ${fontFamily}`;
      document.body.insertBefore(ribbon, document.body.firstChild);
    } else {
      ribbon.className = `webext-ribon ${fontFamily}`;
    }
  }
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
    UpdateRibbon(fontFamily);
    console.log('fontFamily:', fontFamily);
  // Purge font-family styles from the DOM when loaded
    console.log('Purge font-family styles from the DOM when loaded');
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
      .webext-ribon { position: fixed; top: 0; left: 0; z-index: 9999; }
      .webext-ribon.kaishu { background-color: #0d6efd } /* Bootstrap 5 btn-primary */
      .webext-ribon.zhuyin { background-color: #dc3545 } /* Bootstrap 5 btn-danger */
      .webext-ribon.pinyin { background-color: #198754 } /* Bootstrap 5 btn-success */
      .webext-ribon.none { background-color: #6c757d } /* Bootstrap 5 btn-secondary */
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
      @font-face {
        font-family: 'pinyin';
        src: url('${chrome.runtime.getURL('fonts/Mengshen-HanSerif.ttf')}') format('truetype');
        font-weight: 400;
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
