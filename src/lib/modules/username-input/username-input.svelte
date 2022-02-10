<script lang="ts">
  import { onMount } from 'svelte';
  import { scale } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { browser } from '$app/env';
  import { username, validUsername } from '../../../stores';
  import { Input } from '$lib/components/form';
  import { WarningIcon } from '$lib/components/icons';

  let delay: any;
  let avatar: string;

  const handleKeyUp = () => {
    if (!$username.trim().length) return $validUsername = false;

    clearTimeout(delay);
    delay = setTimeout(fetchUser, 500);
  }

  const fetchUser = async () => {
    const user = await(await fetch(`/api/user/${$username}`)).json();
    $validUsername = user.isValid;
    if (user.isValid) avatar = user.avatar;
  }

  const loadAvatar = event => {
    event.target.classList.add('loaded');
  }

  onMount(() => {
    if (!browser) return;
    $username = localStorage.getItem('username') || '';
    if ($username) fetchUser();
  });
</script>

<div class:invalid={$username.length && $validUsername === false}>
  <Input
    bind:value={$username}
    on:keyup={handleKeyUp}
    label="Seu usuário:"
    placeholder="Digite seu @ do last.fm aqui!" />

  {#if $validUsername}
    <img on:load={loadAvatar} out:scale={{duration: 200, start: .75, easing: quintOut}} src={avatar} alt="Avatar de {$username}">
  {/if}

  <i>
    <WarningIcon />
  </i>
</div>

<style lang="sass">
  @import '../../../vars'

  div
    position: relative

    img
      position: absolute
      bottom: 10px
      right: .75rem
      height: 2rem
      width: 2rem
      border-radius: 50%
      user-select: none
      pointer-events: none
      transition: all .2s ease-out

      &:not(.loaded)
        transform: scale(.75)
        opacity: 0

    i
      display: flex
      justify-content: center
      align-items: center
      position: absolute
      bottom: 10px
      right: .75rem
      height: 2rem
      width: 2rem
      padding-bottom: 3px
      border-radius: 50%
      background-color: $danger
      transition: all .2s ease-out

    &.invalid :global(input)
      box-shadow: 0 0 0 2px $danger

    &:not(.invalid) i
      transform: scale(.75)
      opacity: 0
</style>