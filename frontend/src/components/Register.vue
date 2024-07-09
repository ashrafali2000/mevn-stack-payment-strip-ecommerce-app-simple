<template>
  <div class="content">
    <div class="row justify-content-md-center" :style="{ backgroundImage: 'url(' + require('@/assets/images/forest1.jpg') + ')' }">
      <form class="form-dark col-sm-8 col-md-6 col-lg-4"  @submit.prevent="registerUser">
        <div class="uck99 flex-container">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="name" class="form-control" v-model="name" id="name" placeholder="Name">
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" v-model="email" id="email" placeholder="Email">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" v-model="password" id="password" placeholder="Password">
          </div>
          <div class="form-group">
            <label for="password_confirmation">Password confirmation</label>
            <input type="password" class="form-control" v-model="password_confirmation" id="password_confirmation" placeholder="Repeat password">
          </div>
          <div class="form-group">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="invalidCheck2" required>
              <label class="form-check-label" for="invalidCheck2">
                Agree to terms and conditions
              </label>
            </div>
          </div>
          <button class="btn btn-primary" type="submit">Submit form</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: "Register",
    data() {
        return {
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
        }
    },
    methods: {
      ...mapActions(['register']),
      registerUser() {
        if (this.password !== this.password_confirmation) {
          alert("Password and password confirmation do not match")
        } else {
          let user = {
            name: this.name,
            email: this.email,
            password: this.password,
          };
          this.register(user).then(() => this.$router.push("/"));
        }
      }
    }
}
</script>
<style lang="less">
</style>