<script lang="ts">
  import { slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
</script>

<section
  class="section"
  transition:slide={{duration: 800, easing: quintOut }}
>
  <svg class="spinner" viewBox="0 0 50 50">
    <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
  </svg>

  <p>Gerando colagem, isso demora alguns segundos...</p>
</section>

<style lang="sass">
  @import '../../../sass/vars'

  .section
    display: flex
    justify-content: center
    align-items: center
    height: 32rem
    margin-bottom: 3rem

  .spinner
    animation: rotate 2s linear infinite
    width: 2rem
    height: 2rem
    margin-right: 1rem

    .path
      stroke: $primary
      stroke-linecap: round
      animation: dash 1.5s ease-in-out infinite

  @keyframes rotate
    100%
      transform: rotate(360deg)

  @keyframes dash
    0%
      stroke-dasharray: 1, 150
      stroke-dashoffset: 0

    50%
      stroke-dasharray: 90, 150
      stroke-dashoffset: -35

    100%
      stroke-dasharray: 90, 150
      stroke-dashoffset: -124

  @media screen and (max-width: 768px)
    .section
      flex-direction: column
      text-align: center

    .spinner
      margin-bottom: 1rem
</style>