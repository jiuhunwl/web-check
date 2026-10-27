/**
 * Chinese copy for the Astro components: homepage, category pages, check
 * pages, error pages, form controls and the settings panel.
 *
 * Keys are the English source strings exactly as they appear in the markup, so
 * a key that is not listed here simply renders in English. Interpolate with
 * {name} placeholders, keeping the same placeholder names as the source.
 */
const components: Record<string, string> = {
  // Footer
  Footer: '页脚',
  'Security Checker': '安全检查',
  'SEO Checker': 'SEO 检测',
  'Server Checker': '服务器检测',
  'Domain Checker': '域名查询',
  'Email Checker': '邮件配置检查',
  'Performance Checker': '性能检测',
  'Privacy Checker': '隐私检测',

  // Scan form
  'Analyze URL': '开始检测',
  'Enter a URL to start 👇': '输入 URL 开始 👇',
  'Enter a URL to run all {count} checks': '输入 URL，运行全部 {count} 项检测',
  'Enter a URL to run the {check} check': '输入 URL，运行 {check} 检测',

  // Homepage
  'Ready to get started?': '准备开始了吗？',
  'With <a href="/checks">{count} supported checks</a> you can view and analyse key website information in an instant':
    '借助 <a href="/checks">{count} 项检测</a>，可即时查看并分析网站的关键信息',
  'View on GitHub': '在 GitHub 查看',
  'Deploy your Own': '部署自己的实例',
  'We give you X-Ray <br /> Vision for your Website': '为你的网站提供<br />X 光般的透视能力',
  'In just 20 seconds, you can see <span>what attackers already know</span>':
    '只需 20 秒，就能看到<span>攻击者早已掌握的信息</span>',
  '⚠️ Web Check is temporarily disabled due to excess demand and associated costs. We apologize for any inconvenience and are working on a solution.':
    '⚠️ 由于需求激增及相关成本，Web Check 暂时停用。对由此带来的不便深表歉意，我们正在寻找解决方案。',

  // Sponsorship
  'Enjoying Web Check?': 'Web Check 好用吗？',
  "It's free, open source and funded by the community. If it's been useful, sponsoring me on GitHub helps keep it running and ad-free.":
    '它免费、开源，由社区资助维持。如果它对你有用，在 GitHub 上赞助我，可以帮助它继续运行并保持无广告。',
  'Sponsor on GitHub': '在 GitHub 上赞助',

  // Category and check lists
  'What gets checked': '检测项',
  'Other checks': '其他检测',
  'What this tells you': '这些信息说明了什么',
  'What it is': '这是什么',
  'Why it matters': '为什么重要',
  'Key terms': '关键术语',
  'Further reading': '延伸阅读',
  'Related checks': '相关检测',
  'See the {check} check': '查看 {check} 检测',

  // Error page
  'Internal Server Error': '服务器内部错误',
  'Something <em>went wrong</em>': '出了<em>点问题</em>',

  // Settings
  'Applies to the interface, and is remembered on this device':
    '仅影响界面显示，并会在这台设备上记住',
  'Turned on in your device settings': '已在设备设置中开启',
  'None skipped': '无需跳过',

  // Locale names, as Intl.DisplayNames renders them
  English: '英语',
  '中文（简体）': '中文（简体）', // Already Chinese, listed so the option keeps its label
  'German (Germany)': '德语（德国）',
  'British English': '英式英语',
  'American English': '美式英语',
  'European Spanish': '欧洲西班牙语',
  'French (France)': '法语（法国）',
  'Italian (Italy)': '意大利语（意大利）',
  'Japanese (Japan)': '日语（日本）',
  'Dutch (Netherlands)': '荷兰语（荷兰）',
  'Brazilian Portuguese': '巴西葡萄牙语',
  'Chinese (China)': '中文（中国）',
};

export default components;
