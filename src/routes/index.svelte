<script lang="ts">
  import { Header, Footer } from '$lib';
  import { FormStep, LoadingStep, ResultStep } from '$lib/steps';
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