<script lang="ts" context="module">
  export function load({ error, status }) {
    return {
      props: {
        error,
        status
      }
    };
  }
</script>

<script lang="ts">
  export let error: Error, status: number;

  console.log(error);
  console.log(status);
</script>

<div class="container">
  <section class="section">
    <img src="https://http.cat/{status}" alt="Imagem de gato representando erro {status}" />
  </section>
</div>

<style lang="sass">
  .container
    display: flex
    justify-self: center
    align-items: center
    flex-grow: 1

  img
    width: 100%
    max-width: 24rem
    border-radius: .75rem
    pointer-events: none
</style>