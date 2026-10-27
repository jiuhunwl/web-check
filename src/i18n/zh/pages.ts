/**
 * Chinese copy for the server-rendered pages (home, about, glossary, checks
 * index, category and check pages, API docs, self-hosted setup, settings UI).
 *
 * Keys are the English source strings exactly as they appear in the markup, so
 * a key that is not listed here simply renders in English. Interpolate with
 * {name} placeholders, keeping the same placeholder names as the source.
 */
const pages: Record<string, string> = {
  // Page titles (rendered by MetaTags.astro, which keeps the " | Web Check" suffix)
  'Web Check': 'Web Check',
  About: '关于',
  Account: '账户',
  'Every Web Check, Explained': '每一项 Web Check 检测详解',
  'Web Security Glossary': '网站安全术语表',
  API: 'API',
  'API Docs': 'API 文档',
  'Something went wrong': '出了点问题',

  // Results layout
  'Visit {site}': '访问 {site}',

  // About page
  'About Web Check': '关于 Web Check',
  'Web-Check gathers information about a website or host and puts it in one place. Give it a URL, and it collects, collates and presents whatever it can find in the open.':
    'Web-Check 会收集网站或主机的信息，并汇总到一处。给它一个 URL，它就会把公开渠道能查到的内容收集起来、整理好并呈现出来。',
  "The report covers potential attack vectors, the security measures already in place, and the connections between the parts of a site's architecture. The same data is just as useful for the everyday jobs: tuning server responses, untangling redirects, auditing cookies, checking DNS records.":
    '报告涵盖潜在的攻击面、已经部署的安全措施，以及网站架构各部分之间的关联。这些数据在日常工作中同样有用：调整服务器响应、理清重定向、审查 Cookie、核对 DNS 记录。',
  "Whether you're a developer, sysadmin, security researcher, penetration tester, or simply curious about how a particular site is put together, there should be something here worth knowing.":
    '不管你是开发者、系统管理员、安全研究员、渗透测试人员，还是只想弄明白某个网站是怎么搭起来的，这里应该都有值得一看的内容。',
  "It's built and maintained by <a href='https://aliciasykes.com'>Alicia Sykes</a>, and the source is on <a href='https://github.com/lissy93/web-check'>GitHub</a>.":
    "本项目由 <a href='https://aliciasykes.com'>Alicia Sykes</a> 开发和维护，源码托管在 <a href='https://github.com/lissy93/web-check'>GitHub</a>。",
  'All {count} checks, explained': '全部 {count} 项检测详解',
  'Run your own instance': '运行自己的实例',
  'Use the API': '使用 API',

  // About page: support
  'Support the project': '支持这个项目',
  'Web-Check is free to use without restriction.': 'Web-Check 可以免费、无限制地使用。',
  "All the code is open source, so you're also free to deploy your own instance, as well as fork, modify and distribute the code in both private and commercial settings.":
    '所有代码均为开源，所以你也可以自由部署自己的实例，并可在个人和商业场景中 Fork、修改和分发代码。',
  "Running web-check does cost me a small amount of money each month, so if you're finding the app useful, consider <a href='https://github.com/sponsors/Lissy93'>sponsoring me on GitHub</a> if you're able to. Even just $1 or $2/month would be a huge help in supporting the ongoing project running costs.":
    "运行 web-check 每月确实要花我一点钱。如果这个应用对你有帮助，方便的话可以考虑<a href='https://github.com/sponsors/Lissy93'>在 GitHub 上赞助我</a>。哪怕每月只有 1 到 2 美元，对维持项目持续运行也是很大的帮助。",
  "Otherwise, there are other ways you can help out, like submitting or reviewing a pull request to the <a href='https://github.com/Lissy93/web-check'>GitHub repo</a>, upvoting us on <a href='https://www.producthunt.com/posts/web-check'>Product Hunt</a>, or by sharing with your network.":
    "除此之外，也有别的方式可以帮忙：给 <a href='https://github.com/Lissy93/web-check'>GitHub 仓库</a>提交或评审 pull request，在 <a href='https://www.producthunt.com/posts/web-check'>Product Hunt</a> 上为我们投票，或者把它分享给你的朋友和同事。",
  "But don't feel obliged to do anything, as this app (and all my other projects) will always remain 100% free and open source, and I will do my best to ensure the managed instances remain up and available for as long as possible :)":
    '但也完全不必勉强，因为这个应用（以及我其他的所有项目）会始终保持 100% 免费和开源，我也会尽力让托管实例尽可能长时间地稳定运行 :)',

  // About page: fair use
  'Fair use': '合理使用',
  'Please use this tool responsibly. Do not use it for hosts you do not have permission to scan. Do not use it as part of a scheme to attack or disrupt services.':
    '请负责任地使用这个工具。不要扫描你未获授权的主机，也不要把它当作攻击或干扰服务计划的一部分。',
  'Requests may be rate-limited to prevent abuse. If you need more bandwidth, please deploy your own instance.':
    '为防止滥用，请求可能会受到速率限制。如果需要更大的请求量，请自行部署实例。',
  'There is no guarantee of uptime or availability. If you need to make sure the service is available, please deploy your own instance.':
    '不保证正常运行时间和可用性。如果你需要确保服务随时可用，请自行部署实例。',
  'Please use fairly, as excessive use will quickly deplete the lambda function credits, making the service unavailable for others (and/or empty my bank account!).':
    '请合理使用，过度使用会很快耗尽 lambda 函数额度，导致其他人无法使用服务（也可能让我的银行账户见底！）。',

  // About page: privacy
  Privacy: '隐私',
  "Analytics are used on the managed instance, via a self-hosted Plausible instance. This records only the URL you visited, and no personal data. There's also basic error logging, via a self-hosted GlitchTip instance, which is only used to help fix bugs.":
    '托管实例使用统计分析，基于自托管的 Plausible 实例，只记录你访问的 URL，不涉及任何个人数据。另有基础错误日志，基于自托管的 GlitchTip 实例，仅用于帮助修复问题。',
  'Neither your IP address, browser, OS or hardware info, nor any other data will ever be collected or logged. You can verify that yourself, either by inspecting the source code or by using your browser devtools.':
    '你的 IP 地址、浏览器、操作系统或硬件信息，以及其他任何数据都不会被收集或记录。你可以自行验证：查看源码，或者使用浏览器的开发者工具。',

  // About page: license
  License: '许可证',
  "Web Check is distributed under the <a href='https://github.com/lissy93/web-check/blob/master/LICENSE'>MIT license</a>, © <a href='https://aliciasykes.com'>Alicia Sykes</a> {year}. It's free to use, modify and distribute in both personal and commercial settings.":
    "Web Check 以 <a href='https://github.com/lissy93/web-check/blob/master/LICENSE'>MIT 许可证</a>发布，© <a href='https://aliciasykes.com'>Alicia Sykes</a> {year}。无论个人还是商业用途，都可以免费使用、修改和分发。",

  // Account page
  'Account management is currently under development.': '账户管理功能正在开发中。',
  'Once complete, you will be able to login to your account to manage API access, save reports, enable website change notificiations and more!':
    '功能完成后，你可以登录账户来管理 API 访问、保存报告、开启网站变更通知等。',

  // Error pages
  'Web Check hit an error while loading this page. Try again in a moment, and if it keeps happening, please report it.':
    'Web Check 在加载这个页面时出错了。请稍后重试；如果问题持续出现，请反馈给我们。',

  // Check page
  Checks: '检测项',
  'Enter a URL': '输入 URL',

  // Checks index
  'Every check, explained': '每项检测详解',
  'Web Check runs {count} checks across {categories} categories. Each one is documented below: what it looks at, why it matters, and the standards behind it.':
    'Web Check 会在 {categories} 个分类下运行 {count} 项检测。下面逐一说明每项检测：它检查什么、为什么重要，以及背后的标准。',
  'Web Check gathers the data. Interpreting it is still your job.':
    'Web Check 负责收集数据，如何解读仍然由你判断。',
  'Enter a URL to run the full report': '输入 URL，运行完整报告',
  'All checks': '全部检测',
  'Browse by category': '按分类浏览',

  // Glossary
  'Web security glossary': '网站安全术语表',
  'Quick reference for the terms used for website security and OSINT.':
    '网站安全与 OSINT 相关术语的速查参考。',
  'Glossary sections': '术语表章节',
  Certificates: '证书',
  TLS: 'TLS',
  'TLS vulnerabilities': 'TLS 漏洞',
  HSTS: 'HSTS',
  'Security headers': '安全响应头',
  'Page content': '页面内容',
  Email: '电子邮件',
  Domains: '域名',
  DNS: 'DNS',
  'Hosting and network': '托管与网络',
  'Threats and reputation': '威胁与信誉',
  'security.txt': 'security.txt',
  'Quality and visibility': '质量与可见性',

  // Self-hosted setup
  'Self-Hosted Setup': '自托管部署',
  'Get your own free instance of Web Check, running locally or on your server.':
    '在自己的电脑或服务器上运行属于你的免费 Web Check 实例。',
  Configuration: '配置',
  "Web Check runs without any configuration, so everything below is optional.<br />Set values as environment variables, in <code>.env</code>, your host's dashboard, or with <code>docker run -e</code>.":
    'Web Check 无需任何配置即可运行，下面列出的都是可选项。<br />可以通过 <code>.env</code>、主机控制面板，或 <code>docker run -e</code> 设置环境变量。',

  // Self-hosted setup: deployment options
  'Deploy with Docker': '使用 Docker 部署',
  "Just one command, and you'll have your own Web Check instance running on your server in minutes.":
    '只需一条命令，几分钟内就能在自己的服务器上跑起 Web Check 实例。',
  '1-Click Deploy': '一键部署',
  "Don't have a server? Not a problem! Deploy Web Check with one click on Vercel, Netlify, Render or Hostinger.":
    '没有服务器？也没问题。可以在 Vercel、Netlify、Render 或 Hostinger 上一键部署 Web Check。',
  'Build from Source': '从源码构建',
  'Want to customize Web Check? Clone the repository and deploy it on your server.':
    '想定制 Web Check？克隆仓库，然后部署到你自己的服务器上。',

  // Self-hosted setup: API keys
  'API keys': 'API 密钥',
  'Unlock extra checks, or raise rate limits on the external APIs some checks use.':
    '解锁更多检测项，或提高部分检测所依赖的外部 API 的速率限制。',
  'Runs the quality and Safe Browsing checks. Enable the PageSpeed Insights and Safe Browsing APIs for it':
    '用于运行质量检测和 Safe Browsing 检测。需要为它启用 PageSpeed Insights 和 Safe Browsing API',
  'Runs the host names, server info and vulnerabilities checks':
    '用于运行主机名、服务器信息和漏洞检测',
  'Adds the Cloudmersive website scan to the threats check': '为威胁检测增加 Cloudmersive 网站扫描',
  'Raises the Tranco rate limit for the rank check': '提高排名检测所用的 Tranco 速率限制',
  'Your Tranco account email, used with the key above':
    '你的 Tranco 账户邮箱，与上面的密钥配合使用',
  'Raises the GitHub rate limit for the social presence check':
    '提高社交存在检测所用的 GitHub 速率限制',
  'Raises the CertSpotter rate limit for the subdomains check':
    '提高子域名检测所用的 CertSpotter 速率限制',

  // Self-hosted setup: server settings
  Settings: '设置',
  'Change how the server and API behave. The frontend reads PUBLIC_ values at build time, so rebuild after changing them.':
    '调整服务器和 API 的行为。前端会在构建时读取 PUBLIC_ 开头的变量，修改后需要重新构建。',
  'Port the server listens on': '服务器监听的端口',
  'Serve only the API, without the web interface': '只提供 API，不启动 Web 界面',
  'Where the frontend sends API requests': '前端发送 API 请求的地址',
  'Timeout for each check, in milliseconds': '每项检测的超时时间，单位为毫秒',
  'Rate-limit requests to the API': '对 API 请求进行速率限制',
  'Origin allowed to call the API. Defaults to any': '允许调用 API 的来源，默认为任意来源',
  'If set, only these checks run': '设置后只运行这些检测',
  'Checks to turn off': '要关闭的检测',
  'Hosts, IPs or CIDR ranges that must never be scanned': '禁止扫描的主机、IP 或 CIDR 网段',
  'Ports the open ports check scans': '开放端口检测要扫描的端口',
  'Path to Chromium, for screenshots, tech stack and trackers':
    'Chromium 的路径，供截图、技术栈和跟踪器检测使用',
  'Set behind a reverse proxy, as a hop count, true, or CIDR list':
    '部署在反向代理后面时设置，可填跳数、true 或 CIDR 列表',
  'One of debug, info, warn, error or silent': '可选 debug、info、warn、error 或 silent',
  '(e.g.<code>{example}</code>)': '（例如<code>{example}</code>）',
  'Get a key': '获取密钥',

  // API pages
  'API Documentation': 'API 文档',
  'View listing of all available endpoints, their usage, output and examples.':
    '查看所有可用接口的列表、用法、输出和示例。',
  'OpenAPI Spec': 'OpenAPI 规范',
  'API Key': 'API 密钥',
  'Get your API key, and start using the API.': '获取你的 API 密钥，开始使用 API。',
  'Sign Up': '注册',
  'API Source': 'API 源码',
  'View, edit, download or deploy the API from source.': '从源码查看、编辑、下载或部署 API。',
  "The Web Check API gives you programatic access to over 30 categories of web metrics.<br />Integrate into your own workflows and applications, to monitor any website's performance, SEO, security, and more.":
    'Web Check API 让你以编程方式访问 30 多个类别的网站指标。<br />可以接入到你自己的工作流和应用中，用来监控任意网站的性能、SEO、安全性等。',
};

export default pages;
