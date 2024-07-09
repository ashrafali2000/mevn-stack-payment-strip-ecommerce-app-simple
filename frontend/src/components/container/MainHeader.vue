<template>
  <header id="header" class="header parallax" :style="{ backgroundImage: 'url(' + require('@/assets/images/headerWorkSpace.jpeg') + ')' }">
    <div class="layer">
      <div class="headerBody">
        <h1 id="animatedHeader" class="ml5 animatedHeader">
          <span class="text-wrapper">
            <span class="line line1"></span>
            <span class="letters letters-left">Online</span>
            <span class="letters ampersand">&amp;</span>
            <span class="letters letters-right">Shop</span>
            <span class="line line2"></span>
          </span>
        </h1>
      </div>
    </div>
  </header>
</template>

<script>
import {animate} from '../../helper/anime'

export default {
    name: "MainHeader",
    components: {
    },
    mounted() {
      animate();
    },
}
</script>

<style lang="less">

.parallax {
  min-height: 100vh;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.header {
  height: 100vh;
  background-size: cover;
  color: white;
  text-shadow: 1px 1px 3px #000;

  .layer {
    width: 100%;
    position: absolute;

    background-color: #d6d7db4f;

    .headerBody {
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;

      .ml5 {
        position: fixed;
        font-weight: 300;
        font-size: 5.1em;
        z-index: 1;

        .text-wrapper {
          position: relative;
          display: inline-block;
          padding-top: 0.1em;
          padding-right: 0.05em;
          padding-bottom: 0.15em;
          line-height: 1em;

          .line {
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            margin: auto;
            height: 3px;
            width: 100%;
            background-color: #7d7272;
            transform-origin: 0.5% 0;
          }

          .ampersand {
            font-family: Baskerville, serif;
            font-style: italic;
            font-weight: 400;
            color: #7d7272 !important;
            width: 1em;
            margin-right: -0.1em;
            margin-left: -0.1em;
          }

          .letters {
            display: inline-block;
            opacity: 0;
          }
        }
      }
    }
  }
}

</style>