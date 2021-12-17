<script lang="ts">
  import { onMount } from 'svelte';
  import type { Theme } from '../interfaces';
  import { theme as selected, ratio } from '../stores';

  let themes: Theme[] = [];
  onMount(async () => {
    themes = await(await fetch('/api/themes')).json();
  });

  const updateTheme = () => {
    if (!$selected) return;

    const theme = themes.find(x => x.slug == $selected);
    if (!theme) return;

    if (!theme?.ratios.includes($ratio)) $selected = ''; // FIXME:
  }

  $: $ratio, updateTheme();
</script>

<div
  class="themes"
  class:square={$ratio == '1by1'}
  class:vertical={$ratio == '9by16'}
  class:horizontal={$ratio == '16by9'}
>
  <label for="">Escolha um tema:</label>
  <div class="slider">
    {#each themes as theme}
      {#if theme.ratios.includes($ratio)}
        <div class="slide">
          <div
            class="theme"
            on:click={() => $selected = theme.slug}
            class:active={$selected == theme.slug}
          >
            <img src="/img/demos/{theme.slug}-{$ratio}.webp" alt="">
            <span>{theme.name}</span>
          </div>
        </div>
      {/if}
    {/each}
  </div>
</div>

<style lang="sass">
  @import '../vars'

  .themes
    display: flex
    flex-direction: column

    label
      margin-bottom: 0.5rem
      font-size: 1.25rem

    .slider
      display: flex
      width: 100%
      overflow-x: auto
      transition: height .2s ease
      padding-bottom: .5rem

      &::-webkit-scrollbar
        height: .25rem

      &::-webkit-scrollbar-track
        background: $darker

      &::-webkit-scrollbar-thumb
        background: $primary

      .slide
        flex-shrink: 0
        width: calc(25% - 1rem)

        &:not(:last-child)
          margin-right: 1rem

    .theme
      position: relative
      display: flex
      flex-direction: column
      align-items: center
      height: 100%
      background-color: $darker
      border-radius: .5rem
      cursor: pointer
      overflow: hidden

      &::before
        position: absolute
        content: ''
        height: 100%
        width: 100%
        border-radius: .5rem
        pointer-events: none
        transition: all .2s ease

      &.active::before
        box-shadow: inset 0 0 0 2px $primary

      span
        display: flex
        align-items: center
        flex-grow: 1

    &.square .slider
      height: 14.5rem

    &.vertical .slider
      height: 23.5rem

    &.horizontal .slider
      height: 9.5rem

  @media screen and (max-width: 768px)
    div
      label
        font-size: 1rem

      .slider .slide
        width: calc(50% - 1rem) !important 

      &.square .slider
        height: 13.5rem !important

      &.vertical .slider
        height: 22rem !important

      &.horizontal .slider
        height: 9rem !important
</style>