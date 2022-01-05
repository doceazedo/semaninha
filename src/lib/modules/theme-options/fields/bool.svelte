<script lang="ts">
  import { Select } from '$lib/components/form';
  import { fields } from '../../../../stores';
  import type { Option } from '../../../../interfaces';

  export let label = '';

  let options: Option[] = [
    { label: 'Sim', value: '1' },
    { label: 'Não', value: '0' },
  ];

  $fields = { ...$fields, bool: '1' };
</script>

<Select label={label} {options} bind:selected={$fields.bool} />