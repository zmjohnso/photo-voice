<script lang="ts">
  import AdvancedSearch from "$lib/components/search/AdvancedSearch.svelte";
  import SimpleSearch from "$lib/components/search/SimpleSearch.svelte";
  import { copyFor } from "$lib/i18n";

  let { data } = $props();
  let activeTab = $state<"simple" | "advanced">("simple");
  const text = $derived(copyFor(data.locale).search);
</script>

<svelte:head>
  <title>{text.submit} | PhotoVoice Japan</title>
</svelte:head>

<section class="page-shell search-page">
  <div class="tabs" role="tablist" aria-label="Search mode">
    <button
      type="button"
      role="tab"
      aria-selected={activeTab === "simple"}
      class:active={activeTab === "simple"}
      onclick={() => (activeTab = "simple")}
    >
      {text.simple}
    </button>
    <button
      type="button"
      role="tab"
      aria-selected={activeTab === "advanced"}
      class:active={activeTab === "advanced"}
      onclick={() => (activeTab = "advanced")}
    >
      {text.advanced}
    </button>
  </div>

  <div class="search-panel">
    {#if activeTab === "simple"}
      <SimpleSearch options={data.options} locale={data.locale} />
    {:else}
      <AdvancedSearch options={data.options} locale={data.locale} />
    {/if}
  </div>
</section>

<style>
  .search-page {
    width: min(100% - 2rem, 88rem);
  }

  .tabs {
    display: flex;
    width: min(100%, 26rem);
    margin-inline: auto;
    padding: 0.3rem;
    background: var(--surface-muted);
    border-radius: 999px;
  }

  .tabs button {
    flex: 1;
    padding: 0.7rem 1rem;
    color: var(--text-muted);
    font-weight: 700;
    background: transparent;
    border: 0;
    border-radius: 999px;
    cursor: pointer;
  }

  .tabs button.active {
    color: var(--text);
    background: var(--surface);
    box-shadow: var(--shadow-sm);
  }

  .search-panel {
    margin-top: clamp(2rem, 5vw, 4rem);
  }
</style>
