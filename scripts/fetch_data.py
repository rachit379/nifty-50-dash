import sys, json
from pathlib import Path

try:
    import bharat_sm_data as bsd
except ImportError:
    bsd = None

def main(out_path: str):
    data = {}
    if bsd:
        try:
            tickers = bsd.nifty_constituents()
            data['tickers'] = tickers
        except Exception as e:
            data['error'] = str(e)
    else:
        # fallback demo data
        data['tickers'] = ["RELIANCE", "TCS", "INFY"]
        data['note'] = "bharat_sm_data not installed, using fallback."
    data['lastUpdated'] = __import__('datetime').datetime.utcnow().isoformat()+'Z'

    Path(out_path).parent.mkdir(parents=True, exist_ok=True)
    with open(out_path, 'w') as f:
        json.dump(data, f, indent=2)
    print("Saved data to", out_path)

if __name__ == "__main__":
    out = sys.argv[1] if len(sys.argv) > 1 else "frontend/public/data/snapshot.json"
    main(out)
