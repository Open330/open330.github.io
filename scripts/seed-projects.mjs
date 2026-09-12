#!/usr/bin/env node
// Seed data/projects.json from the GitHub API via `gh` (same schema/rules as the org feed).
// Usage: node scripts/seed-projects.mjs   (requires an authenticated `gh` CLI)
import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const EXCLUDE = new Set(['.github', 'open330.github.io', 'homebrew-tap', 'BurstPick-releases']);
const gh = (args) => execFileSync('gh', args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });

const repos = JSON.parse(gh(['api', '--paginate', '--slurp', 'orgs/Open330/repos?type=public&per_page=100'])).flat();
const projects = [];
for (const r of repos) {
  if (r.fork || r.archived || r.private || EXCLUDE.has(r.name)) continue;
  let latest_release = null;
  try {
    const rel = JSON.parse(gh(['api', `repos/${r.full_name}/releases/latest`]));
    latest_release = rel.tag_name || rel.name || null;
  } catch { latest_release = null; }
  projects.push({
    name: r.name,
    description: r.description || '',
    url: r.html_url,
    homepage: r.homepage || null,
    language: r.language || null,
    stars: r.stargazers_count || 0,
    topics: r.topics || [],
    pushed_at: r.pushed_at,
    created_at: r.created_at,
    latest_release,
  });
}
projects.sort((a, b) => (b.stars - a.stars) || (b.pushed_at < a.pushed_at ? -1 : b.pushed_at > a.pushed_at ? 1 : 0));
const out = { generated_at: new Date().toISOString(), projects };
writeFileSync(new URL('../data/projects.json', import.meta.url), JSON.stringify(out, null, 2) + '\n');
console.log(`wrote ${projects.length} projects`);
