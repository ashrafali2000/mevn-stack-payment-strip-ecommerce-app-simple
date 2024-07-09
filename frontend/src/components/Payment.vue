<template>
  <div class="content">
    <div>
       <div class="custom-control custom-radio d-inline-block">
         <div class="mb-3">
           <img class="mr-2" width="45px"
                src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                alt="Visa">
           <img class="mr-2" width="45px"
                src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                alt="American Express">
           <img class="mr-2" width="45px"
                src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                alt="Mastercard">
           <img class="mr-2" width="45px"
                src="https://mdbootstrap.com/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.png"
                alt="PayPal acceptance mark">
         </div>
       </div>
    </div>
 <h2 class="text-primary">{{msg}} $ {{total}}</h2>
 <form id="payment-form" class="w-75 px-5 d-flex flex-column align-items-center" >
   <div ref="card" class="form-control m-2">
   <!-- A Stripe Element will be inserted here. -->
      </div>
      <input :disabled="lockSubmit" class="btn btn-primary shadow-sm" type="submit" value="Submit" v-on:click.prevent="purchase" />
      </form>
  </div>
</template>
<script>

import {mapActions, mapGetters} from 'vuex'
export default {
  data() {
    return {
        spk:"pk_test_51OaXP3DryADxr33FReIT73OB1fShGDnJTDMO6JheFFwxW6NZSa6BBipsOWAaZe63gr8oQcKjZgYSGp6gOAVBCH1X00XVsM1FlL",
        stripe:undefined,
        card:undefined,
        msg: 'Process payment here',
        payAmount: 5000,
        lockSubmit:false,
    }
  },
  mounted () {
    this.stripe = window.Stripe(this.spk);
    this.card = this.stripe.elements().create('card', {hidePostalCode: true});
    this.card.mount(this.$refs.card);
  },
  methods: {
    ...mapActions(['charge',]),
    purchase() {
      this.lockSubmit = true
      this.stripe.createToken(this.card).then((result) => {
        if (result.error) {
          alert(result.error.message)
          this.$forceUpdate(); // Forcing the DOM to update so the Stripe Element can update.
          this.lockSubmit = false;
        } else {
          this.processTransaction(result.token.id)
        }
      }).catch((err) => {
        alert("error: " + err.message)
        this.lockSubmit = false
      });
    },

    processTransaction(transactionToken) {
      const dt = {
        amount: this.payAmount,
        currency: "USD",
        description: "order payment",
        token: transactionToken
      }
      this.charge(dt).then(() => this.$router.push('/cart'))
    },
  },
  computed: {
    ...mapGetters(['cartProducts']),
    total() {
      console.log('total: ' + this.cartProducts.reduce((total, product) => {
        return total + product.price * product.quantity
      }, 0))
      return this.cartProducts.reduce((total, product) => {
        return total + product.price * product.quantity
      }, 0)
    },
  }
}
</script>
<style lang="less" scoped>
  .content {
    width: 100% !important;
    position: absolute;
    height: 100%;
    padding-top: 20%;
    background-image: linear-gradient(150deg, #281483 15%, #8f6ed5 70%, #d782d9 94%);

    form {
      left: 0;
      right: 0;
      margin: auto;
    }
  }
</style>
