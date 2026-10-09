:root {
  font-family: Inter, 'Segoe UI', sans-serif;
  line-height: 1.5;
  font-weight: 400;
  color: #f3f6fb;
  background: #090d16;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  --bg: #090d16;
  --panel: #111827;
  --panel-soft: #151f2d;
  --panel-alt: #0f172a;
  --border: rgba(148, 163, 184, 0.18);
  --text-soft: #98a3b8;
  --brand: #2dd4bf;
  --brand-strong: #14b8a6;
  --green: #22c55e;
  --red: #ef4444;
  --yellow: #fbbf24;
}

* {
  box-sizing: border-box;
}

html, body, #root {
  margin: 0;
  min-width: 100%;
  min-height: 100%;
  background: linear-gradient(135deg, #070b12 0%, #0d1526 100%);
}

body {
  min-height: 100vh;
  color: #ecf2ff;
}

button, input {
  font: inherit;
}

button {
  cursor: pointer;
}

.app-shell {
  display: grid;
  grid-template-columns: 300px minmax(0, 1fr) 360px;
  min-height: 100vh;
  background: rgba(4, 7, 12, 0.7);
}

.sidebar,
.trade-panel {
  background: rgba(10, 14, 22, 0.95);
  border-right: 1px solid var(--border);
}

.trade-panel {
  border-right: none;
  border-left: 1px solid var(--border);
}

.sidebar {
  padding: 28px 18px;
}

.brand-wrap {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 8px 0 24px;
}

.brand-mark {
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--brand), #0ea5e9);
  color: #031219;
  font-weight: 800;
  font-size: 1.3rem;
}

h1, h2, h3, h4, p {
  margin: 0;
}

.eyebrow {
  color: var(--text-soft);
  text-transform: uppercase;
  letter-spacing: 0.13em;
  font-size: 0.68rem;
}

.nav-card {
  background: var(--panel-soft);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 16px;
  overflow: hidden;
}

.nav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-soft);
  margin-bottom: 14px;
}

.nav-tag {
  background: rgba(45, 212, 191, 0.12);
  border: 1px solid rgba(45, 212, 191, 0.28);
  color: var(--brand);
  border-radius: 999px;
  padding: 4px 8px;
  font-size: 0.66rem;
}

.symbol-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.symbol-button {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: transparent;
  border: 1px solid transparent;
  color: #edf4ff;
  border-radius: 12px;
  padding: 12px 10px;
  text-align: left;
  transition: all 0.2s ease;
}

.symbol-button.active,
.symbol-button:hover {
  background: rgba(15, 23, 42, 0.9);
  border-color: var(--border);
}

.symbol-button strong,
.symbol-button small {
  display: block;
}

.symbol-button small {
  color: var(--text-soft);
  font-size: 0.66rem;
}

.main-panel {
  padding: 28px 24px 20px;
}

.topbar,
.chart-header,
.card-header,
.trade-header,
.toggle-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.topbar {
  margin-bottom: 20px;
}

.topbar-actions {
  display: flex;
  gap: 10px;
}

.ghost-btn {
  background: rgba(148, 163, 184, 0.08);
  color: #edf5ff;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 10px 14px;
}

.ghost-btn.accent {
  background: rgba(45, 212, 191, 0.12);
  border-color: rgba(45, 212, 191, 0.2);
  color: var(--brand);
}

.market-summary {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 18px;
  margin-bottom: 24px;
}

.price-block,
.summary-grid,
.chart-panel,
.positions-card,
.trade-box {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 22px;
}

.price-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px;
}

.price-block h3 {
  font-size: clamp(2rem, 3vw, 2.9rem);
  margin-top: 10px;
}

.price-pill,
.pill {
  border-radius: 999px;
  padding: 8px 12px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.positive {
  color: var(--green);
}

.negative {
  color: var(--red);
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  padding: 18px 20px;
}

.summary-grid > div {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 10px 12px;
  border-radius: 14px;
  background: rgba(15, 23, 42, 0.9);
}

.summary-grid span,
.position-item small,
.history-list span,
.ticket-summary span,
.field-label,
.notice {
  color: var(--text-soft);
}

.chart-panel {
  padding: 16px 18px 0;
  margin-bottom: 24px;
}

.timeframes {
  display: flex;
  gap: 8px;
}

.timeframes button,
.toggle-row button {
  background: transparent;
  border: 1px solid var(--border);
  color: #dfeaff;
  border-radius: 10px;
  padding: 8px 10px;
}

.timeframes button.active,
.toggle-row button.active {
  background: rgba(45, 212, 191, 0.12);
  border-color: rgba(45, 212, 191, 0.26);
  color: var(--brand);
}

.chart-area {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  height: 240px;
  padding: 16px 10px 8px;
  margin-top: 10px;
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.45), rgba(9, 13, 22, 0.15));
  border-radius: 20px 20px 0 0;
}

.bar {
  flex: 1;
  min-height: 10px;
  border-radius: 8px 8px 0 0;
  background: linear-gradient(180deg, #2dd4bf 0%, #38bdf8 100%);
  box-shadow: 0 0 20px rgba(45, 212, 191, 0.2);
}

.positions-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.positions-card {
  padding: 18px 18px 12px;
}

.card-header {
  margin-bottom: 16px;
}

.card-header span {
  color: var(--text-soft);
  font-size: 0.75rem;
}

.position-list,
.history-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.position-item,
.history-list > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 10px;
  border-radius: 12px;
  background: rgba(15, 23, 42, 0.75);
  border: 1px solid rgba(148, 163, 184, 0.1);
}

.position-item strong,
.history-list strong {
  display: block;
}

.trade-panel {
  padding: 24px 18px;
}

.trade-box {
  padding: 18px 16px;
}

.trade-header {
  margin-bottom: 18px;
}

.trade-header h3 {
  margin-top: 8px;
}

.pill {
  background: rgba(34, 197, 94, 0.12);
  color: var(--green);
  border: 1px solid rgba(34, 197, 94, 0.24);
}

.toggle-row {
  background: rgba(15, 23, 42, 0.7);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 6px;
  margin-bottom: 20px;
  gap: 6px;
}

.toggle-row button {
  width: 50%;
}

.field-label {
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 0.82rem;
}

.field-label input {
  background: rgba(15, 23, 42, 0.8);
  color: #edf4ff;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 12px 14px;
}

.ticket-summary {
  margin: 18px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.ticket-summary > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.trade-button {
  width: 100%;
  border: none;
  border-radius: 14px;
  padding: 14px 16px;
  font-weight: 700;
  color: #08141b;
  margin-bottom: 16px;
}

.trade-button.buy {
  background: linear-gradient(135deg, #2dd4bf, #34d399);
}

.trade-button.sell {
  background: linear-gradient(135deg, #fda4af, #f87171);
}

.notice {
  margin: 0;
  min-height: 24px;
  font-size: 0.78rem;
}

@media (max-width: 1100px) {
  .app-shell {
    grid-template-columns: 260px 1fr;
  }

  .trade-panel {
    grid-column: 1 / -1;
    border-left: none;
    border-top: 1px solid var(--border);
  }
}

@media (max-width: 820px) {
  .main-panel {
    padding: 18px 16px 20px;
  }

  .app-shell {
    grid-template-columns: 1fr;
  }

  .market-summary,
  .positions-grid,
  .summary-grid {
    grid-template-columns: 1fr;
  }

  .sidebar {
    padding: 18px 14px;
  }

  .trade-panel {
    padding: 16px 14px;
  }

  .topbar,
  .chart-header,
  .trade-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
