<script lang="ts">
  import { FormStep, LoadingStep, ResultStep } from '$lib/modules/steps';
  import { step } from '../stores';
</script>

{#if $step == 'form'}
  <FormStep />
{:else if $step == 'loading'}
  <LoadingStep />
{:else if $step == 'result'}
  <ResultStep />
{/if}