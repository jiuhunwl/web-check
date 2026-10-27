/**
 * Shared UI copy: navigation, footer, settings, scan form, results chrome,
 * empty and error states.
 *
 * Keys are the English source strings exactly as they appear in the markup or
 * JSX. Interpolate with {name} placeholders, keeping the same placeholder names
 * as the source.
 */
const common: Record<string, string> = {
  // Navigation
  Home: '首页',
  Check: '检测',
  Docs: '文档',
  API: 'API',
  Server: '服务器',
  Login: '登录',
  'Web Check': 'Web Check',
  'Visit {site}': '访问 {site}',

  // Footer
  Tools: '工具',
  Project: '项目',
  Glossary: '术语表',
  'Self-hosting': '自托管',
  About: '关于',
  'Source code': '源代码',
  'Report an issue': '报告问题',
  Sponsor: '赞助',
  'All {count} checks': '全部 {count} 项检测',
  'The all-in-one OSINT and security tool, for revealing the inner workings of any website.':
    '一站式的 OSINT 与安全工具，帮你摸清任意网站的内部构造。',
  'View source at {repo}': '源码托管于 {repo}',
  '{project} is licensed under {license} - © {author} {year}':
    '{project} 基于 {license} 许可证发布 - © {author} {year}',

  // Settings
  Settings: '设置',
  'Close settings': '关闭设置',
  Close: '关闭',
  Display: '显示',
  Accessibility: '无障碍',
  Configuration: '配置',
  Privacy: '隐私',
  Theme: '主题',
  Language: '语言',
  Locale: '区域格式',
  'Used for dates, numbers and currencies': '用于日期、数字与货币的显示格式',
  'Match browser': '跟随浏览器',
  'Reduce motion': '减弱动效',
  'Turns off animations and transitions': '关闭动画与过渡效果',
  'High contrast': '高对比度',
  'Stronger text, borders and focus rings': '加深文字、边框与聚焦轮廓',
  'Text size': '字号',
  Small: '小',
  Default: '默认',
  Large: '大',
  Larger: '特大',
  'Skipped checks': '跳过检测项',
  'These get left out of every scan': '每次扫描都不会运行这些项',
  'Error monitoring': '错误监控',
  'Sends anonymous error reports, so we can fix bugs': '发送匿名错误报告，帮助我们修复问题',
  'Basic traffic stats': '基础流量统计',
  'Counts page views, with no personal data': '只统计访问量，不涉及任何个人数据',
  'Clear all data': '清除所有数据',
  'Wipes your settings and anything else saved in this browser':
    '清空你的设置，以及保存在此浏览器中的其他数据',
  'Clear data': '清除数据',
  'Sure? Click again': '确定？再点一次',
  '{count} skipped': '已跳过 {count} 项',
  None: '无',
  '{count} selected': '已选 {count} 项',

  // Scan form
  'Enter a URL': '输入网址',
  Analyze: '开始检测',
  'Run one category': '只跑某一类检测',
  'E.g.': '例如',
  'E.g. duck.com': '例如 duck.com',

  // Results chrome
  Advisory: '检查建议',
  Critical: '严重',
  Issues: '问题',
  Warnings: '警告',
  Informational: '提示',
  Passes: '通过',
  'Info about {title}': '关于{title}',
  'Re-fetch {title} data': '重新获取{title}数据',
  Success: '成功',
  Loading: '加载中',
  Error: '错误',
  'Timed out': '已超时',
  Skipped: '已跳过',
  Retry: '重试',
  '■ Show Error': '■ 查看错误',
  '■ Show Timeout Reason': '■ 查看超时原因',
  '■ Show Skip Reason': '■ 查看跳过原因',
  'Took {time} ms': '耗时 {time} ms',
  'Loading {done} of {total} ({seconds}s)': '正在加载 {done}/{total}（{seconds} 秒）',
  'Loading {done} of {total}': '正在加载 {done}/{total}',
  'Finished {count} lookups in {seconds}s': '已完成 {count} 项查询，用时 {seconds} 秒',
  '{count} issue': '{count} 个问题',
  '{count} issues': '{count} 个问题',
  '{seconds} s': '{seconds} 秒',
  '{count} jobs {label}': '{count} 项{label}',
  'Loading {done} / {total} Jobs': '正在加载 {done}/{total} 项',
  '{count} Jobs Completed Successfully': '{count} 项检测已完成',
  'Done in {elapsed}': '用时 {elapsed}',
  'Show Load State': '查看加载状态',
  'Show Details': '查看详情',
  'Check the browser console for logs and more info': '更多信息与日志请查看浏览器控制台',
  "It's normal for some jobs to fail, either because the host doesn't return the required info, or restrictions in the lambda function, or hitting an API limit.":
    '部分检测失败是正常现象：可能是目标主机没有返回所需信息，也可能是函数运行环境受限，或触发了 API 调用上限。',
  'Learn More about Web-Check': '了解 Web-Check 的更多信息',
  Dismiss: '收起',
  'Crunching data': '正在分析数据',
  '{done} / {total} checks': '{done} / {total} 项检测',
  'Crunching data, {done} of {total} done': '正在分析数据，已完成 {done}/{total}',
  'It may take up to a minute for all jobs to complete': '全部检测最多可能需要一分钟',
  'You can view preliminary results as they come in below': '结果会陆续显示在下方，可以先看已完成的部分',
  successful: '成功',
  skipped: '已跳过',
  'timed out': '已超时',
  failed: '失败',
  'Details for {name}': '{name} 的详情',
  "The {name} job ended with state '{state}' after {time} ms.":
    '「{name}」以「{state}」状态结束，耗时 {time} ms。',
  "The {name} job ended with state '{state}'.": '「{name}」以「{state}」状态结束。',
  'Reason:': '原因：',
  'Server response:': '服务器响应：',

  // Error states
  'Cannot Reach This Site': '无法访问该网站',
  'We could not resolve an IP address for this host, so checks cannot run':
    '无法解析该主机对应的 IP 地址，因此检测无法运行',
  'The domain might be misspelled or no longer registered': '域名可能拼写有误，或已不再注册',
  'The website may be offline or temporarily unreachable': '网站可能离线，或暂时无法访问',
  'A DNS resolution issue may be affecting the lookup': 'DNS 解析异常可能导致查询失败',
  'A firewall or geo-block may be preventing access': '防火墙或地区限制可能拦截了访问',
  'Invalid Input': '输入无效',
  'That does not look like a valid URL or IP address, so checks cannot run':
    '这不像一个有效的网址或 IP 地址，因此检测无法运行',
  'Enter a domain (example.com) or an IPv4 / IPv6 address':
    '请输入域名（如 example.com）或 IPv4 / IPv6 地址',
  'Check for typos or stray characters in the input': '检查输入中是否有拼写错误或多余字符',
  'Avoid spaces and unsupported symbols in the address': '地址中不要包含空格或不支持的符号',
  'Service Unavailable': '服务不可用',
  'Most checks failed because the Web-Check API could not be reached':
    '多数检测失败，原因是无法连接 Web-Check API',
  'The API may be down, restarting or rate-limited': 'API 可能已停止、正在重启，或触发了速率限制',
  'A self-hosted instance might be misconfigured or offline': '自托管实例可能配置有误或已离线',
  'A network or firewall issue could be blocking the API': '网络或防火墙问题可能拦截了 API 请求',
  'Scanning Not Permitted': '不允许扫描',
  'Every check was skipped, as this instance does not allow scanning this host':
    '所有检测都被跳过，因为此实例不允许扫描该主机',
  'The administrator may have blocked this domain or IP range': '管理员可能已屏蔽该域名或 IP 段',
  'The instance may be configured to not run these checks': '该实例可能被配置为不运行这些检测',
  'You can still scan this host from your own instance of Web-Check':
    '你仍然可以在自己部署的 Web-Check 上扫描该主机',
  'Web-Check is Paused': 'Web-Check 已暂停',
  'This instance has been temporarily disabled, so checks cannot run':
    '此实例已被临时停用，因此检测无法运行',
  'The public instance may be paused to manage running costs': '公共实例可能为控制运行成本而暂停',
  'A self-hosted instance may be in maintenance mode': '自托管实例可能处于维护模式',
  'You can run your own copy from the open-source repo on GitHub':
    '你可以从 GitHub 上的开源仓库自行部署一份',
  'Possible reasons:': '可能的原因：',
  Reason: '原因',
  'Lookup error': '查询错误',
  'Not Found': '页面不存在',
  'Back to Homepage': '返回首页',
  'Report Issue': '报告问题',
  'Go back Home': '返回首页',
  'View on GitHub': '在 GitHub 上查看',
  "Something's gone wrong": '出了点问题',
  'An unexpected error occurred.': '发生了意外错误。',
  "We're sorry this happened. Usually reloading the page will resolve this, but if it doesn't, please raise a bug report.":
    '很抱歉发生这种情况。通常刷新页面即可解决；若仍然不行，请提交问题报告。',
  'Below is the error message we received:': '以下是收到的错误信息：',
  'Reload Page': '重新加载页面',

  // Job skip reasons, shown in the load-state modal
  "Skipped, because the target's IP address could not be found":
    '已跳过：找不到该目标对应的 IP 地址',
  'Unknown error': '未知错误',
  'This check requires a domain name and cannot be run against an IP address':
    '该检测需要域名，无法针对 IP 地址运行',
  'This check is only available for {types} input': '该检测仅支持 {types} 类型的输入',
  'This check is not applicable for the current input': '该检测不适用于当前输入',
  'Web-Check has been temporarily disabled on this instance': '此实例上的 Web-Check 已被临时停用',
  'Client-side timeout reached': '已达到客户端超时上限',
  // Reasons the handlers send back when a check has nothing to work with
  'Breach lookups apply to domains, not IP addresses': '数据泄露查询只适用于域名，不适用于 IP 地址',
  'CAA records apply to domains, not IP addresses': 'CAA 记录只适用于域名，不适用于 IP 地址',
  'Could not resolve a registrable domain': '无法解析出可注册的域名',
  'No SSL Labs report available for this host': '该主机暂无 SSL Labs 报告',
  'No TXT records for this host': '该主机没有 TXT 记录',
  'No WHOIS data available for this domain': '该域名暂无 WHOIS 数据',
  'No mail server in use on this domain': '该域名未使用邮件服务器',
  'No quality report available for this URL': '该 URL 暂无质量报告',
  'No robots.txt file present on this host': '该主机上没有 robots.txt 文件',
  'No robots.txt rules found for this host': '该主机的 robots.txt 中没有可用规则',
  'No sitemap found for this site': '未发现该站点的站点地图',
  'No social profiles found for this site': '未发现该站点的社交账号',
  'No social tags found on this page': '该页面没有社交标签',
  'No threat sources returned data for this host': '所有威胁情报源都没有该主机的数据',
  'Page is not HTML, so has no resources to check': '页面不是 HTML，没有可检查的资源',
  'Site has never before been archived via the Wayback Machine':
    '该站点从未被 Wayback Machine 存档',
  'Site returned no content, cannot calculate carbon': '站点未返回内容，无法计算碳排放',
  'Subdomain enumeration only applies to domain names': '子域名枚举只适用于域名',
  'Traceroute returned no answered hops for this host': '该主机的路由追踪没有收到任何响应节点',
  'WHOIS lookups apply to domains, not IP addresses': 'WHOIS 查询只适用于域名，不适用于 IP 地址',
  "{host} isn't ranked in the top 1 million sites yet": '{host} 尚未进入全球前 100 万网站排名',
  'No nameservers found for {domain}': '未找到 {domain} 的名称服务器',
  'No subdomains found for {domain} in Certificate Transparency logs':
    '证书透明度日志中没有发现 {domain} 的子域名',
  'Host could not be resolved': '无法解析该主机',
  'No internal or external links found in the page HTML.':
    '页面 HTML 中未发现内部或外部链接。',
  'Traceroute is not installed in this environment.': '当前环境未安装 traceroute。',
  // Built by requireEnv() and upstreamError(), with the name kept in the middle
  '{service} requires {env} to be set': '需要先配置 {env}，才能运行{service}。',
  'No {context} data for this host': '该主机暂无{context}数据。',
  'Quality check': '质量检测',
  'CAA lookup': 'CAA 查询',
  'DNS server lookup': 'DNS 服务器查询',
  'Firewall check': '防火墙检测',
  'Headers fetch': '响应头抓取',
  'Linked pages fetch': '外链页面抓取',
  'Page fetch': '页面抓取',
  'Redirect lookup': '重定向查询',

  // Raw data and docs
  'View / Download Raw Data': '查看 / 下载原始数据',
  'Related check:': '相关检测：',
  'Option #{number}': '方案 {number}',
  'Download Results': '下载结果',
  'Update Results': '更新结果',
  'View Results': '查看结果',
  'Hide Results': '隐藏结果',
  'Results, via JSON Hero': '结果（由 JSON Hero 呈现）',
  'Your results are available to view {link}.': '结果可在{link}查看。',
  here: '此处',
  'These are the raw results generated from your URL, and in JSON format. You can import these into your own program, for further analysis.':
    '这是根据你的网址生成的原始结果，格式为 JSON。你可以导入自己的程序做进一步分析。',
  'Use Cases': '使用场景',
  Links: '相关链接',
  'No Docs provided for this widget yet': '该检测项暂无文档',
  'This component errored unexpectedly': '该组件出现意外错误',
  'Usually this happens if the result from the server was not what was expected. Check the logs for more info. If you continue to experience this issue, please raise a ticket on the repository.':
    '通常是因为服务器返回的结果与预期不符。请查看日志了解详情；若问题持续出现，请在代码仓库提交 issue。',
  'Error Details': '错误详情',

  // Self-scan easter egg
  'Self-Scan': '扫描自身',
  "Nice try! But scanning this app is like trying to tickle yourself. It just doesn't work!":
    '想得美！扫描自己就像挠自己的痒痒，根本没用！',
  "Recursive scanning detected. The universe might implode...or it might not. But let's not try to find out.":
    '检测到递归扫描。宇宙可能会坍缩……也可能不会。不过还是别试了。',
  "Hey, stop checking us out! We're blushing... 😉": '喂，别老盯着我们看！都脸红了…… 😉',
  'Hmmm, scanning us, are you? We feel so special!': '哦？在扫我们？真是受宠若惊！',
  "Alert! Mirror scanning detected. Trust us, we're looking good 😉":
    '警报！检测到照镜子行为。放心，我们状态好得很 😉',
  "We're flattered you're trying to scan us, but we can't tickle ourselves!":
    '很荣幸你想扫我们，可惜我们挠不到自己的痒处。',
  "Oh, inspecting the inspector, aren't we? Inception much?":
    '哟，开始检查检查工具了？要不要再套一层？',
  "Just a second...wait a minute...you're scanning us?! Well, that's an interesting twist!":
    '等一下……等等……你在扫我们？！这转折有点意思。',
  "Scanning us? It's like asking a mirror to reflect on itself.":
    '扫我们？这就像让镜子照见它自己。',
  'Well, this is awkward... like a dog chasing its own tail!':
    '这场面有点尴尬……像狗追自己的尾巴。',
  "Ah, I see you're scanning this site... But alas, this did not cause an infinite recursive loop (this time)":
    '啊，你在扫这个站点……遗憾的是，这次并没有引发无限递归。',
  'But if you want to see how this site is built, why not check out the':
    '不过，想看看这个网站是怎么搭起来的？不妨看看',
  'source code': '源代码',
  "Do me a favour, and drop the repo a Star while you're there":
    '顺便给代码仓库点个 Star 吧',

  // External research tools
  'External Tools for Further Research': '更多研究工具',
  'Open: {link}': '打开：{link}',
  'These tools are not affiliated with Web-Check. Please use them at your own risk.':
    '这些工具与 Web-Check 没有关联，使用时请自行评估风险。',
  'At the time of listing, all of the above were available and free to use - if this changes, please report it via GitHub ({link}).':
    '收录时以上工具均可免费使用；若情况有变，请通过 GitHub（{link}）反馈。',
  'Identify Infostealer infection data related to domains and emails':
    '查询与域名、邮箱相关的窃密木马感染数据',
  'Analyzes the SSL configuration of a server and grades it': '分析服务器的 SSL 配置并给出评级',
  'Checks a URL against multiple antivirus engines': '用多个杀毒引擎检测同一个网址',
  'Search engine for Internet-connected devices': '联网设备搜索引擎',
  'View previous versions of a site via the Internet Archive': '通过 Internet Archive 查看网站的历史版本',
  'Scans a URL and provides information about the page': '扫描网址并提供该页面的相关信息',
  'Checks a URL against blacklists and known threats': '对照黑名单与已知威胁检测网址',
  'Run a WhoIs lookup on a domain': '查询域名的 WHOIS 信息',
  'View DNS records for a domain': '查看域名的 DNS 记录',
  'Check global DNS propagation across multiple servers': '检查 DNS 在全球多台服务器上的生效情况',
  'Lookup hosts associated with a domain': '查询与域名关联的主机',
  'Checks the performance, accessibility and SEO of a page on mobile + desktop':
    '检测页面在移动端与桌面端的性能、无障碍与 SEO',
  'View the tech stack of a website': '查看网站使用的技术栈',
  "DNS recon tool, to map out a domain from it's DNS records":
    'DNS 侦察工具，从 DNS 记录出发梳理一个域名',
  'View realtime BGP data for any ASN, Prefix or DNS': '查看任意 ASN、前缀或 DNS 的实时 BGP 数据',
  'View approx traffic and engagement stats for a website': '查看网站的流量与互动估算数据',
  'Check if a domain, IP or email is present on the top blacklists': '检查域名、IP 或邮箱是否在主流黑名单中',
  'View traffic source locations for a domain through Cloudflare': '通过 Cloudflare 查看域名的流量来源地区',
  'Assesses website security posture by analyzing various security headers and practices':
    '通过分析各类安全响应头与安全实践，评估网站的安全状况',
  'Check if a domain or IP has been reported for abusive activity': '检查域名或 IP 是否因滥用行为被举报',
  'View shared human and machine generated threat intelligence': '查看人工与机器生成的共享威胁情报',
  'Checks a website across 30+ blocklist engines and website reputation services':
    '在 30 多个黑名单引擎与信誉服务上检测网站',
  "Checks if the site is in URLhaus's malware URL exchange": '检查该站点是否在 URLhaus 的恶意网址库中',
  'An interactive malware and web sandbox': '交互式的恶意软件与网页沙箱',
  'Reveals the trackers, cookies and fingerprinting a site uses on its visitors':
    '揭示网站对访客使用的追踪器、Cookie 与指纹识别',
};

export default common;
