import { useMemo, useState } from 'react';

type TradeSide = 'buy' | 'sell';

type MarketSymbol = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: string;
  high: number;
  low: number;
};

type Position = {
  symbol: string;
  side: TradeSide;
  amount: number;
  entry: number;
};

const initialSymbols: MarketSymbol[] = [
  { symbol: 'EURUSD', name: 'Euro / US Dollar', price: 1.0834, change: 0.42, volume: '83.4M', high: 1.0851, low: 1.0799 },
  { symbol: 'GBPUSD', name: 'Pound / US Dollar', price: 1.2718, change: -0.18, volume: '52.1M', high: 1.2735, low: 1.2682 },
  { symbol: 'USDJPY', name: 'US Dollar / Yen', price: 148.72, change: 0.31, volume: '92.8M', high: 149.1, low: 147.96 },
  { symbol: 'XAUUSD', name: 'Gold', price: 2332.15, change: 0.76, volume: '19.5M', high: 2346.2, low: 2314.8 },
  { symbol: 'BTCUSD', name: 'Bitcoin', price: 61420.4, change: 2.14, volume: '11.2M', high: 62240.6, low: 60120.3 },
  { symbol: 'ETHUSD', name: 'Ethereum', price: 3424.67, change: -0.56, volume: '8.9M', high: 3512.0, low: 3360.25 },
  { symbol: 'NAS100', name: 'NASDAQ 100', price: 18356.3, change: 0.67, volume: '14.7M', high: 18431.7, low: 18194.5 },
];

