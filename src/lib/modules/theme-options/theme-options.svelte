<script lang="ts">
  import { slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { themes, theme } from '../../../stores';
  import { Bool, Color, Select, TopX } from './fields';
  import type { Theme } from '../../../interfaces';

  const findTheme = () => $themes?.find(x => x.slug == $theme);
  let themeDetails: Theme = null;
  $: $theme, themeDetails = findTheme();
</script>

<ul class="fields">
  {#if themeDetails?.fields}
    {#each themeDetails.fields as field}
      <li transition:slide={{duration: 200, easing: quintOut }}>
        {#if field.id == 'bool'}
          <Bool label={field.label} />
        {:else if field.id == 'color'}
          <Color colors={field.colors} />
        {:else if field.id == 'select'}
          <Select label={field.label} values={field.values} />
        {:else if field.id == 'topx'}
          <TopX />
        {/if}
      </li>
    {/each}
  {/if}
</ul>

<style lang="sass">
  .fields li:not(:last-child)
    margin-bottom: 1.5rem
</style>