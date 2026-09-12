# open330.github.io

Landing page for [open330](https://github.com/open330) — building professional services powered by LLM AI agents.

**Live**: https://open330.github.io

<div><img src="https://quickstart-for-agents.vercel.app/api/header.svg?theme=opencode&logo=open330&title=Maintain+the+Open330+organization+landing+page&font=inter" width="100%" /></div>

```
You are an AI agent working on the Open330 organization landing page,
a static HTML/CSS site deployed to GitHub Pages.
Clone https://github.com/Open330/open330.github.io and help improve
the design, content, or add new sections showcasing Open330 projects.
```

## Structure

```
├── index.html          # Landing page (Projects section is generated, see below)
├── data/projects.json  # Cached org projects feed (fallback for the build script)
├── scripts/            # build-projects.mjs renders Projects from the feed; seed-projects.mjs seeds data/ via gh
├── sitemap.xml, robots.txt
├── 404.html            # Custom 404
└── assets/
    ├── logo.svg        # Organization logo (vector)
    ├── logo.png        # Organization logo (raster, 1024x1024)
    └── favicon.svg     # Browser favicon
```

## Development

Static HTML/CSS — no build step. Open `index.html` in a browser or use any local server:

```bash
npx serve .
```

## Deployment

Deployed automatically via GitHub Pages from the `main` branch.

## Projects section

The Projects grid in `index.html` is rendered statically (for SEO) between
`<!-- projects:start -->` and `<!-- projects:end -->` by `scripts/build-projects.mjs`.
It reads https://raw.githubusercontent.com/Open330/.github/main/profile/projects.json
and falls back to `data/projects.json`. The `update-projects.yml` workflow runs it daily
(01:00 UTC) and on `workflow_dispatch`, committing when the output changes.

```
node scripts/build-projects.mjs            # fetch feed (falls back to data/projects.json)
node scripts/build-projects.mjs --offline  # local data only
node scripts/seed-projects.mjs             # rebuild data/projects.json via gh api
```
