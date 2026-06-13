<script lang="ts">
  import Icon from "$lib/components/Icon.svelte";
  import { copyFor } from "$lib/i18n";

  let { data } = $props();
  let showEmail = $state(false);
  const emailAddress = "photovoicejapan@gmail.com";
  const text = $derived(copyFor(data.locale).contact);

  const sendMessage = (event: SubmitEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    if (!form.reportValidity()) return;

    const formData = new FormData(form);
    const subject = `PhotoVoice website message from ${formData.get("fullName")}`;
    const body = `${formData.get("message")}\n\nFrom: ${formData.get("fullName")} <${formData.get("email")}>`;
    window.location.href = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
</script>

<svelte:head>
  <title>{text.message} | PhotoVoice Japan</title>
</svelte:head>

<section class="page-shell contact">
  <div class="contact-card surface">
    <div class="contact-details">
      <div>
        <p class="eyebrow">{text.address}</p>
        <address>
          OWL 6th Floor<br />
          2-6-8 Shiba-koen Minato-ku<br />
          Tokyo 105-0011<br />
          Japan
        </address>
        {#if showEmail}
          <a class="email" href={`mailto:${emailAddress}`}>{emailAddress}</a>
        {:else}
          <button
            class="reveal-email"
            type="button"
            onclick={() => (showEmail = true)}
          >
            {text.sendEmail}
          </button>
        {/if}
      </div>

      <div class="japanese-contact">
        <p>NPO法人 フォトボイス・プロジェクト</p>
        <p>
          Email: <a href={`mailto:${emailAddress}`}>{emailAddress}</a><br />
          HP: <a href="http://photovoice.jp">photovoice.jp</a><br />
          FB: PhotoVoiceProjectJapan
        </p>
        <p>〒105-0011 東京都港区芝公園2－6－8 OWL 6階</p>
        <p class="phone">
          <Icon name="phone" size={18} /> 080-4331-4041（代）、080-7951-8280（代）
        </p>
      </div>
    </div>

    <form onsubmit={sendMessage}>
      <p class="eyebrow">{text.message}</p>
      <label class="field">
        <span>{text.fullName}</span>
        <input name="fullName" autocomplete="name" required />
      </label>
      <label class="field">
        <span>{text.email}</span>
        <input name="email" type="email" autocomplete="email" required />
      </label>
      <label class="field">
        <span>{text.yourMessage}</span>
        <textarea name="message" required></textarea>
      </label>
      <button class="button" type="submit">{text.sendMessage}</button>
    </form>
  </div>
</section>

<style>
  .contact-card {
    display: grid;
    grid-template-columns: minmax(17rem, 0.85fr) minmax(20rem, 1.15fr);
    overflow: hidden;
  }

  .contact-details,
  form {
    padding: clamp(1.5rem, 4vw, 3rem);
  }

  .contact-details {
    display: flex;
    flex-direction: column;
    background: color-mix(in srgb, var(--surface-muted) 72%, var(--surface));
    justify-content: space-between;
    gap: 3rem;
  }

  .eyebrow {
    margin: 0 0 1rem;
    color: var(--primary);
    font-size: 0.78rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.12em;
  }

  address {
    margin-bottom: 1.25rem;
    font-family: var(--font-display);
    font-size: clamp(1.3rem, 3vw, 1.8rem);
    font-style: normal;
    line-height: 1.45;
  }

  .email,
  .japanese-contact a {
    color: var(--link);
  }

  .reveal-email {
    padding: 0;
    color: var(--link);
    font-weight: 700;
    background: none;
    border: 0;
    cursor: pointer;
  }

  .japanese-contact {
    color: var(--text-muted);
    font-size: 0.9rem;
  }

  .phone {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  form {
    display: grid;
    align-content: start;
    gap: 1.2rem;
  }

  form .button {
    width: max-content;
    min-width: 9rem;
    margin-top: 0.4rem;
  }

  @media (max-width: 48rem) {
    .contact-card {
      grid-template-columns: 1fr;
    }
  }
</style>
