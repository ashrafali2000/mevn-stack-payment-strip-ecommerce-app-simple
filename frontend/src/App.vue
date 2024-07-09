<template>
  <div id="app">
    <link rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
          integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
          crossorigin="anonymous">
    <Navbar></Navbar>
    <router-view id="content"></router-view>
    <!--<Footer></Footer>-->
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import axios from "axios";
import Navbar from '@/components/container/Navbar'
//import Footer from './components/container/MainFooter'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: 'App',
  components: {
    Navbar,
   // Footer,
  },
  methods: {
    ...mapActions(['fetchProducts', /*'getUser'*/]),
  },

  created() {
    this.fetchProducts()
   // this.getUser()
  }
}
</script>

<style lang="less">
html, body, kk9,
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
}
</style>
