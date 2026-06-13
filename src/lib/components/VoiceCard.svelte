<script lang="ts">
  import type { Locale, VoiceEntry } from "$lib/domain/content";
  import { localizedPath } from "$lib/navigation";

  let { entry, locale }: { entry: VoiceEntry; locale: Locale } = $props();
  let imageLoaded = $state(false);
  let imageFailed = $state(false);
  const photo = $derived(entry.photos[0]);
</script>

<article class="voice-card">
  <a href={localizedPath(`/display/${entry.id}`, locale)}>
    <div class="voice-card__image">
      {#if photo}
        <div
          class:failed={imageFailed}
          class:hidden={imageLoaded}
          class="voice-card__placeholder"
          aria-hidden="true"
        ></div>
        <img
          class:loaded={imageLoaded}
          src={photo.url}
          alt={photo.description || photo.title}
          width={photo.width}
          height={photo.height}
          loading="lazy"
          onload={() => (imageLoaded = true)}
          onerror={() => (imageFailed = true)}
        />
      {:else}
        <div class="voice-card__placeholder" aria-hidden="true"></div>
      {/if}
    </div>
    <div class="voice-card__content">
      <h2>{entry.title}</h2>
      <p>{entry.photoLocation.prefecture}</p>
    </div>
  </a>
</article>

<style>
  .voice-card {
    overflow: hidden;
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    background: var(--surface);
    box-shadow: var(--shadow-sm);
    transition:
      transform 160ms ease,
      box-shadow 160ms ease;
  }

  .voice-card:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-md);
  }

  a {
    display: block;
    height: 100%;
    color: inherit;
    text-decoration: none;
  }

  .voice-card__image {
    position: relative;
    aspect-ratio: 4 / 3;
    overflow: hidden;
    background: var(--surface-muted);
  }

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition:
      opacity 180ms ease,
      transform 240ms ease;
  }

  img.loaded {
    opacity: 1;
  }

  .voice-card:hover img {
    transform: scale(1.025);
  }

  .voice-card__placeholder {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      110deg,
      var(--surface-muted) 8%,
      var(--border) 18%,
      var(--surface-muted) 33%
    );
    background-size: 200% 100%;
    animation: loading-shimmer 1.4s linear infinite;
    opacity: 1;
    transition: opacity 180ms ease;
  }

  .voice-card__placeholder.hidden {
    opacity: 0;
  }

  .voice-card__placeholder.failed {
    animation: none;
  }

  .voice-card__content {
    padding: 1rem 1.1rem 1.15rem;
  }

  h2 {
    margin: 0;
    font-family: var(--font-display);
    font-size: 1.2rem;
    line-height: 1.3;
  }

  p {
    margin: 0.6rem 0 0;
    color: var(--text-muted);
    font-size: 0.875rem;
  }

  @keyframes loading-shimmer {
    to {
      background-position-x: -200%;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    img,
    .voice-card__placeholder {
      transition: none;
    }

    .voice-card__placeholder {
      animation: none;
    }
  }
</style>
