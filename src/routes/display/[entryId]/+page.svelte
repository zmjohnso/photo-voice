<script lang="ts">
  import Icon from "$lib/components/Icon.svelte";
  import Markdown from "$lib/components/Markdown.svelte";
  import { localizedPath } from "$lib/navigation";
  import type { Photo } from "$lib/domain/content";

  let { data } = $props();
  let selectedPhoto = $state<Photo | null>(null);
  let photoDialog = $state<HTMLDialogElement>();

  const showPhoto = (photo: Photo) => {
    selectedPhoto = photo;
    photoDialog?.showModal();
  };

  const formattedDate = $derived(
    new Intl.DateTimeFormat(data.locale === "ja" ? "ja-JP" : "en-US", {
      year: "numeric",
      month: "long",
    }).format(new Date(data.voice.photoDate)),
  );
</script>

<svelte:head>
  <title>{data.voice.title} | PhotoVoice Japan</title>
</svelte:head>

<article class="entry page-shell">
  <div
    class:entry__gallery--single={data.voice.photos.length === 1}
    class="entry__gallery"
  >
    {#each data.voice.photos as photo (photo.url)}
      <button type="button" onclick={() => showPhoto(photo)}>
        <img
          src={photo.url}
          alt={photo.description || photo.title}
          width={photo.width}
          height={photo.height}
          loading={data.voice.photos.indexOf(photo) === 0 ? "eager" : "lazy"}
        />
      </button>
    {/each}
  </div>

  <div class="entry__content surface">
    <div>
      <h1>{data.voice.title}</h1>
      {#if data.voice.voice}
        <Markdown content={data.voice.voice} />
      {/if}
    </div>

    <dl>
      <div>
        <dt class="visually-hidden">Author</dt>
        <dd>
          <a
            href={localizedPath(
              `/author/${data.voice.voiceAuthor.id}`,
              data.locale,
            )}
          >
            {data.voice.voiceAuthor.name}
          </a>
        </dd>
      </div>
      <div>
        <dt class="visually-hidden">Location</dt>
        <dd>
          {[
            data.voice.photoLocation.prefecture,
            data.voice.photoLocation.city,
            data.voice.photoLocation.detail,
          ]
            .filter(Boolean)
            .join(", ")}
        </dd>
      </div>
      <div>
        <dt class="visually-hidden">Date</dt>
        <dd>{formattedDate}</dd>
      </div>
    </dl>
  </div>
</article>

<dialog
  bind:this={photoDialog}
  onclick={(event) => event.target === photoDialog && photoDialog?.close()}
>
  <button
    class="dialog-close"
    type="button"
    aria-label="Close"
    onclick={() => photoDialog?.close()}
  >
    <Icon name="close" size={24} />
  </button>
  {#if selectedPhoto}
    <img
      src={selectedPhoto.url}
      alt={selectedPhoto.description || selectedPhoto.title}
      width={selectedPhoto.width}
      height={selectedPhoto.height}
    />
  {/if}
</dialog>

<style>
  .entry {
    display: grid;
    grid-template-columns: minmax(0, 1.2fr) minmax(20rem, 0.8fr);
    width: min(100% - 2rem, 92rem);
    gap: clamp(1rem, 3vw, 2.5rem);
  }

  .entry__gallery {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-content: start;
    gap: 0.75rem;
  }

  .entry__gallery--single {
    grid-template-columns: 1fr;
  }

  .entry__gallery button {
    padding: 0;
    overflow: hidden;
    background: var(--surface-muted);
    border: 0;
    border-radius: var(--radius-lg);
    cursor: zoom-in;
  }

  .entry__gallery img {
    width: 100%;
    height: auto;
    max-height: 70vh;
    object-fit: cover;
  }

  .entry__content {
    position: sticky;
    top: 6.4rem;
    display: flex;
    flex-direction: column;
    max-height: calc(100vh - 8.4rem);
    padding: clamp(1.4rem, 3vw, 2.25rem);
    overflow: auto;
    justify-content: space-between;
    gap: 3rem;
  }

  h1 {
    margin: 0 0 1.5rem;
    font-family: var(--font-display);
    font-size: clamp(2rem, 4vw, 3.35rem);
    font-weight: 500;
    line-height: 1.08;
  }

  dl {
    display: grid;
    margin: 0;
    color: var(--text-muted);
    text-align: right;
    gap: 0.35rem;
  }

  dd {
    margin: 0;
  }

  dd a {
    color: var(--link);
    font-weight: 700;
  }

  dialog {
    width: min(92vw, 80rem);
    max-width: none;
    max-height: 92vh;
    padding: 0;
    overflow: visible;
    background: transparent;
    border: 0;
  }

  dialog::backdrop {
    background: rgb(0 0 0 / 0.84);
    backdrop-filter: blur(6px);
  }

  dialog img {
    width: 100%;
    max-height: 88vh;
    object-fit: contain;
  }

  .dialog-close {
    position: absolute;
    z-index: 2;
    top: -2.6rem;
    right: 0;
    display: grid;
    width: 2.3rem;
    height: 2.3rem;
    padding: 0;
    place-items: center;
    color: #fff;
    background: transparent;
    border: 1px solid rgb(255 255 255 / 0.5);
    border-radius: 50%;
    cursor: pointer;
  }

  @media (max-width: 52rem) {
    .entry {
      grid-template-columns: 1fr;
    }

    .entry__content {
      position: static;
      max-height: none;
      gap: 2rem;
    }
  }

  @media (max-width: 35rem) {
    .entry__gallery {
      grid-template-columns: 1fr;
    }
  }
</style>
