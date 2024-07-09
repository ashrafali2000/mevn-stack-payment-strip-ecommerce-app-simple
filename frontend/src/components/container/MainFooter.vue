<template>
      <footer class="page-footer font-small cyan">
        <div class="row">
          <div class="col-md-12">
            <div class="flex-center">
              <a class="fb-ic">
                <i class="fab fa-facebook-f fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
              </a>
              <a class="ins-ic">
                <i class="fab fa-instagram fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
              </a>
            </div>
          </div>
          </div>
        <div class="footer-copyright text-center py-3">© 2020 Copyright:
          <a href="https://github.com/estacet">Estacet</a>
        </div>
      </footer>
</template>

<script>
export default {
    name: "MainFooter",
    data() {
        return {}
    },
    methods: {
        
    }
}
</script>
<style lang="less">

  footer {
    width: 100%;
    background: #2c3e50;
    color: white;

    .row {
      margin: 0;

      a {
        color: #fdde08;
      }
    }
  }
</style>
