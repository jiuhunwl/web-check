import middleware from './_common/middleware.js';
import { httpGet } from './_common/http.js';
import { parseTarget } from './_common/parse-target.js';

// Public DNS-over-HTTPS resolvers that answer the same JSON API. dns.google is
// unreachable from mainland-China regions and cloudflare-dns.com is blocked in
// some of them, so race the providers instead of failing the whole check.
const RESOLVERS = [
  'https://dns.google/resolve',
  'https://cloudflare-dns.com/dns-query',
  'https://dns.alidns.com/resolve',
];

// Query a public DNS JSON API for a given record type
const queryDns = async (domain, type) => {
  const attempts = RESOLVERS.map((base) =>
    httpGet(base, {
      params: { name: domain, type },
      headers: { Accept: 'application/dns-json' },
      timeout: 8000,
    }).then((res) => {
      if (!res?.data) throw new Error(`Empty DNS response from ${base}`);
      return res.data;
    }),
  );

  try {
    return await Promise.any(attempts);
  } catch {
    throw new Error('Every DNS-over-HTTPS resolver was unreachable');
  }
};

const dnsSecHandler = async (url) => {
  const { hostname } = parseTarget(url);
  const [dnskey, ds, aRecord] = await Promise.all([
    queryDns(hostname, 'DNSKEY'),
    queryDns(hostname, 'DS'),
    queryDns(hostname, 'A'),
  ]);
  return {
    DNSKEY: dnskey.Answer
      ? { isFound: true, answer: dnskey.Answer, response: dnskey.Answer }
      : { isFound: false, answer: null, response: dnskey },
    DS: ds.Answer
      ? { isFound: true, answer: ds.Answer, response: ds.Answer }
      : { isFound: false, answer: null, response: ds },
    RRSIG: {
      isFound: !!aRecord.AD,
      answer: null,
      response: aRecord,
    },
  };
};

export const handler = middleware(dnsSecHandler);
export default handler;
