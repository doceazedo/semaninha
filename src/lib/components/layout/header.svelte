<header>
  <section class="section">
    <a href="/">
      <img src="img/logo.svg" alt="Logotipo Semaninha">
    </a>
    <h2>Gere colagens das músicas que você mais ouviu no last.fm e compartilhe sua <b>semaninha</b> nas redes sociais.</h2>
  </section>
</header>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 768 74.67">
  <path fill="#252525" d="M0,0V.08S90.14,125,362.57,51.51,768,58.63,768,58.63V0Z" />
</svg>

<style lang="sass">
  @import '../../../vars'

  header
    background-color: $darker
    padding: 3rem 0 1.5rem

    .section
      display: flex
      flex-direction: column
      align-items: center
      text-align: center

    img
      height: 4rem
      margin-bottom: 1.5rem

    h2
      font-size: 1.5rem

  svg
    margin-bottom: 3rem

  @media screen and (max-width: 768px)
    header

      img
        height: 3rem

      h2
        font-size: 1rem
</style>