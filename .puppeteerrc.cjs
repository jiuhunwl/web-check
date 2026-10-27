// Chromium is not needed to build the site, and downloading it during
// `yarn install` makes CI builds slow and flaky. Browser-based checks are
// served by api/_common/browser.js at runtime instead (Docker / self-hosted).
/** @type {import('puppeteer').Configuration} */
module.exports = {
  skipDownload: true,
};
