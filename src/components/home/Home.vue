// -*- mode: vue; js-indent-level: 2; -*-
<template lang="html">

  <b-container fluid id="home">
    <!-- <div class="logo"> -->
    <!--   <img src="/static/images/logo.png" alt="logo"/> -->
    <!-- </div> -->

    <b-row class="mosaic" no-gutters>
      <b-col cols="12">

        <!-- first line -->
        <b-row class="fifty-row" no-gutters>
          <b-col cols="6">
            <div class="whitebox">
              <div class="zoomable beers">
                <router-link :to="{name: 'beer-list'}">Les bières</router-link>
              </div>
            </div>
          </b-col>
          <!-- <div class="battle whitebox">La battle du moment</div>-->

          <b-col cols="6">
            <div class="whitebox">
              <div class="zoomable brewshop">
                <router-link :to="{name: 'brewshop'}">Brew Shop</router-link>
              </div>
            </div>
          </b-col>
        </b-row>

        <!-- second line -->
        <b-row class="fifty-row" no-gutters>
          <b-col cols="4">
            <div class="whitebox">
              <div class="zoomable brewlab comingsoon">
                <!--<router-link :to="{name: 'brewshop'}">-->
                Le Brewlab
                <!--</router-link>-->
              </div>
            </div>
          </b-col>

          <b-col cols="4">
            <div class="whitebox">
              <div class="zoomable shop comingsoon">
                <router-link :to="{name: 'shop'}">
                  Le Shop
                </router-link>
              </div>
            </div>
          </b-col>

          <b-col cols="4">
            <b-row class="fifty-row">
              <b-col>
                <div class="whitebox">
                  <div class="zoomable brewery comingsoon">
                    La brasserie
                  </div>
                </div>
              </b-col>
            </b-row>

            <b-row class="fifty-row">
              <b-col>
                <div class="whitebox">
                  <div class="zoomable recycling">
                    <router-link :to="{name: 'recycle'}">Projet 0: Recyclage</router-link>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>

        </b-row>
      </b-col>
    </b-row>

    <!-- footer -->
    <b-row class="footer" no-gutters>
      <b-col cols="12">
        Subscribe...
      </b-col>
    </b-row>

  </b-container> <!-- /home -->

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


<style lang="scss">

.fifty-row {min-height: 50%;}

.mosaic { min-height: 95vh; }
.footer { min-height: 5vh; }

#home {


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
        height: 100%;


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

        a {
            width: 100%;
            height: 100%;
            display: block;
        }
    }

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
