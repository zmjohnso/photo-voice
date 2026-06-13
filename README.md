<div align="center">
  <img src="static/icon-512.png" alt="PhotoVoice Logo" width="320">
</div>

<p align="center">
  <strong>PhotoVoice Japan Project</strong>
</p>

---

PhotoVoice Japan is a bilingual, open-source SvelteKit application for
publishing photographs and first-person voices from communities across Japan.

## Stack

- Svelte 5 and SvelteKit
- TypeScript and Vitest
- Native HTML controls and project-owned CSS
- Contentful behind a server-only adapter
- `@sveltejs/adapter-auto` for portable deployment

The UI has no React, Material UI, Zustand, or browser-side Contentful runtime.
CMS responses are normalized in `src/lib/server/contentful.ts`, so replacing
Contentful does not require rewriting routes or components.

## Local development

Requires Node.js 22.

```sh
npm ci
cp .env.example .env
npm run dev
```

Configure these server-side environment variables:

```text
CONTENTFUL_SPACE_ID
CONTENTFUL_ENVIRONMENT_ID
CONTENTFUL_ACCESS_TOKEN
```

The old `VITE_CONTENTFUL_*` names remain accepted temporarily to make the
migration deployable without a flag day. New deployments should use the
server-private names above.

## Quality checks

```sh
npm run lint
npm run check
npm test
npm run build
```

Search behavior, localization, CMS normalization, and Svelte rendering have
unit coverage. Search criteria are represented in the URL, making results
shareable and removing client-only global state.

## Deployment

`adapter-auto` supports the common managed SvelteKit platforms without changing
application code. For a self-hosted Node server, static hosting, or another
runtime, install the matching official SvelteKit adapter and change only the
adapter import in `svelte.config.js`.

No platform APIs are used by the application. The three Contentful variables
are the only runtime configuration.

## Migration history

The React-to-SvelteKit migration is intentionally performed in this repository,
not as a new project or squashed import. Existing commits remain the history of
the application, and static assets were moved with `git mv` so rename tracking
continues to work.

See [MIGRATION.md](MIGRATION.md) for route mapping and rollout notes.
