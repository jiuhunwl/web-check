import type { Category, CategoryId } from './categories';

/**
 * Chinese copy for the category pages, the footer and the scan form.
 * Keyed by the same ids as the English source in categories.ts.
 */
const base: Record<CategoryId, Category> = {
  security: {
    label: '安全',
    icon: 'shield',
    title: '网站安全检查',
    description:
      '检查任意网站的 TLS 证书、HTTP 安全响应头、Cookie 标记、DNSSEC、开放端口与威胁列表状态。',
    keywords: '网站安全检查, ssl 检测, http 响应头, 安全扫描, dnssec',
    heading: ['网站', '安全', '检测'],
    tagline: '证书、响应头、Cookie 标记与开放端口，按局外人的视角读一遍。',
    why: [
      '一个网站的安全态势，大半本来就是公开的。证书、响应头、Cookie 标记和正在监听的端口，' +
        '任何人来问都会如实奉上——包括那些正在掂量「攻你要花多少力气」的人。',
      '这些信息都不需要接触网站本身。而这正是关键：你在这里能看到的东西，别人同样看得到。',
    ],
  },
  seo: {
    label: 'SEO',
    icon: 'search',
    title: '网站 SEO 检查',
    description:
      '检查任意网站的抓取规则、站点地图、规范链接与社交标签、重定向链、全球排名与存档历史。',
    keywords: 'seo 检测, robots.txt, 站点地图, open graph 标签, 网站排名, 抓取规则',
    heading: ['网站', 'SEO', '检测'],
    tagline: '像爬虫那样读一个网站，而不是像浏览器那样把它渲染出来。',
    why: [
      '爬虫看到的页面，和访客看到的并不一样。Robots 规则、canonical 标签、站点地图条目和 ' +
        'Open Graph 标记从来不会显示在屏幕上，所以其中任何一处出错，都可能静静躺上几个月没人发现。',
      '也正是在这一层，「我这边看着没问题」不再算得上证据。',
    ],
  },
  server: {
    label: '服务器',
    icon: 'server',
    title: 'Web 服务器检查',
    description: '检查任意网站的托管位置、运行的是什么软件、哪些端口开着，以及数据包抵达它走过的网络路径。',
    keywords: '服务器检测, ip 查询, 开放端口, 技术栈识别, 路由追踪, 主机托管',
    heading: ['Web', '服务器', '检测'],
    tagline: '弄清一个网站究竟托管在谁那里，机器上又跑着什么。',
    why: [
      '域名只是一道门。门后某处有一台真实的机器，跑着操作系统和 Web 服务器，开着某一组端口，' +
        '数据包沿着一条确定的路径抵达那里。',
      '这些大多可以从外部推断出来，而它们透露的信息，往往比页面本身更多。',
    ],
  },
  domain: {
    label: '域名',
    icon: 'globe',
    title: '域名与 DNS 查询',
    description: '查询任意域名的 WHOIS 注册信息、DNS 与 TXT 记录、域名服务器、DNSSEC 以及子域名。',
    keywords: '域名查询, whois, dns 记录, 域名服务器, 子域名查找, dnssec',
    heading: ['域名', '名称', '查询'],
    tagline: '注册记录、DNS，以及每一张公开证书里出现过的子域名。',
    why: [
      '每个域名都会留下痕迹：谁在什么时候注册了它，哪些域名服务器为它应答，它在 TXT 记录里' +
        '公布了什么，以及哪些子域名出现在公开的证书透明度日志中。',
      '注册时间和共用的域名服务器，正是区分「做了十五年的生意」和「上周二刚搭的站」的依据。',
    ],
  },
  email: {
    label: '邮件',
    icon: 'envelope',
    title: '邮件配置检查',
    description: '检查域名的 MX 路由、SPF、DKIM 与 DMARC 策略、TXT 记录，以及过滤型解析器是否会拦截它。',
    keywords: '邮件配置检查, spf, dkim, dmarc, mx 记录, 邮件黑名单',
    heading: ['邮件', '配置', '检查'],
    tagline: '这个域名发出的邮件能不能送到，别人又能不能冒用它发信。',
    why: [
      '送达率取决于域名公布了哪些记录。MX 说明邮件该送去哪里；SPF、DKIM 和 DMARC 决定' +
        '接收方如何判断一封信确实来自你。',
      '配错了会同时发生两件事：你自己的邮件开始进垃圾箱，而伪造你的发件地址变得轻而易举。',
    ],
  },
  performance: {
    label: '性能',
    icon: 'gauge',
    title: '网站性能检查',
    description: '用 Lighthouse 测量任意页面，并检查它的重定向链、服务器响应时间与估算碳足迹。',
    keywords: '网站性能检查, 页面速度, lighthouse, 重定向链, 碳足迹',
    heading: ['网站', '性能', '检测'],
    tagline: '一个页面要多久才能送到，路上又付出了什么代价。',
    why: [
      '速度是累加的。每一次重定向跳转、每一个缓慢的首字节、每一份过大的资源，最终都由访客' +
        '在自己的网络和设备上买单，而不是你。',
      '碳足迹估算只是同一组数字的另一种读法：传输的字节数，乘以所有加载过这个页面的人。',
    ],
  },
  privacy: {
    label: '隐私',
    icon: 'fingerprint',
    title: '网站隐私检查',
    description: '检查网站一进来就设置的 Cookie、加载的第三方技术、WHOIS 暴露情况与威胁列表状态。',
    keywords: '网站隐私检查, cookie 检测, 追踪器识别, whois 隐私',
    heading: ['网站', '隐私', '检测'],
    tagline: '在你同意任何事之前，一个网站已经设置、加载并转交了什么。',
    why: [
      '等一个页面加载完毕，多数网站已经设好了 Cookie、拉进了第三方脚本，并且把「你来过」' +
        '这件事告诉了另外好几家公司。',
      '域名也会从另一个方向泄露信息。WHOIS 隐私保护要么开着，要么没开，而答案无论如何都是公开的。',
    ],
  },
};

/** "Security Checker" in Chinese reads better as "安全检查" than "安全检测器". */
export const toolNamesZh: Record<CategoryId, string> = {
  security: '安全检查',
  seo: 'SEO 检测',
  server: '服务器检测',
  domain: '域名查询',
  email: '邮件配置检查',
  performance: '性能检测',
  privacy: '隐私检测',
};

/** The page copy, with the tool name attached so it can be looked up by path. */
export const categoriesZh = Object.fromEntries(
  Object.entries(base).map(([id, category]) => [
    id,
    { ...category, toolName: toolNamesZh[id as CategoryId] },
  ]),
) as Record<CategoryId, Category & { toolName: string }>;
