import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

type Snapshot = {
  tickers: string[];
  lastUpdated?: string;
  // Optional future fields:
  // meta?: { index?: string; runId?: string };
  // data?: Record<string, { price?: number; chgPct?: number; rsi?: number; dma50Diff?: number }>;
};

type Tile = {
  ticker: string;
  price?: number;
  chgPct?: number;
  rsi?: number;
  dma50Diff?: number;
};

export default function App() {
  const [data, setData] = useState<Snapshot | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [tab, setTab] = useState<"latest" | "older">("latest");

  useEffect(() => {
    const url = import.meta.env.BASE_URL + "data/snapshot.json";
    fetch(url, { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(setData)
      .catch((e) => setErr(e.message));
  }, []);

  // Map snapshot → tiles. For now, we mock metrics if they’re absent.
  const tiles: Tile[] = useMemo(() => {
    const tickers = data?.tickers ?? ["RELIANCE", "TCS", "INFY"];
    // If you later add data.data[ticker] with real metrics, use those here
    return tickers.map((t, i) => ({
      ticker: t,
      price: undefined,  // fill from data?.data?.[t]?.price
      chgPct: undefined, // fill from data?.data?.[t]?.chgPct
      rsi: undefined,    // fill from data?.data?.[t]?.rsi
      dma50Diff: undefined, // fill from data?.data?.[t]?.dma50Diff
    }));
  }, [data]);

  const header = (
    <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-lg sm:text-xl font-semibold tracking-tight">NIFTY50 Dashboard</h1>
          <Separator orientation="vertical" className="h-6 bg-slate-700" />
          <p className="text-xs sm:text-sm text-slate-400">
            {err
              ? `Failed to load: ${err}`
              : data?.lastUpdated
              ? `Last updated: ${data.lastUpdated}`
              : "Loading…"}
          </p>
        </div>
        <Badge variant="secondary" className="text-xs">Preview</Badge>
      </div>
    </header>
  );

  return (
    <div className="min-h-dvh bg-slate-950 text-slate-100">
      {header}

      <main className="mx-auto max-w-6xl px-4 py-6">
        <Tabs value={tab} onValueChange={(v) => setTab(v as any)} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="latest">Latest</TabsTrigger>
            <TabsTrigger value="older">Older</TabsTrigger>
          </TabsList>

          {/* Latest */}
          <TabsContent value="latest">
            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tiles.map((t) => (
                <StockCard key={t.ticker} tile={t} />
              ))}
            </section>
          </TabsContent>

          {/* Older (placeholder list for now; you can wire real history later) */}
          <TabsContent value="older">
            <section className="space-y-3">
              <p className="text-sm text-slate-400">
                Historical snapshots will appear here (e.g., previous day’s tiles).
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 opacity-90">
                {tiles.map((t) => (
                  <StockCard key={`old-${t.ticker}`} tile={t} subtle />
                ))}
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function StockCard({ tile, subtle = false }: { tile: Tile; subtle?: boolean }) {
  const badgeTone =
    tile.chgPct == null ? "secondary" : tile.chgPct > 0 ? "default" : "destructive";

  return (
    <Card
      className={
        "rounded-2xl border-slate-800 bg-slate-900 " +
        (subtle ? "opacity-80" : "")
      }
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="text-lg font-medium tracking-tight">{tile.ticker}</div>
            <div className="text-xs text-slate-400">NIFTY 50</div>
          </div>
          <Badge variant={badgeTone as any}>
            {tile.chgPct == null ? "—" : `${tile.chgPct.toFixed(2)}%`}
          </Badge>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <MiniMetric label="Price" value={tile.price != null ? `₹${tile.price.toFixed(2)}` : "—"} />
          <MiniMetric
            label="50DMA Δ"
            value={
              tile.dma50Diff == null ? "—" : `${tile.dma50Diff > 0 ? "+" : ""}${tile.dma50Diff.toFixed(2)}%`
            }
          />
          <MiniMetric label="RSI(14)" value={tile.rsi != null ? tile.rsi.toFixed(0) : "—"} />
          <MiniMetric label="Signal" value={signalFrom(tile)} />
        </div>
      </CardContent>
    </Card>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-2">
      <div className="text-[10px] uppercase tracking-wide text-slate-500">{label}</div>
      <div className="text-sm">{value}</div>
    </div>
  );
}

function signalFrom(tile: Tile): string {
  // Simple placeholder logic; replace with your real rules later
  if (tile.rsi == null || tile.dma50Diff == null) return "—";
  if (tile.rsi < 35 && tile.dma50Diff > 0) return "Rebound?";
  if (tile.rsi > 70 && tile.dma50Diff < 0) return "Overbought?";
  if (tile.chgPct != null) return tile.chgPct > 0 ? "Up" : "Down";
  return "Neutral";
}
