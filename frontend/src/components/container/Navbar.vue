<template>
  <div id="navbar" class="headerNavbar">
    <b-navbar class="headerNavbarInner" type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-item to="/">Home</b-nav-item>
        <b-nav-item text="About">About</b-nav-item>
        <b-nav-item-dropdown class="header-dropdown" text="Category">
          <b-dropdown-item href="#">Phone</b-dropdown-item>
          <b-dropdown-item href="#">Tablet</b-dropdown-item>
          <b-dropdown-item href="#">Laptop</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
      <b-navbar-nav class="headerLinks">
        <b-nav-item class="navbarItem_cart navIem-right" to="/cart" text="Card">Cart
          <b-icon icon="basket"></b-icon>
          <span v-if="itemsInCart>0"> ({{ itemsInCart }})</span>
        </b-nav-item>
        <b-nav-item class="navbarItem_login navIem-right" v-if="!isLoggedIn" to="/login" text="LogIn">Log in
          <b-icon icon="person-circle"></b-icon>
        </b-nav-item>
        <b-nav-item class="navbarItem_login" text="user name">
          <div v-if="isLoggedIn" class="navbarItem_usersName">{{ userName }}</div>
        </b-nav-item>
        <b-nav-item class="navbarItem_logout navIem-right"  v-if="isLoggedIn" to="/" @click="logoutUser" text="Log out">Logout
          <b-iconstack>
            <b-icon stacked icon="person-circle"></b-icon>
            <b-icon stacked icon="slash-circle"></b-icon>
          </b-iconstack>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import {scrollNavbar} from "@/helper/scrollNavbar";
import {mapActions, mapGetters,} from "vuex";

export default {
    name: "Navbar",
    data() {
        return {
          name: ''
        }
    },
    methods: {
      ...mapActions(['logout', 'showUserCart']),
      logoutUser() {
        this.logout()
      },
    },
    mounted() {
      scrollNavbar()
    },
    computed: {
      ...mapGetters(['isLoggedIn', 'cartProducts', 'getNumberOfProducts', 'getUserName']),
        itemsInCart(){
        return this.cartProducts.length;
      },
      isLoggedIn() {
        return this.$store.getters.isLoggedIn;
      },
      userName() {
        return  this.$store.getters.getUserName;
      }
    },
    watch: {
      itemsLength: function () {
        this.itemsInCart = this.cartProducts.length
      },
      deep: true,
    }
}
</script>

<style lang="less">
.headerNavbar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 3 !important;

  .bg-dark {
    background-color: unset !important;

    .navbar-nav {

      .dropdown-menu {
        background: unset;
        border: none;
      }

      a, a.nav-link {
        text-shadow: 1px 1px 2px #000;
        font-size: 24px;
        color: white;
        background-color: unset;

        &:hover {
          color: #dea718;
          text-shadow: unset;
        }
      }
    }

    .headerLinks {
      position: absolute;
      right: 3%;
    }
  }
}
</style>
