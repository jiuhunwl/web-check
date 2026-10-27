/**
 * Chinese copy for the result cards and their shared chrome.
 *
 * Keys are the English source strings exactly as they appear in the JSX, so a
 * key that is not listed here simply renders in English. Interpolate with
 * {name} placeholders, keeping the same placeholder names as the source.
 */
const results: Record<string, string> = {
  // Shared values
  Yes: '是',
  No: '否',
  None: '无',
  Unknown: '未知',
  'N/A, page is HTTP': '不适用，页面为 HTTP',

  // Archives
  'First Scan': '首次扫描',
  'Last Scan': '最近扫描',
  'Days Archived': '存档天数',
  'Change Count': '变更次数',
  'Avg Size': '平均大小',
  'Avg Days between Archives': '平均存档间隔',
  'View historical versions of this page': '历史版本可在',
  here: '此处',
  ", via the Internet Archive's Wayback Machine.":
    '查看，数据来自 Internet Archive 的 Wayback Machine。',
  '{value} bytes': '{value} 字节',

  // Block lists
  'Not Blocked': '未拦截',
  Blocked: '已拦截',

  // Breaches
  Domain: '域名',
  Breaches: '数据泄露',
  '{count} accounts': '{count} 个账号',
  'Breach Date': '泄露日期',
  Site: '站点',
  Verified: '已验证',
  'Data Exposed': '泄露数据',
  Details: '详情',
  'Source:': '来源：',

  // CAA records
  'Allowed CAs': '允许的 CA',
  'Allowed CAs for Wildcards': '泛域名允许的 CA',
  'Violation Reports': '违规报告',
  'Contact Email': '联系邮箱',
  'Contact Phone': '联系电话',
  'CAA Records': 'CAA 记录',
  '{value} (critical)': '{value}（关键）',
  'Without CAA records, any certificate authority can issue for this domain':
    '没有 CAA 记录时，任何证书颁发机构都可为该域名签发证书',

  // Carbon footprint
  'Unable to calculate carbon footprint for host': '无法计算该主机的碳足迹',
  'HTML Initial Size': 'HTML 初始大小',
  'Adjusted Transfer Size': '调整后传输量',
  'CO2 for Initial Load': '首次加载 CO2',
  'Energy Usage for Load': '加载能耗',
  'Cleaner than average page (est.)': '优于平均页面（估算）',
  'Calculated using the': '计算依据：',

  // Content links
  Summary: '概要',
  'Internal Link Count': '内部链接数',
  'External Link Count': '外部链接数',
  'Internal Links': '内部链接',
  'External Links': '外部链接',

  // Cookies
  Cookies: 'Cookie',
  '(unnamed)': '（未命名）',

  // DNS records
  '{value} (priority {priority})': '{value}（优先级 {priority}）',
  '{count} records': '{count} 条记录',

  // DNSSEC
  'Zone Signing Key (ZSK)': '区域签名密钥（ZSK）',
  'Key Signing Key (KSK)': '密钥签名密钥（KSK）',
  'DNSKEY - Present?': 'DNSKEY - 是否存在？',
  'DS - Present?': 'DS - 是否存在？',
  'RRSIG - Validated?': 'RRSIG - 是否已验证？',
  'Recursion Desired': '期望递归',
  'Recursion Available': '支持递归',
  TrunCation: '截断',
  'Authentic Data': '已验证数据',
  'Checking Disabled': '禁用检查',
  '{label} ({flag})': '{label}（{flag}）',
  'Record #{number}': '记录 #{number}',
  Type: '类型',
  Algorithm: '算法',
  Flags: '标志',
  Protocol: '协议',
  'Public Key': '公钥',
  'Key Tag': '密钥标签',
  'Digest Type': '摘要类型',
  Digest: '摘要',
  '{name} ({code})': '{name}（{code}）',

  // DNS server
  Zone: '区域',
  'DNS Server #{number}': 'DNS 服务器 #{number}',
  Hostname: '主机名',
  'IP Address': 'IP 地址',

  // Domain lookup
  'Registered Domain': '注册域名',
  'Creation Date': '创建时间',
  'Updated Date': '更新时间',
  'Registry Expiry Date': '注册局到期时间',
  'Registry Domain ID': '注册局域名 ID',
  'Registrar WHOIS Server': '注册商 WHOIS 服务器',
  Registrar: '注册商',
  'Registrar IANA ID': '注册商 IANA ID',

  // Firewall
  Firewall: '防火墙',
  'No*': '否*',
  '*The domain may be protected with a proprietary or custom WAF which we were unable to identify automatically':
    '*该域名可能部署了我们无法自动识别的私有或自建 WAF',

  // Hostnames
  Domains: '域名',
  Hosts: '主机名',

  // HSTS
  'HSTS Enabled?': '已启用 HSTS？',
  '{count} days': '{count} 天',
  '{count} seconds': '{count} 秒',
  // Verdicts come from the handler, worded once and translated here
  'Site does not serve any HSTS headers.': '站点未返回任何 HSTS 响应头。',
  'HSTS max-age is {maxAge}, below the {min} minimum.':
    'HSTS 的 max-age 为 {maxAge}，低于最低要求 {min}。',
  'HSTS header does not include all subdomains.':
    'HSTS 响应头缺少 includeSubDomains 指令，子域名不受保护。',
  'HSTS header does not contain the preload directive.':
    'HSTS 响应头缺少 preload 指令，无法加入预加载列表。',
  'Site is compatible with the HSTS preload list!': '站点符合 HSTS 预加载列表要求！',

  // HTTP security
  'Via CSP': '通过 CSP',

  // Lighthouse
  Pass: '通过',
  Average: '中等',
  Fail: '失败',
  Performance: '性能',
  Accessibility: '可访问性',
  'Best Practices': '最佳实践',

  // Mail configuration
  Invalid: '无效',
  'Not set up': '未配置',
  'Not needed': '无需配置',
  'Not found': '未找到',
  'Mode: {mode}': '模式：{mode}',
  Unreadable: '无法解析',
  'Mail Security Checklist': '邮件安全检查',
  'MX Records': 'MX 记录',
  'Null MX, accepts no mail': 'Null MX，不接收邮件',
  'Priority: {priority}': '优先级：{priority}',
  'External Mail Services': '外部邮件服务',
  'Authorised Senders': '授权发件方',
  'Mail-related TXT Records ({count})': '邮件相关 TXT 记录（{count}）',

  // Mixed content
  '{count} upgraded by CSP': '{count} 项已由 CSP 升级',
  '{count} found': '{count} 项',
  Page: '页面',
  'Mixed Content': '混合内容',
  'Upgrade Insecure Requests': '升级不安全请求',
  'Third-Party Scripts in HTML': 'HTML 中的第三方脚本',
  'Using SRI': '启用 SRI',
  '{done} of {total}': '{done} / 共 {total}',
  'Blocks {count} script(s)': '拦截 {count} 个脚本',
  Enforced: '已强制',
  'Insecure Scripts, Styles & Frames': '不安全的脚本、样式与框架',
  'Insecure Images & Media': '不安全的图片与媒体',
  'Insecure Form Targets': '不安全的表单目标',
  'Versioned Scripts Without SRI': '带版本号但缺少 SRI 的脚本',
  'Unversioned Scripts Without SRI': '未加版本号且缺少 SRI 的脚本',
  'SRI Scripts Missing crossorigin': '缺少 crossorigin 的 SRI 脚本',

  // Open ports
  'Unable to establish connections to:': '无法连接到：',
};

export default results;
