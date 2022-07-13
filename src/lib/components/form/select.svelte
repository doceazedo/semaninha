<script lang="ts">
  import type { Option } from '../../../interfaces';

  export let label: string, selected: string, options: Option[], hasIconLeft = false;
</script>

<div>
  <label for="">{label}</label>
  <select
    name=""
    id=""
    bind:value={selected}
    class:has-icon-left={hasIconLeft}
  >
    {#each options as option}
      <option
        value={option.value}
        >
          {option.label}
      </option>
    {/each}
  </select>
  <img src="img/arrow.svg" alt="Seta para baixo">
</div>

<style lang="sass">
  @import '../../../sass/vars'

  div
    position: relative
    display: flex
    flex-direction: column

    &:focus-within img
      opacity: 1
      transform: rotate(180deg)

    label
      margin-bottom: 0.5rem
      font-size: 1.25rem

    select
      padding: 1rem
      font-size: 1rem
      border-radius: 0.5rem
      background-color: $darker
      border: none
      outline: none
      -webkit-appearance: none
      -moz-appearance: none
      transition: all .2s ease

      option
        background-color: $darker
        color: #fff

      &:focus
        box-shadow: 0 0 0 2px $primary

      &.has-icon-left
        padding-left: 3rem

    img
      position: absolute
      bottom: 1.25rem
      right: 1.25rem
      height: 0.5rem
      opacity: .5
      user-select: none
      pointer-events: none
      transition: all .3s ease

  @media screen and (max-width: 768px)
    div label
      font-size: 1rem
</style>