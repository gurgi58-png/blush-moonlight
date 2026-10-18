# V3.1 installation — two upload locations

**Before upgrading:** export a private JSON backup from the app. Never upload the backup to GitHub.

1. In your repository, replace the contents of the EXISTING `blush_moonlight_v2/` folder with the files inside this package's `blush_moonlight_v2/` folder. Do not create a nested folder. Include `market-feed.json`.
2. At the REPOSITORY ROOT, create `scripts/update_market_feed.py` and `.github/workflows/market-update.yml` exactly as shown in this package. GitHub's website can create each file using Add file > Create new file and entering the full path.
3. Commit changes to `main`. Go to Actions > Weekly public market headlines > Run workflow to run the first feed collection manually. Wait for it to finish; then check `blush_moonlight_v2/market-feed.json` contains dated `items`.
4. If the workflow cannot push, check repository Settings > Actions > General > Workflow permissions, and allow Read and write permissions. This grants write access to workflows; only enable if you trust this repository's workflow code.
5. Wait for Pages deployment. On Android, refresh `https://gurgi58-png.github.io/blush-moonlight/blush_moonlight_v2/index.html` while online, then open Market Radar and tap Check for new headlines. Try again offline.

The feed is public and contains third-party RSS headlines/links, not verified analysis. Google News RSS may fail or change; in that case the workflow keeps the prior feed. Runs are best-effort, may be delayed, and public repositories may have schedules disabled after prolonged inactivity. No private shift data is sent. Cached headlines are stored separately from the sales backup. Existing research snapshot remains available offline.
