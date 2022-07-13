<script lang="ts" context="module">
  export const prerender = true;
</script>

<script lang="ts">
  import { themes } from '$lib/themes';
  import type { ThemeProps } from '$lib/types';
  
  export let data: ThemeProps;
</script>

<svelte:component this={themes[data.theme]} props={data} />

<style lang="sass">
  :global(html, body)
    width: 100%
    height: 100%
    overflow: hidden
</style>