import type { CheckDocZh } from './zh';
import type { CheckId } from './index';

/** Chinese docs, part B: tech-stack through subdomains. */
export const partB: Partial<Record<CheckId, CheckDocZh>> = {
  'tech-stack': {
    title: '技术栈',
    summary: '网站使用的框架、分析工具与服务',
    description:
      '抓取页面，再用 Wappalyzer 的指纹库逐一比对。这个库收集了大量正则表达式，用来识别不同技术在页面标记、响应头、脚本路径和 Cookie 名称里留下的痕迹。',
    use:
      '知道框架、CMS、分析工具和支付服务商，能缩小值得排查的漏洞范围，也看得出有哪些第三方参与了这个页面的输出。检测是推断而非结论，尤其是报出来的版本号，经常是错的。',
    resources: {
      'Wappalyzer fingerprints (community fork)': 'Wappalyzer 指纹库（社区分支）',
      'BuiltWith - Check what tech a site is using': 'BuiltWith - 查看网站使用的技术',
    },
  },
  sitemap: {
    title: '站点地图',
    summary: '网站在自己的站点地图里列出的页面',
    description:
      '找到并解析站点的站点地图。这个文件用来列出站长希望搜索引擎抓取的页面，通常还给每个页面附上最后修改时间和优先级。',
    use:
      '这是网站自己给出的目录。站长可以用它确认站点地图可访问、能解析、内容该有的都有；其他人则不必爬站，就能看出一个站点的结构。',
    resources: {
      'Learn about Sitemaps': '了解站点地图',
      'Sitemap XML spec': '站点地图 XML 规范',
      'Sitemap tutorial': '站点地图教程',
    },
  },
  'security-txt': {
    title: 'security.txt',
    summary: 'security.txt 文件，以及其中的漏洞报告联系方式',
    description:
      'security.txt 告诉研究人员如何报告安全问题。RFC 9116 规定了格式：至少要有联系地址和过期时间，之后可以选填披露政策、PGP 公钥和首选语言。文件应放在 /.well-known/security.txt。',
    use:
      '没有公开的联系方式，发现漏洞的人要么放弃，要么把它发到某个公开的地方。这份文件本身也有信息量：内容新而完整，说明有团队在等着接收报告；其中的 PGP 公钥还自带元数据。',
    resources: {
      'securitytxt.org': 'securitytxt.org',
      'RFC-9116 Proposal': 'RFC-9116 提案',
      'RFC-9116 History': 'RFC-9116 历史',
      'Security.txt (Wikipedia)': 'security.txt（Wikipedia）',
      'Example security.txt (Cloudflare)': 'security.txt 示例（Cloudflare）',
      'Tutorial for creating security.txt (Pieter Bakker)':
        'security.txt 编写教程（Pieter Bakker）',
    },
  },
  'linked-pages': {
    title: '外链页面',
    summary: '页面 a 标签中收集到的内部与外部链接',
    description: '从页面的 a 标签中收集全部链接，并分为内部和外部两类。',
    use:
      '内部链接反映站点怎么组织，偶尔还会指向本不打算公开的页面。外部链接说明站点愿意把访客送去哪里，这关系到声誉，也是发现被入侵的线索：被注入的垃圾链接最先出现在这里。',
    resources: {
      'W3C Link Checker': 'W3C 链接检查器',
    },
  },
  'social-tags': {
    title: '社交标签',
    summary: '站点被分享时使用的 Open Graph 与 Twitter 标签',
    description:
      '读取那些告诉搜索引擎和社交平台如何展示页面的元标签：标题、描述、预览图、作者、规范 URL，以及关联的社交账号。它们大多遵循 Open Graph 或 Twitter Card 的约定。',
    use:
      '这是网站在认为有机器在读它时，对自己的描述。预览用的标题和描述常常与页面上可见的文字不同，这些标签里也经常出现别处看不到的作者、社交账号或母公司。',
    resources: {
      'SocialSharePreview.com': 'SocialSharePreview.com',
      'The guide to social meta tags': '社交元标签指南',
      'Web.dev metadata tags': 'Web.dev 元数据标签',
      'Open Graph Protocol': 'Open Graph 协议',
      'Twitter Cards (archived)': 'Twitter Cards（存档）',
      'Facebook Open Graph': 'Facebook Open Graph',
    },
  },
  'social-presence': {
    title: '社交账号',
    summary: '站点声明的社交账号，以及它们是否反向链回',
    description:
      '通过读取元标签、结构化数据和 rel="me" 链接，找出网站声称属于自己的社交账号，再逐个到对应平台上核对。Bluesky 还会直接对域名做检查，因为在那边用户名可以是域名本身。所有查询都走免费公开的接口，不需要 API 密钥或账号。',
    use:
      '确认网站指向的账号确实存在，并且反过来也指向这个网站。对不上就值得知道：钓鱼页面经常冒用它所仿冒品牌的社交账号，而单向的链接并不能证明账号归谁所有。',
    resources: {
      'IndieWeb: rel-me': 'IndieWeb：rel-me',
      'Mastodon link verification': 'Mastodon 链接验证',
      'Bluesky domain handles': 'Bluesky 域名用户名',
      'Schema.org sameAs': 'Schema.org sameAs',
    },
  },
  'mail-config': {
    title: '邮件配置',
    summary: '用于收发邮件的 MX、SPF、DKIM 与 DMARC 记录',
    description:
      'MX 记录指明哪些服务器接收这个域名的邮件。SPF 列出允许为它发信的服务器。DKIM 公布一个公钥，收件方用它确认邮件由该域名签名、且途中未被改动；Web Check 只在常见的选择器名称下查找，所以「未找到」并不能证明没有密钥。DMARC 告诉收件方 SPF 和 DKIM 都没通过的邮件该怎么处理。策略为 none 时只是观察，因此只有设成 quarantine 或 reject，检查清单才会勾上 DMARC。BIMI 是可选的标识图，多数域名并不配置。MTA-STS 和 DANE 要求其他邮件服务器只通过经过验证的加密连接向本域名投递，TLS-RPT 则请它们在做不到时上报。',
    use:
      '没有 quarantine 或 reject 的 DMARC 策略，任何人都能以这个域名作为发件人发信。单靠 SPF 挡不住，因为它检查的是隐藏的信封地址，不是人们看到的那个。配置出错也会伤到域名自己的邮件：如果有两条 SPF 记录，或者一条需要超过 10 次 DNS 查询，那么每封邮件的 SPF 都会失败。MX 主机和 SPF 中的 include 会点名邮件服务商和许多被允许发信的供应商，是快速摸清一家机构与谁合作的途径。',
    resources: {
      'Intro to DMARC, DKIM, and SPF (via Cloudflare)': 'DMARC、DKIM 与 SPF 入门（Cloudflare）',
      'EasyDMARC Domain Scanner': 'EasyDMARC 域名扫描器',
      'MX Toolbox': 'MX Toolbox',
      'RFC-7208 - SPF': 'RFC-7208 - SPF',
      'RFC-6376 - DKIM': 'RFC-6376 - DKIM',
      'RFC-7489 - DMARC': 'RFC-7489 - DMARC',
      'BIMI Group': 'BIMI Group',
    },
  },
  firewall: {
    title: '防火墙',
    summary: '站点前面是否有 Web 应用防火墙，是哪一款',
    description:
      '检测互联网与站点之间是否隔着一层 Web 应用防火墙，以及是哪一款。WAF 会过滤 HTTP 流量，拦下 SQL 注入、跨站脚本和文件包含这类常见攻击。',
    use:
      'WAF 会改变其他每一项检测的含义，因为你拿到的响应可能来自过滤器，而不是它后面的应用。知道是哪款产品，也就知道正在用哪套规则；而 WAF 自身同样有绕过手法和漏洞。',
    resources: {
      'What is a WAF (via Cloudflare Learning)': '什么是 WAF（Cloudflare 学习中心）',
      'OWASP - Web Application Firewalls': 'OWASP - Web 应用防火墙',
      'Web Application Firewall Best Practices': 'Web 应用防火墙最佳实践',
      'WAF - Wiki': 'WAF - Wiki',
    },
  },
  'http-security': {
    title: 'HTTP 安全',
    summary: 'CSP、X-Frame-Options、nosniff 等防护性响应头',
    description:
      '检查那些让站点能抵御浏览器端攻击的响应头。HSTS 强制使用 HTTPS。Content-Security-Policy 限制脚本、样式和其他资源可以从哪里加载，是防御跨站脚本的主要手段。X-Content-Type-Options 阻止浏览器自行猜测已声明的内容类型。X-Frame-Options 控制页面能否被嵌入框架，这正是防止点击劫持的关键。',
    use:
      '这些响应头加上的成本为零，却经常干脆没有。一个全都没有的站点未必可被利用，但它主动放弃了浏览器本会替它执行的几层防护。光是存在也不够，允许内联脚本的 CSP 拦不住多少东西。',
    resources: {
      'OWASP Secure Headers Project': 'OWASP 安全响应头项目',
      'HTTP Header Cheatsheet': 'HTTP 响应头速查表',
      'content-security-policy.com': 'content-security-policy.com',
      'resourcepolicy.fyi': 'resourcepolicy.fyi',
      'HTTP Security Headers': 'HTTP 安全响应头',
      'Mozilla HTTP Observatory': 'Mozilla HTTP Observatory',
      'CSP Docs': 'CSP 文档',
      'HSTS Docs': 'HSTS 文档',
      'X-Content-Type-Options Docs': 'X-Content-Type-Options 文档',
      'X-Frame-Options Docs': 'X-Frame-Options 文档',
      'X-XSS-Protection Docs': 'X-XSS-Protection 文档',
    },
  },
  'mixed-content': {
    title: '混合内容',
    summary: '页面中的不安全资源，以及缺少 SRI 的第三方脚本',
    description:
      '混合内容是 HTTPS 页面以明文 HTTP 加载或提交的任何东西，包括脚本、样式表、框架、图片、媒体和表单数据。这些请求不加密传输，所以那把锁并不覆盖整个页面。Subresource Integrity（SRI）是写在 script 标签上的哈希，告诉浏览器该收到哪个文件，一旦副本被改动就拒绝运行。',
    use:
      '通过明文 HTTP 取回的脚本，网络上的任何人都能替换，而它随后就完全控制了页面。浏览器现在会拦下这类请求，攻击因此失败，但页面也跟着坏掉。SRI 针对的是另一种风险。2018 年攻击者改动了 Browsealoud 无障碍脚本，约 4000 个加载了它的站点（包括英国的数据监管机构）在访客那里跑起了挖矿程序。若有完整性哈希，浏览器会拒绝被改动的文件。分析标签这类经常变化的脚本用不了 SRI，只能靠信任服务商。',
    resources: {
      'Mixed Content (via MDN)': '混合内容（MDN）',
      'Subresource Integrity (via MDN)': 'Subresource Integrity（MDN）',
      'W3C - Mixed Content': 'W3C - 混合内容',
      'W3C - Subresource Integrity': 'W3C - Subresource Integrity',
      'Integrity-Policy (via MDN)': 'Integrity-Policy（MDN）',
      'SRI Hash Generator': 'SRI 哈希生成器',
      'Browsealoud Attack (via TechCrunch)': 'Browsealoud 攻击事件（TechCrunch）',
    },
  },
  archives: {
    title: '历史存档',
    summary: '借助 Wayback Machine 看站点历来的变化',
    description:
      '从 Internet Archive 的 Wayback Machine 取回这个站点的抓取历史，显示它在何时被爬取、频率如何。',
    use:
      '存档留存着网站过去说过的话。旧快照里会翻出已删除的页面、前任所有者、员工名单、价格，以及被悄悄改掉的文案。抓取频率本身也粗略反映这个站点受过多少关注。',
    resources: {
      'Wayback Machine': 'Wayback Machine',
    },
  },
  rank: {
    title: '网站排名',
    summary: '站点若在全球前一百万内，显示 Tranco 排名',
    description:
      '查询域名在 Tranco 榜单中的位置。该榜单把 Umbrella、Majestic、Quantcast、Chrome User Experience Report 和 Cloudflare Radar 的排名合并成一份刻意保持稳定的百万名单，不在这百万之内的站点没有排名。',
    use:
      '用来大致感受规模，更适合横向比较域名，而不是孤立地看一个数字。Tranco 在一段时间上取平均，变动因此缓慢，这正是它的用意：早期榜单日复一日地剧烈变动，让人没法拿来做研究。',
    resources: {
      'Tranco List': 'Tranco 榜单',
      'Tranco Research Paper': 'Tranco 研究论文',
    },
  },
  'block-lists': {
    title: '黑名单',
    summary: '隐私、恶意软件与家长控制类解析器是否拦截该站点',
    description:
      '通过十多个会过滤内容的公共 DNS 解析器查询该域名：广告与追踪器拦截、恶意软件过滤，以及家庭或家长控制服务。每一个要么返回真实地址，要么返回被拦截的应答。',
    use:
      '被过滤型解析器拦下，不等于站点恶意，但确实意味着一部分用户完全打不开它。站长很少察觉，因为从内部看这个拦截是隐形的。哪几类过滤器反对它，大致说明这个域名被认为是什么。',
    resources: {
      'DNS-based Blocklists (Wikipedia)': '基于 DNS 的黑名单（Wikipedia）',
    },
  },
  threats: {
    title: '威胁情报',
    summary: '站点是否出现在常见的恶意软件与钓鱼名单上',
    description:
      '用公开的恶意软件和钓鱼情报源比对域名，目前是 URLHaus 和 PhishTank，两者都依靠社区上报并持续更新。',
    use:
      '上榜是强证据，没上榜则是弱证据，因为这些情报源只知道有人报告过的东西。新注册的钓鱼域名在头几天往往不在任何名单上，而那恰恰是它们干活的时候。',
    resources: {
      'URLHaus': 'URLHaus',
      'PhishTank': 'PhishTank',
    },
  },
  breaches: {
    title: '数据泄露',
    summary: 'Have I Been Pwned 记录的该站点已知数据泄露',
    description:
      '用 Have I Been Pwned 的记录检索这个域名过去的数据泄露，显示受影响的用户数量，以及泄露了哪些数据、由谁泄露、发生在何时。',
    use:
      '如果一个站点此前泄露过用户数据，而你在那里有账号，那就当作当时留存的那些信息已经在外面流传。',
    resources: {
      'HIBP - Pwned Websites': 'HIBP - 已泄露网站',
    },
  },
  trackers: {
    title: '追踪器',
    summary: '页面加载的分析、广告追踪器与其他第三方',
    description: '检查网站发起了哪些第三方请求，并把每一个对应到已知的追踪器和服务。',
    use:
      '页面加载的每一个第三方都会知道你访问过，它们的脚本运行时拥有和站点本身相同的权限。这项检测显示谁在旁观，以及一个站点依赖多少外部代码。',
    resources: {
      'Balacklight - Tracker Check': 'Balacklight - 追踪器检测',
      'WhoTracks.me - Tracker Stats': 'WhoTracks.me - 追踪器统计',
      'Third-party JavaScript (web.dev)': '第三方 JavaScript（web.dev）',
    },
  },
  'tls-connection': {
    title: 'TLS 连接',
    summary: '接受的 TLS 版本，以及一次实际握手的加密套件与细节',
    description:
      '与主机建立真实的 TLS 连接，报告实际协商出来的结果：协议版本、选用的加密套件、ALPN，以及证书链是否通过验证。',
    use:
      '配置文件说的是应该发生什么，这里说的是实际发生了什么。要确认服务器是否真的不再接受某个旧协议，或者确认自己的改动已经生效，这是最快的办法。浏览器早已弃用 TLS 1.0 和 1.1，服务器却常常继续接受，这不符合 PCI DSS 之类标准，也给降级攻击留了空间。',
    resources: {
      'TLS Handshakes (via Cloudflare Learning)': 'TLS 握手（Cloudflare 学习中心）',
    },
  },
  'tls-security-audit': {
    title: 'TLS 安全审计',
    summary: 'SSL Labs 对服务器 TLS 配置给出的评级',
    description:
      '依据缓存的 SSL Labs 扫描结果，概述目标的 TLS 配置：总体评级、支持的协议版本、前向保密、HSTS，以及一份历史漏洞清单，包括 Heartbleed、POODLE、ROBOT、FREAK、LOGJAM 和 DROWN。',
    use:
      '一个字母的评级压缩了大量判断，细节都在它下面的清单里。扫描结果来自缓存，最近做过的配置改动可能还没体现出来。',
    resources: {
      'SSL Test (via SSL Labs)': 'SSL 测试（SSL Labs）',
      'SSL Labs grading guide': 'SSL Labs 评级指南',
    },
  },
  'tls-client-compat': {
    title: 'TLS 客户端兼容性',
    summary: 'Chrome、Safari、Java 与旧版 Android 是否还能连接',
    description:
      '按一组真实客户端的方式重放握手，覆盖 Chrome、Firefox、Safari、Edge、OpenSSL、Java、iOS 和 Android 的多个版本。对每一个，报告会协商出哪种协议和加密套件，或者说明该客户端根本无法连接。',
    use:
      '收紧 TLS 配置总会把某些人挡在门外，这项检测显示挡掉的是谁。值得在弃用旧协议版本之前跑一次，之后再跑一次，确认只砍掉了本来要砍的部分。',
    resources: {
      'SSL Test (via SSL Labs)': 'SSL 测试（SSL Labs）',
    },
  },
  screenshot: {
    title: '页面截图',
    summary: '以浏览器视角看到的整页渲染结果',
    description: '用无头浏览器渲染页面并返回图片。',
    use:
      '显示站点对一个从别的网络进来的、未登录的普通访客提供什么内容。当某个页面在你这里和在别人那里表现不同，或者你不愿在自己的浏览器里打开一个不可信的站点时，这项很有用。',
  },
  subdomains: {
    title: '子域名',
    summary: '出现在公开证书透明度日志中的子域名',
    description:
      '通过 crt.sh 从公开的证书透明度日志中查找子域名。CA 签发的每张证书都会公开记录，因此任何人曾为其申请过证书的主机名，都会留在记录里。域名下的任何地址都能查，所以 www.example.com 和 shop.example.com 都会列出 example.com 的全部子域名。',
    use:
      '子域名里住着那些被遗忘的东西：预发布服务器、管理后台、旧的营销站点，还有人为演示临时搭起来、再没撤掉的看板。它们的维护水平通常不如主站。但 CT 日志是历史记录，查出来的东西有相当一部分可能已经无法解析。',
    resources: {
      'crt.sh': 'crt.sh',
      'Certificate Transparency': '证书透明度',
      'RFC-6962 (CT)': 'RFC-6962（CT）',
      'OWASP - Test for Subdomain Takeover': 'OWASP - 子域名接管测试',
    },
  },
};
