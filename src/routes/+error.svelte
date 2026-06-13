<script lang="ts">
  import { page } from "$app/state";
  import { copyFor } from "$lib/i18n";
  import { localeFromLanguage } from "$lib/i18n";
  import { localizedPath } from "$lib/navigation";

  const locale = $derived(
    page.url.searchParams.get("lang") === "ja"
      ? "ja"
      : localeFromLanguage(
          typeof navigator === "undefined" ? null : navigator.language,
        ),
  );
  const text = $derived(copyFor(locale));
</script>

<svelte:head>
  <title>{page.status} | PhotoVoice Japan</title>
</svelte:head>

<section class="error-page">
  <p class="status">{page.status}</p>
  <h1>{text.errors.title}</h1>
  <p>{text.errors.description}</p>
  <a class="button" href={localizedPath("/", locale)}>{text.errors.home}</a>
</section>

<style>
  .error-page {
    display: grid;
    min-height: calc(100vh - 4.4rem);
    padding: 2rem;
    place-content: center;
    justify-items: center;
    text-align: center;
  }

  .status {
    margin: 0;
    color: var(--primary);
    font-size: 0.9rem;
    font-weight: 800;
    letter-spacing: 0.14em;
  }

  h1 {
    margin: 0.5rem 0;
    font-family: var(--font-display);
    font-size: clamp(2.4rem, 7vw, 5rem);
    font-weight: 500;
  }

  .error-page > p:not(.status) {
    margin: 0 0 2rem;
    color: var(--text-muted);
  }
</style>
