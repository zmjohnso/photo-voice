<script lang="ts">
  let { data } = $props();
</script>

<svelte:head>
  <title>PhotoVoice Japan</title>
</svelte:head>

<section class="hero">
  <div class="hero__glow"></div>
  <div class="hero__content">
    <div class="hero__logo-frame">
      <img
        class="hero__logo hero__logo--desktop"
        src={data.homePage.logo.url}
        alt={data.homePage.logo.description || "PhotoVoice Japan"}
        width={data.homePage.logo.width}
        height={data.homePage.logo.height}
      />
      <img
        class="hero__logo hero__logo--mobile"
        src="/icon.svg"
        alt={data.homePage.logo.description || "PhotoVoice Japan"}
        width="400"
        height="400"
      />
    </div>
    <h1>{data.homePage.welcomeText}</h1>
    <p>{data.homePage.supportDescription}</p>
  </div>
</section>

<style>
  .hero {
    position: relative;
    display: grid;
    min-height: calc(100vh - 4.4rem);
    padding: clamp(2rem, 7vw, 6rem) 1rem;
    overflow: hidden;
    place-items: center;
    background:
      radial-gradient(
        circle at 12% 15%,
        color-mix(in srgb, var(--accent) 19%, transparent),
        transparent 32rem
      ),
      linear-gradient(
        155deg,
        var(--background),
        color-mix(in srgb, var(--surface-muted) 65%, var(--background))
      );
  }

  .hero::before,
  .hero::after {
    position: absolute;
    width: min(32rem, 60vw);
    aspect-ratio: 1;
    content: "";
    border: 1px solid color-mix(in srgb, var(--accent) 28%, transparent);
    border-radius: 50%;
  }

  .hero::before {
    top: -18rem;
    right: -9rem;
  }

  .hero::after {
    bottom: -23rem;
    left: -8rem;
  }

  .hero__content {
    position: relative;
    z-index: 1;
    display: grid;
    width: min(100%, 55rem);
    justify-items: center;
    text-align: center;
  }

  .hero__logo {
    width: min(27rem, 78vw);
    height: auto;
    max-height: 35vh;
    object-fit: contain;
    filter: drop-shadow(0 18px 30px rgb(27 46 31 / 0.12));
  }

  .hero__logo--mobile {
    display: none;
  }

  h1 {
    max-width: 52rem;
    margin: clamp(1.5rem, 4vw, 3rem) 0 0;
    font-family: var(--font-display);
    font-size: clamp(2.2rem, 6vw, 5.25rem);
    font-weight: 500;
    line-height: 1.06;
    text-wrap: balance;
  }

  p {
    max-width: 47rem;
    margin: clamp(1.4rem, 3vw, 2.5rem) 0 0;
    color: var(--text-muted);
    font-size: clamp(1rem, 1.8vw, 1.22rem);
    line-height: 1.8;
    text-wrap: pretty;
  }

  @media (max-width: 52rem) {
    .hero {
      display: block;
      min-height: calc(100vh - 4.4rem);
      padding: 1.5rem 0.625rem 2.5rem;
    }

    .hero__content {
      margin-inline: auto;
    }

    .hero__logo-frame {
      position: relative;
      width: min(20rem, 82vw);
      aspect-ratio: 300 / 219;
      overflow: hidden;
    }

    .hero__logo--desktop {
      display: none;
    }

    .hero__logo--mobile {
      position: absolute;
      top: -15%;
      left: 0;
      display: block;
      width: 100%;
      max-height: none;
    }

    h1 {
      margin-top: 1.5rem;
    }

    p {
      margin-top: 1.25rem;
    }
  }
</style>
