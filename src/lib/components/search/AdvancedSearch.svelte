<script lang="ts">
  import { goto } from "$app/navigation";
  import type { Locale, SearchOptions } from "$lib/domain/content";
  import {
    DateLogicalOperator,
    LogicalOperator,
    type DateCriterion,
    type TextCriterion,
  } from "$lib/domain/search";
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

  let location = $state("");
  let locationOperator = $state(LogicalOperator.And);
  let author = $state("");
  let authorOperator = $state(LogicalOperator.And);
  let date = $state("");
  let dateOperator = $state(DateLogicalOperator.Before);
  let locations = $state<TextCriterion[]>([]);
  let authors = $state<TextCriterion[]>([]);
  let dates = $state<DateCriterion[]>([]);

  const operatorLabel = (operator: LogicalOperator | DateLogicalOperator) => {
    const labels = {
      [LogicalOperator.And]: text.and,
      [LogicalOperator.Or]: text.or,
      [LogicalOperator.Not]: text.not,
      [LogicalOperator.None]: "",
      [DateLogicalOperator.Before]: text.before,
      [DateLogicalOperator.After]: text.after,
    };
    return labels[operator];
  };

  const addLocation = () => {
    if (!location) return;
    locations.push({ value: location, operator: locationOperator });
    location = "";
  };

  const addAuthor = () => {
    if (!author) return;
    authors.push({ value: author, operator: authorOperator });
    author = "";
  };

  const addDate = () => {
    if (!date) return;
    dates.push({ value: date, operator: dateOperator });
    date = "";
  };

  const reset = () => {
    locations = [];
    authors = [];
    dates = [];
  };

  const search = async () => {
    const params = new URLSearchParams({ mode: "advanced" });
    if (locale === "ja") params.set("lang", "ja");
    locations.forEach(({ operator, value }) =>
      params.append("location", `${operator}:${value}`),
    );
    authors.forEach(({ operator, value }) =>
      params.append("author", `${operator}:${value}`),
    );
    dates.forEach(({ operator, value }) =>
      params.append("date", `${operator}:${value}`),
    );

    await goto(`/display?${params.toString()}`);
  };
</script>

