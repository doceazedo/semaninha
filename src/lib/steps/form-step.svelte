<script lang="ts">
  import { slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { browser } from '$app/env';
  import {
    Fields,
    Select,
    RatioOptions,
    Themes,
    Button
  } from '$lib';
  import { username, period, ratio, theme, validUsername, step, blobURL, fields } from '../../stores';
  import { periods } from '../../helpers';
  import { b64toBlob, download, generate } from '../../utils';
  import { UsernameInput } from '../../modules';

  const send = async () => {
    $step = 'loading';

    const data = {
      username: $username,
      period: $period,
      ratio: $ratio,
      fields: $fields
    };

    const [ resp, error ] = await generate($theme, data);
    if (error) {
      $step = 'form';
      // TODO: toast com mensagem de erro
      return;
    }

    if (browser) localStorage.setItem('username', $username);

    const imageBuffer = await resp.arrayBuffer();
    const contentType = resp.headers.get('content-type').toLowerCase();
    const format = contentType.split('/')[1];

    const image = btoa(new Uint8Array(imageBuffer).reduce((data, byte) => data + String.fromCharCode(byte), ''));
    const base64 = `data:${contentType};base64,${image}`;
    const blob = b64toBlob(image, contentType);
    $blobURL = URL.createObjectURL(blob);

    download(base64, `semaninha-${$username}-${new Date().getTime()}.${format}`);

    $step = 'result';
  }
</script>

<div transition:slide={{duration: 800, easing: quintOut }}>
  <section class="section">
    <UsernameInput />
  </section>
  
  <section class="section">
    <Select
      label="Período:"
      options={periods}
      bind:selected={$period} />
  </section>
  
  <section class="section">
    <RatioOptions />
  </section>
  
  <section class="section">
    <Themes />
  </section>
  
  <section class="section">
    <Fields />
  </section>
  
  <section class="section send">
    <Button
      on:click={send}
      disabled={!$validUsername || !$theme}
    >
      Gerar colagem!
    </Button>
  </section>
</div>

<style lang="sass">
  .section:not(:last-child)
    margin-bottom: 1.5rem

  .send
    display: flex
    justify-content: flex-end
</style>