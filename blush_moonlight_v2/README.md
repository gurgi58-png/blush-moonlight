# V3.2 — Direct UPT entry

Santana now enters the Units Per Transaction (UPT) figure shown by her work dashboard. The app uses a transaction-weighted average across shifts, not a simple mean. Historical records containing `units` remain readable and are converted to UPT for display. JSON imports from V3.1 remain supported; backups now include direct `upt` values. The sales CSV includes both UPT and historical units where present.

**Update:** Export a backup first, then replace only the contents of your existing `blush_moonlight_v2` GitHub folder with this package’s `blush_moonlight_v2` contents. Do not replace `.github/workflows/` or `scripts/` with anything from the app folder. The weekly market updater is unchanged.

**Important:** For zero-transaction shifts, enter 0 UPT. UPT is capped at 100 to catch accidental entries. Store sales are optional and subject to employer permission.

# V3.1 installation — two upload locations

**Before upgrading:** export a private JSON backup from the app. Never upload the backup to GitHub.

1. In your repository, replace the contents of the EXISTING `blush_moonlight_v2/` folder with the files inside this package's `blush_moonlight_v2/` folder. Do not create a nested folder. Include `market-feed.json`.
2. At the REPOSITORY ROOT, create `scripts/update_market_feed.py` and `.github/workflows/market-update.yml` exactly as shown in this package. GitHub's website can create each file using Add file > Create new file and entering the full path.
3. Commit changes to `main`. Go to Actions > Weekly public market headlines > Run workflow to run the first feed collection manually. Wait for it to finish; then check `blush_moonlight_v2/market-feed.json` contains dated `items`.
4. If the workflow cannot push, check repository Settings > Actions > General > Workflow permissions, and allow Read and write permissions. This grants write access to workflows; only enable if you trust this repository's workflow code.
5. Wait for Pages deployment. On Android, refresh `https://gurgi58-png.github.io/blush-moonlight/blush_moonlight_v2/index.html` while online, then open Market Radar and tap Check for new headlines. Try again offline.

The feed is public and contains third-party RSS headlines/links, not verified analysis. Google News RSS may fail or change; in that case the workflow keeps the prior feed. Runs are best-effort, may be delayed, and public repositories may have schedules disabled after prolonged inactivity. No private shift data is sent. Cached headlines are stored separately from the sales backup. Existing research snapshot remains available offline.

# Blush & Moonlight V3.0 — Moonlight Market Intelligence

## What's new
- Offline source-backed research library: Canada & Saskatchewan, Global Trends, Hillberg & Berk / competitors.
- Research sources and dates shown on each card, with optional external links requiring internet.
- Seasonal opportunity planner.
- Private research notes in local browser storage, included in JSON export/import.
- All existing V2.4 tools, local data key, and Santana message preserved.

**Not a live research feed.** Cards are a dated October 2026 snapshot. Updating research requires a new app release; online links open the original sources for manual verification. There are no external APIs or API keys. No private sales data is uploaded.

## Android update
1. In the current app export a JSON backup first and keep it private.
2. Extract this ZIP. Open your GitHub repository's existing `blush_moonlight_v2` folder.
3. Replace the files in that folder with the contents of this package's `blush_moonlight_v2` folder. Avoid creating a nested directory.
4. Commit changes; wait for GitHub Pages deployment.
5. Open the direct `.../blush_moonlight_v2/index.html` address while online and refresh; close/reopen the installed app.
6. Check the new Market Radar tab, save a fictional research note, reopen offline, and verify it remains.

## Safety and data
Only retain store data with permission. Research notes should never contain customer/employee identifiers or confidential information. Local browser storage is not encrypted; JSON backups are not encrypted. GitHub Pages serves public application code, not locally saved records. This independent project is not affiliated with any retailer.
