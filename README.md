<div><img src="https://quickstart-for-agents.vercel.app/api/header.svg?theme=opencode&logo=open330&title=Maintain+the+Open330+organization+landing+page&font=inter" width="100%" /></div>

```
You are an AI agent working on the Open330 organization landing page,
a static HTML/CSS site deployed to GitHub Pages.
Clone https://github.com/Open330/open330.github.io and help improve
the design, content, or add new sections showcasing Open330 projects.
```

# open330.github.io

Landing page for [open330](https://github.com/open330) — building professional services powered by LLM AI agents.

**Live**: https://open330.github.io

## Structure

```
├── index.html          # Landing page
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
