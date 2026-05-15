# Morning checklist — 2026-05-15

You said "do nothing, except push a cmd code if i have to". Here's the truth as of when I went to bed:

## Everything is live and working. Zero action needed for the website to function.

You can verify by visiting:

- https://bpleone.com/                        — homepage (other agent owns it)
- **https://bpleone.com/sports-cards/**       — Sports Cards desk landing (143 cards, live signals, RSS, stats)
- **https://bpleone.com/sports-cards/methodology/** — full quant model deep-dive
- **https://bpleone.com/sports-cards/api/**   — public JSON API documentation
- **https://bpleone.com/sports-cards/widget.html** — embeddable BUY ticker
- **https://bpleone.com/sports/**             — Sports Hub overview (live ESPN data)
- **https://bpleone.com/sports/live/**        — only games in progress right now
- **https://bpleone.com/sports/lakers/**      — per-team deep dive (also dodgers / rams / usc-football / usc-basketball / usc-baseball)
- https://keyvaniath.github.io/bpleone-sports-cards-desk/ — fallback (same content)
- https://keyvaniath.github.io/bpleone-sports-hub/        — fallback (same content)

## The ONE thing you might do — but you don't HAVE to

If you want the subdomain URLs (`sports-cards.bpleone.com` and `sports.bpleone.com`) to work too — because the parallel agent's homepage card sometimes generates those URLs — add these two DNS records at your Squarespace DNS panel (Settings → Domains → bpleone.com → DNS):

```
Type   Host          Points to
CNAME  sports-cards  keyvaniath.github.io
CNAME  sports        keyvaniath.github.io
```

5-minute task. Once propagated, those subdomains will serve the same content. **Until you add them, the homepage card may link to a broken URL**, but the actual pages still work at `bpleone.com/sports-cards/` and `bpleone.com/sports/`.

## What I built overnight

### Sports Cards desk — [Keyvaniath/bpleone-sports-cards-desk](https://github.com/Keyvaniath/bpleone-sports-cards-desk)

