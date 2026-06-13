# React to SvelteKit migration

## Route mapping

| Existing URL               | SvelteKit route                                    |
| -------------------------- | -------------------------------------------------- |
| `/`                        | `src/routes/+page.svelte`                          |
| `/search`                  | `src/routes/search/+page.svelte`                   |
| `/about`                   | `src/routes/about/+page.svelte`                    |
| `/contact`                 | `src/routes/contact/+page.svelte`                  |
| `/display`                 | `src/routes/display/+page.svelte`                  |
| `/display/:entryId`        | `src/routes/display/[entryId]/+page.svelte`        |
| `/author/:entryId`         | `src/routes/author/[entryId]/+page.svelte`         |
| `/display/author/:entryId` | `src/routes/display/author/[entryId]/+page.svelte` |

Public paths are unchanged. Japanese mode is carried by `?lang=ja`, and search
criteria are now shareable query parameters instead of in-memory Zustand data.

## Runtime changes

- Contentful calls run in SvelteKit server loaders.
- Contentful SDK objects are normalized into application-owned domain types.
- Theme preference remains client-side and persists in local storage.
- Browser language detection selects Japanese when appropriate.
- Markdown is rendered with `micromark`; raw HTML remains disabled.
- The contact form uses native validation and opens a populated email draft.

## Rollout

1. Keep this migration as a normal commit on the existing branch so `git log`
   and `git blame` retain the full React history.
2. Configure `CONTENTFUL_SPACE_ID`, `CONTENTFUL_ENVIRONMENT_ID`, and
   `CONTENTFUL_ACCESS_TOKEN` on the target host.
3. Run `npm ci`, then the four quality commands documented in `README.md`.
4. Deploy with the host's official SvelteKit adapter. `adapter-auto` handles
   supported providers during the transition.
5. Smoke-test both locales and all eight preserved public route patterns.

Rolling back is a normal git revert of the migration commit; no repository or
content migration is required.
