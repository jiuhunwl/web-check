import type { TermId } from './glossary';

/**
 * Chinese copy for the glossary, keyed by the same ids as glossary.ts.
 * A term that is missing here falls back to its English wording.
 */
export const glossaryZh: Partial<Record<TermId, { title: string; definition: string; pass?: string; fail?: string }>> = {
  // Certificates
  'certificate-authority': {
    title: '证书颁发机构（CA）',
    definition:
      '浏览器信任的、负责签发证书的机构，例如 Let\u2019s Encrypt。签发前，机构会核实谁控制着这个域名。',
  },
  'certificate-trust': {
    title: '证书信任',
    definition: '证书是否对当前主机名有效，以及是否由浏览器信任的机构签发。',
    pass: '浏览器信任这张证书，访客可以建立安全连接，不会看到警告。',
    fail: '浏览器会用整页安全警告替代网站，展示给访客。',
  },
  'certificate-expiry': {
    title: '证书有效期',
    definition: '证书只在到期日之前有效，过期后浏览器会拒绝接受。',
    fail: '应尽快续期，否则访客看到的是安全警告，而不是网站。',
  },
  'subject-alternative-names': {
    title: '主题备用名称（SAN）',
    definition: '证书覆盖的主机名。如果网站的域名不在其中，浏览器会显示警告。',
  },
  'certificate-fingerprint': {
    title: '证书指纹',
    definition: '整张证书的哈希值。两个指纹相同，就是同一张证书。',
  },
  'certificate-transparency': {
    title: '证书透明度',
    definition: '公开记录每一张已签发证书的日志，让误发或攻击者签发的证书能被发现。',
    fail: 'Chrome 和 Safari 要求证书有已记录到日志的证明，否则可能拒绝这张证书。',
  },
  caa: {
    title: 'CAA 记录',
    definition: 'DNS 记录，列出哪些证书颁发机构可以为该域名签发证书。',
  },

  // TLS
  https: {
    title: 'HTTPS',
    definition: 'HTTP 的安全版本。HTTPS 通过加密连接传输页面，网络中的其他人无法读取或篡改。',
  },
  tls: {
    title: 'TLS 与 SSL',
    definition:
      'HTTPS 背后的加密协议。SSL 是 TLS 之前的版本，多年前已停用，但“SSL 证书”这个叫法沿用至今。',
  },
  handshake: {
    title: 'TLS 握手',
    definition: '安全连接开始时的几条消息，浏览器和服务器在其中协商设置、交换密钥并校验证书。',
  },
  'cipher-suite': {
    title: '加密套件',
    definition: '握手期间协商确定的一组算法，用于加密和保护连接。较旧的加密套件存在已知弱点。',
  },
  'tls-version': {
    title: 'TLS 版本',
    definition: '连接使用的 TLS 版本。较新的版本速度更快，并去掉了较弱的加密方式。',
    pass: 'TLS 1.3 是最新版本，握手最快、强度最高。',
    fail: '这不是最新版本。TLS 1.3 速度更快，而 TLS 1.0 和 1.1 存在已知弱点。',
  },
  'tls-1-3': {
    title: 'TLS 1.3',
    definition: 'TLS 的最新版本，握手更快，并且只使用强加密算法。',
    fail: '缺少 TLS 1.3，访客无法获得更快、更安全的连接。',
  },
  'legacy-tls': {
    title: 'TLS 1.0 和 1.1',
    definition: 'TLS 的旧版本，存在已知弱点，各大浏览器已在 2020 年停止支持。',
    pass: '已禁用，连接无法被降级到这些较弱的版本。',
    fail: '仍然启用，为降级攻击留下空间。应关闭这些版本。',
  },
  'ssl-labs-grade': {
    title: 'SSL Labs 评级',
    definition: 'Qualys SSL Labs 对服务器 HTTPS 配置的综合评级，从 A+ 到 F。',
    fail: '评级低于 A，说明 HTTPS 配置有需要修复的地方。',
  },
  'forward-secrecy': {
    title: '前向保密',
    definition: '每条连接使用各自的临时密钥，即使服务器密钥被盗，也无法解密过去的流量。',
    fail: '一旦服务器私钥被盗，已记录的流量可能被解密。',
  },
  'session-resumption': {
    title: '会话恢复',
    definition: '回访的访客可以复用之前的安全会话，跳过部分握手过程。',
  },
  'ocsp-stapling': {
    title: 'OCSP 装订',
    definition: '服务器附带证书未被吊销的证明，浏览器不必再向颁发机构查询。',
    fail: '浏览器可能直接向颁发机构查询，速度更慢，还会让机构知道访客打开了哪些网站。',
  },
  http2: {
    title: 'HTTP/2',
    definition: 'HTTP 的更快版本，可以在一条连接上同时加载多个文件。',
  },
  alpn: {
    title: 'ALPN',
    definition: '让浏览器和服务器在 TLS 握手中选定协议，例如 HTTP/2，从而省去一次往返。',
  },
  renegotiation: {
    title: '重新协商',
    definition: '让浏览器和服务器在连接进行中商定新的设置。只有安全的重协商才安全。',
    fail: '不安全的重新协商会让攻击者把自己的数据插入连接开头。',
  },
  'fallback-scsv': {
    title: 'Fallback SCSV',
    definition: '阻止攻击者把连接强制降到更旧、更弱的 TLS 版本。',
  },
  chacha20: {
    title: 'ChaCha20',
    definition: '一种加密算法，在没有 AES 硬件加速的手机等设备上比 AES 更快。',
  },
  aead: {
    title: 'AEAD 加密',
    definition:
      'AES-GCM、ChaCha20 等现代加密算法，一步完成加密和数据校验，可避开一整类攻击。',
    fail: '缺少 AEAD 加密，连接会退回到存在已知弱点的旧加密算法。',
  },
  'cbc-ciphers': {
    title: 'CBC 加密',
    definition: '一种较旧的加密模式，POODLE 和 Lucky 13 等攻击正是针对它。',
    pass: '未提供，因此连接只使用现代加密算法。',
    fail: '为兼容旧设备仍然提供，尽管现代浏览器并不需要。',
  },
  'tls-compression': {
    title: 'TLS 压缩',
    definition: '加密前先压缩数据，CRIME 攻击利用这一机制窃取 Cookie。',
    fail: '应关闭，开启会让网站暴露在 CRIME 攻击之下。',
  },
  'key-exchange-reuse': {
    title: '密钥交换复用',
    definition: '在不同连接之间重复使用相同的临时密钥交换参数，会削弱前向保密。',
  },
  'weak-dh-primes': {
    title: '弱 DH 素数',
    definition:
      '被广泛共用的 Diffie-Hellman 群太小，资金充足的攻击者可能早已将其破解。',
  },
  'client-compatibility': {
    title: '客户端兼容性',
    definition: '浏览器或设备能否与网站建立安全连接。',
    fail: '这个客户端无法连接。对很旧的设备来说通常没关系，但要确认访客没有在使用这类设备。',
  },

  // TLS vulnerabilities
  'downgrade-attack': {
    title: '降级攻击',
    definition: '诱使连接使用更旧、更弱的协议或加密算法，从而更容易被破解。',
  },
  'padding-oracle': {
    title: '填充预言',
    definition:
      '一种缺陷：服务器对填充错误的数据会给出不同的响应。攻击者发送成千上万条改动过的消息，利用这些响应对流量进行解密。',
  },
  heartbleed: {
    title: 'Heartbleed',
    definition: '旧版 OpenSSL 中的漏洞，任何人都能读取服务器内存，包括私钥和密码。',
  },
  poodle: {
    title: 'POODLE',
    definition: '针对 SSL 3.0 的攻击，可以逐字节解密数据。禁用 SSL 3.0 即可修复。',
  },
  'poodle-tls': {
    title: 'POODLE（TLS）',
    definition: 'POODLE 的一个变种，针对未正确校验填充的 TLS 服务器。',
  },
  'zombie-poodle': {
    title: 'Zombie POODLE',
    definition: '某些服务器中的填充预言缺陷，让 POODLE 式攻击重新出现在 CBC 加密上。',
  },
  goldendoodle: {
    title: 'GOLDENDOODLE',
    definition: '针对 CBC 加密的更快填充预言攻击，出现在部分防火墙和负载均衡设备中。',
  },
  'sleeping-poodle': {
    title: 'Sleeping POODLE',
    definition: '另一种针对 CBC 加密的填充预言攻击，出现在部分网络设备中。',
  },
  'zero-length-padding-oracle': {
    title: '零长度填充预言',
    definition: 'OpenSSL 的一个漏洞（CVE-2019-1559），攻击者可借此解密 CBC 加密的流量。',
  },
  freak: {
    title: 'FREAK',
    definition: '诱使连接使用 1990 年代被故意做弱的出口加密，几小时内即可破解。',
  },
  logjam: {
    title: 'Logjam',
    definition: '把密钥交换降级到可被破解的弱 Diffie-Hellman 群。',
  },
  drown: {
    title: 'DROWN',
    definition: '利用任何仍在使用同一密钥支持 SSL 2.0 的服务器，解密现代 TLS 流量。',
  },
  'ccs-injection': {
    title: 'CCS 注入',
    definition: 'OpenSSL 的一个漏洞（CVE-2014-0224），攻击者可借此强制使用弱密钥并读取流量。',
  },
  'openssl-padding-oracle': {
    title: 'OpenSSL 填充预言',
    definition: 'OpenSSL 的一个漏洞（CVE-2016-2107），攻击者可借此解密 AES-CBC 流量。',
  },
  robot: {
    title: 'ROBOT',
    definition: '针对 RSA 密钥交换的复活攻击，可以解密流量，也能用服务器密钥签署消息。',
  },
  ticketbleed: {
    title: 'Ticketbleed',
    definition: '部分 F5 负载均衡设备中的漏洞，会通过 TLS 会话票据泄露内存内容。',
  },

  // HSTS
  'strict-transport-security': {
    title: 'HSTS',
    definition: '告诉浏览器只通过 HTTPS 连接，访客无法被降级到明文 HTTP。',
    pass: '曾经访问过的浏览器，以后始终会用 HTTPS 访问这个网站。',
    fail: '浏览器没有被完全约束在 HTTPS 上，明文 HTTP 请求可能被拦截。',
  },
  'hsts-max-age': {
    title: 'HSTS max-age',
    definition: '浏览器记住只使用 HTTPS 的时长。加入 HSTS 预加载列表至少需要一年。',
    fail: '不足一年，浏览器会更早忘记，网站也无法加入预加载列表。',
  },
  'hsts-include-subdomains': {
    title: 'includeSubDomains',
    definition: '让 HSTS 同时适用于所有子域名，任何子域名都不能通过明文 HTTP 访问。',
    fail: '子域名未被包含在内，仍然可以通过明文 HTTP 加载。',
  },
  'hsts-preload': {
    title: 'HSTS 预加载',
    definition: '请求浏览器把网站写入只走 HTTPS 的列表，连第一次访问也能受到保护。',
  },

  // Security headers
  xss: {
    title: '跨站脚本（XSS）',
    definition: '让脚本在别人的网站上运行，从而窃取访客的会话或冒用访客身份。',
  },
  clickjacking: {
    title: '点击劫持',
    definition: '把网站加载到另一个页面的隐藏框架里，访客会在不知情的情况下点击网站上的按钮。',
  },
  'content-security-policy': {
    title: 'Content-Security-Policy',
    definition: '列出页面可以从哪些来源加载脚本和其他文件，能挡住大部分跨站脚本攻击。',
    fail: '没有严格策略时，注入页面的脚本更容易被执行。',
  },
  'x-content-type-options': {
    title: 'X-Content-Type-Options',
    definition: '阻止浏览器猜测文件类型，上传的文件因此无法被当作脚本执行。',
  },
  'x-frame-options': {
    title: 'X-Frame-Options',
    definition: '阻止其他网站把本页面放进框架显示，从而挡住点击劫持。',
  },
  'referrer-policy': {
    title: 'Referrer-Policy',
    definition: '控制访客点击链接或加载文件时，当前 URL 有多少内容会被分享给其他网站。',
    fail: '没有严格策略时，页面路径和查询参数可能被分享给其他网站。',
  },
  'permissions-policy': {
    title: 'Permissions-Policy',
    definition: '关闭页面及其嵌入内容对摄像头、麦克风和定位等浏览器功能的使用。',
  },
  'cross-origin-opener-policy': {
    title: 'Cross-Origin-Opener-Policy',
    definition: '让页面留在自己的窗口组里，弹窗和其他网站无法进入其中。',
  },
  'cross-origin-resource-policy': {
    title: 'Cross-Origin-Resource-Policy',
    definition: '阻止其他网站加载本网站的文件，可防范 Spectre 类数据泄露。',
  },
  'cross-origin-embedder-policy': {
    title: 'Cross-Origin-Embedder-Policy',
    definition: '只允许页面加载明确同意的其他网站文件，从而启用需要 Spectre 防护的功能。',
  },
  'x-xss-protection': {
    title: 'X-XSS-Protection',
    definition: '浏览器早期用于拦截跨站脚本的过滤器，现已从浏览器中移除。现在应把它设为 0。',
    pass: '已按建议关闭。',
    fail: '旧过滤器仍然开启，可能在旧版浏览器中带来新的安全漏洞。应把它设为 0。',
  },
  'server-disclosure': {
    title: '服务器软件响应头',
    definition: 'Server、X-Powered-By 这类响应头，会暴露网站运行的软件，往往还包括版本号。',
    fail: '这等于告诉攻击者该尝试哪些已知漏洞。应去掉版本号，或去掉整个响应头。',
  },

  // Page content
  'mixed-content': {
    title: '混合内容',
    definition: '在 HTTPS 页面上通过明文 HTTP 加载的文件，传输途中可能被读取或篡改。',
    pass: '页面上的所有内容都通过 HTTPS 加载。',
  },
  'upgrade-insecure-requests': {
    title: '升级不安全请求',
    definition: '一项 CSP 设置，让浏览器把页面上的 HTTP 链接改为通过 HTTPS 获取。',
  },
  'third-party-scripts': {
    title: '第三方脚本',
    definition:
      '从其他公司的服务器加载的脚本，例如统计或聊天组件。这类脚本对页面有完全访问权限，谁控制那台服务器，谁就控制网站的一部分。',
  },
  sri: {
    title: '子资源完整性（SRI）',
    definition:
      '为脚本或样式表添加完整性哈希，浏览器可以据此校验文件未被改动，一旦被改动就拒绝加载。',
  },
  'integrity-policy': {
    title: 'Integrity-Policy',
    definition: '一种响应头，让浏览器拒绝加载任何没有 SRI 哈希的脚本。',
    fail: '没有哈希的脚本正在被拦截，页面的部分功能可能因此失效。',
  },
  'cookie-security': {
    title: 'Cookie 安全标记',
    definition:
      'Secure 让 Cookie 不经过明文 HTTP 传输，HttpOnly 让脚本读不到 Cookie，SameSite 阻止其他网站发送 Cookie。',
    pass: '三个标记都已设置，这个 Cookie 得到了较好的保护。',
  },

  // Email
  spf: {
    title: 'SPF',
    definition: '一条 DNS 记录，列出获准代表该域名发送邮件的服务器，收件方据此识别伪造邮件。',
    fail: '没有可用的记录时，其他人可以发送看起来来自这个域名的邮件。',
  },
  dkim: {
    title: 'DKIM',
    definition: '用发布在 DNS 中的密钥为发出的邮件签名，收件方可以确认邮件来自该域名且未被改动。',
  },
  dmarc: {
    title: 'DMARC',
    definition: '告诉收件方如何处理未通过 SPF 和 DKIM 的邮件，以及把相关报告发送到哪里。',
    fail: '冒充这个域名的伪造邮件仍可能被送达。',
  },
  bimi: {
    title: 'BIMI',
    definition: '在支持的信箱中，于邮件旁显示品牌标志，前提是 DMARC 已强制执行。',
  },
  'mta-sts': {
    title: 'MTA-STS',
    definition: '要求其他邮件服务器向这个域名投递邮件时，使用加密并经过验证的连接。',
  },
  'tls-rpt': {
    title: 'TLS-RPT',
    definition: '请求其他邮件服务器在无法安全投递邮件时发送报告。',
  },
  dane: {
    title: 'DANE',
    definition:
      '把邮件服务器的证书信息发布到经过签名的 DNS 记录中，发件方无需证书颁发机构也能完成校验。',
  },

  // Domains
  whois: {
    title: 'WHOIS',
    definition:
      '域名的公开注册记录：注册商、关键日期、域名服务器，以及未隐藏时的所有者联系方式。',
  },
  'whois-privacy': {
    title: 'WHOIS 隐私保护',
    definition: '在 WHOIS 中隐藏域名所有者的姓名和联系方式，改为显示注册商或代理方的信息。',
  },
  registrar: {
    title: '域名注册商',
    definition:
      '办理域名注册的公司，例如 Namecheap 或 GoDaddy。任何人进入该账户，就能接管这个域名。',
  },
  registry: {
    title: '域名注册局',
    definition:
      '管理整个顶级域的组织，例如 .com 由 Verisign 管理，注册局保存每个域名归属的主列表。',
  },
  'domain-expiry': {
    title: '域名到期',
    definition:
      '域名注册失效的日期。如果没有续费，网站和邮箱会停止工作，域名还可能落到别人手里。',
  },
  subdomain: {
    title: '子域名',
    definition: '主域名之下的名称，例如 mail.example.com。被遗忘的子域名常常还在运行陈旧、未修补的软件。',
  },

  // DNS
  'dns-resolver': {
    title: 'DNS 解析器',
    definition:
      '访问网站时，负责查出域名对应 IP 地址的服务器。DNS 解析器通常由网络运营商提供，也有 1.1.1.1 这类公共服务。',
  },
  'a-record': {
    title: 'A 与 AAAA 记录',
    definition: '把域名指向服务器的 IP 地址。A 记录存放 IPv4 地址，AAAA 记录存放 IPv6 地址。',
  },
  cname: {
    title: 'CNAME 记录',
    definition:
      '让一个域名成为另一个域名的别名，常用于把子域名指向托管服务。如果停用了服务却保留这条记录，别人可能接管这个子域名。',
  },
  'mx-record': {
    title: 'MX 记录',
    definition: '列出接收该域名邮件的服务器，并按优先级排序。',
  },
  'ns-record': {
    title: 'NS 记录',
    definition: '指明保存域名 DNS 记录的服务器。谁控制这些服务器，谁就控制域名指向哪里。',
  },
  'txt-record': {
    title: 'TXT 记录',
    definition:
      '内容为自由文本的 DNS 记录。网站用 TXT 记录证明域名归属，也用 TXT 记录发布 SPF、DMARC 等邮件策略。',
  },
  'soa-record': {
    title: 'SOA 记录',
    definition:
      '保存域名 DNS 的基本设置，例如主域名服务器、管理员邮箱地址，以及其他域名服务器多久检查一次变更。',
  },
  'ptr-record': {
    title: 'PTR 记录（反向 DNS）',
    definition:
      'A 记录的反向查询，把 IP 地址映射回主机名。邮件服务器常常拒收没有 PTR 记录的服务器发来的邮件。',
  },
  ttl: {
    title: 'TTL（生存时间）',
    definition:
      '解析器可以缓存一条 DNS 答复多久（单位为秒）再重新查询。TTL 较长时查询更快，但变更需要更久才能传遍全网。',
  },
  dnskey: {
    title: 'DNSKEY',
    definition: '在 DNSSEC 下为域名 DNS 记录签名的公钥。',
    fail: '没有 DNSKEY，域名的 DNS 记录就没有签名。',
  },
  'ds-record': {
    title: 'DS 记录',
    definition: '父区域中的一条记录，指向域名的 DNSKEY，解析器据此信任其签名。',
    fail: '没有 DS 记录，解析器无法校验签名，DNSSEC 实际没有生效。',
  },
  'dnssec-validation': {
    title: 'DNSSEC 验证',
    definition: '解析器能否确认域名的 DNS 答复已经签名且未被改动。',
    fail: '答复无法验证，伪造的 DNS 响应可能把访客带到错误的服务器。',
  },

  // Hosting and network
  'ip-address': {
    title: 'IP 地址',
    definition: '互联网上标识一台服务器的数字。DNS 把域名转换成 IP 地址，人们不必记住这些数字。',
  },
  'shared-hosting': {
    title: '共享主机',
    definition:
      '多个网站运行在同一台服务器和同一个 IP 地址上。这种方式便宜且常见，但如果其中一个网站被列入黑名单，同一 IP 上的其他网站也可能被封。',
  },
  asn: {
    title: 'ASN（自治系统号）',
    definition:
      '互联网上一个大型网络的编号，通常由托管公司、网络运营商或大型企业运营。服务器的 ASN 显示它位于谁的网络中。',
  },
  'ip-geolocation': {
    title: 'IP 地理位置',
    definition: '根据 IP 地址估算服务器的位置。国家一级通常准确，城市一级经常出错。',
  },
  traceroute: {
    title: '路由追踪',
    definition: '列出本机到服务器之间经过的每一跳网络节点及各自耗时，可以看出连接在哪里变慢或中断。',
  },
  cms: {
    title: '内容管理系统（CMS）',
    definition:
      '不写代码就能搭建和编辑网站的软件，例如 WordPress、Drupal 或 Joomla。旧版本和插件是攻击者常用的入口。',
  },

  // Threats and reputation
  'safe-browsing': {
    title: 'Google Safe Browsing',
    definition: 'Google 维护的恶意软件和钓鱼网站名单，Chrome、Firefox 和 Safari 会据此向访客发出警告。',
    fail: '在大多数浏览器里，访客看到的是一张红色警告页，而不是网站。',
  },
  'threat-scan': {
    title: '威胁扫描',
    definition: '扫描网站是否存在恶意软件、钓鱼和其他对访客的威胁。',
  },
  phishing: {
    title: '钓鱼',
    definition: '伪装成可信品牌的页面，用来窃取登录凭据、银行卡信息或其他个人数据。',
  },
  malware: {
    title: '恶意软件',
    definition: '旨在伤害访客或其设备的软件，常通过被入侵的网站传播。',
    fail: '这个网站上的 URL 已被举报传播恶意软件。',
  },
  'dns-blocklist': {
    title: 'DNS 黑名单',
    definition: '注重隐私和家庭防护的 DNS 解析器用来拦截有害或不良网站的名单。',
    fail: '使用这类解析器的访客无法访问这个网站。',
  },
  'data-breach': {
    title: '数据泄露',
    definition: '网站的用户数据被泄露或窃取、随后被公开的事件。',
    fail: '这个网站的账户信息已经外泄，被复用的密码可能被拿去尝试登录其他网站。',
  },
  cve: {
    title: '已知漏洞（CVE）',
    definition: '服务器所运行软件中被公开列出的安全缺陷，每个缺陷都有一个 CVE 编号。',
    fail: '攻击者会扫描这些漏洞，应更新或修补受影响的软件。',
  },
  'known-exploited': {
    title: '已被实际利用',
    definition: 'CISA 名单上的漏洞，已知有攻击者正在利用。',
  },
  'open-port': {
    title: '开放端口',
    definition: '每个开放端口都是一项服务，互联网上任何人都可以尝试连接并探测它的弱点。',
    fail: '除非确实需要对外公开，否则应关闭端口，或用防火墙限制谁能访问。',
  },
  waf: {
    title: 'Web 应用防火墙',
    definition: '部署在网站前面的过滤器，用来拦截 SQL 注入、恶意爬虫等常见攻击。',
  },

  // security.txt
  'security-txt': {
    title: 'security.txt',
    definition: '位于 /.well-known/security.txt 的文件，告诉安全研究人员如何报告问题。',
    fail: '发现漏洞的研究人员可能不知道该通知谁。',
  },
  'security-txt-signature': {
    title: '带签名的 security.txt',
    definition: 'PGP 签名证明文件来自网站所有者，并且未被改动。',
  },
  'security-txt-contact': {
    title: 'Contact 字段',
    definition: '必填字段，给出用于报告漏洞的邮箱地址或链接。',
  },
  'security-txt-expires': {
    title: 'Expires 字段',
    definition: '必填日期，超过该日期后文件即视为过期。日期应不超过一年。',
  },

  // Quality and visibility
  'lighthouse-performance': {
    title: '性能评分',
    definition: 'Google Lighthouse 对页面加载速度和可用速度的评分。',
  },
  'lighthouse-accessibility': {
    title: '无障碍评分',
    definition:
      'Google Lighthouse 对页面在残障人士（例如屏幕阅读器用户）手中可用程度的评分。',
  },
  'lighthouse-best-practices': {
    title: '最佳实践评分',
    definition:
      'Google Lighthouse 对现代 Web 实践的评分，涵盖从使用 HTTPS 到避免过时浏览器特性。',
  },
  'lighthouse-seo': {
    title: 'SEO 评分',
    definition: 'Google Lighthouse 对帮助搜索引擎发现并展示页面的基础项的评分。',
  },
  'response-time': {
    title: '响应时间',
    definition: '服务器给出答复所需的时间。首次响应慢，会拖慢页面上的其他一切。',
  },
  'http-status-codes': {
    title: 'HTTP 状态码',
    definition:
      '服务器随每个响应发送的三位数字：200 表示正常，301 表示重定向，404 表示未找到，500 表示服务器错误。',
  },
  redirects: {
    title: '重定向',
    definition: '每次重定向都会把浏览器送到另一个 URL，在页面加载前多出一次往返。',
  },
  'https-redirect': {
    title: 'HTTPS 重定向',
    definition: '把通过明文 HTTP 前来的访客送到网站的 HTTPS 安全版本。',
    fail: '不以 https:// 输入地址的访客会停留在不安全的连接上。',
  },
  'search-crawling': {
    title: '搜索引擎抓取',
    definition: 'robots.txt 可以要求搜索引擎不要抓取网站的某些部分或全部内容。',
    fail: 'Google 被要求跳过整个网站，网站可能因此从搜索结果中消失。',
  },
  'ai-crawlers': {
    title: 'AI 爬虫',
    definition:
      '抓取页面用于训练 AI 模型或回答问题的机器人，例如 GPTBot 和 ClaudeBot。网站可以在 robots.txt 中要求它们不要抓取，但并非所有机器人都会遵守。',
  },
  'llms-txt': {
    title: 'llms.txt',
    definition: '一个提议中的文件，位于 /llms.txt，向 AI 工具提供网站的简短纯文本摘要和关键页面链接。',
  },
  'xml-sitemap': {
    title: 'XML 站点地图',
    definition: '列出网站页面的文件，让搜索引擎能找到所有页面，包括没有任何链接指向的页面。',
  },
  'canonical-url': {
    title: '规范链接',
    definition:
      '当一个页面可以通过多个地址访问时，告诉搜索引擎哪个 URL 是主地址，避免页面排名被分散到多个地址上。',
  },
  'open-graph': {
    title: 'Open Graph',
    definition: '一组标签，设置页面在社交媒体或聊天应用中被分享时显示的标题、描述和图片。',
    fail: '没有 Open Graph，应用只能自行猜测分享时该显示什么，效果往往很差。',
  },
  'twitter-card': {
    title: 'Twitter Card',
    definition: '告诉 X（原 Twitter）页面被分享时使用哪种预览样式。',
  },
  'social-verification': {
    title: '资料验证',
    definition: '网站指向的社交资料是否也反向指向网站，以表明两处由同一批人运营。',
  },
  trackers: {
    title: '追踪器',
    definition: '记录访客行为的第三方服务，往往跨多个网站记录。',
    pass: '这个页面上没有加载已知的追踪器。',
  },
  'ad-trackers': {
    title: '广告追踪器',
    definition: '来自广告网络的脚本，跨网站跟踪访客，用于投放定向广告。',
  },
  analytics: {
    title: '网站分析',
    definition: '记录访客如何使用网站的服务，例如访客浏览了哪些页面。',
  },
  'carbon-footprint': {
    title: '碳足迹',
    definition: '对加载一个页面所耗能源产生 CO2 排放量的估算。页面越重，耗能越多。',
  },
  'tranco-rank': {
    title: 'Tranco 排名',
    definition: '网站在 Tranco 百万站点榜单中的名次。该榜单综合了多个其他排名，因此更难被操纵。',
  },
  'web-archive': {
    title: '网页存档',
    definition:
      'Wayback Machine 这类随时间保存网页副本的服务。可以从中看到网站过去的样子，包括已经下线的页面。',
  },
};
