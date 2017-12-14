// -*- mode: vue; js-indent-level: 2; -*-
<template lang="html">
  <div id="home" class="column">
    <div class="logo">
      <img src="/static/images/logo.png" alt="logo"/>
    </div>

    <div class="row">
      <div class="whitebox">
        <div class="zoomable beers">
          <router-link :to="{name: 'product', params: {slug: 'hopshot'}}">Hop Shot</router-link>
        </div>
      </div>
      <!-- <div class="battle whitebox">La battle du moment</div>-->

      <div class="whitebox brewshop-bg">
        <div class="zoomable brewshop">
          <router-link :to="{name: 'brewshop'}">Brew Shop</router-link>
        </div>
      </div>

    </div>

    <div class="row">
      <div class="whitebox">
        <div class="zoomable brewlab comingsoon">
          <!--<router-link :to="{name: 'brewshop'}">-->
          Le Brewlab
          <!--</router-link>-->
        </div>
      </div>

      <div class="whitebox">
        <div class="zoomable shop comingsoon">
          <router-link :to="{name: 'shop'}">
          Le Shop
          </router-link>
        </div>
      </div>

      <div class="column">

        <div class="whitebox">
          <div class="zoomable brewery comingsoon">
            La brasserie
          </div>
        </div>

        <div class="whitebox">
          <div class="zoomable recycling">
            <router-link :to="{name: 'recycle'}">Projet 0: Recyclage</router-link>
          </div>
        </div>

      </div>
    </div>

  </div> <!-- /home -->
</template>

<script lang="js">
import { mapState } from 'vuex'

var data = {
}

export default {
  name: 'Home',

  data: function () {
    return data
  },
  mounted: function () {
  },
  methods: {
  },
  computed: mapState([])
}
</script>


<style lang="scss" scoped>
#home {
    display: flex;
    position: relative;

    height: 100%;
    width: 100%;

    .logo {
        z-index: 10;
        position: absolute;
        height: 200Px;
        width: 200px;
        margin: 50% 50%;

        left:-100px;
        top:-140px;

        img {
            width: 200px;
            height: 200px;
        }
    }

    .whitebox {
        margin: 5px;
        flex-grow: 1.0;

        overflow: hidden;

        font-size: 2em;

        .zoomable {
            width: 100%;
            height: 100%;

            background-size: cover;
            background-position: center;
            background-repeat: no-repeat no-repeat;

            box-shadow:0px 0px 70px 0px black inset;

            transition: all .3s ease-in-out;

            &:hover, &:focus {
                transform: scale(1.1);
                transition: all .3s ease-in-out;
            }


        }

        .comingsoon:hover {
            transition: none;
            background-image: url(/static/images/home/comingsoon.png);
            background-size: 30%;
            background-repeat: no-repeat;
        }


        text-indent: -9999px;                 /* sends the text off-screen */
        a {
            width: 100%;
            height: 100%;
            display: block;
        }
    }

}



.column {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.row {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-grow: 1;
}

.beers {
    background-image: url('/static/images/home/beers.jpg');
}

.battle {
    background-image: url('/static/images/home/battle.jpg');
}

.brewshop-bg {
    background-image: url('/static/images/home/brewshop-bg.jpg');
    background-color: rgba(0, 0, 0, 255) !important;
}

.brewshop {
    background-image: url('/static/images/home/brewshop.png');
    background-size: 40% !important;
}

.brewlab {
    background-image: url('/static/images/home/brewlab.jpg');
}

.shop {
    background-image: url('/static/images/home/shop.jpg');
}

.brewery {
    background-image: url('/static/images/home/brewery.jpg');
}

.recycling {
    background-image: url('/static/images/home/recycling.jpg');
}





</style>
<style lang="scss" src="../../../static/globals.scss">
