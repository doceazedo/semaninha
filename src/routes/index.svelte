<script lang="ts">
  import '../sass/global.sass';
  import { Header, Footer, RibbonBeta } from '$lib/components/layout';
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
<RibbonBeta />
