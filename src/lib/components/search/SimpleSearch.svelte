<script lang="ts">
  import type { Locale, SearchOptions } from "$lib/domain/content";
  import { copyFor } from "$lib/i18n";

  let {
    options,
    locale,
  }: {
    options: SearchOptions;
    locale: Locale;
  } = $props();

  const text = $derived(copyFor(locale).search);
  const currentMonth = new Date().toISOString().slice(0, 7);
</script>

<form class="simple-search" action="/display" method="get">
  {#if locale === "ja"}
    <input type="hidden" name="lang" value="ja" />
  {/if}

  <label class="field">
    <span>{text.location}</span>
    <input name="location" list="simple-location-options" autocomplete="off" />
  </label>
  <datalist id="simple-location-options">
    {#each options.photoLocations as location}
      <option value={location}></option>
    {/each}
  </datalist>

  <div class="date-range">
    <label class="field">
      <span>{text.startDate}</span>
      <input type="month" name="start" max={currentMonth} />
    </label>
    <label class="field">
      <span>{text.endDate}</span>
      <input type="month" name="end" max={currentMonth} />
    </label>
  </div>

  <label class="field">
    <span>{text.author}</span>
    <input name="author" list="simple-author-options" autocomplete="off" />
  </label>
  <datalist id="simple-author-options">
    {#each options.authorNames as author}
      <option value={author}></option>
    {/each}
  </datalist>

  <button class="button" type="submit">{text.submit}</button>
</form>

<style>
  .simple-search {
    display: grid;
    max-width: 36rem;
    margin-inline: auto;
    gap: 1.2rem;
  }

  .date-range {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }

  .button {
    width: max-content;
    min-width: 8rem;
    margin: 0.5rem auto 0;
  }

  @media (max-width: 32rem) {
    .date-range {
      grid-template-columns: 1fr;
    }
  }
</style>
