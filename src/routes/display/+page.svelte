<script lang="ts">
  import VoiceCard from "$lib/components/VoiceCard.svelte";
  import { copyFor } from "$lib/i18n";

  let { data } = $props();
  const text = $derived(copyFor(data.locale));
</script>

<svelte:head>
  <title>Voices | PhotoVoice Japan</title>
</svelte:head>

<section class="page-shell voices">
  {#if data.voices.length}
    <div class="voices__grid">
      {#each data.voices as entry (entry.id)}
        <VoiceCard {entry} locale={data.locale} />
      {/each}
    </div>
  {:else}
    <div class="empty surface">
      <img src="/icon-192.png" alt="" width="88" height="88" />
      <p>{text.search.noResults}</p>
    </div>
  {/if}
</section>

<style>
  .voices {
    width: min(100% - 2rem, 92rem);
  }

  .voices__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 17rem), 1fr));
    gap: clamp(1rem, 2.5vw, 2rem);
  }

  .empty {
    display: grid;
    max-width: 38rem;
    margin: 4rem auto;
    padding: 2.5rem;
    justify-items: center;
    text-align: center;
    gap: 1rem;
  }

  .empty img {
    border-radius: 50%;
    opacity: 0.7;
  }

  .empty p {
    margin: 0;
    color: var(--text-muted);
  }
</style>
