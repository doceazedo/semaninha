<script lang="ts">
  import { Select } from '$lib/components/form';
  import { fields } from '../../../../stores';
  import type { Color, ColorOption } from '../../../../interfaces';

  export let colors: Color[];
  let options: ColorOption[] = [];

  colors.forEach((color, i) => {
    options.push({
      value: String(i),
      label: color.name,
      color: color.color[0]
    });
  });
  options = options;

  $fields = { ...$fields, color: String(0) };
</script>

<div>
  <Select label="Paleta de cores:" {options} bind:selected={$fields.color} hasIconLeft={true} />
  <span class="color" style="background:{options.find(x => x.value == $fields.color)?.color}"></span>
</div>

<style lang="sass">
  div
    position: relative

    span
      position: absolute
      content: ''
      display: block
      height: 1.5rem
      width: 1.5rem
      border-radius: .5rem
      bottom: .8rem
      left: 1rem
      background-color: red
</style>