<div class="advanced-search">
  <div class="criteria-builder">
    <div class="criterion-row">
      <label class="field operator">
        <span>{text.operator}</span>
        <select bind:value={locationOperator}>
          <option value={LogicalOperator.And}>{text.and}</option>
          <option value={LogicalOperator.Or}>{text.or}</option>
          <option value={LogicalOperator.Not}>{text.not}</option>
        </select>
      </label>
      <label class="field value">
        <span>{text.location}</span>
        <input
          bind:value={location}
          list="advanced-location-options"
          autocomplete="off"
        />
      </label>
      <button
        class="button secondary add"
        type="button"
        disabled={!location}
        onclick={addLocation}
      >
        {text.add}
      </button>
      <datalist id="advanced-location-options">
        {#each options.photoLocations as option}
          <option value={option}></option>
        {/each}
      </datalist>
    </div>

    <div class="criterion-row">
      <label class="field operator">
        <span>{text.operator}</span>
        <select bind:value={dateOperator}>
          <option value={DateLogicalOperator.Before}>{text.before}</option>
          <option value={DateLogicalOperator.After}>{text.after}</option>
        </select>
      </label>
      <label class="field value">
        <span>{text.date}</span>
        <input type="month" bind:value={date} max={currentMonth} />
      </label>
      <button
        class="button secondary add"
        type="button"
        disabled={!date}
        onclick={addDate}
      >
        {text.add}
      </button>
    </div>

    <div class="criterion-row">
      <label class="field operator">
        <span>{text.operator}</span>
        <select bind:value={authorOperator}>
          <option value={LogicalOperator.And}>{text.and}</option>
          <option value={LogicalOperator.Or}>{text.or}</option>
          <option value={LogicalOperator.Not}>{text.not}</option>
        </select>
      </label>
      <label class="field value">
        <span>{text.author}</span>
        <input
          bind:value={author}
          list="advanced-author-options"
          autocomplete="off"
        />
      </label>
      <button
        class="button secondary add"
        type="button"
        disabled={!author}
        onclick={addAuthor}
      >
        {text.add}
      </button>
      <datalist id="advanced-author-options">
        {#each options.authorNames as option}
          <option value={option}></option>
        {/each}
      </datalist>
    </div>
  </div>

  <aside class="criteria-summary surface">
    <div class="summary-heading">
      <h2>{text.criteria}</h2>
      <button class="clear" type="button" onclick={reset}
        >{text.removeAll}</button
      >
    </div>

    {#if locations.length || authors.length || dates.length}
      {#if locations.length}
        <section>
          <h3>{text.location}</h3>
          <ul>
            {#each locations as criterion, index}
              <li>
                <span
                  >{operatorLabel(criterion.operator)} {criterion.value}</span
                >
                <button
                  type="button"
                  aria-label={`Remove ${criterion.value}`}
                  onclick={() => locations.splice(index, 1)}
                >
                  &times;
                </button>
              </li>
            {/each}
          </ul>
        </section>
      {/if}
      {#if dates.length}
        <section>
          <h3>{text.date}</h3>
          <ul>
            {#each dates as criterion, index}
              <li>
                <span
                  >{operatorLabel(criterion.operator)} {criterion.value}</span
                >
                <button
                  type="button"
                  aria-label={`Remove ${criterion.value}`}
                  onclick={() => dates.splice(index, 1)}
                >
                  &times;
                </button>
              </li>
            {/each}
          </ul>
        </section>
      {/if}
      {#if authors.length}
        <section>
          <h3>{text.author}</h3>
          <ul>
            {#each authors as criterion, index}
              <li>
                <span
                  >{operatorLabel(criterion.operator)} {criterion.value}</span
                >
                <button
                  type="button"
                  aria-label={`Remove ${criterion.value}`}
                  onclick={() => authors.splice(index, 1)}
                >
                  &times;
                </button>
              </li>
            {/each}
          </ul>
        </section>
      {/if}
    {:else}
      <p class="none">{text.none}</p>
    {/if}

    <button class="button search" type="button" onclick={search}
      >{text.submit}</button
    >
  </aside>
</div>

<style>
  .advanced-search {
    display: grid;
    grid-template-columns: minmax(0, 1.7fr) minmax(18rem, 0.8fr);
    align-items: start;
    gap: clamp(1.5rem, 4vw, 3.5rem);
  }

  .criteria-builder {
    display: grid;
    gap: 1rem;
  }

  .criterion-row {
    display: grid;
    grid-template-columns: 8.5rem minmax(12rem, 1fr) auto;
    align-items: end;
    padding: 1rem;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    gap: 0.75rem;
  }

  .add {
    min-width: 5rem;
  }

  .criteria-summary {
    position: sticky;
    top: 6.4rem;
    padding: 1.25rem;
  }

  .summary-heading {
    display: flex;
    align-items: start;
    justify-content: space-between;
    gap: 1rem;
  }

  h2 {
    margin: 0;
    font-family: var(--font-display);
    font-size: 1.5rem;
  }

  .clear {
    padding: 0;
    color: var(--link);
    font-size: 0.78rem;
    background: none;
    border: 0;
    cursor: pointer;
  }

  section {
    margin-top: 1.25rem;
  }

  h3 {
    margin: 0 0 0.5rem;
    color: var(--text-muted);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  ul {
    display: grid;
    margin: 0;
    padding: 0;
    list-style: none;
    gap: 0.4rem;
  }

  li {
    display: flex;
    align-items: center;
    padding: 0.45rem 0.55rem;
    background: var(--surface-muted);
    border-radius: 0.45rem;
    justify-content: space-between;
    gap: 0.5rem;
  }

  li button {
    padding: 0 0.2rem;
    color: var(--text-muted);
    font-size: 1.2rem;
    line-height: 1;
    background: transparent;
    border: 0;
    cursor: pointer;
  }

  .none {
    color: var(--text-muted);
  }

  .search {
    width: 100%;
    margin-top: 1.4rem;
  }

  @media (max-width: 62rem) {
    .advanced-search {
      grid-template-columns: 1fr;
    }

    .criteria-summary {
      position: static;
    }
  }

  @media (max-width: 42rem) {
    .criterion-row {
      grid-template-columns: 1fr;
    }

    .add {
      width: 100%;
    }
  }
</style>