const chartSeries = [
  1.078, 1.08, 1.082, 1.081, 1.084, 1.083, 1.086, 1.088, 1.087, 1.09, 1.089, 1.093,
  1.092, 1.094, 1.091, 1.094, 1.096, 1.095, 1.093, 1.097, 1.099, 1.098, 1.1, 1.099
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(value);

function App() {
  const [symbols, setSymbols] = useState<MarketSymbol[]>(initialSymbols);
  const [selectedSymbol, setSelectedSymbol] = useState('EURUSD');
  const [tradeSide, setTradeSide] = useState<TradeSide>('buy');
  const [stake, setStake] = useState(250);
  const [balance, setBalance] = useState(12450);
  const [positions, setPositions] = useState<Position[]>([
    { symbol: 'BTCUSD', side: 'buy', amount: 0.12, entry: 60800 },
    { symbol: 'EURUSD', side: 'buy', amount: 1250, entry: 1.0812 },
  ]);
  const [notice, setNotice] = useState('Ready to trade');

  const activeMarket = useMemo(
    () => symbols.find((item) => item.symbol === selectedSymbol) ?? symbols[0],
    [selectedSymbol, symbols],
  );

  const latestPrice = activeMarket.price;
  const selectedPrice = Number(latestPrice.toFixed(4));

  const handleMarketTick = () => {
    setSymbols((current) =>
      current.map((item) => {
        const drift = (Math.random() - 0.5) * (item.symbol.includes('USD') ? 0.002 : 12);
        const nextPrice = Math.max(item.price + drift, item.low * 0.98);
        const change = Number(((nextPrice - item.price) / item.price * 100).toFixed(2));

        return {
          ...item,
          price: Number(nextPrice.toFixed(item.symbol.includes('USD') ? 4 : 2)),
          change: Number((item.change + change * 0.1).toFixed(2)),
        };
      }),
    );
  };

  const handleTrade = () => {
    const amount = Number(stake);

    if (!Number.isFinite(amount) || amount <= 0) {
      setNotice('Enter a valid trade amount');
      return;
    }

    const orderLabel = tradeSide === 'buy' ? 'Buy' : 'Sell';

    const nextBalance = tradeSide === 'buy' ? balance - amount : balance + amount;
    const positionIndex = positions.findIndex(
      (item) => item.symbol === selectedSymbol && item.side === tradeSide,
    );

    const updatedPositions = [...positions];

    if (positionIndex >= 0) {
      const existing = updatedPositions[positionIndex];
      updatedPositions[positionIndex] = {
        ...existing,
        amount: existing.amount + amount / (selectedPrice || 1),
        entry: (existing.entry + selectedPrice) / 2,
      };
    } else {
      updatedPositions.push({
        symbol: selectedSymbol,
        side: tradeSide,
        amount: amount / (selectedPrice || 1),
        entry: selectedPrice,
      });
    }

    setBalance(nextBalance);
    setPositions(updatedPositions);
    setNotice(`${orderLabel} order placed for ${selectedSymbol} at ${selectedPrice}`);
  };

  const openPositions = positions.length ? positions : [];

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-wrap">
          <div className="brand-mark">D</div>
          <div>
            <p className="eyebrow">Markets</p>
            <h1>Deriv</h1>
          </div>
        </div>

        <div className="nav-card">
          <div className="nav-header">
            <span>Forex</span>
            <span className="nav-tag">Live</span>
          </div>
          <ul className="symbol-list">
            {symbols.map((item) => (
              <li key={item.symbol}>
                <button
                  className={`symbol-button ${selectedSymbol === item.symbol ? 'active' : ''}`}
                  onClick={() => setSelectedSymbol(item.symbol)}
                >
                  <div>
                    <strong>{item.symbol}</strong>
                    <small>{item.name}</small>
                  </div>
                  <span className={item.change >= 0 ? 'positive' : 'negative'}>
                    {item.change >= 0 ? '+' : ''}
                    {item.change}%
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div>
            <p className="eyebrow">Account</p>
            <h2>{selectedSymbol}</h2>
          </div>
          <div className="topbar-actions">
            <button className="ghost-btn">Deposit</button>
            <button className="ghost-btn accent">Withdraw</button>
          </div>
        </header>

        <section className="market-summary">
          <div className="price-block">
            <div>
              <p className="eyebrow">Current price</p>
              <h3>{selectedPrice.toFixed(activeMarket.symbol.includes('USD') && activeMarket.symbol !== 'USDJPY' ? 4 : 2)}</h3>
            </div>
            <div className={`price-pill ${activeMarket.change >= 0 ? 'positive' : 'negative'}`}>
              {activeMarket.change >= 0 ? '+' : ''}
              {activeMarket.change}%
            </div>
          </div>

          <div className="summary-grid">
            <div>
              <span>High</span>
              <strong>{activeMarket.high.toFixed(activeMarket.symbol.includes('USD') && activeMarket.symbol !== 'USDJPY' ? 4 : 2)}</strong>
            </div>
            <div>
              <span>Low</span>
              <strong>{activeMarket.low.toFixed(activeMarket.symbol.includes('USD') && activeMarket.symbol !== 'USDJPY' ? 4 : 2)}</strong>
            </div>
            <div>
              <span>Volume</span>
              <strong>{activeMarket.volume}</strong>
            </div>
            <div>
              <span>Balance</span>
              <strong>{formatCurrency(balance)}</strong>
            </div>
          </div>
        </section>

        <section className="chart-panel">
          <div className="chart-header">
            <div className="timeframes">
              {['1m', '5m', '1h', '1d', '1w'].map((item) => (
                <button key={item} className={item === '1h' ? 'active' : ''}>
                  {item}
                </button>
              ))}
            </div>
            <button className="ghost-btn small" onClick={handleMarketTick}>Tick market</button>
          </div>

          <div className="chart-area">
            {chartSeries.map((point, index) => (
              <div
                key={`${point}-${index}`}
                className="bar"
                style={{ height: `${(point - 1.07) * 2200}%`, opacity: 0.2 + index / 30 }}
              />
            ))}
          </div>
        </section>

        <section className="positions-grid">
          <div className="positions-card">
            <div className="card-header">
              <h4>Open positions</h4>
              <span>2 active</span>
            </div>
            <div className="position-list">
              {openPositions.map((position) => (
                <div className="position-item" key={`${position.symbol}-${position.side}`}>
                  <div>
                    <strong>{position.symbol}</strong>
                    <small>{position.side.toUpperCase()}</small>
                  </div>
                  <div>
                    <strong>{position.amount.toFixed(2)}</strong>
                    <small>entry {position.entry.toFixed(2)}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="positions-card">
            <div className="card-header">
              <h4>Trade history</h4>
              <span>Today</span>
            </div>
            <div className="history-list">
              <div>
                <span>EURUSD</span>
                <strong className="positive">+ $120</strong>
              </div>
              <div>
                <span>BTCUSD</span>
                <strong className="positive">+ $480</strong>
              </div>
              <div>
                <span>XAUUSD</span>
                <strong className="negative">- $95</strong>
              </div>
            </div>
          </div>
        </section>
      </main>

      <aside className="trade-panel">
        <div className="trade-box">
          <div className="trade-header">
            <div>
              <p className="eyebrow">Trade</p>
              <h3>{selectedSymbol}</h3>
            </div>
            <span className="pill">{tradeSide.toUpperCase()}</span>
          </div>

          <div className="toggle-row">
            <button className={tradeSide === 'buy' ? 'active' : ''} onClick={() => setTradeSide('buy')}>
              Buy
            </button>
            <button className={tradeSide === 'sell' ? 'active' : ''} onClick={() => setTradeSide('sell')}>
              Sell
            </button>
          </div>

          <label className="field-label">
            Stake
            <input
              type="number"
              min="10"
              step="10"
              value={stake}
              onChange={(event) => setStake(Number(event.target.value))}
            />
          </label>

          <div className="ticket-summary">
            <div>
              <span>Price</span>
              <strong>{selectedPrice.toFixed(activeMarket.symbol.includes('USD') && activeMarket.symbol !== 'USDJPY' ? 4 : 2)}</strong>
            </div>
            <div>
              <span>Notional</span>
              <strong>{formatCurrency(stake)}</strong>
            </div>
          </div>

          <button className={`trade-button ${tradeSide}`} onClick={handleTrade}>
            {tradeSide === 'buy' ? 'Buy now' : 'Sell now'}
          </button>

          <p className="notice">{notice}</p>
        </div>
      </aside>
    </div>
  );
}

export default App;
