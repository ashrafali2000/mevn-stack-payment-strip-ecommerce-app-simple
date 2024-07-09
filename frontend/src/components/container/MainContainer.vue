<template>
    <div class="wrapper">
      <Header></Header>
      <div class="content row">
          <ul class="productList">
            <li class="productsListItem card col-sm-8 col-md-3" v-for="(product, index) in allProducts" :key="index">
              <div class="productListItem_inner view overlay zoom z-depth-2" v-for="(image, index) in product.image" :key="index">
                  <img class="" :src="getImageUrl(image)" alt="image">
                <h2>New<small>{{ product.name }}</small></h2>
                <p class="productsListItem_price">{{ product.price }} $</p>
                <div class="button-container flex-container">
                  <button class="showDetailsBtn" type="button" :duration="{ enter: 500, leave: 800 }" @click="viewProduct(product._id)">Show more</button>
                  <button class="addToCartBtn" @click="addToCart(product)">Add to cart</button>
                </div>
              </div>
            </li>
          </ul>
      </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import getImageUrl from '../../helper/imageHelper'
import MainHeader from "@/components/container/MainHeader";

export default {
  name: "MainContainer",
  components: {
    Header: MainHeader
  },
  methods: {
    ...mapActions(['addToCart']),
    ...getImageUrl,
    viewProduct(id) {
      this.$router.push({path: `/product/${id}`})
    },
  },
  computed: {
    ...mapGetters(['allProducts'])
  }
}
</script>

<style lang="less">
  .content {
    margin: 0;

    .productList {
      position: relative; //for z-index
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      text-align: center;
      background: #e8e8e8;
      z-index: 2;

      .productsListItem {
        display: flex;
        margin: 1% 2%;
        width: 24%;
        height: 18%;
        padding: 0;
        background: #f8f8f8;
        box-shadow: 4px 4px 7px #999;
        border-radius: .50rem!important;

        @media (max-width: 768px) {
          height: 8%;
        }

        &:hover {
          .showDetailsBtn, .addToCartBtn {
            visibility: visible !important;
            transition: ease 0.5s;
            position: relative;
            width: 50%;
            border: none;
            padding: 10px;
            text-decoration: none;
            color: #fdde08;
            font-weight: bold;
            font-size: 18px;
            background-color: rgb(133 136 140);

            &:hover {
              color: #000;
              background-color: #fdde08;
              border: none;
            }
          }

          .showDetailsBtn {
            border-radius: 0 0 0 .50rem;
          }

          .addToCartBtn {
            border-radius: 0 0 .50rem 0;
          }
        }

        .productListItem_inner {
          position: relative;
          height: inherit;
          background-size: cover;
          overflow: hidden;
        }

        .view {
          position: relative;
          height: 100%;
          overflow: hidden;
          cursor: default;

          img {
            position: relative;
            transition: transform .4s;
            margin: 0 auto;

            &:hover {
              transform: scale(1.2)
            }
          }
        }

        h2 {
          position: relative;
          bottom: 20%;
          color: white;
          text-shadow: 1px 1px 3px #000;
          line-height: 18px;
          text-transform: uppercase;

          small {
            font-style: italic;
            display: inherit;
            padding: 2%;
          }
        }

        p {
          position: relative;
          bottom: 20%;
          text-align: center;
          width: 100%;
          font-size: 17px;
          font-weight: bold;
        }

        .button-container {
          position: absolute;
          bottom: 0;
          display: flex;
          justify-content: center;
          width: 100%;
          border-radius: .50rem;

          .showDetailsBtn, .addToCartBtn {
            visibility: hidden;
          }
        }
      }
    }
  }
</style>
