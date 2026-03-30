# Cryptovert

A sleek, cross-platform currency conversion calculator with live market rates. Supports fiat-to-crypto, crypto-to-fiat, and crypto-to-crypto conversions.

## Features

- **20 cryptocurrencies** — BTC, ETH, SOL, ADA, DOGE, XRP, USDT, USDC, DOT, AVAX, LINK, MATIC, and more
- **15 fiat currencies** — USD, EUR, GBP, JPY, CAD, AUD, CHF, CNY, INR, and more
- **Bidirectional conversion** — type in either field, the other updates automatically
- **Searchable dropdowns** — quickly find any currency by name or symbol
- **Swap button** — instantly reverse the conversion pair
- **Live exchange rates** via CoinGecko API (free, no API key required)
- **Responsive design** — optimized for both mobile and desktop

## Tech Stack

- React 19 + Vite
- Tailwind CSS v4
- CoinGecko API (free tier)
- Nginx (production serving)
- Docker

## Getting Started

### Local Development

```bash
npm install
npm run dev
```

### Docker

```bash
docker compose up -d
```

The app will be available at **http://localhost:9147**.

To rebuild after making changes:

```bash
docker compose up -d --build
```

### Production Build (without Docker)

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── api.js                        # CoinGecko API client with caching
├── currencyData.js               # Currency metadata (symbols, names, icons)
├── components/
│   ├── Converter.jsx             # Main converter with bidirectional input
│   ├── CurrencySelector.jsx      # Searchable grouped dropdown
│   └── SwapButton.jsx            # Animated swap control
├── App.jsx                       # Root layout
├── main.jsx                      # Entry point
└── index.css                     # Tailwind + custom styles
```
