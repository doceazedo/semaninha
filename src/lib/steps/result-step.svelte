<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/env';
  import { slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { blobURL, step, ratio } from '../../stores';

  let instagramUrl = 'instagram://story-camera';

  onMount(() => {
    if (!browser) return;
    // userAgentData is still experimental
    if (navigator?.userAgentData?.mobile === false) instagramUrl = 'https://instagram.com';
  });
</script>

<section
  class="section"
  transition:slide={{duration: 800, easing: quintOut }}
>
  <ul
    class="images"
    class:square={$ratio == '1by1'}
    class:horizontal={$ratio == '16by9'}
  >
    {#each Array(3) as _}
      <li style="background-image:url({$blobURL})"></li>
    {/each}
  </ul>
  <div class="buttons">
    <a href={instagramUrl} target="_blank">Postar nos Stories</a>
    <a href="https://twitter.com/intent/tweet" target="_blank">Postar no Twitter</a>
    <button on:click={() => $step = 'form'}>Voltar ao início</button>
  </div>
</section>

<style lang="sass">
  @import '../../vars'

  .section
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    margin-bottom: 3rem

  .images
    display: flex
    justify-content: center
    margin: 0 auto
    margin-bottom: 4rem
    width: 100%

    li
      flex-shrink: 0
      height: 270px
      width: 150px
      border-radius: 0.5rem
      background-position: center
      background-repeat: no-repeat
      background-size: cover

      &:first-child, &:last-child
        filter: brightness(0.5)
        opacity: 0.75
        z-index: -1

      &:first-child
        transform: rotate(-5deg) translate(50px, 10px) scale(.95)

      &:last-child
        transform: rotate(5deg) translate(-50px, 10px) scale(.95)

    &.square li
      height: 270px
      width: 270px

      &:first-child
        transform: rotate(-5deg) translate(210px, 10px) scale(.85)

      &:last-child
        transform: rotate(5deg) translate(-210px, 10px) scale(.85)

    &.horizontal
      padding: 3rem 0

      li
        height: 200px
        width: 360px

        &:first-child
          transform: translateX(305px) scale(.8)

        &:last-child
          transform: translateX(-305px) scale(.8)

  div
    display: flex
    justify-content: center

    button,
    a
      width: fit-content
      margin: 0
      padding: 0.75rem 1.5rem
      background-color: #eb459e
      border-radius: 0.5rem
      border: none
      text-decoration: none
      color: #fff
      transition: all 0.2s ease
      cursor: pointer
      position: relative
      overflow: hidden

      &:not(:last-child)
        margin-right: 0.5rem

      &:nth-child(1)
        background-image: linear-gradient(45deg, rgba(88, 81, 219, 1) 0%, rgba(225, 48, 108, 1) 50%, rgba(247, 119, 55, 1) 100%)

      &:nth-child(2)
        background-color: #1da1f2

  @media screen and (max-width: 768px)
    .images
      width: 100%
      justify-content: center

      li
        flex-shrink: 0

    .buttons
      flex-direction: column
      align-items: center
      width: 75%

      button,
      a
        width: 100%
        text-align: center

        &:not(:last-child)
          margin-right: 0
          margin-bottom: .75rem
</style>