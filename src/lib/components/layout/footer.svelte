<footer>
  <p class="credits">
    Desenvolvido por <a href="https://last.fm/user/doceazedo911" target="_blank">@doceazedo911</a>
  </p>
  <p class="links">
    <a class="pro" href="/pro">Seja PRO</a>
    <a href="/contato">Contato</a>
    <a href="https://github.com/doceazedo/semaninha/issues" target="_blank">Relatar problema</a>
    <a href="https://github.com/doceazedo/semaninha" target="_blank">Código-fonte</a>
  </p>
</footer>

<style lang="sass">
  @import '../../../vars'

  footer
    margin-top: 3rem
    padding: 3rem 0
    text-align: center
    background-color: $darker

    a
      display: inline-flex
      color: #fff
      text-decoration: none
      transition: all .2s ease

      &:hover
        transform: translateY(-2px)

    .credits
      margin-bottom: .75rem

    .credits a,
    .links .pro
      font-weight: 700

    .links a
      margin: 0 .5rem
      color: rgba(#fff, .5)
      line-height: 1.5

      &.pro
        color: #F9B208

      &:not(.pro):hover
        color: #fff
</style>