/**
 * Chinese copy for the findings raised by the analysis rules.
 *
 * Keys are the English source strings exactly as they appear in
 * src/client/analysis/rules/*.ts. Interpolate with {name} placeholders, keeping
 * the same placeholder names as the source.
 */
const rules: Record<string, string> = {
  // Block lists
  'Not on any tested DNS blocklist': '不在任何已测试的 DNS 黑名单中',
  'Blocked by {count} DNS resolver(s)': '被 {count} 个 DNS 解析器拦截',
  'Listed by {servers}': '列入名单：{servers}',

  // Breaches
  'No known data breaches': '未发现已知数据泄露',
  'Found in {count} data breach(es)': '出现在 {count} 起数据泄露事件中',
  'Latest was {title} on {date}': '最近一次为 {date} 发生的 {title}',
  'Latest was {title} on {date}. Passwords were exposed, so watch for credential stuffing':
    '最近一次为 {date} 发生的 {title}。此次泄露了密码，需警惕撞库攻击',

  // CAA records
  'CAA records have no issue tag': 'CAA 记录缺少 issue 标记',
  'No CAA records': '没有 CAA 记录',
  'Any certificate authority can issue certificates for this domain':
    '任何证书颁发机构都可为该域名签发证书',
  'CAA blocks all certificate issuance': 'CAA 阻止所有证书签发',
  'CAA limits issuance to {count} CA(s)': 'CAA 将签发范围限制在 {count} 个 CA',

  // Cookies
  'Cookie "{name}" missing Secure flag': 'Cookie “{name}” 缺少 Secure 标记',
  'Cookie "{name}" missing HttpOnly flag': 'Cookie “{name}” 缺少 HttpOnly 标记',
  'Cookie "{name}" missing SameSite flag': 'Cookie “{name}” 缺少 SameSite 标记',
  'All cookies use Secure/HttpOnly/SameSite': '所有 Cookie 都设置了 Secure/HttpOnly/SameSite',

  // DNSSEC
  'DNSSEC enabled': '已启用 DNSSEC',
  'DNSSEC not enabled': 'DNSSEC 未启用',
  'Sign DNS records to prevent spoofing and cache poisoning':
    '为 DNS 记录签名，可防止伪造和缓存投毒',

  // Domain registration
  'Domain registration expired': '域名注册已过期',
  'Expired {days} day(s) ago, renew before it drops': '已过期 {days} 天，需在域名释放前尽快续期',
  'Domain expires within a week': '域名将在一周内到期',
  'Expires in {count} day(s), renew immediately': '{count} 天后到期，需立即续期',
  'Domain expires within a month': '域名将在一个月内到期',
  'Expires in {count} day(s)': '{count} 天后到期',
  'Domain registration is valid': '域名注册状态正常',

  // Firewall
  'WAF detected: {waf}': '检测到 WAF：{waf}',
  unknown: '未知',
  'No web application firewall detected': '未检测到 Web 应用防火墙',
  'Consider Cloudflare, AWS WAF or similar to filter malicious traffic':
    '可考虑 Cloudflare、AWS WAF 等服务来过滤恶意流量',

  // Leaky headers
  'Server discloses {header}': '响应头 {header} 暴露了服务器信息',
  'Value: {value}': '值：{value}',

  // HSTS
  'No HSTS header': '没有 HSTS 响应头',
  'Add Strict-Transport-Security to enforce HTTPS for clients':
    '建议添加 Strict-Transport-Security，强制客户端使用 HTTPS',
  'HSTS max-age under a year': 'HSTS max-age 不足一年',
  'Current max-age is {maxAge}, raise it to {minMaxAge} for preload eligibility':
    '当前 max-age 为 {maxAge}，需提高到 {minMaxAge} 才符合 preload 条件',
  'HSTS missing includeSubDomains': 'HSTS 缺少 includeSubDomains',
  'Add includeSubDomains to protect every subdomain':
    '建议添加 includeSubDomains，让所有子域都受保护',
  'HSTS missing preload directive': 'HSTS 缺少 preload 指令',
  'Add preload to qualify for the HSTS preload list':
    '建议添加 preload，才符合 HSTS preload 列表要求',
  'HSTS preload compatible': 'HSTS 满足 preload 要求',

  // HTTP security headers
  "Content-Security-Policy doesn't restrict scripts": 'CSP 未限制脚本来源',
  'Add script-src or default-src, so the policy can block injected scripts':
    '建议添加 script-src 或 default-src，策略才能拦截注入的脚本',
  'Content-Security-Policy allows inline scripts': 'CSP 允许内联脚本',
  "'unsafe-inline' lets injected scripts run. Use nonces or hashes instead":
    "'unsafe-inline' 会让注入的脚本执行，建议改用 nonce 或哈希",
  'Content-Security-Policy allows scripts from any source': 'CSP 允许从任意来源加载脚本',
  'Replace *, http:, https: or data: in script-src with the hosts you load from':
    '建议把 script-src 中的 *、http:、https: 或 data: 换成实际加载脚本的主机',
  'Content-Security-Policy allows eval()': 'CSP 允许使用 eval()',
  "'unsafe-eval' lets scripts run text as code, so injected text can run too":
    "'unsafe-eval' 允许把文本当作代码运行，注入的文本也会被执行",
  "Content-Security-Policy doesn't set {directives}": 'CSP 未设置 {directives}',
  "object-src 'none' blocks plugins, and base-uri 'self' stops injected <base> tags":
    "object-src 'none' 可拦截插件，base-uri 'self' 可阻止注入的 <base> 标签",
  ' or ': ' 或 ',
  '{label} is "{value}"': '{label} 的值为“{value}”',
  'Browsers keep to HTTPS for max-age seconds, so 0 or no max-age turns HSTS off':
    '浏览器在 max-age 秒内强制使用 HTTPS，设为 0 或不设 max-age 等于关闭 HSTS',
  'nosniff is the only valid value, browsers ignore anything else':
    '只有 nosniff 有效，其他值会被浏览器忽略',
  'Only DENY and SAMEORIGIN work, browsers ignore anything else':
    '只有 DENY 和 SAMEORIGIN 有效，其他值会被浏览器忽略',
  'Referrer-Policy "{value}" sends full URLs to other sites':
    'Referrer-Policy 为“{value}”时会把完整 URL 发给其他站点',
  'Paths and query strings leak to every site linked or loaded from the page':
    '页面链接或加载的每个站点都能拿到路径和查询参数',
  'X-XSS-Protection is turned on': 'X-XSS-Protection 已开启',
  'Browsers dropped this filter, and it made old ones less safe. Set it to 0':
    '浏览器已移除该过滤器，它还会让旧浏览器更不安全，建议设为 0',
  'Framing limited by CSP frame-ancestors': '页面嵌入已由 CSP frame-ancestors 限制',
  '{label} set': '已设置 {label}',
  'Missing {label}': '缺少 {label}',
  'Set the {label} response header': '建议设置 {label} 响应头',
  'Consider adding the {label} response header': '建议添加 {label} 响应头',

  // Mail: SPF
  'No SPF record found': '未找到 SPF 记录',
  'Publish a v=spf1 TXT record listing the servers allowed to send mail for this domain, or v=spf1 -all if it sends none':
    '建议发布一条 v=spf1 的 TXT 记录，列出允许为该域名发信的服务器；域名不发信时用 v=spf1 -all',
  'Multiple SPF records found': '发现多条 SPF 记录',
  'Receivers treat this as an SPF error, so merge them into a single v=spf1 record':
    '收件方会判定为 SPF 错误，建议合并为一条 v=spf1 记录',
  'SPF record needs {count} DNS lookups, over the limit of 10':
    'SPF 记录需要 {count} 次 DNS 查询，超过 10 次上限',
  'Receivers stop at 10 and treat SPF as failed. Remove includes you no longer use, or replace some with ip4/ip6 ranges':
    '收件方查到 10 次即停止并判定 SPF 失败，建议删除不再使用的 include，或把部分改为 ip4/ip6 网段',
  "SPF record doesn't fail unlisted senders": 'SPF 记录不会让未列出的发件方失败',
  'End the record with -all or ~all so mail from servers it does not list fails SPF':
    '建议在记录末尾加上 -all 或 ~all，让未列出服务器的来信判定为 SPF 失败',
  'SPF record published': '已发布 SPF 记录',

  // Mail: DMARC
  'No DMARC record found': '未找到 DMARC 记录',
  'Publish a v=DMARC1 TXT record on the _dmarc subdomain so receivers can act on spoofed mail':
    '建议在 _dmarc 子域发布 v=DMARC1 的 TXT 记录，让收件方可以处置伪造邮件',
  'Multiple DMARC records found': '发现多条 DMARC 记录',
  'Receivers ignore DMARC when there is more than one record, so merge them into one':
    '存在多条记录时收件方会忽略 DMARC，建议合并为一条',
  'DMARC policy is monitor-only{from}': 'DMARC 策略仅做监控{from}',
  ' (from {domain})': '（来自 {domain}）',
  'set {tag}=quarantine or {tag}=reject': '把 {tag} 设为 quarantine 或 reject',
  'Mail that fails DMARC is still delivered. Once reports show your own mail passing, {next}':
    'DMARC 验证失败的邮件仍会正常投递。等报告显示自有邮件全部通过后，再{next}',
  'Mail that fails DMARC is still delivered, and no reports are sent. Add rua=mailto:<address> to get reports, then {next}':
    'DMARC 验证失败的邮件仍会正常投递，且目前没有发送报告。建议添加 rua=mailto:<address> 以接收报告，然后再{next}',
  'DMARC policy only applies to {percent}% of failing mail{from}':
    'DMARC 策略只对 {percent}% 的失败邮件生效{from}',
  'Raise pct to 100, or remove it, so the policy applies to all failing mail':
    '建议把 pct 提高到 100 或直接删除，让策略覆盖全部失败邮件',
  'DMARC policy: {policy}{from}': 'DMARC 策略：{policy}{from}',
  "DMARC policy doesn't cover subdomains": 'DMARC 策略未覆盖子域',
  'sp={policy} lets spoofed mail from subdomains through. Set sp=quarantine or sp=reject, or remove sp so subdomains follow p':
    'sp={policy} 会让子域的伪造邮件通过，建议设为 sp=quarantine 或 sp=reject，或删除 sp 让子域沿用 p',

  // Mail: DKIM
  "Domain sends no mail, so DKIM isn't needed": '该域名不发信，无需配置 DKIM',
  'No DKIM key found on common selectors': '常见选择器上未找到 DKIM 密钥',
  "DKIM can use any selector name, so it may be set up under one we don't check. If not, publish a DKIM key so receivers can verify your mail":
    'DKIM 的选择器名称可任意指定，可能配置在未检查的选择器上。若确实没有配置，建议发布 DKIM 密钥，让收件方可以验证来信',
  'DKIM key under 1024 bits ({selectors})': 'DKIM 密钥不足 1024 位（{selectors}）',
  'Receivers ignore signatures from keys this short. Replace it with a 2048-bit key':
    '收件方会忽略这么短的密钥签出的签名，建议换成 2048 位密钥',
  '1024-bit DKIM key ({selectors})': 'DKIM 密钥为 1024 位（{selectors}）',
  '2048-bit keys are recommended. Rotate to a 2048-bit key, or ask your mail provider to':
    '建议使用 2048 位密钥，可自行轮换，或请邮件服务商更换',
  'DKIM key found ({selectors})': '已找到 DKIM 密钥（{selectors}）',

  // Mail: MTA-STS
  'MTA-STS not set up': '未配置 MTA-STS',
  'Without it, mail sent to this domain can be forced back to unencrypted delivery':
    '未配置时，发往该域名的邮件可能被降级为不加密投递',
  'MTA-STS policy is unreadable or invalid': 'MTA-STS 策略无法读取或无效',
  'Senders need one v=STSv1 record, and a valid mta-sts.<domain>/.well-known/mta-sts.txt':
    '发件方需要一条 v=STSv1 记录，以及有效的 mta-sts.<domain>/.well-known/mta-sts.txt',
  'MTA-STS policy leaves out {hosts}': 'MTA-STS 策略未覆盖 {hosts}',
  'Senders refuse to deliver to MX hosts an enforced policy leaves out, so add mx: lines':
    '策略为强制模式时，发件方不会投递到未覆盖的 MX 主机，建议补充 mx: 行',
  'MTA-STS is in {mode} mode': 'MTA-STS 处于 {mode} 模式',
  'Switch the policy to mode: enforce once TLS reports show mail arriving encrypted':
    '待 TLS 报告显示邮件已加密到达后，再把策略改为 mode: enforce',
  'MTA-STS policy enforced': 'MTA-STS 策略已强制生效',

  // Mail: TLS-RPT, DANE
  'TLS-RPT reports set up': '已配置 TLS-RPT 报告',
  'No TLS-RPT record': '没有 TLS-RPT 记录',
  'Publish a v=TLSRPTv1 TXT record on _smtp._tls, to hear when mail to you fails TLS':
    '建议在 _smtp._tls 发布 v=TLSRPTv1 的 TXT 记录，以便在邮件 TLS 失败时收到通知',
  'DANE TLSA records on {covered} of {total} MX host(s)':
    '{total} 个 MX 主机中已有 {covered} 个配置 DANE TLSA 记录',

  // Mixed content
  'No mixed content in the page HTML': '页面 HTML 中没有混合内容',
  'CSP upgrades {count} HTTP URL(s) to HTTPS': 'CSP 将 {count} 个 HTTP 地址升级为 HTTPS',
  'upgrade-insecure-requests is set, so these only load if the host supports HTTPS':
    '已设置 upgrade-insecure-requests，这些资源仅在主机支持 HTTPS 时才会加载',
  'Loads {count} script(s), style(s) or frame(s) over HTTP':
    '{count} 个脚本、样式或框架通过 HTTP 加载',
  'Browsers block these, which can break the page. From {hosts}':
    '浏览器会拦截这些请求，可能导致页面异常。来源：{hosts}',
  'Loads {count} image(s) or media file(s) over HTTP': '{count} 个图片或媒体文件通过 HTTP 加载',
  'Browsers upgrade or block these, old ones load them insecurely. From {hosts}':
    '浏览器会升级或拦截这些请求，旧版浏览器则按明文加载。来源：{hosts}',
  '{count} form(s) submit over HTTP': '{count} 个表单通过 HTTP 提交',
  'Anything entered is sent unencrypted, to {hosts}': '填写的内容会以明文发送到 {hosts}',
  'Integrity-Policy blocks {count} third-party script(s)':
    'Integrity-Policy 会拦截 {count} 个第三方脚本',
  "They have no SRI hash, so browsers won't run them. From {hosts}":
    '它们没有 SRI 哈希，浏览器不会执行。来源：{hosts}',
  'Integrity-Policy requires SRI on every script': 'Integrity-Policy 要求每个脚本都带 SRI',
  '{count} versioned third-party script(s) without SRI': '{count} 个带版本号的第三方脚本缺少 SRI',
  'Fixed files can take a hash, to stop tampered copies. From {hosts}':
    '固定版本的文件可以加哈希，防止被篡改的副本运行。来源：{hosts}',
  '{count} unversioned third-party script(s) without SRI': '{count} 个无版本号的第三方脚本缺少 SRI',
  'These can change without notice, so SRI would break them. From {hosts}':
    '这类脚本可能随时变更，加上 SRI 会导致其无法运行。来源：{hosts}',
  'All {count} third-party script(s) use SRI': '{count} 个第三方脚本全部使用 SRI',
  '{count} script(s) with SRI blocked for missing crossorigin':
    '{count} 个带 SRI 的脚本因缺少 crossorigin 被拦截',
  "Browsers need CORS to check the hash, so won't run these. From {hosts}":
    '浏览器需要 CORS 才能校验哈希，因此不会执行这些脚本。来源：{hosts}',

  // Open ports
  'Port {port} open: {risk}': '端口 {port} 开放：{risk}',
  'FTP (cleartext file transfer)': 'FTP（明文文件传输）',
  'Telnet (cleartext shell)': 'Telnet（明文 shell 会话）',
  'SMTP (mail server)': 'SMTP（邮件服务）',
  'POP3 (cleartext mail)': 'POP3（明文邮件）',
  'IMAP (cleartext mail)': 'IMAP（明文邮件）',
  'MySQL exposed to the internet': 'MySQL 暴露在公网',
  'RDP exposed to the internet': 'RDP 暴露在公网',
  'VNC exposed to the internet': 'VNC 暴露在公网',
  'Close it or restrict access by firewall if not required':
    '如非必要，建议关闭该端口，或用防火墙限制访问',

  // Lighthouse scores
  '{category} score: {pct}': '{category}得分：{pct}',
  'Lighthouse flagged {category} as below recommended': 'Lighthouse 判定{category}低于建议水平',
  Performance: '性能',
  Accessibility: '可访问性',
  'Best Practices': '最佳实践',
  SEO: 'SEO',

  // Redirects
  'Long redirect chain: {count} hops': '重定向链过长：{count} 次跳转',
  'Collapse intermediate redirects to reduce latency': '建议合并中间重定向，以降低延迟',
  '{count} redirect hop(s)': '{count} 次重定向',
  'HTTP requests are redirected to HTTPS': 'HTTP 请求已重定向到 HTTPS',
  'Site does not enforce HTTPS': '站点未强制使用 HTTPS',
  'Add a permanent redirect from http:// to https://':
    '建议添加从 http:// 到 https:// 的永久重定向',

  // robots.txt
  'robots.txt blocks Google from the entire site': 'robots.txt 阻止 Google 抓取整个站点',
  "Confirm this is intentional, otherwise the site won't appear in Google search":
    '请确认这是有意设置，否则站点不会出现在 Google 搜索结果中',

  // security.txt
  'security.txt has no Contact field': 'security.txt 缺少 Contact 字段',
  'Contact is required, as it tells researchers how to report a vulnerability':
    'Contact 为必填字段，用于告知安全研究人员如何报告漏洞',
  'security.txt has no valid Expires date': 'security.txt 缺少有效的 Expires 日期',
  'Expires is required. Set it under a year ahead, like 2027-01-01T00:00:00Z':
    'Expires 为必填字段，应设置在一年以内，例如 2027-01-01T00:00:00Z',
  'security.txt expired {days} day(s) ago': 'security.txt 已过期 {days} 天',
  'Researchers treat an expired file as out of date, so review it and move Expires on':
    '研究人员会把过期的文件视为失效，建议复核内容并顺延 Expires',
  'security.txt expires over a year ahead': 'security.txt 的 Expires 超过一年',
  'Keep Expires under a year ahead, so the file gets reviewed regularly':
    '建议把 Expires 控制在一年以内，以便定期复核文件',
  'No security.txt published': '未发布 security.txt',
  'Add /.well-known/security.txt with disclosure contact info':
    '建议添加 /.well-known/security.txt，写明漏洞报告联系方式',
  'security.txt found': '已找到 security.txt',
  'security.txt not PGP signed': 'security.txt 未使用 PGP 签名',
  'Sign the file to let researchers verify authenticity': '建议对文件签名，便于研究人员验证真实性',

  // Social presence
  'Social account not found: {count}': '社交账号不存在：{count} 个',
  'This site points to {accounts}, which does not exist': '站点指向的 {accounts} 并不存在',
  'Unconfirmed social accounts: {count}': '社交账号未确认：{count} 个',
  '{accounts} does not link back to this site': '{accounts} 未回链到本站',
  'Social accounts link back to this site': '社交账号已回链到本站',

  // Social tags
  'Social share metadata complete': '社交分享元数据完整',
  'Missing social tags: {count}': '缺少社交标签：{count} 项',
  'Add {tags} for cleaner share previews': '建议补充 {tags}，让分享预览更完整',

  // TLS certificate
  'SSL certificate expired': 'SSL 证书已过期',
  'Expired {days} day(s) ago': '已过期 {days} 天',
  'SSL certificate expiring within a week': 'SSL 证书将在一周内到期',
  'SSL certificate expiring soon': 'SSL 证书即将到期',
  'Expires in {count} day(s), schedule renewal': '{count} 天后到期，建议安排续期',
  'SSL certificate renews within a month': 'SSL 证书将在一个月内到期',
  'SSL certificate invalid': 'SSL 证书无效',
  'Certificate failed validation': '证书未通过验证',
  'SSL certificate valid': 'SSL 证书有效',

  // Response status
  'Slow response time: {time}ms': '响应时间偏慢：{time}ms',
  'Investigate server performance, caching or CDN coverage':
    '建议排查服务器性能、缓存配置或 CDN 覆盖范围',
  'Response time over {time}ms': '响应时间超过 {time}ms',
  'Site responded with {code}': '站点返回状态码 {code}',

  // Threat feeds
  'Listed by Google Safe Browsing': '已被 Google Safe Browsing 收录',
  'Site flagged for malware, phishing or unwanted software':
    '站点被标记为包含恶意软件、钓鱼内容或不需要的软件',
  'Listed on URLhaus malware feed': '已列入 URLhaus 恶意软件情报',
  'Listed on PhishTank': '已列入 PhishTank',
  'Cloudmersive flagged this site as unsafe': 'Cloudmersive 将本站标记为不安全',
  'No threat feed matches': '未命中任何威胁情报源',

  // TLS client compatibility
  ' (+{count} more)': '（另有 {count} 个）',
  '{count} simulated client(s) cannot connect': '{count} 个模拟客户端无法建立连接',
  '{sample}{more}. Drop legacy ciphers/protocols only after weighing reach':
    '{sample}{more}。建议在权衡覆盖范围后再停用旧加密套件和协议',

  // TLS connection
  'Outdated TLS protocol negotiated: {protocol}': '协商出的 TLS 协议版本已过时：{protocol}',
  'Disable TLS 1.0 and 1.1 on the server': '建议在服务器上禁用 TLS 1.0 和 1.1',
  'Server still accepts {versions}': '服务器仍接受 {versions}',
  ' and ': ' 和 ',
  'Browsers dropped these in 2020 and they have known weaknesses, so disable them':
    '浏览器已于 2020 年停止支持，且这些版本存在已知弱点，建议禁用',
  'TLS 1.2 in use, consider enabling TLS 1.3': '当前使用 TLS 1.2，建议启用 TLS 1.3',
  'TLS 1.3 negotiated': '已协商使用 TLS 1.3',
  'No forward secrecy in negotiated cipher': '协商出的加密套件不支持前向保密',
  'Prefer ECDHE or DHE cipher suites': '建议优先使用 ECDHE 或 DHE 加密套件',
  'OCSP stapling not enabled': 'OCSP stapling 未启用',
  'Enable OCSP stapling to speed up cert revocation checks':
    '建议启用 OCSP stapling，加快证书吊销状态检查',
  'HTTP/2 negotiated via ALPN': '已通过 ALPN 协商使用 HTTP/2',

  // TLS grade
  'SSL Labs grade {grade}': 'SSL Labs 评级 {grade}',
  'Review cipher suites, protocol versions and key strength':
    '建议检查加密套件、协议版本和密钥强度',

  // Trackers
  'Loads {count} advertising tracker(s)': '加载 {count} 个广告追踪器',
  'Reports to {count} analytics service(s)': '向 {count} 个分析服务上报数据',
  'Contacts {count} other tracking host(s)': '连接 {count} 个其他追踪主机',
  'No trackers found': '未发现追踪器',

  // Vulnerabilities
  'No known CVEs on this host': '该主机未发现已知 CVE',
  'Shodan reports {count} CVE(s) on this host': 'Shodan 报告该主机存在 {count} 个 CVE',
  '{note}{cves}{more}. Patch affected services or block at the firewall':
    '{note}{cves}{more}。建议为受影响服务打补丁，或在防火墙处拦截',
  '{count} known to be exploited in the wild. ': '{count} 个已知在野利用。',
};

export default rules;
