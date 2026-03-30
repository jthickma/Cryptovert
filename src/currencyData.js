export const cryptoCurrencies = [
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', icon: '₿' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', icon: 'Ξ' },
  { id: 'tether', symbol: 'USDT', name: 'Tether', icon: '₮' },
  { id: 'binancecoin', symbol: 'BNB', name: 'BNB', icon: '◆' },
  { id: 'solana', symbol: 'SOL', name: 'Solana', icon: '◎' },
  { id: 'ripple', symbol: 'XRP', name: 'XRP', icon: '✕' },
  { id: 'usd-coin', symbol: 'USDC', name: 'USD Coin', icon: '$' },
  { id: 'cardano', symbol: 'ADA', name: 'Cardano', icon: '₳' },
  { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin', icon: 'Ð' },
  { id: 'polkadot', symbol: 'DOT', name: 'Polkadot', icon: '●' },
  { id: 'avalanche-2', symbol: 'AVAX', name: 'Avalanche', icon: '▲' },
  { id: 'chainlink', symbol: 'LINK', name: 'Chainlink', icon: '⬡' },
  { id: 'matic-network', symbol: 'MATIC', name: 'Polygon', icon: '⬠' },
  { id: 'tron', symbol: 'TRX', name: 'TRON', icon: '◈' },
  { id: 'litecoin', symbol: 'LTC', name: 'Litecoin', icon: 'Ł' },
  { id: 'bitcoin-cash', symbol: 'BCH', name: 'Bitcoin Cash', icon: 'Ƀ' },
  { id: 'stellar', symbol: 'XLM', name: 'Stellar', icon: '✦' },
  { id: 'monero', symbol: 'XMR', name: 'Monero', icon: 'ɱ' },
  { id: 'cosmos', symbol: 'ATOM', name: 'Cosmos', icon: '⚛' },
  { id: 'uniswap', symbol: 'UNI', name: 'Uniswap', icon: '🦄' },
];

export const fiatCurrencies = [
  { id: 'usd', symbol: 'USD', name: 'US Dollar', icon: '$' },
  { id: 'eur', symbol: 'EUR', name: 'Euro', icon: '€' },
  { id: 'gbp', symbol: 'GBP', name: 'British Pound', icon: '£' },
  { id: 'jpy', symbol: 'JPY', name: 'Japanese Yen', icon: '¥' },
  { id: 'cad', symbol: 'CAD', name: 'Canadian Dollar', icon: 'C$' },
  { id: 'aud', symbol: 'AUD', name: 'Australian Dollar', icon: 'A$' },
  { id: 'chf', symbol: 'CHF', name: 'Swiss Franc', icon: 'Fr' },
  { id: 'cny', symbol: 'CNY', name: 'Chinese Yuan', icon: '¥' },
  { id: 'inr', symbol: 'INR', name: 'Indian Rupee', icon: '₹' },
  { id: 'krw', symbol: 'KRW', name: 'South Korean Won', icon: '₩' },
  { id: 'brl', symbol: 'BRL', name: 'Brazilian Real', icon: 'R$' },
  { id: 'mxn', symbol: 'MXN', name: 'Mexican Peso', icon: 'Mex$' },
  { id: 'sgd', symbol: 'SGD', name: 'Singapore Dollar', icon: 'S$' },
  { id: 'hkd', symbol: 'HKD', name: 'Hong Kong Dollar', icon: 'HK$' },
  { id: 'nzd', symbol: 'NZD', name: 'New Zealand Dollar', icon: 'NZ$' },
];

export function getAllCurrencies() {
  return [
    ...cryptoCurrencies.map(c => ({ ...c, type: 'crypto' })),
    ...fiatCurrencies.map(c => ({ ...c, type: 'fiat' })),
  ];
}

export function getCurrencyById(id) {
  return getAllCurrencies().find(c => c.id === id);
}
