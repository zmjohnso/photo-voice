<script lang="ts">
  import "../app.css";
  import Header from "$lib/components/Header.svelte";

  let { data, children } = $props();
</script>

<svelte:head>
  <title>PhotoVoice Japan</title>
  <meta
    name="description"
    content="PhotoVoice Japan shares photographs and first-person voices from communities across Japan."
  />
</svelte:head>

<Header locale={data.locale} />
<main>{@render children()}</main>
