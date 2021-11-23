<script lang="ts">
  import { onMount } from 'svelte';
  import { Swiper, SwiperSlide } from 'swiper/svelte';
  import SwiperCore, { Pagination } from 'swiper';
  import 'swiper/css';
  import 'swiper/css/pagination';
  import { browser } from '$app/env';
  import type { Theme } from '../interfaces';
  import { theme as selected, ratio } from '../stores';

  if (browser) {
    SwiperCore.use([ Pagination ]);
  }

  let themes: Theme[] = [];
  let clickable = true;
  let slidesPerView = 4;

  onMount(async () => {
    themes = await(await fetch('/api/themes')).json();
    updateSwiperAndTheme();

    if (browser && screen.width <= 768) slidesPerView = 2;
  });

  const updateSwiper = () => {
    // I can't use swiper.update() for some reason, this makes
    // swiper update itself
    clickable = false;
    setTimeout(() => clickable = true, 1);
  }

  const updateTheme = () => {
    if (!$selected) return;

    const theme = themes.find(x => x.slug == $selected);
    if (!theme) return;

    if (!theme?.ratios.includes($ratio)) $selected = ''; // FIXME:
  }

  const updateSwiperAndTheme = () => {
    updateSwiper();
    updateTheme();
  }

  $: $ratio, updateSwiperAndTheme();
</script>

<div
  class:square={$ratio == '1by1'}
  class:vertical={$ratio == '9by16'}
  class:horizontal={$ratio == '16by9'}
>
  <label for="">Escolha um tema:</label>
  <Swiper
    {slidesPerView}
    spaceBetween={16}
    pagination={{ clickable }}
  >
    {#each themes as theme}
      {#if theme.ratios.includes($ratio)}
        <SwiperSlide>
          <div
            class="theme"
            on:click={() => $selected = theme.slug}
            class:active={$selected == theme.slug}
          >
            <img src="/img/demos/{theme.slug}-{$ratio}.webp" alt="">
            <span>{theme.name}</span>
          </div>
        </SwiperSlide>
      {/if}
    {/each}
  </Swiper>
</div>

<style lang="sass">
  @import '../vars'

  div
    display: flex
    flex-direction: column

    label
      margin-bottom: 0.5rem
      font-size: 1.25rem

    :global(.swiper)
      width: 100%
      padding-bottom: 1.5rem
      transition: height .2s ease

    :global(.swiper-pagination)
      bottom: 0

    :global(.swiper-pagination-bullet-active)
      background-color: $primary

    .theme
      position: relative
      display: flex
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

    &.square :global(.swiper)
      height: 16rem

    &.vertical :global(.swiper)
      height: 25rem

    &.horizontal :global(.swiper)
      height: 10.75rem

  @media screen and (max-width: 768px)
    div
      label
        font-size: 1rem

      &.square :global(.swiper)
        height: 15rem

      &.vertical :global(.swiper)
        height: 23.75rem

      &.horizontal :global(.swiper)
        height: 10.5rem
</style>