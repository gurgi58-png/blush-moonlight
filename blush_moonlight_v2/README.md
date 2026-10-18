# Blush & Moonlight V2 — Offline-first Android PWA

A standalone static web app. No Python, server, account, external libraries, or cloud database required for normal use. Stores data in the device browser's localStorage (not SQLite). It works offline after the initial HTTPS installation and service-worker cache completes.

## Android installation (recommended: GitHub Pages)

1. Create a free GitHub account if needed. Create a **public** repository called `blush-moonlight` (the *source code* will be public; **never upload sales data or backup files**). GitHub Pages on a free account typically requires a public repository.
2. On your Windows computer, unzip the project. Upload the **contents** of `blush_moonlight_v2` (index.html, app.js, style.css, sw.js, manifest.webmanifest, icons folder) to the repository root using GitHub's **Add file → Upload files**.
3. Open repository **Settings → Pages**. Under **Build and deployment**, select **Deploy from a branch**, branch **main**, folder **/(root)**, then Save.
4. Wait for GitHub Pages to publish. Open the URL shown on the Pages settings screen, typically `https://YOUR-USERNAME.github.io/blush-moonlight/`.
5. On her Android phone, open the HTTPS URL in **Chrome**. Let the page load fully. From Chrome's three-dot menu, choose **Install app** or **Add to Home screen** (wording varies). Launch from the home-screen icon.
6. Test offline: while connected, save a **fictional** shift; then turn on airplane mode, close and reopen the app from its icon, and confirm the shift is still there. Turn airplane mode off afterward.
7. Export a JSON backup from **Goals & backup** regularly. Keep backups private. Browser site-data clearing or phone loss can erase records.

**Security and privacy:** GitHub Pages serves public static app files, not saved sales records. Shift records remain in the Android browser storage and are not transmitted by this app. It has no password or device-level encryption. Use Android device screen lock and only enter figures the employer permits. Never commit or upload backups or personal data to the repository. The app does not sync between phones or computers.

**Important:** Opening `index.html` directly from Files (`file://`) does not provide reliable service-worker installation. Use an HTTPS deployment as described above. The initial installation requires internet; normal app operation afterward does not. The web host must remain reachable for future updates, and some browser/storage behavior varies by device.

## Windows preview

With Python 3.12 installed, open Command Prompt in the extracted folder and run `py -3.12 -m http.server 8000`, then browse to `http://localhost:8000`. This runs the same app locally; data entered on Windows stays on Windows.

## Migrating from V1.3

V1.3 stores data in SQLite; V2 uses Android browser localStorage. There is **no automatic migration**. Do not delete the V1.3 folder or `sales_advisor.sqlite3`. You can manually enter a few approved figures into V2; a migration tool can be added later.

## Features

- Daily shift add/edit/delete (one entry per date)
- Sales, transaction count, units, optional customer opportunities and eligible loyalty opportunities, loyalty signups, private non-identifying notes
- Weekly/monthly/all-time dashboard and daily bar chart, including one-day data
- Editable sales/ATV/UPT/conversion/loyalty goals and rule-based coaching
- Local-only storage, JSON export/import, CSV export
- Pastel pink / happy-gothic mobile-responsive styling

## Data conventions

Conversion = transactions / customer opportunities, when all selected shifts have recorded opportunities and total opportunities > 0. Loyalty rate = signups / eligible opportunities, when all selected shifts have recorded eligible opportunities and total eligible > 0. These may differ from employer KPI definitions. Weekly sales goal applies only to the week view. Do not enter confidential or identifying information.
