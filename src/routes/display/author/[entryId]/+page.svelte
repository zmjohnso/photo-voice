<script lang="ts">
  import VoiceCard from "$lib/components/VoiceCard.svelte";
  import { copyFor } from "$lib/i18n";

  let { data } = $props();
  const text = $derived(copyFor(data.locale));
</script>

<svelte:head>
  <title>Voices | PhotoVoice Japan</title>
</svelte:head>

<section class="page-shell">
  {#if data.voices.length}
    <div class="grid">
      {#each data.voices as entry (entry.id)}
        <VoiceCard {entry} locale={data.locale} />
      {/each}
    </div>
  {:else}
    <p class="empty">{text.search.noResults}</p>
  {/if}
</section>

<style>
  .page-shell {
    width: min(100% - 2rem, 92rem);
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 17rem), 1fr));
    gap: clamp(1rem, 2.5vw, 2rem);
  }

  .empty {
    color: var(--text-muted);
    text-align: center;
  }
</style>
