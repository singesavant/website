// -*- mode: vue; js-indent-level: 2; -*-
<template lang="html">
  <div class="shop">

    <div class="floor">
    </div>
    <div class="neon">
      <div v-bind:class="{ flicker: isFlickering }" class="overlay"></div>
    </div>

    <div v-if="isAuthenticated" id="products">
      <orderable-item-list />
    </div>

    <welcome v-if="!isAuthenticated" />

    <!-- <pre-order-list /> -->

  </div>
</template>

<script lang="js">
import orderableItemList from './OrderableItemList'
import preOrderList from './preOrderList'
import Welcome from './Welcome'
import { mapState } from 'vuex'

var data = {
  isFlickering: false
}

export default {
  name: 'Shop',

  components: {
    orderableItemList,
    preOrderList,
    Welcome
  },
  data: function () {
    return data
  },
  mounted: function () {
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
  },
  computed: mapState(['isAuthenticated'])
}
</script>

<style lang="scss" scoped>

#products {
  z-index: 10;
  width: 100%;
  position: fixed;
  bottom: 0;
}

.shop {
    background: url('/static/images/shop/background.jpg');
    background-repeat: repeat;
    background-position: center top;
    width: 100%;
    height: 100%;
    z-index: 1;


    .floor {
      background: url('/static/images/shop/wall_floor.jpg');
      background-position: center bottom;
      background-size: 100%;
      background-repeat: repeat-x;
      position: fixed;
      height: 200px;
      width: 100%;
      bottom: 0;
      z-index: 2;
    }

    .neon {
        background: url('/static/images/shop/shop_light.png'), url('/static/images/shop/shop_cross.png');
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

            background: url('/static/images/shop/shop_light_overlay.png');
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
