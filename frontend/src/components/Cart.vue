<template>
  <div id="cart">
    <div v-if="!cartProducts.length"  class="content emptyCart row">
      <div class="col-md-8 cart-box cart-box-left emptyCart-box">
        <h2>You cart is empty for now</h2><br>
        <router-link to="/">Back to products</router-link>
      </div>
      <div class="col-md-3 card cart-box cart-box_right">
        <div class="cart-box-title">
          <h5 class="cart-box-title-item">Support</h5>
        </div>
        <div class="cart-box-content text-center">
          <h3><b-icon icon="telephone-fill"></b-icon>  +43 100 783 001</h3>
          <span class="small">Please contact with us if you have any questions. We are available 24h.</span>
        </div>
      </div>
    </div>
    <div v-if="cartProducts.length" class="content row">
      <div class="col-md-8 col-lg-9">
        <div class="cart-box cart-box_left">
          <div v-show="cartProducts.length" class="cart-box-title flex-container">
            <h5 class="cart-box-title-item">Items in your cart</h5>
            <span class="cart-box-title-item"><strong>( {{itemsInCart}} )</strong> items</span>
          </div>
          <div class="cart-box-content">
            <div class="table-responsive">
              <table class="table cart-table">
                <tbody>
                <tr class="cart-table-item" v-for="(product) in cartProducts"
                    :key="product.id">
                  <td class="cart-product_image">
                    <img :src="getImageUrl(product.image)" alt="image">
                  </td>
                  <td class="cart-product_details">
                    <h3 class="cart-product_name">
                      <a href="#" class="text-navy">{{ product.name }}</a>
                    </h3>
                    <dl class="small m-b-none">
                      <dt>Description lists</dt>
                      <dd>{{ product.description }}</dd>
                    </dl>
                    <div>
                      <a href="#" class="text-muted"><b-icon icon="gift"></b-icon> Add gift package</a>
                      |
                      <a href="#" class="text-muted" @click="removeFromCart(product.id)"><b-icon icon="trash"></b-icon> Remove item</a>
                    </div>
                  </td>
                  <td class="cart-product_price">
                    <span class="">
                      ${{product.price}}
                    </span>
                  </td>
                  <td class="cart-product_quantity">
                    <input type="text" class="form-control" :placeholder="product.quantity">
                  </td>
                  <td class="cart-product_price">
                    <h4>
                      ${{product.price * product.quantity}}
                    </h4>
                  </td>
                  <hr>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="cart-box-buttons flex-container">
            <router-link to="/#products" class="btn btn-primary"><b-icon icon="bag-plus"></b-icon> Continue shopping</router-link>
            <router-link to="/checkout" class="btn btn-success"><b-icon icon="cart-check"></b-icon> Checkout</router-link>
          </div>
        </div>
      </div>
      <div v-if="cartProducts.length" class="col-md-3">
        <div class="card cart-box cart-box_right">
          <div class="cart-box-title">
            <h5 class="cart-box-title-item">Cart Summary</h5>
          </div>
          <div class="cart-box-content">
                      <span>Total</span>
            <h2 class="font-bold">${{ total }}</h2>
            <hr>
            <span class="text-muted small">*For United States, France and Germany applicable sales tax will be applied</span>
            <div class="m-t-sm">
              <div>
                <router-link to="/checkout" class="btn btn-outline-success btn-sm"><b-icon icon="cart-check"></b-icon> Checkout</router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="card cart-box cart-box_right">
          <div class="cart-box-title">
            <h5 class="cart-box-title-item">Support</h5>
          </div>
          <div class="cart-box-content text-center">
            <h3><b-icon icon="telephone-fill" size="sm"></b-icon> +38 035 98 45</h3>
            <span class="small">Please contact with us if you have any questions. We are avalible 24h.</span>
          </div>
        </div>
        <div class="card cart-box cart-box_right">
          <div class="cart-box-title">
            <h5 class="cart-box-title-item">Other products you may be interested</h5>
          </div>
          <div class="cart-box-content" v-for="index in 2"
               :key="index">
            <div>
              <a href="#" class="product-name">{{allProducts[index].name}}</a>
              <div class="small m-t-xs">{{allProducts[index].description}}</div>
              <div>
                <a href="#" class="btn btn-outline btn-primary" to="#"><b-icon icon="info-circle"></b-icon> Info</a>
              </div>
            </div>
            <hr>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import getImageUrl from '../helper/imageHelper'
export default {
  name: "Cart",
  computed: {
    ...mapGetters(['cartProducts', 'allProducts', 'getNumberOfProducts','isLoggedIn']),
    total() {
      return this.cartProducts.reduce((total, product) => {
        return total + product.price * product.quantity
      }, 0)  //0 - is a start value for method reduce
    },
    isLoggedIn() {
      let user = this.$store.getters.isLoggedIn;
      return user;
    },
    itemsInCart(){
      let cart = this.$store.getters.cartProducts.length;
      return cart;
    },
  },
  methods: {
    ...mapActions(['removeFromCart',]),
    ...getImageUrl,
    checkout() {
      this.$router.push("/checkout");
    }
  },
}
</script>

  <style lang="less" scoped>
  .emptyCart {
    height: 100% !important;

    .emptyCart-box {
      margin-right: 6%;
      height: fit-content;
      padding: 6%;
    }
    .cart-box_right{
      margin: 0;
      padding: 0;
      height: fit-content;
    }
  }

  .content {
    position: absolute;
    height: fit-content;
    padding: 180px 140px;
    background: linear-gradient(150deg, #281483 15%, #8f6ed5 70%, #d782d9 94%);

    .cart-box {
      position: relative;
      background-color: white;
      border-radius: 20px !important;

      .cart-box-title {
        padding: 2%;
        color: inherit;
        border-radius: 20px 20px 0 0;
        background: #0fd7b2;

        cart-box-title-item {
          font-size: 24px;
          line-height: 60px;
          display: inline-block;
        }
      }

      .cart-box-content {
        padding: 4%;

        .cart-table {
          margin-bottom: 0;

          .cart-table-item {
            margin: 3%;
            display: block;
          }

          tr td {
            border: none;
            text-align: right;
          }

          .cart-product_details {
            width: 70%;
            text-align: left;
          }

          .cart-product_image {
            img {
              height: 25%;
            }
          }

          .cart-product_price,
          .cart-product_quantity {
            width: 30%;

            .form-control {
              width: 30px;
              padding: 20%;
            }
          }
        }

        .text-navy {
          color: #0fd7b2;
          font-weight: bold;
          font-size: 24px;
        }
      }

      .cart-box-buttons {
        color: inherit;
        padding-bottom: 4%;
      }
    }

    .cart-box_right {
      margin-bottom: 8%;
      height: fit-content;
    }

    .flex-container {
      display: flex;
      justify-content: space-around;
    }
  }
</style>
