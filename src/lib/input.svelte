<script lang="ts">
  import { scale } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { validUsername } from '../stores';

  export let label: string, value: string, placeholder: string, lastfm: boolean;
  let avatar: string;
  let delay: any;

  const handleKeyUp = () => {
    if (!lastfm) return;
    if (!value.trim().length) return $validUsername = false;

    clearTimeout(delay);
    delay = setTimeout(fetchUser, 500);
  }

  const fetchUser = async () => {
    const user = await(await fetch(`/api/user/${value}`)).json();
    $validUsername = user.isValid;
    if (user.isValid) avatar = user.avatar;
  }

  const loadAvatar = event => {
    event.target.classList.add('loaded');
  }
</script>

<div>
  <label for="">{label}</label>
  <input type="text" bind:value {placeholder} on:keyup={handleKeyUp}>

  {#if lastfm && $validUsername}
    <img on:load={loadAvatar} out:scale={{duration: 200, start: .75, easing: quintOut}} src={avatar} alt="Avatar de {value}">
  {/if}
</div>

<style lang="sass">
  @import '../vars'

  div
    position: relative
    display: flex
    flex-direction: column

    label
      margin-bottom: 0.5rem
      font-size: 1.25rem

    input
      padding: 1rem
      font-size: 1rem
      border-radius: 0.5rem
      background-color: $darker
      border: none
      outline: none
      transition: all .2s ease

      &:focus
        box-shadow: 0 0 0 2px $primary

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

  @media screen and (max-width: 768px)
    div label
      font-size: 1rem
</style>