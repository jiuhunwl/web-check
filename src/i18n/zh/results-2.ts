/**
 * Chinese copy for the second half of the result cards (Rank through WhoIs).
 *
 * Keys are the English source strings exactly as they appear in the JSX.
 */
const resultsTwo: Record<string, string> = {
  // Rank
  'Date : {date}': '日期：{date}',
  Rank: '排名',
  'Change since Yesterday': '较昨日变化',
  'Historical Average Rank': '历史平均排名',

  // Redirects
  'Redirects Followed': '重定向次数',
  'Redirects to HTTPS': '重定向至 HTTPS',

  // RobotsTxt
  'No crawl rules found.': '未发现抓取规则。',
  'Google Search': 'Google 搜索',
  Blocked: '已拦截',
  Allowed: '允许',
  'AI Crawlers Blocked': '已拦截的 AI 爬虫',
  '{blocked} of {total}': '{blocked} / {total}',
  Found: '已找到',
  'Not found': '未找到',

  // Screenshot
  'Full page screenshot': '整页截图',

  // SecurityTxt
  Present: '存在',
  'File Location': '文件位置',
  'PGP Signed': 'PGP 签名',
  Contact: '联系方式',
  Missing: '缺失',
  Expires: '到期',
  'View Full Policy': '查看完整策略',
  'Having a security.txt ensures security researchers know how and where to safely report vulnerabilities.':
    '提供 security.txt，可让安全研究人员知道如何、在哪里安全上报漏洞。',

  // ServerInfo
  Organization: '组织',
  'Service Provider': '服务商',
  'Operating System': '操作系统',
  'ASN Code': 'ASN 编号',
  Ports: '端口',
  Type: '类型',
  Location: '位置',

  // ServerLocation
  City: '城市',
  Country: '国家',
  Timezone: '时区',
  Network: '网络',
  'Server ({isp})': '服务器（{isp}）',
  'Latitude: {lat}, Longitude: {lon}': '纬度：{lat}，经度：{lon}',

  // ServerStatus
  'DNS Lookup': 'DNS 查询',
  'TCP Connect': 'TCP 连接',
  'TLS Handshake': 'TLS 握手',
  'Server Response': '服务器响应',
  Download: '下载',
  'Is Up?': '是否在线',
  Online: '在线',
  Offline: '离线',
  'Status Code': '状态码',
  'Response Time': '响应时间',

  // Sitemap
  'Last Modified': '最后修改',
  'Change Frequency': '更新频率',
  Priority: '优先级',
  'This site returns a sitemap index, which is a list of sitemaps.':
    '该站点返回站点地图索引，即站点地图的列表。',

  // SocialPresence
  Unknown: '未知',
  'The network could not be reached, so this account was not checked':
    '无法连接到该网络，因此未检查此账号',
  'This handle does not resolve to a live account': '该用户名未对应任何有效账号',
  'The handle is this domain, so the network has verified control of it':
    '用户名即为该域名，网络已确认其控制权',
  'The profile links back to this site, and the network has verified the link':
    '个人资料回链本站，且网络已核实该链接',
  'The profile links back to this site': '个人资料回链本站',
  'The profile links to {site} instead': '个人资料改为链接到 {site}',
  'The profile lists no website to check against': '个人资料未列出可供核对的网站',
  Handle: '用户名',
  Name: '名称',
  Joined: '加入时间',
  Repositories: '仓库',
  Posts: '帖子',
  Followers: '关注者',
  Website: '网站',
  Verification: '验证',

  // SocialTags
  Banner: '横幅',
  Title: '标题',
  Description: '描述',
  Keywords: '关键词',
  'Canonical URL': '规范 URL',
  'OpenGraph Title': 'OpenGraph 标题',
  'OpenGraph Description': 'OpenGraph 描述',
  'OpenGraph Image': 'OpenGraph 图片',
  'Twitter Card': 'Twitter 卡片',
  'Theme Color': '主题色',
  'X Profile': 'X 账号',
  Author: '作者',
  Publisher: '发布者',
  Generator: '生成器',

  // SslCert
  'TLS Web Server Authentication': 'TLS Web 服务器认证',
  'TLS Web Client Authentication': 'TLS Web 客户端认证',
  'Code Signing': '代码签名',
  'Email Protection (SMIME)': '邮件保护（SMIME）',
  'Time Stamping': '时间戳',
  'OCSP Signing': 'OCSP 签名',
  'IPSec End System': 'IPSec 终端系统',
  'IPSec Tunnel': 'IPSec 隧道',
  'IPSec User': 'IPSec 用户',
  'IKE Intermediate': 'IKE 中间节点',
  'Netscape Server Gated Crypto': 'Netscape 服务器门控加密',
  'Microsoft Server Gated Crypto': 'Microsoft 服务器门控加密',
  'Microsoft Encrypted File System': 'Microsoft 加密文件系统',
  'Microsoft Smartcard Logon': 'Microsoft 智能卡登录',
  'Microsoft Document Signing': 'Microsoft 文档签名',
  'Email Address (in Subject Alternative Name)': '电子邮件地址（位于主体备用名称中）',
  'RSA {bits}-bit': 'RSA {bits} 位',
  'EC {bits}-bit ({curve})': 'EC {bits} 位（{curve}）',
  '{bits}-bit': '{bits} 位',
  Subject: '主体',
  Issuer: '颁发者',
  Trusted: '受信任',
  'No ({error})': '否（{error}）',
  'Public Key': '公钥',
  Renewed: '签发',
  Lifetime: '有效期',
  '{count} days': '{count} 天',
  '{count} day': '{count} 天',
  'Serial Num': '序列号',
  Fingerprint: '指纹',
  'Alternative Names': '备用名称',
  'Certificate Chain': '证书链',
  'Extended Key Usage': '扩展密钥用途',

  // Subdomains
  'Base Domain': '主域名',
  'Subdomains Found': '发现子域名',
  Showing: '显示范围',
  'First {count}': '前 {count} 个',
  'Source: Certificate Transparency logs via {source}': '来源：经 {source} 获取的证书透明度日志',

  // TechStack
  '{count}% certain': '置信度 {count}%',
  'Certainty: {count}%': '置信度：{count}%',
  'Learn more at:': '了解更多：',

  // Threats
  'Google Safe Browsing': 'Google 安全浏览',
  Safe: '安全',
  Unsafe: '不安全',
  'Threat Type': '威胁类型',
  'Phishing Status': '钓鱼状态',
  'No Phishing Found': '未发现钓鱼',
  'Phishing Identified': '发现钓鱼',
  'Phish Info': '钓鱼信息',
  'Malware Status': '恶意软件状态',
  'No Malware Found': '未发现恶意软件',
  Status: '状态',
  'Malware Identified': '发现恶意软件',
  'First Seen': '首次发现',
  'Bad URLs Count': '恶意 URL 数量',
  'Reported URLs': '已上报 URL',
  'Date Added': '添加日期',
  'Reported By': '上报者',
  'Takedown Time': '下线耗时',
  '{count} seconds': '{count} 秒',
  Tags: '标签',
  Reference: '参考链接',
  'File Path': '文件路径',

  // TlsClientCompat
  Client: '客户端',
  Protocol: '协议',
  Cipher: '加密套件',
  'Key Exchange': '密钥交换',
  'Key Exchange Strength': '密钥交换强度',
  'DH Strength': 'DH 强度',
  'Key Algorithm': '密钥算法',
  'Key Size': '密钥长度',
  'Signature Algorithm': '签名算法',
  Attempts: '尝试次数',
  'This client cannot complete the TLS handshake': '该客户端无法完成 TLS 握手',
  Connects: '可连接',
  Fails: '连接失败',

  // TlsConnection
  '{size}-bit': '{size} 位',
  'Cipher Suite': '加密套件',
  'Cipher Version': '加密套件版本',
  'Ephemeral Key': '临时密钥',
  'Forward Secrecy': '前向保密',
  'Session Resumption': '会话恢复',
  'OCSP Stapling': 'OCSP 装订',
  'Not Present': '不存在',
  'Certificate Trust': '证书信任',
  Untrusted: '不受信任',
  'TLS Versions': 'TLS 版本',
  Enabled: '已启用',
  Disabled: '已禁用',

  // TlsSecurityAudit
  'With all browsers': '所有浏览器均支持',
  'With most modern browsers': '多数现代浏览器支持',
  Limited: '有限',
  'Not set': '未设置',
  Invalid: '无效',
  'Under the one year the HSTS preload list needs': '低于 HSTS 预加载列表要求的一年',
  'Not supported': '不支持',
  'Insecure client-initiated': '客户端发起且不安全',
  secure: '安全',
  'secure client-initiated': '客户端发起且安全',
  'server-required': '服务器强制要求',
  unknown: '未知',
  Supported: '支持',
  'IDs returned, not resumed': '返回会话 ID 但未恢复',
  'Not enabled': '未启用',
  'Supported (CRIME risk)': '支持（存在 CRIME 风险）',
  'Not tested': '未测试',
  Vulnerable: '存在漏洞',
  Grade: '评级',
  'Grade (trust ignored)': '评级（忽略信任链）',
  Protocols: '协议',
  HSTS: 'HSTS',
  Renegotiation: '重协商',
  'Fallback SCSV (downgrade protection)': 'Fallback SCSV（降级防护）',
  'Certificate Transparency': '证书透明度',
  'Redirects To': '重定向目标',
  'ChaCha20 Preferred': '优先 ChaCha20',
  'AEAD Cipher Support': 'AEAD 加密套件支持',
  'Legacy CBC Cipher Support': '旧版 CBC 加密套件支持',
  'TLS Compression': 'TLS 压缩',
  'Static DH Key Reuse': '静态 DH 密钥复用',
  'Weak DH Primes': '弱 DH 素数',
  'Static ECDH Parameter Reuse': '静态 ECDH 参数复用',

  // TraceRoute
  'Packet #{packet}:': '数据包 #{packet}：',
  'Took {time} ms': '耗时 {time} ms',
  'Round trip completed in {time} ms': '往返完成，耗时 {time} ms',

  // Trackers
  Requests: '请求数',
  Host: '主机',
  'Based In': '所在地',
  'Privacy Policy': '隐私政策',
  View: '查看',
  'Requests Made': '请求次数',
  Companies: '公司数',
  'Third Parties': '第三方',
  'Other Trackers': '其他追踪器',
  Unrecognised: '未识别',

  // Vulnerabilities
  'Known CVEs': '已知 CVE',
  'Actively exploited': '已被实际利用',
  "In CISA's Known Exploited Vulnerabilities catalog": '在 CISA 已知被利用漏洞目录中',
  Exploited: '已利用',
  Port: '端口',

  // WhoIs
  Created: '创建时间',
  Updated: '更新时间',
  'Name Servers': '域名服务器',

  // Shared values
  None: '无',
};

export default resultsTwo;
