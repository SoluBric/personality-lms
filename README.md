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
