import { useState, useEffect, useCallback } from 'react';
import CurrencySelector from './CurrencySelector';
import SwapButton from './SwapButton';
import { getAllCurrencies, getCurrencyById } from '../currencyData';
import { convert } from '../api';

const currencies = getAllCurrencies();

function formatNumber(num, currency) {
  if (num === null || num === undefined || isNaN(num)) return '';
  if (num === 0) return '0';

  if (currency?.type === 'crypto') {
    if (num >= 1) return num.toLocaleString('en-US', { maximumFractionDigits: 6 });
    return num.toLocaleString('en-US', { maximumSignificantDigits: 6 });
  }

  if (num >= 1) return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return num.toLocaleString('en-US', { maximumSignificantDigits: 4 });
}

export default function Converter() {
  const [fromCurrency, setFromCurrency] = useState(currencies.find(c => c.id === 'bitcoin'));
  const [toCurrency, setToCurrency] = useState(currencies.find(c => c.id === 'usd'));
  const [fromAmount, setFromAmount] = useState('1');
  const [toAmount, setToAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rate, setRate] = useState(null);
  const [lastDirection, setLastDirection] = useState('from');

  const doConvert = useCallback(async (amount, from, to, direction) => {
    const numAmount = parseFloat(amount);
    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      if (direction === 'from') setToAmount('');
      else setFromAmount('');
      setRate(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await convert(from.id, from.type, to.id, to.type, numAmount);
      if (direction === 'from') {
        setToAmount(formatNumber(result, to));
      } else {
        setFromAmount(formatNumber(result, from));
      }

      // Always calculate the rate as 1 FROM = X TO
      const unitRate = await convert(from.id, from.type, to.id, to.type, 1);
      setRate(unitRate);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (lastDirection === 'from') {
        doConvert(fromAmount, fromCurrency, toCurrency, 'from');
      } else {
        doConvert(toAmount, toCurrency, fromCurrency, 'to');
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [fromAmount, toAmount, fromCurrency, toCurrency, lastDirection, doConvert]);

  const handleFromAmountChange = (e) => {
    setFromAmount(e.target.value);
    setLastDirection('from');
  };

  const handleToAmountChange = (e) => {
    setToAmount(e.target.value);
    setLastDirection('to');
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
    setLastDirection('from');
  };

  const handleFromCurrencyChange = (c) => {
    setFromCurrency(c);
    setLastDirection('from');
  };

  const handleToCurrencyChange = (c) => {
    setToCurrency(c);
    setLastDirection('from');
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="bg-bg-card/80 backdrop-blur-xl border border-border-custom rounded-2xl p-6 md:p-8 shadow-2xl">
        {/* From Section */}
        <div className="space-y-3">
          <CurrencySelector
            currencies={currencies}
            selected={fromCurrency}
            onSelect={handleFromCurrencyChange}
            label="From"
          />
          <div className="relative">
            <input
              type="number"
              value={fromAmount}
              onChange={handleFromAmountChange}
              placeholder="0.00"
              min="0"
              className="w-full px-4 py-4 bg-bg-input/30 border border-border-custom rounded-xl text-xl
                         font-semibold text-text-primary placeholder-text-secondary/50
                         outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/25
                         transition-all duration-200"
            />
            {fromCurrency && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary text-sm font-medium">
                {fromCurrency.symbol}
              </span>
            )}
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex items-center justify-center my-4 relative">
          <div className="absolute inset-x-0 top-1/2 h-px bg-border-custom" />
          <div className="relative z-10">
            <SwapButton onClick={handleSwap} />
          </div>
        </div>

        {/* To Section */}
        <div className="space-y-3">
          <CurrencySelector
            currencies={currencies}
            selected={toCurrency}
            onSelect={handleToCurrencyChange}
            label="To"
          />
          <div className="relative">
            <input
              type="number"
              value={toAmount}
              onChange={handleToAmountChange}
              placeholder="0.00"
              min="0"
              className="w-full px-4 py-4 bg-bg-input/30 border border-border-custom rounded-xl text-xl
                         font-semibold text-text-primary placeholder-text-secondary/50
                         outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/25
                         transition-all duration-200"
            />
            {toCurrency && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary text-sm font-medium">
                {toCurrency.symbol}
              </span>
            )}
          </div>
        </div>

        {/* Rate Display */}
        {rate !== null && !error && (
          <div className="mt-5 px-4 py-3 bg-bg-secondary/50 rounded-xl border border-border-custom">
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-secondary">Exchange Rate</span>
              {loading && (
                <div className="w-3 h-3 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
              )}
            </div>
            <div className="text-sm font-medium text-text-primary mt-1">
              1 {fromCurrency.symbol} = {formatNumber(rate, toCurrency)} {toCurrency.symbol}
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mt-5 px-4 py-3 bg-accent/10 border border-accent/30 rounded-xl">
            <p className="text-sm text-accent">{error}</p>
          </div>
        )}

        {/* Loading Overlay */}
        {loading && !rate && (
          <div className="mt-5 flex items-center justify-center gap-2 text-text-secondary">
            <div className="w-4 h-4 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
            <span className="text-sm">Fetching rates...</span>
          </div>
        )}
      </div>

      {/* Attribution */}
      <p className="text-center text-xs text-text-secondary/60 mt-4">
        Powered by CoinGecko API &middot; Rates update every 60s
      </p>
    </div>
  );
}
