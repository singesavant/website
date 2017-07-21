// -*- mode: vue; js-indent-level: 2; -*-
<template lang="html">
  <div class="brewshop">
    <div class="content">
      <h1>Brew<br/>Shop</h1>

      <div v-if="isAuthenticated" id="products">
        <h2>Malts</h2>
        <malt-list />

        <h2>Houblons</h2>
        <hop-list />

        <div class="not-found">
          Impossible de trouver ce que vous voulez ? Il vous manque une info ?
          <br>
          <br/>

          Passez nous un <strong>coup de fil</strong> ou <strong>écrivez nous un email</strong> pour en discuter !
          <img src="/static/images/brewshop/redphone.png" width="160px" alt="Red phone">
        </div>
      </div>

      <div v-else>
        Log toi copain si tu veux la liste !
      </div>

    </div>

  </div>
</template>

<script lang="js">
import MaltList from './items/MaltList'
import HopList from './items/HopList'
import { mapState } from 'vuex'

var data = {
  isFlickering: false
}

export default {
  name: 'BrewShop',

  components: {
    MaltList,
    HopList
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

.not-found {
    float: right;
    width: 20vw;
    background-color: rgba(255, 255, 255, 0.8);
    color: black;
    padding: 10px;

    strong {
     display: inline;
    }

    position: absolute;
    right: 10px;
    top: 100px;

    img {
float: right;
        }

    display: block;

    border-radius: 5px;
    border: 1px solid black;
}

.brewshop {

    background-color: #14141e;
    background-repeat: repeat;
    background-position: center top;
    width: 100%;
    height: 100%;


    .content {
        padding: 40px;
                h1 {
                    background-image: url('/static/images/brewshop/logo.png');
                    background-size: auto 100%;
                    background-repeat: no-repeat no-repeat;

                    padding-left: 120px;
                    padding-top: 5px;

                    font-size: 4em;
                    color: white;
                    text-transform: uppercase;
                    line-height: 80%
                }

               h2 {
                   color: white;
                   font-size: 2.5em;
                   text-transform: uppercase;
                   margin-bottom: 0px;
               }

         .product {

         }
    }



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
