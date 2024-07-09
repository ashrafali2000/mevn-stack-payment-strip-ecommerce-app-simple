<template>
    <div>
        <div class="content">
          <h2 class="alert">Checkout form</h2>
          <div class="row">
            <div class="col-md-8">
              <div class="card">
                <form class="card-body">
                  <div class="md-form">
                    <label for="firstName" class="">Name</label>
                    <input type="text" id="firstName" v-model="name" class="form-control">
                  </div>
                  <div class="md-form">
                    <label for="email" class="">Email</label>
                   <input type="text" id="email" class="form-control" v-model="email" placeholder="youremail@example.com">
                  </div>
                  <div class="md-form">
                    <label for="phoneNumber" class="">Phone number</label>
                   <input type="text" id="phoneNumber" class="form-control bfh-phone" v-model="phoneNumber" value="+38 ">
                  </div>
                  <div class="md-form">
                    <label for="address" class="">Address</label>
                    <input type="text" id="address" class="form-control" v-model="street" placeholder="Street and app number">
                  </div>
                  <div class="row">
                    <div class="col-lg-4 col-md-12">
                      <label for="country">Country</label>
                      <select class="custom-select d-block w-100" id="country" v-model="country" required>
                        <option>Ukraine</option>
                      </select>
                      <div class="invalid-feedback">
                        Please select a valid country.
                      </div>
                    </div>
                    <div class="col-lg-4 col-md-6">
                      <label for="state">City</label>
                      <select class="custom-select d-block w-100" id="state" v-model="city" required>
                        <option>Kyiv</option>
                      </select>
                      <div class="invalid-feedback">
                        Please provide a valid state.
                      </div>
                    </div>
                    <div class="col-lg-4 col-md-6">
                      <label for="zip">Zip</label>
                      <input type="text" class="form-control" id="zip" v-model="zipCode" required>
                      <div class="invalid-feedback">
                        Zip code required.
                      </div>
                    </div>
                  </div>
                  <hr>
                  <hr>
                  <button class="btn btn-primary btn-lg btn-block" type="submit" @click="createOrder">Continue to checkout</button>
                </form>
              </div>
            </div>
            <div class="col-md-4">
              <h4 class="d-flex justify-content-between align-items-center">
                <span class="text-white">Your cart</span>
                <span class="badge badge-secondary badge-pill">{{itemsInCart}}</span>
              </h4>
              <ul class="list-group z-depth-1">
                <li class="list-group-item d-flex justify-content-between lh-condensed" v-for="(product) in cartProducts"
                    :key="product.id">
                  <div>
                    <h6 class="">Product name</h6>
                    <small class="text-muted">{{product.name}}</small>
                  </div>
                  <span class="text-muted">${{product.price}}</span>
                </li>
              <div class="list-group-item d-flex justify-content-between bg-light">
                <div class="text-success">
                  <h6 class="">Promo code</h6>
                  <small>EXAMPLECODE</small>
                </div>
                <span class="text-success">-$5</span>
              </div>
              <div class="list-group-item d-flex justify-content-between">
                <span>Total (USD)</span>
                <strong>{{ total }}</strong>
              </div>
              <form class="card">
                <div class="input-group">
                  <input type="text" class="form-control" placeholder="Promo code" aria-label="Recipient's username" aria-describedby="basic-addon2">
                  <div class="input-group-append">
                    <button class="btn btn-secondary btn-md waves-effect m-0" type="button">Redeem</button>
                  </div>
                </div>
              </form>
              </ul>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name: "OrderInfo",
    data() {
      return {
        name: this.$store.getters.getUser.name,
        email: this.$store.getters.getUser.email,
        phoneNumber: this.$store.getters.getUser.phoneNumber || '',
        zipCode: this.$store.getters.getUser.zipCode || '',
        country: this.$store.getters.getUser.country || 'Ukraine',
        city: this.$store.getters.getUser.city || 'Kyiv',
        street: this.$store.getters.getUser.street || '',
      }
    },
    methods: {
      ...mapActions(['registerOrder', 'charge']),
      resetForm(e) {
        e.preventDefault()
        this.name = ''
        this.email = ''
        this.phoneNumber = ''
        this.street = ''
        this.city = ''
        this.country = ''
        this.zipCode = ''
      },
      createOrder(e) {
        e.preventDefault();
        let order = {
          name : this.name,
          email : this.email,
          phoneNumber : this.phoneNumber,
          street: this.street,
          city: this.city,
          country: this.country,
          zipCode: this.zipCode
        };
        this.registerOrder([order, this.total]).then(() => this.$router.push("/payment"))
      },
        
    },
    computed: {
      ...mapGetters(['cartProducts']),
      total() {
        return this.cartProducts.reduce((total, product) => {
          return total + product.price * product.quantity
        }, 0)
      },
      itemsInCart(){
        return  this.$store.getters.cartProducts.length;
      },
    },
}
</script>
<style lang="less" scoped>
 .content {
   position: absolute;
   height: fit-content;
   padding: 8% 4%;
   background-image: linear-gradient(150deg, #281483 15%, #8f6ed5 70%, #d782d9 94%);

   .alert {
     padding: 20px 0 60px;
     color: white;
     border: none;
     border-radius: unset;
     background-color: unset;
   }

   .card {
     padding: 4% 2%;
     border: none;
     background-color: white;

     .card-body {
       * {
         margin-top: 2%;
       }

       .cc_expiration {
         display: inline-flex;

       }
     }
   }
 }
</style>