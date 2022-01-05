<script lang="ts">
  import { Header, Footer } from '$lib/components/parts';
  import { FormStep, LoadingStep, ResultStep } from '$lib/modules/steps';
  import { step } from '../stores';
</script>

<Header />

{#if $step == 'form'}
  <FormStep />
{:else if $step == 'loading'}
  <LoadingStep />
{:else if $step == 'result'}
  <ResultStep />
{/if}

<Footer />