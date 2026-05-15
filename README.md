# bpleone-homepage
Personal landing page for bpleone.com — hub for multi-vertical trading desks (Pokemon TCG, sports cards, betting, equity research, sports).

## ⚠️ Heads-up for local-clone edits

If you edit `index.html` locally on a machine whose clone is behind `origin/main`, please `git pull --rebase origin main` first. Several pushes have inadvertently reverted live updates (most recently the Sports Betting + Sports Hub `.desks-strip` chips, which are LIVE in the main card grid but get reset to "soon" by stale local pushes).

Quick check before editing the desks-strip:
- Sports Betting chip should be an `<a>` linking to `http://betting.bpleone.com` with `live-dot` and `LIVE · 32 markets · EV`.
- Sports Hub chip should be an `<a>` linking to `https://sports.bpleone.com` with `live-dot` and `LIVE · 6 teams · ESPN`.
- Sports Betting card href is `http://` (not https://) until the GitHub Pages cert for betting.bpleone.com finishes provisioning — flip to `https://` once `gh api repos/Keyvaniath/bpleone-betting/pages | jq .https_certificate.state` returns `provisioned`.
