// frontend/src/App.tsx
import { useEffect, useState } from 'react';

type Snapshot = { tickers: string[]; lastUpdated?: string };

export default function App() {
  const [data, setData] = useState<Snapshot | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const url = import.meta.env.BASE_URL + 'data/snapshot.json'; // <-- key line
    fetch(url, { cache: 'no-store' })
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(setData)
      .catch(e => setErr(e.message));
  }, []);

  if (err) return <div style={{ padding: 16 }}>Failed to load data: {err}</div>;
  if (!data) return <div style={{ padding: 16 }}>App shell ready…</div>;

  return (
    <main style={{ padding: 16 }}>
      <h1>NIFTY50 Dashboard</h1>
      <p>Last updated: {data.lastUpdated ?? 'unknown'}</p>
      <h2>Tickers</h2>
      <ul>
        {data.tickers?.map(t => <li key={t}>{t}</li>)}
      </ul>
    </main>
  );
}
