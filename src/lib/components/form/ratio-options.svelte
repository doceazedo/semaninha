<script lang="ts">
  import { ratio as selected } from '../../../stores';
  import { ratios } from '../../../helpers';
</script>

<div>
  <label for="">Escolha um formato:</label>
  <ul>
    {#each ratios as ratio}
      <li class:active={$selected == ratio.value} on:click={() => $selected = ratio.value}>
        <img src="img/ratio-{ratio.value}.svg" alt="Ícone de proporção {ratio.value.replace('by', ':')}">
        <span>{ratio.label}</span>
      </li>
    {/each}
  </ul>
</div>

<style lang="sass">
  @import '../../../sass/vars'

  div
    position: relative
    display: flex
    flex-direction: column

    label
      margin-bottom: 0.5rem
      font-size: 1.25rem

    ul
      display: flex

      li
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        height: 6rem
        width: 6rem
        background-color: $darker
        border-radius: .5rem
        cursor: pointer
        transition: all .2s ease

        &:not(:last-child)
          margin-right: 1rem

        &.active
          box-shadow: 0 0 0 2px $primary

        img
          height: 2rem
          width: 2rem
          margin-bottom: 1rem
          margin-top: .75rem

        span
          font-size: .8rem

  @media screen and (max-width: 768px)
    div label
      font-size: 1rem
</style>