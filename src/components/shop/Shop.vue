// -*- mode: vue; js-indent-level: 2; -*-
<template lang="html">
  <div class="shop">

    <div class="floor">
    </div>

    <div class="neon">
      <div v-bind:class="{ flicker: isFlickering }" class="overlay"></div>
    </div>

    <!-- product list -->
    <div id="products">
      <b-row class="product-list-container justify-content-md-center">
        <b-col cols="10">
          <orderable-item-list item_group="Bières du Singe"/>
        </b-col>
      </b-row>
    </div>

    <welcome v-if="!isAuthenticated" />

  </div>
</template>

<script lang="js">
import orderableItemList from './OrderableItemList'
import Welcome from './Welcome'
import { mapState } from 'vuex'


var data = {
  isFlickering: false
}

export default {
  name: 'Shop',

  components: {
    orderableItemList,
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

.shop {
    padding-top: 10vh;
    background: url('/images/shop/wall_floor.jpg'), url('/images/shop/background.jpg');
    background-repeat: no-repeat, no-repeat;
    background-attachment: fixed, fixed;
    background-position: bottom, center;
    background-size: 100%, cover !important;

    min-height: 100vh;
    z-index: 1;


    .product-list-container {
        z-index: 3;
     }

    .neon {
        background: url('/images/shop/shop_light.png'), url('/images/shop/shop_cross.png');
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;

        height: 25vw;
        width: 25vw;

        margin-left: -12.5vw;
        margin-top: -12.5vw;

        top: 40%;
        left: 50%;

        position: fixed;

        z-index: 2;

        .overlay {
            width: 100%;
            height: 100%;

            background: url('/images/shop/shop_light_overlay.png');
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
