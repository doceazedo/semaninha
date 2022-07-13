<script lang="ts">
  export let disabled: boolean = false;
</script>

<button on:click {disabled}>
  <slot />
</button>

<style lang="sass">
  @import '../../../sass/vars'

  button
    background: $primary
    padding: 1rem 1.75rem
    font-size: 1rem
    border-radius: 0.5rem
    border: none
    cursor: pointer
    transition: all .2s ease

    &:disabled
      opacity: .5
      cursor: not-allowed
</style>