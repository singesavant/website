// -*- mode: vue; js-indent-level: 2; -*-
<template lang="html">
  <div class="shop">
    <cart />

    <div class="neon">
      <div v-bind:class="{ flicker: isFlickering }" class="overlay"></div>
    </div>

    <div id="products">
      <preorder-item-list />
    </div>

    {{ isAuthenticated }}
    <welcome v-if="$store.isAuthenticated == false" />

    <!-- <pre-order-list /> -->

  </div>
</template>

<script lang="js">
import preorderItemList from './preorderItemList'
import preOrderList from './preOrderList'
import Cart from './Cart'
import Welcome from './Welcome'

var data = {
  isFlickering: false
}

export default {
  name: 'Shop',

  components: {
    preorderItemList,
    preOrderList,
    Cart,
    Welcome
  },
  data: function () {
    return data
  },
  mounted: function () {
    this.$store.dispatch('LOAD_PREORDERABLE_ITEM_LIST')

    this.toggleFlickering()
  },
  methods: {
    login () {
      this.$store.dispatch('login')
    },

    toggleFlickering () {
      this.isFlickering = !this.isFlickering
      setTimeout(this.toggleFlickering, 2000)
    }
  }
}
</script>

<style src="../../../static/preorder.scss"></style>
<style lang="scss">

#products {
  z-index: 10;
  width: 100%;
  position: fixed;
  bottom: 0;
}

.shop {
    background: url('/static/images/wall_floor.jpg');
    background-position: center bottom;
    background-size: 100%;
    background-repeat: repeat-x;
    width: 100%;
    height: 100%;
    position: fixed;
    bottom: 0;
    z-index: 1;

    .neon {
        background: url('/static/images/shop_light.png'), url('/static/images/shop_cross.png');
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;

        height: 25vw;
        width: 25vw;

        margin-left: -12.5vw;
        margin-top: -12.5vw;

        top: 40%;
        left: 50%;

        position: absolute;

        z-index: 2;

        .overlay {
            width: 100%;
            height: 100%;

            background: url('/static/images/shop_light_overlay.png');
            background-position: center center;
            background-repeat: no-repeat;
            background-size: cover;


            &.flicker {
                animation: flickering .1s cubic-bezier(.2, 0, 0.5, 1.0) 1.5s alternate;
            }

            @keyframes flickering {
                to { opacity: 1; }
                from { opacity: 0; }
            }
        }
    }
}

</style>
