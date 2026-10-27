// Runs before first paint: sets <html lang> and holds the page back for a beat
// while the Chinese copy is applied, so nobody sees English flash into Chinese.
(() => {
  const resolve = () => {
    let saved = null;
    try {
      saved = JSON.parse(localStorage.getItem('language'));
    } catch {
      saved = null;
    }
    if (saved === 'en' || saved === 'zh-CN') return saved;
    const tags = navigator.languages?.length ? navigator.languages : [navigator.language];
    return String(tags[0] || '').toLowerCase().startsWith('zh') ? 'zh-CN' : 'en';
  };

  const lang = resolve();
  const root = document.documentElement;
  root.lang = lang;
  root.dataset.lang = lang;
  if (lang !== 'en') {
    root.classList.add('lang-zh');
    root.setAttribute('data-i18n-pending', '');
  }
})();
