# Deployment & cutover

## First deploy (no DNS changes yet)

1. Push this repo to GitHub, `main` branch.
2. Repo → **Settings → Pages → Source → GitHub Actions**. The existing
   `.github/workflows/deploy.yml` handles build/test/deploy on every push
   to `main`.
3. Without any DNS change yet, the site is live at
   `https://<your-org>.github.io/<repo>/` — use this to verify the real
   build (not my unverified local review) before touching DNS. Check:
   - `/`, `/cs/`, `/cs/terms/`, `/cs/cancellation/` all load
   - language switcher, all nav anchors, FAQ accordion, booking links
   - `/sitemap.xml`, `/robots.txt`
   - the CI job's own Playwright + axe results (they run against this
     exact build)

   Note: at this `github.io/<repo>/` URL, asset paths will be wrong
   (`public/CNAME` sets up for the apex domain, not a repo subpath) — some
   things may look broken purely because of that path mismatch, not
   necessarily a real bug. That's expected until step 2 (DNS) below;
   don't chase path-related issues at this URL.

## DNS cutover (plynulecesky.cz)

`public/CNAME` (already committed) tells GitHub Pages which custom domain
to serve. The DNS side still needs to be pointed at GitHub, wherever
`plynulecesky.cz` is currently hosted/registered:

1. At your DNS provider, for the apex domain (`plynulecesky.cz`, not a
   subdomain), add **A records** pointing at GitHub Pages' IPs:
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```
   (If your DNS provider supports ALIAS/ANAME records instead of plain A
   records for apex domains, that also works — follow GitHub's current
   docs, since these IPs can change: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
2. Repo → Settings → Pages → confirm the custom domain field shows
   `plynulecesky.cz` (it should pick this up from `public/CNAME`
   automatically once DNS resolves) and enable **Enforce HTTPS** once the
   certificate is issued (can take a few minutes to a few hours after DNS
   propagates).
3. DNS propagation is typically minutes but can take up to 24-48 hours
   depending on the previous host's TTL settings — don't be alarmed if it
   isn't instant.

## Rollback plan

- Until DNS is repointed, the **old site keeps running exactly as-is** —
  this cutover only touches DNS records, nothing on the current host is
  being modified or torn down. There is no "old site" downtime risk
  during steps above.
- If something looks wrong **after** DNS is repointed: revert the DNS
  A/ALIAS records back to whatever they pointed at before (keep a copy of
  the old records before changing them). DNS changes are the rollback
  lever, not a code revert — the GitHub Pages deployment itself can stay
  as-is while DNS points elsewhere again.
- If a *bad deploy* (not a DNS issue) reaches `main` after cutover: revert
  the offending commit and push — the workflow redeploys automatically.
  GitHub Pages also keeps deployment history under the repo's
  **Deployments** view if a manual rollback to a previous artifact is
  needed faster than a revert+redeploy.

## Legacy URL compatibility

The old live site's in-page anchors (`#about`, `#method`, `#pricing`,
`#contact`) are preserved on the new homepage even though the information
architecture changed:

- `#about`, `#pricing` — unchanged, same section ids.
- `#method` — the old "Методика" section maps to the new specialization
  block; a zero-height anchor keeps `#method` links landing in the right
  place (see `src/components/specialization.tsx`).
- `#contact` — now the footer section (same "ready to start? email me"
  content that used to be its own section).

Covered by `tests/e2e/legacy-anchors.spec.ts`. If the old site is ever
found to have other inbound links/bookmarks in the wild (check Google
Search Console for the current domain before cutover), add matching
anchors the same way.
