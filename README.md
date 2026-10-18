# Blush & Moonlight V2.3 — Personal Sales Coach

Adds a **Sales Coach** tab with goal-based next-shift focus, one technique practice check-in per date, and observational comparisons of recorded shifts with and without check-ins. Existing V2.2 data, Santana's message, Academy, and offline operation are preserved.

## Update your existing GitHub Pages app

1. In V2.2, export a JSON backup before updating.
2. Extract the ZIP. Open the included `blush_moonlight_v2` folder.
3. Replace the contents of the **existing** repository folder `blush_moonlight_v2` with these files. Do not nest a second `blush_moonlight_v2` folder.
4. Commit changes, wait for Pages deployment, open `https://gurgi58-png.github.io/blush-moonlight/blush_moonlight_v2/index.html` online and refresh. Close and reopen the home-screen app. If needed, refresh online again to update the service worker cache.
5. Check the new **Sales Coach** tab. Enter a fictional practice, close and reopen offline, verify it persists, and export a JSON backup. Remove test data afterward.

**Data safety:** V2.3 uses the same localStorage key (`blush_moonlight_v2_data`). Existing data should remain; the new `coachPractices` array defaults to empty. Backups include coaching entries, and earlier backups still import. **Import replaces all current data**. Local storage and exported JSON are not encrypted. Do not record identifiable customers, coworkers, or employer-confidential information.

**Important:** This is an independent personal tool, not affiliated with the employer. Recommendations are generic, not official product or policy guidance. Comparisons are observational, and missing denominators are not inferred.

# Blush & Moonlight V2.2 — Moonlight Academy

Adds 7/14/30-day performance comparisons, 6 jewelry/sales lessons, 4 leadership scenarios, and 5 achievement milestones. All offline. Keeps Santana’s dashboard note and V2.1 growth plan.

## Upgrade from V2.1

1. **Export a JSON backup first.**
2. Extract this ZIP. Open your GitHub repository `blush-moonlight` and update the files **inside** the existing `blush_moonlight_v2` folder. Do not create a second nested folder.
3. Commit all changed files (`index.html`, `app.js`, `style.css`, `sw.js`, `README.md`). Leave the icons and manifest in place.
4. Wait for GitHub Pages to finish deploying. Open `https://gurgi58-png.github.io/blush-moonlight/blush_moonlight_v2/index.html` while online and refresh. Close and reopen the home-screen app.
5. Look for **☾ Academy** in the navigation. Test one lesson, reopen the app offline, and verify its checkmark remains.

All personal records remain in the same localStorage key as V2.1; JSON backups now include `completedLessons`. Backups from V2.0/V2.1 still import. Data is not uploaded to GitHub. Clearing browser storage or uninstalling may erase it. Do not store employer-confidential information.

## Testing

JavaScript syntax and ZIP integrity were checked, but full browser and Android testing must be done on your device.

## Santana dashboard note

This update adds a permanent personal message to the Dashboard, below the coaching notes. The offline cache version was bumped so the updated design can be fetched on Android.

# Blush & Moonlight V2.1 — Balanced Growth Edition

Adds offline Next Shift Game Plan, jewelry and leadership mini-quiz, and daily sales/knowledge/leadership check-ins. Existing V2.0 data stays in the same browser storage key. JSON backups include development check-ins, and V2.0 backups remain importable.

**Update:** In GitHub, replace the files inside `blush_moonlight_v2` with the contents of this package’s `blush_moonlight_v2` folder. Keep the folder name and URL unchanged. Commit, wait for GitHub Pages deployment, then fully close and reopen the Android app. If it still shows V2.0, refresh while online and reopen. Export a JSON backup before updating.

**Privacy:** App code is public on GitHub Pages; local shift and development records are not uploaded. JSON exports are unencrypted. Do not store confidential employer information or customer/employee identifiers. The app is independent and not affiliated with the employer.

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
