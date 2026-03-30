const BASE_URL = 'https://api.coingecko.com/api/v3';

const cache = new Map();
const CACHE_TTL = 60_000; // 1 minute

function getCacheKey(cryptoIds, fiatIds) {
  return `${cryptoIds.sort().join(',')}_${fiatIds.sort().join(',')}`;
}

function getCached(key) {
  const entry = cache.get(key);
  if (entry && Date.now() - entry.timestamp < CACHE_TTL) {
    return entry.data;
  }
  cache.delete(key);
  return null;
}

export async function fetchRates(cryptoIds, fiatIds) {
  const key = getCacheKey([...cryptoIds], [...fiatIds]);
  const cached = getCached(key);
  if (cached) return cached;

  const params = new URLSearchParams({
    ids: cryptoIds.join(','),
    vs_currencies: fiatIds.join(','),
  });

  const response = await fetch(`${BASE_URL}/simple/price?${params}`);

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error('Rate limit exceeded. Please wait a moment and try again.');
    }
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();
  cache.set(key, { data, timestamp: Date.now() });
  return data;
}

export async function convert(fromId, fromType, toId, toType, amount) {
  if (amount === 0 || isNaN(amount)) return 0;

  // crypto -> fiat
  if (fromType === 'crypto' && toType === 'fiat') {
    const data = await fetchRates([fromId], [toId]);
    const rate = data[fromId]?.[toId];
    if (!rate) throw new Error('Rate not available');
    return amount * rate;
  }

  // fiat -> crypto
  if (fromType === 'fiat' && toType === 'crypto') {
    const data = await fetchRates([toId], [fromId]);
    const rate = data[toId]?.[fromId];
    if (!rate) throw new Error('Rate not available');
    return amount / rate;
  }

  // crypto -> crypto (use USD as intermediary)
  if (fromType === 'crypto' && toType === 'crypto') {
    const data = await fetchRates([fromId, toId], ['usd']);
    const fromRate = data[fromId]?.usd;
    const toRate = data[toId]?.usd;
    if (!fromRate || !toRate) throw new Error('Rate not available');
    return (amount * fromRate) / toRate;
  }

  // fiat -> fiat (use BTC as intermediary)
  if (fromType === 'fiat' && toType === 'fiat') {
    const data = await fetchRates(['bitcoin'], [fromId, toId]);
    const fromRate = data.bitcoin?.[fromId];
    const toRate = data.bitcoin?.[toId];
    if (!fromRate || !toRate) throw new Error('Rate not available');
    return (amount / fromRate) * toRate;
  }

  throw new Error('Invalid conversion');
}
