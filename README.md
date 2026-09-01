# Personality LMS Demo

Demo Svelte app combining Enneagram-style assessment output, team context, and LMS-style development pathways.

The content is developmental and reflective, not clinical or diagnostic.

## Source Of Truth

For the current course system, use `new-course-approach/`:

1. `01-course-system-architecture-v3.md`
2. `02-course-catalog-v3.yaml`
3. `03-demo-recommendations-v3.md`
4. `04-development-map-rules-v3.md`

`02-course-catalog-v3.yaml` is the canonical structured course catalogue. Generate the runtime JSON with:

```sh
pnpm generate:courses
```

Validate catalogue, recommendation, and learner-state integrity with:

```sh
pnpm validate:courses
```

Profile, persona, and team relationship content lives in `enneagram-content/`, with UI references in `blueprints/`. Those references should not override the v3 course architecture.

## Development

```sh
pnpm install
pnpm dev
```

## Demo Access Protection

Set `DEMO_ACCESS_PASSWORD` to require an access code before viewers can open the app. The code is checked server-side and stored only as an HTTP-only cookie after login.

For local development:

```sh
DEMO_ACCESS_PASSWORD=your-code pnpm dev
```

For Cloudflare Pages, add `DEMO_ACCESS_PASSWORD` as a private environment variable in the Pages project settings. Do not use a `PUBLIC_` or `VITE_` prefixed variable for this value.

## Cloudflare Pages

The app uses `@sveltejs/adapter-cloudflare`; production output is configured in `wrangler.jsonc` as `.svelte-kit/cloudflare`.

Build locally with:

```sh
pnpm build:cloudflare
```

Recommended Cloudflare Pages settings:

- Build command: `pnpm build:cloudflare`
- Build output directory: `.svelte-kit/cloudflare`
- Node version: current Cloudflare Pages default is fine for this project
