import type { CheckDocZh } from './zh';
import type { CheckId } from './index';

/** Chinese docs, part A: get-ip through dns-server. */
export const partA: Partial<Record<CheckId, CheckDocZh>> = {
  'get-ip': {
    title: 'IP 地址',
    summary: '域名当前解析到的 IP 地址',
    description:
      'IP 地址是分配给网络中某台设备的数字标识。要找到域名背后的那个地址，需要向 DNS 查询它的 A 记录；IPv6 则查 AAAA 记录。',
    use:
      '拿到 IP，多数排查才算有了起点。有了它，就能查这个地址段归谁所有、机器大致在什么位置、由哪家服务商运营，以及同一地址上还提供着什么。',
    resources: {
      'Understanding IP Addresses': '理解 IP 地址',
      'IP Addresses - Wiki': 'IP 地址 - Wiki',
      'RFC-791 Internet Protocol': 'RFC-791 互联网协议',
      'whatismyipaddress.com': 'whatismyipaddress.com',
    },
  },
  ssl: {
    title: 'SSL 证书',
    summary: '证书颁发者、有效期与信任链',
    description:
      'SSL 证书用来证明服务器确实是它声称的那一方，也是网站能提供 HTTPS 的前提。证书由证书颁发机构签发，签发前本应核实持有者的身份。证书链则列出从网站自身证书一直到浏览器已信任的根证书之间的全部证书。',
    use:
      '证书本身就是公开的，因此也可以当作一份记录来读：谁签发的、何时到期、签给哪个组织，往往还附带同一张证书覆盖的其他主机名。最后这项经常能挖出没人公开过的子域名和关联站点。',
    resources: {
      'TLS - Wiki': 'TLS - Wiki',
      'What is SSL (via Cloudflare learning)': '什么是 SSL（Cloudflare 学习中心）',
      'RFC-8446 - TLS': 'RFC-8446 - TLS',
      'SSL Checker': 'SSL 检测工具',
    },
  },
  dns: {
    title: 'DNS 记录',
    summary: '域名下的 A、AAAA、MX、NS、CNAME 等记录',
    description:
      'DNS 负责把域名翻译成机器真正使用的地址。一个域名会发布多种记录：A 和 AAAA 记录地址，MX 记录邮件，NS 记录域名服务器，CNAME 记录别名，TXT 则承载任意文本。',
    use:
      '地址记录指向服务器，MX 记录指明邮件服务商。TXT 记录往往会堆积组织注册过的每一项服务留下的验证字符串。合起来看，大致能勾勒出这个域名怎么运作、哪些部分由谁代管。',
    resources: {
      'What are DNS records? (via Cloudflare learning)': '什么是 DNS 记录？（Cloudflare 学习中心）',
      'DNS Record Types': 'DNS 记录类型',
      'RFC-1035 - DNS': 'RFC-1035 - DNS',
      'DNS Lookup (via MxToolbox)': 'DNS 查询（MxToolbox）',
    },
  },
  cookies: {
    title: 'Cookie',
    summary: '首次访问即写入的 Cookie，以及各自的限定范围',
    description:
      'Cookie 是网站要求浏览器保存、并在后续请求中回传的一小段数据。它们用来保存会话状态和偏好设置，也经常存放追踪标识。',
    use:
      '还没做任何操作时网站就写下的 Cookie，本身就很说明问题。会话 Cookie 反映登录机制怎么实现，第三方 Cookie 则点出参与其中的分析与广告公司。每个 Cookie 上的 Secure、HttpOnly 和 SameSite 标记，能看出网站对它们的管理是否仔细。',
    resources: {
      'HTTP Cookie Docs (Mozilla)': 'HTTP Cookie 文档（Mozilla）',
      'What are Cookies (via Cloudflare Learning)': '什么是 Cookie（Cloudflare 学习中心）',
      'Testing for Cookie Attributes (OWASP)': 'Cookie 属性测试（OWASP）',
      'RFC-6265 - Cookies': 'RFC-6265 - Cookie',
    },
  },
  'robots-txt': {
    title: '抓取规则',
    summary: '网站为搜索引擎和 AI 爬虫发布的抓取规则',
    description:
      'robots.txt 位于域名根目录，实现 Robots Exclusion Protocol，告诉爬虫哪些路径不要碰。它能避免机器人反复冲击站点，但无法阻止页面出现在搜索结果里，那是 noindex 标签的职责。现在不少网站也用它拒绝 AI 爬虫，这类爬虫会收集页面用于训练模型或回答问题。llms.txt 是另一种更新的独立文件，改为向 AI 工具提供一份站点的纯文本摘要。',
    use:
      '正因为它列的是站长不希望机器人碰的东西，里面偶尔会出现没有任何链接指向的目录：管理后台、预发布路径、旧的导出文件。它也能看出网站对哪些爬虫另眼相待。',
    resources: {
      'Google Search Docs - Robots.txt': 'Google 搜索文档 - robots.txt',
      'Learn about robots.txt (via Moz.com)': '了解 robots.txt（Moz.com）',
      'RFC-9309 -  Robots Exclusion Protocol': 'RFC-9309 - 爬虫排除协议',
      'Robots.txt - wiki': 'robots.txt - Wiki',
    },
  },
  headers: {
    title: '响应头',
    summary: '服务器返回的全部 HTTP 响应头',
    description:
      'HTTP 响应头是服务器在页面内容之前发送的键值对。它们涉及缓存、内容类型、编码、压缩、安全策略，以及服务器愿意主动透露的自身信息。',
    use:
      '响应头是成本最低的一种指纹。它们时常直接写出服务器软件、CDN、框架和负载均衡器。网站漏掉的安全响应头，和它设置了的那些一样有信息量。',
    resources: {
      'HTTP Headers - Docs': 'HTTP 响应头 - 文档',
      'RFC-7231 Section 7 - Headers': 'RFC-7231 第 7 节 - 响应头',
      'List of header response fields': 'HTTP 响应头字段列表',
      'OWASP Secure Headers Project': 'OWASP 安全响应头项目',
    },
  },
  quality: {
    title: 'Lighthouse 性能',
    summary: '性能、无障碍、SEO 与最佳实践的 Lighthouse 评分',
    description:
      '用 Lighthouse 跑一遍页面，给出四项评分：性能、无障碍、最佳实践和 SEO。每项评分都附带构成它的具体审计项，可以看清哪些检查通过、哪些没通过。',
    use:
      '用来快速了解一个站点的技术健康状况。无障碍和 SEO 审计尤其容易给出具体、可修的问题，而不是泛泛的建议。',
    resources: {
      'Lighthouse Docs': 'Lighthouse 文档',
      'Google Page Speed Tools': 'Google PageSpeed 工具',
      'W3 Accessibility Tools': 'W3C 无障碍测试工具',
      'Google Search Console': 'Google Search Console',
      'SEO Checker': 'SEO 检测工具',
      'PWA Builder': 'PWA Builder',
    },
  },
  location: {
    title: '服务器位置',
    summary: '服务器物理托管的地理位置',
    description:
      '借助地理位置数据库把服务器 IP 映射到具体地点，这类数据库把地址段与已知的数据中心和 ISP 对应起来。从坐标还能得到国家、地区和时区。该地址同时属于某个网络，网络以 ASN 编号，由此得知基础设施由谁运营。',
    use:
      '站点托管在哪里，能大致提示它的用户或运营方在哪里。它还决定延迟，以及所有与司法管辖相关的事：数据本地化要求、制裁，或者请求会经过哪国法院。要注意，这里定位的是数据中心，不是公司。',
    resources: {
      'IP Locator': 'IP 定位工具',
      'Internet Geolocation - Wiki': '互联网地理定位 - Wiki',
    },
  },
  hosts: {
    title: '主机名',
    summary: 'Shodan 在同一 IP 上见到的其他主机名',
    description:
      '列出 Shodan 记录在同一 IP 地址上的其他主机名，以及通过目标域名的 DNS 记录关联到的域名和子域名。',
    use:
      '共享主机的情况会让结果变得模糊，因为同一地址背后可能放着上千个互不相关的站点。在独立基础设施上，它则是快速摸清一家机构全部资产的途径：预发布环境、早已停用的市场站点，以及原本不该面向互联网的内部工具。',
    resources: {
      'Reverse DNS Lookup - Wiki': '反向 DNS 查询 - Wiki',
      'OWASP - Enumerate Applications on Webserver': 'OWASP - 枚举 Web 服务器上的应用',
      'DNS Enumeration - DNS Dumpster': 'DNS 枚举 - DNS Dumpster',
      'Subdomain Finder': '子域名查找工具',
    },
  },
  redirects: {
    title: '重定向链',
    summary: '页面加载完成前的完整重定向链路',
    description:
      '沿着输入的 URL 一路跟随 HTTP 重定向，直到最终落地的地方。重定向常见于规范化、强制 HTTPS、短链接，以及已经迁移的站点。',
    use:
      '每跳一次就多一次往返，链路过长会同时拖累性能和 SEO。安全上同样要紧：中间夹一段未加密的跳转就是可被截获的窗口，而意料之外的中间域名可能暴露短链服务、追踪器，或一桩没对外公布的收购。',
    resources: {
      'HTTP Redirects - MDN': 'HTTP 重定向 - MDN',
      'URL Redirection - Wiki': 'URL 重定向 - Wiki',
      '301 Redirects explained': '301 重定向详解',
    },
  },
  'txt-records': {
    title: 'TXT 记录',
    summary: 'TXT 记录，含域名验证与策略条目',
    description:
      'TXT 记录让域名可以在 DNS 中发布任意文本。实际用途主要是向第三方证明域名归属，以及承载 SPF、DMARC 这类邮件认证策略。',
    use:
      'TXT 记录相当于一份持续更新的服务清单。来自 Google Workspace、Microsoft 365、Atlassian、Zoom 等数十家服务的验证字符串各有可辨认的前缀，因此这组记录往往直接把内部工具链点名。',
    resources: {
      'TXT Records (via Cloudflare Learning)': 'TXT 记录（Cloudflare 学习中心）',
      'TXT Records - Wiki': 'TXT 记录 - Wiki',
      'RFC-1464 - TXT Records': 'RFC-1464 - TXT 记录',
      'TXT Record Lookup (via MxToolbox)': 'TXT 记录查询（MxToolbox）',
    },
  },
  status: {
    title: '服务器状态',
    summary: '站点是否在线，以及响应速度',
    description:
      '检查服务器是否可达、返回什么状态码、响应花了多久。这段时间可拆成在 DNS 中查找服务器、建立连接、TLS 握手、等待服务器处理，以及下载页面几段。',
    use: '这是一条基线。它若不通过，其余大部分检测都没有意义。',
  },
  ports: {
    title: '开放端口',
    summary: '主机上哪些常用端口开放且可达',
    description:
      '端口是服务器监听的编号入口，惯例上各自对应一种服务：80 是 HTTP，443 是 HTTPS，22 是 SSH，21 是 FTP。这项检测报告常用端口中哪些能够接受连接。',
    use:
      '凡是监听着的，都可能成为攻击面，所以出现意料之外的开放端口值得追问原因。常见发现包括直接暴露在互联网上的数据库端口、管理界面和远程访问服务。',
    resources: {
      'List of TCP & UDP Port Numbers': 'TCP 与 UDP 端口号列表',
      'NMAP - Port Scanning Basics': 'NMAP - 端口扫描基础',
    },
  },
  'trace-route': {
    title: '路由追踪',
    summary: '数据包到达服务器所经过的网络路径',
    description: '追踪数据包抵达主机所走的路径，记录途经的每一台路由器以及每一跳的耗时。',
    use:
      '路径显示流量在入口方向穿过了哪些网络，借此可以识别源站前面是否挡着一层 CDN、某家中转运营商是否拥塞，或者流量是否绕了意外的地理弯路。',
  },
  carbon: {
    title: '碳足迹',
    summary: '按加载页面所需数据估算的 CO2 排放',
    description:
      '根据传输的数据量，以及对存储、服务和传输环节能耗的假设，估算加载这个页面产生的碳排放。页面越重，代价越高。',
    use:
      '它说到底是页面重量的一个替身指标，会随性能一起变化。除此之外，它是一个能拿来说服别人做轻量站点的数字，也是 Web 开发中少数真有人去衡量的外部性之一。',
    resources: {
      'WebsiteCarbon - Carbon Calculator': 'WebsiteCarbon - 碳排放计算器',
      'The Green Web Foundation': 'The Green Web Foundation',
      'The Eco Friendly Web Alliance': 'The Eco Friendly Web Alliance',
      'Reset.org': 'Reset.org',
      'Your website is killing the planet - via Wired': '你的网站正在毁掉地球 - 来自 Wired',
    },
  },
  'server-info': {
    title: '服务器信息',
    summary: '操作系统、ASN 以及主机所在的网络',
    description:
      '汇总关于这台机器本身能查到的信息：服务器软件及版本、托管服务商、自治系统号，以及拥有周边地址段的机构。',
    use:
      '其中最有价值的是 ASN。它标明网络运营方，从而看出转售商背后真正托管站点的是谁，也提供了找出该运营方其余地址空间的入口。',
  },
  vulnerabilities: {
    title: '漏洞',
    summary: 'Shodan 关联到主机所运行服务的 CVE',
    description:
      '列出与这台主机上所运行服务相关的 CVE（依据各服务对外公布的产品和版本匹配）。标注已知被利用的 CVE（CISA KEV），并给出 EPSS 利用概率和 CVSS 严重程度，同时链到每条记录在国家漏洞数据库中的条目。',
    use:
      '这是起点，不是结论。匹配基于服务横幅里的版本号，回补补丁会造成误报；列表为空也不能当作主机干净的证据。',
  },
  'whois-lookup': {
    title: 'WHOIS 查询',
    summary: '来自 WHOIS 的注册商、注册日期与域名服务器',
    description:
      '读取域名的注册记录：通过哪家注册商购买、创建时间与到期时间、当前设置的各项状态码，以及它委派到的域名服务器。',
    use:
      '日期是这里最强的信号。三周前注册的域名，和从 2004 年一路续费至今的域名，行为差别很大。状态码则显示域名是否处于禁止转移的锁定状态，或者正落在到期后的宽限期里。',
  },
  'domain-info': {
    title: '域名信息',
    summary: '域名上公开的归属与联系信息',
    description:
      'WHOIS 记录中注册人一侧的内容：域名上公开的组织与联系方式，以及注册商自己的滥用投诉联系人。',
    use:
      'GDPR 之后，多数注册人信息都藏在隐私保护服务后面，这种打码本身就值得记一笔。若记录仍然公开，或者某家机构在旗下各域名上打码并不一致，联系方式就是把不同资产连到同一持有者的线索。',
  },
  dnssec: {
    title: 'DNSSEC',
    summary: '证明 DNS 应答未被篡改的 DNSSEC 记录',
    description:
      '普通 DNS 无法让客户端分辨应答是真是假，缓存污染和路径上的伪造才得以成立。DNSSEC 用公钥密码学为记录签名，让解析器能验证途中没有被改动。DoH 和 DoT 则从另一个方向入手，把查询本身加密。',
    use:
      '一个区是否签名，多少反映其 DNS 运营是否讲究。未签名本身不算漏洞，但面对已经能干预解析的攻击者，它少了一层防线。',
  },
  'caa-records': {
    title: 'CAA 记录',
    summary: '哪些证书颁发机构可以为该域名签发证书',
    description:
      'CAA 记录列出允许为该域名签发 TLS 证书的证书颁发机构，所有公共 CA 在签发前都必须查询。CA 从主机名开始逐级向上查找父域名，采用最先找到的那一组，因此 example.com 上的 CAA 也覆盖 www.example.com。记录中还可以指定一个地址，供 CA 上报违反策略的签发请求。',
    use:
      '没有 CAA 时，任何受公众信任的 CA 都能为该域名签发证书，攻击者只需攻破其中校验最弱的一家。有了 CAA，其余 CA 会直接拒绝。这份允许列表同时显示机构的证书来自哪几家 CA。',
    resources: {
      'RFC-8659 - CAA': 'RFC-8659 - CAA',
      "CAA (via Let's Encrypt)": "CAA（Let's Encrypt）",
      'CAA Record Generator (via SSLMate)': 'CAA 记录生成器（SSLMate）',
      'CAA Lookup (via MxToolbox)': 'CAA 查询（MxToolbox）',
      'DNS CAA - Wiki': 'DNS CAA - Wiki',
    },
  },
  hsts: {
    title: 'HSTS',
    summary: '浏览器是否被要求只通过 HTTPS 连接',
    description:
      'HSTS 是一个响应头，要求浏览器在指定的时长内只通过 HTTPS 访问该域名。满足条件的站点还可以申请加入预加载列表，该列表内置于浏览器，连第一次请求也能覆盖。',
    use:
      '没有 HSTS 时，用户的第一次请求通常是明文 HTTP，可能在重定向来得及执行之前就被截获。HSTS 还会阻止用户点过证书警告继续访问，而这正是多数路径攻击所依赖的一步。',
  },
  'dns-server': {
    title: 'DNS 服务器',
    summary: '哪些域名服务器负责应答该域名，及其 IP 地址',
    description:
      '找出域名所属区的域名服务器，并把每一台解析成 IP 地址。没有独立域名服务器的子域名，会显示其父区的那一组。',
    use:
      '域名服务器说明谁在运营这个域名的 DNS，这往往和托管网站的公司不是同一家。共用一组不常见域名服务器的域名，通常由同一批人管理。',
  },
};
