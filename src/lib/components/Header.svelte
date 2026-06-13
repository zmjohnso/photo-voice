<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { onMount } from "svelte";
  import type { Locale } from "$lib/domain/content";
  import { copyFor, localeFromLanguage } from "$lib/i18n";
  import { localizedPath } from "$lib/navigation";
  import Icon from "./Icon.svelte";

  let { locale }: { locale: Locale } = $props();
  let menuOpen = $state(false);
  let languageOpen = $state(false);
  let theme = $state<"light" | "dark">("light");
  let languageMenuRoot = $state<HTMLDivElement>();
  const text = $derived(copyFor(locale));

  const navItems = $derived([
    { label: text.nav.home, path: "/" },
    { label: text.nav.search, path: "/search" },
    { label: text.nav.about, path: "/about" },
    { label: text.nav.contact, path: "/contact" },
  ]);

  const applyTheme = (nextTheme: "light" | "dark") => {
    theme = nextTheme;
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("photo-voice-theme", nextTheme);
  };

  const toggleTheme = () => {
    applyTheme(theme === "light" ? "dark" : "light");
  };

  const toggleMenu = () => {
    menuOpen = !menuOpen;
    if (menuOpen) languageOpen = false;
  };

  const toggleLanguage = () => {
    languageOpen = !languageOpen;
    if (languageOpen) menuOpen = false;
  };

  const handleOutsidePointerDown = (event: PointerEvent) => {
    if (
      languageOpen &&
      languageMenuRoot &&
      event.target instanceof Node &&
      !languageMenuRoot.contains(event.target)
    ) {
      languageOpen = false;
    }
  };

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      languageOpen = false;
      menuOpen = false;
    }
  };

  const switchLanguage = async (nextLocale: Locale) => {
    languageOpen = false;
    document.cookie = `photo_voice_locale=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
    await goto(
      localizedPath(`${page.url.pathname}${page.url.search}`, nextLocale),
      {
        invalidateAll: true,
      },
    );
  };

  onMount(() => {
    const storedTheme = localStorage.getItem("photo-voice-theme");
    applyTheme(
      storedTheme === "light" || storedTheme === "dark"
        ? storedTheme
        : matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light",
    );

    if (!page.url.searchParams.has("lang")) {
      const browserLocale = localeFromLanguage(navigator.language);
      if (browserLocale !== locale) {
        void switchLanguage(browserLocale);
      }
    }
  });
</script>

<svelte:window
  onpointerdown={handleOutsidePointerDown}
  onkeydown={handleKeydown}
/>

<header class="site-header">
  <div class="site-header__inner">
    <button
      class="icon-button menu-button"
      type="button"
      aria-label={text.controls.menu}
      aria-expanded={menuOpen}
      onclick={toggleMenu}
    >
      <Icon name={menuOpen ? "close" : "menu"} />
    </button>

    <a class="brand" href={localizedPath("/", locale)}>
      <img src="/icon-192.png" alt="" width="38" height="38" />
      <span>PhotoVoice Japan</span>
    </a>

    <nav class:open={menuOpen} aria-label="Primary navigation">
      {#each navItems as item}
        <a
          href={localizedPath(item.path, locale)}
          class:active={page.url.pathname === item.path}
          onclick={() => (menuOpen = false)}
        >
          {item.label}
        </a>
      {/each}
    </nav>

    <div class="site-header__actions">
      <a
        class="icon-button"
        href="https://github.com/zmjohnso/photo-voice"
        target="_blank"
        rel="noreferrer"
        aria-label={text.controls.github}
      >
        <Icon name="github" />
      </a>

      <div class="menu-wrap" bind:this={languageMenuRoot}>
        <button
          class="icon-button"
          type="button"
          aria-label={text.controls.language}
          aria-expanded={languageOpen}
          onclick={toggleLanguage}
        >
          <Icon name="language" />
        </button>
        {#if languageOpen}
          <div class="language-menu">
            <button type="button" onclick={() => switchLanguage("en-US")}>
              English
            </button>
            <button type="button" onclick={() => switchLanguage("ja")}>
              日本語
            </button>
          </div>
        {/if}
      </div>

      <button
        class="icon-button"
        type="button"
        aria-label={text.controls.theme}
        onclick={toggleTheme}
      >
        <Icon name={theme === "light" ? "moon" : "sun"} />
      </button>
    </div>
  </div>
</header>

<style>
  .site-header {
    position: sticky;
    z-index: 50;
    top: 0;
    color: #f8faf7;
    background: color-mix(in srgb, var(--header) 94%, transparent);
    border-bottom: 1px solid rgb(255 255 255 / 0.12);
    backdrop-filter: blur(14px);
  }

  .site-header__inner {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
    align-items: center;
    width: min(100% - 2rem, 90rem);
    min-height: 4.4rem;
    margin-inline: auto;
    gap: 1rem;
  }

  .brand {
    display: inline-flex;
    align-items: center;
    width: max-content;
    color: inherit;
    font-family: var(--font-display);
    font-size: 1.08rem;
    font-weight: 700;
    text-decoration: none;
    letter-spacing: 0.01em;
    gap: 0.65rem;
    justify-self: start;
  }

  .brand img {
    border-radius: 50%;
  }

  nav {
    display: flex;
    justify-content: center;
    gap: clamp(1.5rem, 4vw, 4.5rem);
  }

  nav a {
    position: relative;
    padding: 1.55rem 0 1.4rem;
    color: rgb(255 255 255 / 0.76);
    font-size: 0.9rem;
    font-weight: 650;
    text-decoration: none;
  }

  nav a::after {
    position: absolute;
    right: 0;
    bottom: 0.9rem;
    left: 0;
    height: 2px;
    content: "";
    background: var(--accent-light);
    transform: scaleX(0);
    transition: transform 160ms ease;
  }

  nav a:hover,
  nav a.active {
    color: #fff;
  }

  nav a.active::after {
    transform: scaleX(1);
  }

  .site-header__actions {
    display: flex;
    align-items: center;
    gap: 0.15rem;
    justify-self: end;
  }

  .icon-button {
    display: inline-grid;
    width: 2.65rem;
    height: 2.65rem;
    padding: 0;
    place-items: center;
    color: inherit;
    background: transparent;
    border: 0;
    border-radius: 50%;
    cursor: pointer;
    text-decoration: none;
  }

  .icon-button:hover {
    background: rgb(255 255 255 / 0.1);
  }

  .menu-button {
    display: none;
  }

  .menu-wrap {
    position: relative;
  }

  .language-menu {
    position: absolute;
    top: calc(100% + 0.65rem);
    right: 0;
    min-width: 9rem;
    padding: 0.45rem;
    color: var(--text);
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-md);
  }

  .language-menu button {
    width: 100%;
    padding: 0.7rem 0.8rem;
    color: inherit;
    text-align: left;
    background: transparent;
    border: 0;
    border-radius: 0.4rem;
    cursor: pointer;
  }

  .language-menu button:hover {
    background: var(--surface-muted);
  }

  @media (max-width: 52rem) {
    .site-header__inner {
      grid-template-columns: auto 1fr;
    }

    .menu-button {
      display: inline-grid;
    }

    .brand {
      display: none;
    }

    .site-header__actions {
      grid-column: 2;
    }

    nav {
      position: absolute;
      top: 100%;
      right: 0;
      left: 0;
      display: none;
      flex-direction: column;
      padding: 0.75rem 1rem 1rem;
      background: var(--header);
      gap: 0;
    }

    nav.open {
      display: flex;
    }

    nav a {
      padding: 0.9rem 1rem;
      border-radius: 0.5rem;
    }

    nav a::after {
      display: none;
    }

    nav a.active {
      background: rgb(255 255 255 / 0.1);
    }
  }

  @media (max-width: 25rem) {
    .site-header__inner {
      width: min(100% - 0.75rem, 90rem);
      gap: 0;
    }

    .site-header__actions .icon-button {
      width: 2.35rem;
    }

    .site-header__actions a:first-child {
      display: none;
    }
  }
</style>
