// -*- mode: vue; js-indent-level: 2; -*-
<template lang="html">


  <b-container fluid id="home">

    <b-row class="mosaic" no-gutters>

      <!-- monkey logo, centered -->
      <div class="logo">
        <img src="images/home/logo.png" alt="logo"/>
      </div>


      <b-col cols="12">

        <!-- first line -->
        <b-row class="fifty-row" no-gutters>
          <b-col cols="6">
            <div class="tile">
              <div class="zoomable brewery">
                <router-link :to="{name: 'brewery'}">
                  <div class="tile-text-wrapper">
                    <h2 class="tile-title">Qui est le singe ?</h2>
                  </div>
                </router-link>
              </div>
            </div>
          </b-col>

          <b-col cols="6">
            <div class="tile">
              <div class="zoomable taproom">
                <router-link :to="{name: 'taproom'}">
                  <div class="tile-text-wrapper">
                    <h2 class="tile-title">Le bar et la boutique du singe</h2>
                  </div>

                </router-link>
              </div>
            </div>
          </b-col>
        </b-row>

        <!-- second line -->
        <b-row class="fifty-row" no-gutters>
        <b-col cols="4">
          <b-row class="fifty-row">
            <b-col>
              <div class="tile">
                <div class="zoomable brewlab">
                  <router-link :to="{name: 'brewlab'}">
                    <div class="tile-text-wrapper">
                      <h2 class="tile-title">Ateliers de brassage, venez brasser dans une brasserie urbaine !</h2>
                    </div>
                  </router-link>
                </div>
              </div>
            </b-col>
          </b-row>

          <b-row class="fifty-row">
            <b-col>
              <div class="tile">
                <div class="zoomable shop">
                  <router-link :to="{name: 'brewshop'}">
                    <div class="tile-text-wrapper">
                      <h2 class="tile-title">Commmandez vos matières premières pour brasser chez vous</h2>
                     </div>
                  </router-link>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-col>
        
        <b-col cols="4">
          <div class="tile">
            <div class="zoomable beers">
              <router-link :to="{name: 'beer-list'}">
                <div class="tile-text-wrapper">
                  <h2 class="tile-title">Découvrez notre gamme</h2>
                </div>
              </router-link>
            </div>
          </div>
        </b-col>

        <b-col cols="4">
          <b-row class="fifty-row">
            <b-col>
              <div class="tile">
                <div class="zoomable visit">
                  <router-link :to="{name: 'brewery/visit'}">
                    <div class="tile-text-wrapper">
                      <h2 class="tile-title">Visiter la brasserie</h2>
                    </div>
                  </router-link>
                </div>
              </div>
            </b-col>
          </b-row>

          <b-row class="fifty-row">
            <b-col>
              <div class="tile">
                <div class="zoomable dealers">
                  <router-link :to="{name: 'dealers'}">
                    <div class="tile-text-wrapper">
                      <h2 class="tile-title">Trouvez où acheter et boire nos bières</h2>
                     </div>
                  </router-link>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-col>
        </b-row>

      </b-col>
    </b-row>

    <monkey-footer/>
  </b-container> <!-- /home -->

</template>

<script lang="js">
import { mapState } from 'vuex'
import MonkeyFooter from '../Footer'
//import Popup from '../Popup'

var data = {
}

export default {
  name: 'Home',

  components: {
    MonkeyFooter//,
  //  Popup
  },

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
    overflow: hidden;

    position: relative;

    padding: 0px;

    height: 100vh;
    width: 100vw;

    .fifty-row {
        height: 50%;
    }

    .mosaic {
        min-height: 94vh;
        border: 2px solid white;
    }


    // centered brand logo
    .logo {
        z-index: 10;
        position: absolute;
        
        margin:0;
        left: 50%;
        top:45%;
        transform: translate(-50%, -50%);

        img {
            width: 25vh;
        }
    }

    .tile {
        height: 100%;
        border: 2px solid white;

        overflow: hidden;

        .zoomable {
            width: 100%;
            height: 100%;

            background-position: center, center;
            background-repeat: no-repeat, no-repeat;
            background-size: 35%, cover;

            box-shadow:0px 0px 40px 0px black inset;

            transition: all .3s ease-in-out;

            &:hover, &:focus {
                transition: all .3s ease-in-out;

                box-shadow:0px 0px 80px 0px black inset;

                .tile-text-wrapper {
                    visibility: visible;
                }

                .soon {
                    position: absolute;
                    background-size: 13vh 13vh;
                    width: 16vh;
                    height: 16vh;

                }

            }

            .soon {
                transition: all .3s ease-in-out;

                background-image: url('/images/home/comingsoon.png');
                background-position: bottom right;
                background-size: 10vh 10vh;
                background-repeat: no-repeat;

                transform: rotate(-20deg);
                width: 12vh;
                height: 12vh;
            }


        }


        .tile-text-wrapper {
            visibility: hidden;

            width: 100%;
            text-align: center;
            position: absolute;
            bottom: 0vh;
            right: auto;

            color: #d19637;

            .go-button {
                position: absolute;
                right: 10%;
                bottom: 3vh;

                margin-left: 20%;

                border-radius : 50%;
                border: 0px;
                font-size: 100%;
                font-variant: small-caps;
                background-color: white;
                color: black;
            }

            .tile-title {
                position: relative;
                font-size: 1em;
                font-variant: small-caps;
                padding-bottom: 6px;
		margin-left: 20%;
		margin-right: 20%;
            }

            .tile-description {
                font-weight: 300;
            }
        }


        a {
            width: 100%;
            height: 100%;
            display: block;
        }
    }

}

.beers {
    background: url(/images/home/beers_text.png), url(/images/home/homepage-beers.jpg);
    background-size: 50%, cover !important;
    background-position: 47% 39%, center !important;
}

.brewlab {
    background: url('/images/home/blab_text.png'), url('/images/home/brewlab.jpg');
}

.dealers {
    background: url('/images/home/dealers_text.png'), url('/images/home/dealers.jpg');
    background-size: 60%, cover !important;
}

.visit {
    background: url('/images/home/visit_text.png'), url('/images/home/visit.jpg');
    background-size: 60%, cover !important;
}

.shop {
    background: url('/images/home/bshp_text.png'), url('/images/home/bshp.jpg');
    background-size: 35%, cover ! important;
    background-position: center, center !important;

    &:hover {
        background-position: center, center !important;
    }

}

.brewery {
    background-image: url('/images/home/brewery_text.png'), url('/images/home/brewery.jpg');
}

.taproom {
    background-image: url('/images/home/taproom_text.png'), url('/images/home/taproom.jpg');
}

.recycling {
    background-image:  url('/images/home/recycling_text.png'), url('/images/home/recycling.jpg');
}

</style>
