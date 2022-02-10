<script lang="ts">
  export let
    label: string, 
    value: string,
    placeholder: string;
</script>

<div>
  <label for="">{label}</label>
  <input type="text" bind:value {placeholder} on:keyup>
</div>

<style lang="sass">
  @import '../../../vars'

  div
    display: flex
    flex-direction: column

    label
      margin-bottom: 0.5rem
      font-size: 1.25rem

    input
      padding: 1rem
      font-size: 1rem
      border-radius: 0.5rem
      background-color: $darker
      border: none
      outline: none
      transition: all .2s ease

      &:focus
        box-shadow: 0 0 0 2px $primary

  @media screen and (max-width: 768px)
    div label
      font-size: 1rem
</style>