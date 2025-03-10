chrome.storage.sync.get('fontFamily', ({ fontFamily }) => {
  if (fontFamily) {
    let style = document.getElementById('add-zhuyin');
    if (!style) {
      style = document.createElement('style');
      style.id = 'add-zhuyin';
      document.head.append(style);
    }
    style.textContent = `:lang(zh-Hant) * { font-family: '${fontFamily}' !important; }`;
  }

  // Inject the CSS file
  let link = document.getElementById('zhuyin-styles');
  if (!link) {
    link = document.createElement('link');
    link.id = 'zhuyin-styles';
    link.rel = 'stylesheet';
    link.href = chrome.runtime.getURL('css/styles.css');
    document.head.append(link);
  }

  // Inject the fonts dynamically
  const fonts = [
    {
      family: 'kaishu',
      urls: [
        'https://www.chinois-sans-frontieres.tw/fonts/kaishu/AR_PL_ZenKai_Uni.woff2',
        'https://www.chinois-sans-frontieres.tw/fonts/kaishu/AR_PL_ZenKai_Uni.woff',
        'https://www.chinois-sans-frontieres.tw/fonts/kaishu/AR_PL_ZenKai_Uni.ttf'
      ]
    },
    {
      family: 'zhuyin',
      urls: [
        'https://www.chinois-sans-frontieres.tw/fonts/zhuyin/HanWangKaiMediumChuIn.woff2',
        'https://www.chinois-sans-frontieres.tw/fonts/zhuyin/HanWangKaiMediumChuIn.woff',
        'https://www.chinois-sans-frontieres.tw/fonts/zhuyin/HanWangKaiMediumChuIn.ttf'
      ]
    }
  ];

  fonts.forEach(font => {
    font.urls.forEach(url => {
      let fontLink = document.createElement('link');
      fontLink.rel = 'preload';
      fontLink.href = url;
      fontLink.as = 'font';
      fontLink.type = 'font/woff2';
      fontLink.crossOrigin = 'anonymous';
      document.head.append(fontLink);
    });
  });
});
