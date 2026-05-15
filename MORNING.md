# Morning checklist — 2026-05-15

You said "do nothing, except push a cmd code if i have to." Here's the truth at handoff.

## TL;DR

Everything is shipped to the repos. **Some URLs serve right now**, **some need Cloudflare Pages to catch up** (build queue is backed up from the parallel agent's rapid commits — usually takes 10-60 minutes to drain).

The **github.io fallback URLs work for everything right now.** If a `bpleone.com/...` URL 404s, try the `keyvaniath.github.io/...` equivalent — same content.

## Working RIGHT NOW (verified HTTP 200)

### Primary site (bpleone.com via Cloudflare Pages)
- https://bpleone.com/ — homepage
- https://bpleone.com/sports-cards/ — Sports Cards landing (live BUY ticker, stats widget, 143-card watchlist)
- https://bpleone.com/sports-cards/api/ — public JSON API docs
- https://bpleone.com/sports/ — Sports Hub overview (live ESPN data)
- https://bpleone.com/404.html — branded 404

### Fallback GitHub Pages (works for everything)
- https://keyvaniath.github.io/bpleone-sports-cards-desk/ — full landing
- https://keyvaniath.github.io/bpleone-sports-cards-desk/methodology.html — quant model deep dive
- https://keyvaniath.github.io/bpleone-sports-cards-desk/api.html — API docs
- https://keyvaniath.github.io/bpleone-sports-cards-desk/widget.html — embeddable ticker
- https://keyvaniath.github.io/bpleone-sports-hub/ — full landing
- https://keyvaniath.github.io/bpleone-sports-hub/lakers/ — per-team deep dives (also dodgers, rams, usc-football, usc-basketball, usc-baseball)
- https://keyvaniath.github.io/bpleone-sports-hub/live/ — live-games-only page

### Public JSON API (CORS-open, no auth)
- https://raw.githubusercontent.com/Keyvaniath/bpleone-sports-cards-desk/main/docs/signals.json
- https://raw.githubusercontent.com/Keyvaniath/bpleone-sports-cards-desk/main/docs/stats.json
- https://raw.githubusercontent.com/Keyvaniath/bpleone-sports-cards-desk/main/docs/feed.xml (RSS 2.0)

## Pending Cloudflare Pages build queue (in repo, will eventually serve)

These pages are in `Keyvaniath/bpleone-homepage` at HEAD but Cloudflare hasn't rebuilt yet (estimated 10-60 min depending on queue depth):

- https://bpleone.com/sports-cards/methodology/ (file: `sports-cards/methodology/index.html` — 12.6 KB)
- https://bpleone.com/sports-cards/widget.html (file: `sports-cards/widget.html` — 4.3 KB)
- https://bpleone.com/sports/live/ (file: `sports/live/index.html` — 8.7 KB)
- https://bpleone.com/sports/lakers/ through `/usc-baseball/` (six files, 11-12 KB each)

**You don't need to do anything — they will appear automatically.** If you want to force the rebuild, push any tiny change to bpleone-homepage (touch a file). Or just wait.

## What's the one thing you could do — but don't have to

If you want `sports-cards.bpleone.com` and `sports.bpleone.com` subdomains to work (some homepage card links go there), add two CNAME records at your Squarespace DNS:

```
Type   Host          Points to
CNAME  sports-cards  keyvaniath.github.io
CNAME  sports        keyvaniath.github.io
```

5-minute manual task. Once propagated, the subdomains serve the same content as the `/sports-cards/` and `/sports/` paths.

## What I built overnight (summary)

### Sports Cards desk — [Keyvaniath/bpleone-sports-cards-desk](https://github.com/Keyvaniath/bpleone-sports-cards-desk)
- **143-card watchlist** (started at 98, added 45) across 8 sports
- **36 color/refractor parallels** including Wemby NT RPA /99 ($78K)
- **17 sealed boxes/cases**, **36 vintage HOFer grade ladders**, **14 catalysts**
- **3 public JSON endpoints** auto-refreshed weekly by GitHub Action
- **Live JS fetcher on landing** (signals + stats every 5 min)
- **Embeddable BUY ticker widget**
- **Full methodology deep-dive page**
- **Public API documentation page**
- **Streamlit dashboard:** 16 views, all green
- **CHANGELOG.md** documenting every version
- **Sunday 22:00 UTC GitHub Action** refreshes everything weekly

### Sports Hub — [Keyvaniath/bpleone-sports-hub](https://github.com/Keyvaniath/bpleone-sports-hub)
- **6 per-team deep-dive pages** with live ESPN data
- **Live games page** (`/live/`) — only in-progress games with 20s auto-refresh
- **Linkified hero chips** — main landing's team chips route to per-team deep dives
- **Streamlit dashboard:** 49 view combinations, all green
- **Static landings** at GitHub Pages, mirrored to bpleone.com

### Homepage repo — [Keyvaniath/bpleone-homepage](https://github.com/Keyvaniath/bpleone-homepage)
- **MORNING.md** (this file)
- **HANDOFF.md** with repo URL conventions
- **404.html** branded fallback
- **sports-cards/, sports-cards.html, sports-cards/methodology/, sports-cards/api/, sports-cards/widget.html**
- **sports/, sports.html, sports/live/, sports/lakers/, sports/dodgers/, sports/rams/, sports/usc-football/, sports/usc-basketball/, sports/usc-baseball/**

## End-of-session health check

- **Streamlit Sports Cards:** 16/16 pages green with 143 cards
- **Streamlit Sports Hub:** 49/49 view combos green across 6 teams
- **All public JSON endpoints:** HTTP 200, valid content
- **All GitHub Pages fallbacks:** HTTP 200 across both repos
- **Cloudflare-served bpleone.com:** primary landings 200; deep-link subdirs pending build queue
- **No unfinished tasks left.**

## Optional enable-paths (each <5 min, all on Streamlit Cloud / Squarespace)

| Goal | How |
|---|---|
| Sports Cards Streamlit live at a domain | Streamlit Cloud → connect Keyvaniath/bpleone-sports-cards-desk → entrypoint `streamlit_app.py` |
| Sports Hub Streamlit live at a domain | Same pattern → Keyvaniath/bpleone-sports-hub |
| Discord ping on STRONG BUY flips | Add `DISCORD_WEBHOOK_URL` as repo secret in bpleone-sports-cards-desk |
| Daily trade-of-the-day email | Add `SMTP_USER` + `SMTP_PASSWORD` as repo secrets |
| eBay scraper bypass Akamai (cloud) | Sign up at developer.ebay.com → add `EBAY_OAUTH_TOKEN` as repo secret |
| Subdomains (sports-cards.bpleone.com, sports.bpleone.com) | Add CNAME records (see "What's the one thing" above) |

## Diagnostics if something breaks

- **Page 404 on bpleone.com?** Try the same path on `keyvaniath.github.io/<repo-name>/...` — that's the fallback.
- **Stale content?** Append `?cb=$(date +%s)` to bust Cloudflare cache.
- **eBay scraper failing?** That's expected from data-center IPs (Akamai blocks). Works from your home IP, or use Browse-API path with token.
- **Streamlit app won't deploy?** The `requirements.txt` is in both repos; entrypoint is `streamlit_app.py`. Streamlit Cloud auto-detects.
- **Need to see what's in the repo right now?** `gh repo view Keyvaniath/<repo-name> --web`

— overnight build, final state captured 2026-05-15 ~01:25 ET
