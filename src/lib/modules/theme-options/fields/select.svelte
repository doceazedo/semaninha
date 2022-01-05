<script lang="ts">
  import { Select } from '$lib/components/form';
  import { fields } from '../../../../stores';
  import type { Option } from '../../../../interfaces';

  export let label = '', values = [];

  let options: Option[] = [];

  values.forEach(value => {
    options.push({
      value,
      label: value,
    });
  });
  options = options;

  $fields = { ...$fields, select: values[0] };
</script>

<Select label={label} {options} bind:selected={$fields.select} />