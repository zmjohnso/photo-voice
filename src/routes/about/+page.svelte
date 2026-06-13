<script lang="ts">
  import Markdown from "$lib/components/Markdown.svelte";

  let { data } = $props();
</script>

<svelte:head>
  <title>About | PhotoVoice Japan</title>
</svelte:head>

<article class="page-shell about">
  <div class="about__image surface">
    {#if data.aboutPage.picture.url}
      <img
        src={data.aboutPage.picture.url}
        alt={data.aboutPage.picture.description || "PhotoVoice Japan"}
        width={data.aboutPage.picture.width}
        height={data.aboutPage.picture.height}
      />
    {/if}
  </div>
  <div class="about__copy">
    <Markdown content={data.aboutPage.description} />
  </div>
</article>

<style>
  .about {
    display: grid;
    grid-template-columns: minmax(18rem, 0.8fr) minmax(20rem, 1.2fr);
    align-items: start;
    gap: clamp(2rem, 6vw, 6rem);
  }

  .about__image {
    position: sticky;
    top: 6.4rem;
    padding: 0.75rem;
    overflow: hidden;
  }

  img {
    width: 100%;
    height: auto;
    border-radius: calc(var(--radius-lg) - 0.35rem);
  }

  .about__copy {
    font-size: 1.04rem;
  }

  @media (max-width: 48rem) {
    .about {
      grid-template-columns: 1fr;
    }

    .about__image {
      position: static;
      width: min(100%, 30rem);
      margin-inline: auto;
    }
  }
</style>
