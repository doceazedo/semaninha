<script>
  import axios from 'axios';
  import html2canvas from 'html2canvas';
  import md5 from 'md5';

	const btnTexts = {
		'default': 'Baixar imagem',
		'loading': 'Gerando imagem...',
		'downloading': 'O download começará logo...'
	};
	let user, quality, aspectRatio, disabled;
  let btnText = btnTexts.default;
  let html = '';
	let resolutions = [
		{ value: 'hd',     text: 'HD',      '16:9': '1280x720',  '19.5:9': '1560x720'  },
		{ value: 'fullhd', text: 'Full HD', '16:9': '1920x1080', '19.5:9': '2340x1080' }
  ];
  let sizes = {
    'hd': 1,
    'fullhd': 1.5,
    '16:9': '1280px',
    '19.5:9': '1560px'
  };

	function generateImage() {
		user = user || 'pxlucasf';
		disabled = true;
    btnText = btnTexts.loading;
    
    axios.get(`api/generate/${user}`).then(resp => {
      html = resp.data;
      btnText = btnTexts.downloading;

			setTimeout(() => {
				disabled = false;
        btnText = btnTexts.default;

        Caman('#image .blur', function () {
          this.stackBlur(20);
          this.render();
        });
        
        setTimeout(() => {
          html2canvas(document.querySelector('#image')).then(canvas => {
            let a = document.createElement('a');
            a.href = canvas.toDataURL('image/png');
            a.download = md5(user) + '.png';
            a.click();
          });
        }, 500);
			}, 2000);
    });
	}
</script>

<svelte:head>
  <title>musicwrap.xyz » Compartilhe o que você tem ouvido na semana!</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/camanjs/4.0.0/caman.full.min.js"></script>
</svelte:head>

<h1>musicwrap<span>.xyz</span></h1>
<h2>Compartilhe o que você tem ouvido na semana!</h2>
<form on:submit|preventDefault={generateImage}>
	<div class="control">
		<label for="user">Usuário last.fm</label>
		<input type="text" name="user" spellcheck="false" autocomplete="false" placeholder="pxlucasf" bind:value={user}>
	</div>
	<div class="control">
		<label for="quality">Qualidade</label>
		<select name="quality" bind:value={quality}>
			{#each resolutions as resolution}
				<option value={resolution.value}>
					{resolution.text} ({resolution[aspectRatio]})
				</option>
			{/each}
		</select>
	</div>
	<div class="control">
		<label for="aspect_ratio">Proporção</label>
		<select name="aspect_ratio" bind:value={aspectRatio}>
			<option value="16:9">16:9</option>
			<option value="19.5:9">19.5:9</option>
		</select>
	</div>
	<button type="submit" {disabled}><i></i>{btnText}</button>
</form>

<a href="https://github.com/pxlucasf/musicwrap" target="_blank" class="github">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg>
</a>

<div id="screenshot" style="--height:{sizes[aspectRatio]};--width:{sizes[quality]}">
  {@html html}
</div>

<style>
  h1 {
    font-size: 4rem;
    font-weight: 700;
    margin-bottom: .25rem;
  }

  h2 {
		text-align: center;
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  h2,
  span {
    color: rgba(255, 255, 255, .5);
  }

	form {
    display: flex;
    flex-direction: column;
	}

  .control {
    display: flex;
    flex-direction: column;
  }

  .control:not(:last-child) {
    margin-bottom: 1rem;
  }

  label {
    font-size: 1.25rem;
    margin-bottom: .5rem;
  }

	input {
    width: 32rem;
    margin: 0;
    padding: .5rem .75rem;
    font-size: 1rem;
    color: #fff;
    background-color: #2C2F33;
    border: 1px solid #444;
    border-radius: .25rem;
    font-family: 'Sen', sans-serif;
    outline: none;
  }

	select {
    padding: .5rem .75rem;
    font-size: 1rem;
    color: #fff;
    background-color: #2C2F33;
    border: 1px solid #444;
    border-radius: .25rem;
    font-family: 'Sen', sans-serif;
    outline: none;
  }

	button {
		display: flex;
    align-self: flex-end;
    margin-top: 1rem;
    padding: .75rem 1rem;
    font-size: 1rem;
    color: #fff;
    background-color: #7289da;
    border: none;
    border-radius: .25rem;
    font-family: 'Sen', sans-serif;
    outline: none;
    cursor: pointer;
  }

  button:disabled {
    opacity: .5;
    pointer-events: none;
  }

	button:disabled i {
		display: flex;
    height: 1.125rem;
    width: 1.125rem;
    border: 2px solid #fff;
    border-radius: 50%;
    margin-right: .5rem;
    position: relative;
		animation: spin 2s infinite linear; 
	}

	button:disabled i::before {
		content: '';
    position: absolute;
    top: -.25rem;
    left: calc(50% - .15rem);
    height: .5rem;
    width: .25rem;
    background-color: #7289da;
  }

  #screenshot {
    position: absolute;
    bottom: -999999vh;
    left: 0;
  }

  .github {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    color: rgba(255, 255, 255, .5);
    transition: color .2s ease;
  }

  .github:hover {
    color: rgba(255, 255, 255, 1);
  }

  .github svg {
    height: 2rem;
  }

	@keyframes spin {
    from {
			transform:rotate(0deg);
    }
    to {
			transform:rotate(360deg);
    }
	}

	@media screen and (max-width: 768px) {
		h1 {
			font-size: 2.5rem;
		}

		form,
		input {
			width: 100%;
		}

		label,
		input,
		select,
		button {
			font-size: 1rem;
		}
	}
</style>