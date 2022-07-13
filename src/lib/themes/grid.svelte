<!--
name: Mosaico
ratios: ["1:1"]
fields: [size, showLabels]
premium: false
-->

<script lang="ts">
  import type { ThemeProps } from '$lib/types';

  export let props: ThemeProps;

  const size = props.fields.size.split('x')[0];
</script>

<ul style="--size:{size}">
  {#each props.ranking as item}
    <li style="background-image:url({item.image})">
      {#if props.fields.showLabels}
        <p>
          {item.artist ? `${item.artist} - ${item.title}` : item.title}
        </p>
      {/if}
    </li>
  {/each}
</ul>

<style lang="sass">
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap')

  ul
    display: grid
    grid-template-columns: repeat(var(--size), 1fr)
    grid-template-rows: repeat(var(--size), 1fr)
    height: 100%

    li
      display: flex
      justify-content: flex-end
      align-items: flex-end
      background-position: center
      background-repeat: no-repeat
      background-size: cover
      padding: .5rem

      p
        font-size: .75rem
        font-family: 'Roboto', sans-serif
        font-weight: bold
        text-align: right
        color: #fff
        text-shadow: 2px 2px 2px #000
</style>
