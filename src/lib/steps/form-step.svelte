<script lang="ts">
  import { slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import {
    Input,
    Select,
    RatioOptions,
    Themes,
    Button
  } from '$lib';
  import { username, period, ratio, theme, validUsername, step, blobURL } from '../../stores';
  import { periods } from '../../helpers';
  import { b64toBlob, download, generate } from '../../utils';

  const send = async () => {
    $step = 'loading';

    const data = {
      username: $username,
      period: $period,
      ratio: $ratio,
    };

    const [ resp, error ] = await generate($theme, data);
    if (error) {
      $step = 'form';
      // TODO: toast com mensagem de erro
      return;
    }

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
    <Input
      bind:value={$username}
      label="Seu usuário:"
      placeholder="Digite seu @ do last.fm aqui!"
      lastfm />
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