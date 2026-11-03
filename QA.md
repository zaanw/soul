# Validation — Pages edition

- npm run lint: passed.
- npm run build: passed; static export generated under out/ with /soul base path.
- Chromium via tests/pages-check.mjs: passed against actual exported HTML/assets (no Next server).
- Verified: no failed asset requests/page errors; local draft creation, rename, persistence after reload, search, deletion; explicit unavailable-AI message; light/dark theme; local rule add/delete; mobile overlay open/close; no horizontal overflow at 390px.
- Screenshots: artifacts/desktop.png and artifacts/mobile.png.
- Not checked: actual GitHub Pages deployment until workflow runs and its public URL is reachable; Safari/Firefox/Edge on actual devices.
- No AI backend, SQLite, streaming or server credentials are present in this static edition. Full application is maintained separately in zaanw/s-ulai.

Run the static browser check after building and serving out at /soul/ on local port 3020. The script uses system Chromium by default. Browser tooling is a development dependency only.
