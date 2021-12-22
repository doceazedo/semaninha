<script lang="ts">
  import { Select } from '$lib';
  import { fields } from '../../stores';
  import type { Option } from '../../interfaces';

  const options: Option[] = [
    { label: 'Top músicas', value: 'tracks' },
    { label: 'Top artistas', value: 'artists' },
    { label: 'Top álbuns', value: 'albums' },
  ];

  $fields = { ...$fields, topx: 'tracks' };
</script>

<Select label="Tipo de ranking:" {options} bind:selected={$fields.topx} />