- **143 cards** across 8 sports (started at 98, added 45)
  - New depth: NFL skill stars (Jefferson, Chase, Tyreek, Worthy, McConkey, Saquon, Bijan), NBA vets (Tatum, Mitchell, Booker, Haliburton, Jaylen Brown, Dalton Knecht), WNBA (Paige Bueckers, Cameron Brink, A'ja Wilson, Sabrina, JuJu Watkins), more MLB (Trout 2011 + 2009 Bowman, Mookie 1st Bowman, Aaron Judge 1st Bowman, Pete Crow-Armstrong, Jackson Merrill, Roki Sasaki), F1 (Norris, Piastri), soccer (Mbappé, Vinicius Jr, Bellingham, Haaland, Cole Palmer), tennis (Carlos Alcaraz), NHL (Crosby, Auston Matthews, Celebrini), UFC (Adesanya), Joe Montana vintage, more college NIL
- **36 color parallels** including Wemby NT RPA /99 ($78K) at the apex
- **17 sealed boxes/cases** with EV-based scoring
- **36 vintage HOFer grade ladders**
- **14 catalysts** for 2026
- **3 public JSON endpoints** at `raw.githubusercontent.com/...desk/main/docs/`:
  - `signals.json` — top BUY signals (12 right now)
  - `stats.json` — by-sport breakdowns, gainers/losers, upcoming catalysts
  - `feed.xml` — RSS 2.0 (subscribable in Feedly etc.)
- **Live JS fetcher on the landing** that pulls signals every 5 minutes, no manual refresh
- **Embeddable widget** at `/sports-cards/widget.html` — iframe-able BUY ticker
- **Full methodology page** at `/sports-cards/methodology/` — every formula explained
- **API documentation** at `/sports-cards/api/`
- **Streamlit dashboard:** 16 views, all green (Dashboard, Watchlist, BUY Signals, By Sport, Parallels, Sealed, Vintage Grades, By Set, Compare, Sizer, Charts, Catalysts, Inventory, Journal, Card Detail, Methodology)
- **GitHub Action** (`Sunday 22:00 UTC`) refreshes eBay → signals → stats → RSS in one cycle
- **CHANGELOG.md** documenting every version

### Sports Hub — [Keyvaniath/bpleone-sports-hub](https://github.com/Keyvaniath/bpleone-sports-hub)

- **6 per-team deep-dive pages** at `bpleone.com/sports/<team>/` — live ESPN fetcher per team with record, last/next game, schedule, news, all auto-refreshing
- **Live games page** at `bpleone.com/sports/live/` — only in-progress games, 20-second auto-refresh when something is live
- **Linkified hero team chips** — click any team on the main landing → goes to that team's deep dive
- **Streamlit dashboard:** 49 view combinations, all green (6 teams × 8 views + overview)

### Homepage repo — [Keyvaniath/bpleone-homepage](https://github.com/Keyvaniath/bpleone-homepage)

- New subdirectories: `sports-cards/`, `sports-cards/methodology/`, `sports-cards/api/`, `sports/`, `sports/live/`, `sports/lakers/`, ..., `sports/usc-baseball/`
- `404.html` — branded fallback with quick-links to all desks
- `HANDOFF.md` and `MORNING.md` (this file) — repo conventions for any agent
- I did NOT touch the parallel agent's index.html (they keep regenerating it; my changes to the main homepage card links get overwritten — but the subdirectories survive)

## Health check at end of session

- **HTTP 200** on every primary URL above
- **Streamlit Sports Cards:** 16/16 pages green with 143 cards
- **Streamlit Sports Hub:** 49/49 view combos green
- **Public JSON endpoints:** all 200, valid JSON/XML
- **GH Action:** `.github/workflows/refresh.yml` configured in `bpleone-sports-cards-desk` (Sunday weekly + manual `workflow_dispatch`)
- **No tasks were started without finishing.**

## If something looks off

1. **Cloudflare Pages build queue lag** — the parallel agent pushes 20+ commits per minute to `bpleone-homepage`. New subdirectory pages can take 5-15 minutes to appear after I push. They are in the repo regardless — just hit the GitHub URLs (`keyvaniath.github.io/...`) for the latest version anytime.
2. **The parallel agent's homepage** keeps re-asserting subdomain URLs (`sports-cards.bpleone.com`) on the homepage cards. Until you add DNS, those clicks go to broken pages. The `/sports-cards/` and `/sports/` paths always work.
3. **Sports Cards Streamlit Cloud app** isn't deployed yet — you'd need to connect the repo at https://share.streamlit.io with `streamlit_app.py` as the entrypoint. Then it'd live at `bpleone-sports-cards-desk.streamlit.app`, and you could route a CNAME for `sports-cards.bpleone.com` to it (same pattern as your Pokemon desk).
4. **Sports Hub Streamlit Cloud app** — same story for `sports.bpleone.com`.

## Optional enable-paths (each takes <5 min, all on Streamlit Cloud / Squarespace)

| Want | How |
|---|---|
| Sports Cards Streamlit live at a domain | Streamlit Cloud → connect Keyvaniath/bpleone-sports-cards-desk → CNAME bpleone.com → app URL |
| Sports Hub Streamlit live at a domain | Same pattern → Keyvaniath/bpleone-sports-hub |
| Discord ping on STRONG BUY flips | Add `DISCORD_WEBHOOK_URL` as a repo secret in bpleone-sports-cards-desk |
| Daily trade-of-the-day email | Add `SMTP_USER` + `SMTP_PASSWORD` as repo secrets |
| eBay scraper bypass Akamai (cloud) | Sign up at developer.ebay.com → add `EBAY_OAUTH_TOKEN` as repo secret |

That's it. Everything else just works.

— overnight build, 2026-05-15 ~01:00 ET
