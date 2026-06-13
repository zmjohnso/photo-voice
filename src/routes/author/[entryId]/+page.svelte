<script lang="ts">
  import { copyFor } from "$lib/i18n";
  import { localizedPath } from "$lib/navigation";

  let { data } = $props();
  const text = $derived(copyFor(data.locale));
</script>

<svelte:head>
  <title>{data.author.name} | PhotoVoice Japan</title>
</svelte:head>

<section class="page-shell author">
  <article class="surface">
    <p class="eyebrow">{data.author.groupLocation} {text.author.group}</p>
    <h1>{data.author.name}</h1>
    {#if data.author.biography}
      <p class="biography">{data.author.biography}</p>
    {/if}
    <a
      class="button"
      href={localizedPath(`/display/author/${data.author.id}`, data.locale)}
    >
      {text.author.viewVoices}
    </a>
  </article>
</section>

<style>
  .author {
    display: grid;
    min-height: calc(100vh - 4.4rem);
    place-items: center;
  }

  article {
    width: min(100%, 52rem);
    padding: clamp(1.5rem, 5vw, 4rem);
  }

  .eyebrow {
    margin: 0;
    color: var(--primary);
    font-size: 0.82rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.11em;
  }

  h1 {
    margin: 0.6rem 0 1.5rem;
    font-family: var(--font-display);
    font-size: clamp(3rem, 8vw, 6.5rem);
    font-weight: 500;
    line-height: 0.98;
  }

  .biography {
    margin: 0 0 2.5rem;
    font-size: 1.05rem;
    line-height: 1.8;
  }

  @media (max-width: 52rem) {
    .author {
      min-height: auto;
      place-items: start center;
    }

    article {
      padding: 1.5rem;
    }
  }
</style>
