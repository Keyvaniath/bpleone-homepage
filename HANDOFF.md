# bpleone.com — Repo Handoff Notes

This file documents the live URL conventions for `Keyvaniath/bpleone-homepage` so any agent (or human) editing the repo doesn't break working pages.

## URLs that work today (zero DNS needed)

| URL | What | Where it lives in this repo |
|---|---|---|
| `https://bpleone.com/` | Trading desk hub homepage | `index.html` |
| `https://bpleone.com/sports-cards/` | Sports Cards desk landing | `sports-cards/index.html` |
| `https://bpleone.com/sports-cards.html` | (redirects to above) | `sports-cards.html` |
| `https://bpleone.com/sports/` | Sports Hub desk landing | `sports/index.html` |
| `https://bpleone.com/sports.html` | (redirects to above) | `sports.html` |
| `https://bpleone.com/cards.html` | Pokémon TCG 774-card directory | `cards.html` |
| `https://bpleone.com/404.html` | Branded 404 page | `404.html` |

## URLs that need DNS (currently broken)

These are referenced in homepage card links but the subdomains have no CNAME records configured. Until DNS is added, **use the `/sports-cards/` and `/sports/` paths instead**:

- `https://sports-cards.bpleone.com` ← broken
- `https://sports.bpleone.com` ← broken

## URLs that work via separately-configured DNS

- `https://pokemon.bpleone.com` — Squarespace 302 redirect to `pokemon-tcg-trading-desk.streamlit.app`
- `https://betting.bpleone.com` — GitHub Pages CNAME on `Keyvaniath/bpleone-betting`

## Convention for homepage cards

**DO this:**
```html
<a href="/sports-cards/" class="card live">...Sports Cards card...</a>
<a href="/sports/" class="card live">...Sports Hub card...</a>
```

**DON'T do this until DNS is added:**
```html
<a href="https://sports-cards.bpleone.com" ...>  <!-- DNS not configured, link is dead -->
<a href="https://sports.bpleone.com" ...>         <!-- DNS not configured, link is dead -->
```

## To make subdomain URLs work (Brandon's action)

Add these CNAME records at your DNS provider (Squarespace DNS UI or Cloudflare):

```
Type   Host           Points to
CNAME  sports-cards   keyvaniath.github.io
CNAME  sports         keyvaniath.github.io
```

The corresponding GH Pages projects are:
- `Keyvaniath/bpleone-sports-cards-desk` (serves from `/docs`)
- `Keyvaniath/bpleone-sports-hub` (serves from `/docs`)

Once DNS propagates, also re-add `docs/CNAME` files to those repos with the subdomain hostnames.

## Source-of-truth for the desk landings

The canonical content for both landings lives in:
- `Keyvaniath/bpleone-sports-cards-desk/docs/index.html` ← Sports Cards
- `Keyvaniath/bpleone-sports-hub/docs/index.html` ← Sports Hub

Copies are mirrored into `bpleone-homepage/sports-cards/index.html` and `bpleone-homepage/sports/index.html`. **When updating, update the source-of-truth first, then sync the mirror.**

## Other deployed desks (separate repos)

- `Keyvaniath/pokemon-tcg-trading-desk` — Pokémon TCG Streamlit app
- `Keyvaniath/bpleone-betting` — Sports Betting / DFS platform (static HTML, owned by another agent)
- `Keyvaniath/bpleone-options-desk` — Options desk
- `Keyvaniath/bpleone-sports-betting-desk` — **archived** (duplicate of bpleone-betting)

## Last updated

2026-05-15 by Claude Opus 4.7 working on the Sports Cards + Sports Hub desks.
