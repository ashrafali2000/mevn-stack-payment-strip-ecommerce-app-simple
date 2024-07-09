<template>
  <div class="content">
    <div class="row justify-content-md-center" :style="{ backgroundImage: 'url(' + require('@/assets/images/forest1.jpg') + ')' }">
      <form class="form-dark col-sm-8 col-md-6 col-lg-4"  @submit.prevent="loginUser">
        <div class="uck99 flex-container">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" v-model="email" id="email" placeholder="Email">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" v-model="password" id="password" placeholder="Password">
          </div>
          <button class="btn btn-primary" type="submit">Login</button>
          <div class="form-group">
            <p class="form-check-label justify-content-center">Do not have an account? <b-nav-item class="registerBtn" to="/register">Sing up</b-nav-item></p>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'FormsPage',
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    ...mapActions(['login', 'showUserCart']),
    loginUser() {
      let user = {
        email: this.email,
        password: this.password
      };
      this.login(user).then(() => this.$router.push("/")).then(() => {
        this.showUserCart();
      })
    },
  },
}
</script>

<style lang="less">
.content {
  position: absolute;
  width: 100%;
  height: 100%;

  .row {
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    height: 100%;
    background-size: cover;
    background-size: cover;

    .form-dark {
      margin: auto;

      .flex-container {
        position: relative;
        top: 22%;
        display: flex;
        flex-direction: column;

        .form-group {
          margin: 4% 8%;

          .form-check-label {
            color: white;
            text-shadow: 1px 0 3px #000;

            .registerBtn {
              display: inline-block;
              color: #5e72e4;
              font-size: 20px;
              font-weight: bold;
            }
          }
        }

        .btn {
          background-color: #007bff;
          width: 50%;
          margin: 8% auto;
        }
      }
    }
  }
}
</style>