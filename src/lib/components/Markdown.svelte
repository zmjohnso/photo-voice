<script lang="ts">
  import { micromark } from "micromark";

  let { content }: { content: string } = $props();
  const html = $derived(micromark(content));
</script>

<div class="markdown">{@html html}</div>

<style>
  .markdown :global(:first-child) {
    margin-top: 0;
  }

  .markdown :global(:last-child) {
    margin-bottom: 0;
  }

  .markdown :global(p) {
    line-height: 1.8;
  }

  .markdown :global(a) {
    color: var(--link);
  }

  .markdown :global(img) {
    max-width: 100%;
    height: auto;
  }
</style>
