<template>
  <div class="content row">
    <div class="product-box col-12">
      <div class="alert" role="alert">
        Check the product page <a href="#" class="alert-link">at the official site</a>. Give it a click if you like.
      </div>
      <div class="card">
        <div class="row">
          <div class="col-md-4">
          <div class="view overlay zoom z-depth-2">
            <img :src="getImageUrl(product.image)" alt="image">
          </div>
          </div>
          <div class="card-body col-md-8">
            <h5 class="card-title">{{ product.name }}</h5>
            <span class="font-weight-bold">Category: <span class="font-weight-normal">{{product.category}}</span></span>
            <b-list-group horizontal>
              <b-list-group-item><b-icon icon="star-fill" variant="primary"></b-icon></b-list-group-item>
              <b-list-group-item><b-icon icon="star-fill" variant="primary"></b-icon></b-list-group-item>
              <b-list-group-item><b-icon icon="star-fill" variant="primary"></b-icon></b-list-group-item>
              <b-list-group-item><b-icon icon="star-half" variant="primary"></b-icon></b-list-group-item>
              <b-list-group-item><b-icon icon="star" variant="primary"></b-icon></b-list-group-item>
            </b-list-group>
            <span><strong>${{ product.price }}</strong></span>
            <p class="card-text">{{product.description}}</p>
            <div class="table-responsive">
              <table class="table table-sm table-borderless">
                <tbody>
                  <tr>
                    <th class="pl-0 w-25" scope="row"><strong>Size</strong></th>
                    <td>Different sizes</td>
                  </tr>
                  <tr>
                    <th class="pl-0 w-25" scope="row"><strong>Material</strong></th>
                    <td>Seagrass</td>
                  </tr>
                  <tr>
                    <th class="pl-0 w-25" scope="row"><strong>Color</strong></th>
                    <td>Sand</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <hr>
            <div class="table-responsive">
              <table class="table table-sm table-borderless">
                <tbody>
                <tr>
                  <td>
                    <div class="buttons add-button">
                      <p>Quantity: </p>
                      <div class="quantity" type="number">{{itemsInCart}}</div>
                    </div>
                    <a href="#" @click="addToCart(product)" class="btn btn-primary btn-md"><b-icon icon="cart-check"></b-icon>Add to cart</a>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getImageUrl from '../helper/imageHelper'
import {mapActions} from "vuex";
export default {
    name: "ProductPage",
    computed: {
      product () {
        return this.$store.getters.allProducts.find(product => product._id == this.$route.params.id)
      },
      itemsInCart(){
        let product = this.$store.getters.cartProducts.find(product => product.id == this.$route.params.id)
        return (product? product.quantity : "0")

      },
    },
    methods: {
      ...mapActions(['addToCart']),
      ...getImageUrl,
    }
}
</script>
<style lang="less" scoped>

  .content {
    position: absolute;
    height: 100%;
    padding: 80px 100px;
    background-image: linear-gradient(150deg, #281483 15%, #8f6ed5 70%, #d782d9 94%);

    @media (max-width: 768px) {
      height: fit-content;
    }

    .product-box {
      padding: 0;

      @media (max-width: 768px) {
        padding: 8%;
      }

      .alert {
        padding: 100px 0 40px;
        color: white;
        border: none;
        border-radius: unset;
        background-color: unset;
      }

      .card {
        padding: 4% 2%;
        border: none;
        background-color: white;

        .view {
         position: relative;
         overflow: hidden;
         cursor: default;
         border: 2px solid lightgray;
         border-radius: .50rem!important;

         img {
           position: relative;
           transition: transform .4s;
           width: 100%;
           height: 100%;
           margin: 0 auto;
           z-index: 1;

           &:hover {
             transform: scale(1.2)
           }
         }
        }

         .card-body {
           display: flex;
           flex-direction: column;
           text-align: left;

           .list-group-item {
             padding: 3px;
             border: unset;
             background-color: unset;
           }

           hr {
             border: 0;
             clear:both;
             display:block;
             width: 96%;
             background-color: lightgray;
             height: 1px;
           }

           .buttons{
             * {
               display: inline-block;
             }

             .quantity {
               padding: 2% 3%;
               font-weight: bold;
             }
           }

           .number-input {
             margin-right: 30px;
             border: 1px solid #ced4da;
             width: 8.6rem;
             border-radius: .25rem;

             input {
               max-width: 3rem;
               padding: .5rem;
               border: 1px solid #ced4da;
               font-size: 1rem;
               text-align: center;
               height: 2rem;
               color: #495057;
             }

             button {
               width: 2.5rem;
               height: .7rem;
               background-color: transparent;
               border: none;
               cursor: pointer;

               &:before, &:after {
                 width: .7rem;
                 background-color: #495057;
                 display: inline-block;
                 position: absolute;
                 content: '';
                 height: 2px;
               }
             }

             .minus {
               padding-left: 0;
             }

             .plus {
               padding-left: 0;
               &:after {
                 transform: rotate(90deg);
               }
             }
           }
         }
       }
     }
  }

</style>
