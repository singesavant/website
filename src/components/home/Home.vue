// -*- mode: vue; js-indent-level: 2; -*-
<template lang="html">

  <b-container fluid id="home">

    <b-row class="mosaic" no-gutters>

      <!-- monkey logo, centered -->
      <div class="logo">
        <img src="/static/images/home/logo.png" alt="logo"/>
      </div>


      <b-col cols="12">

        <!-- first line -->
        <b-row class="fifty-row" no-gutters>
          <b-col cols="6">
            <div class="tile">
              <div class="zoomable beers">
                <router-link :to="{name: 'beer-list'}">
                  <div class="tile-text-wrapper">
                    <h2 class="tile-title">Les bières</h2>
                    <span class="tile-description">Découvrez notre gamme</span>
                    <b-button class="go-button">Go</b-button>
                  </div>
                </router-link>
              </div>
            </div>
          </b-col>

          <b-col cols="6">
            <div class="tile">
              <div class="zoomable brewlab">
                <router-link :to="{name: 'brewlab'}">
                  <div class="tile-text-wrapper">
                    <h2 class="tile-title">Brew Lab & Shop</h2>
                    <span class="tile-description">École de brassage, Houblons, Malts chez le Singe</span>

                  </div>

                </router-link>
              </div>
            </div>
          </b-col>
        </b-row>

        <!-- second line -->
        <b-row class="fifty-row" no-gutters>
          <b-col cols="4">
            <div class="tile">
              <div class="zoomable dealers">
                <router-link :to="{name: 'dealers'}">
                  <div class="tile-text-wrapper">
                    <h2 class="tile-title">Dealers du Singe</h2>
                    <span class="tile-description">Trouvez où acheter et boire nos bières</span>
                    <b-button class="go-button">Go</b-button>
                  </div>
                </router-link>
              </div>
            </div>
          </b-col>

          <b-col cols="4">
            <div class="tile">
              <div class="zoomable shop">
                <div class="soon"></div>
                <!-- <router-link :to="{name: 'shop'}"> -->
                  <div class="tile-text-wrapper">
                    <h2 class="tile-title">Le Shop</h2>
                    <span class="tile-description">Commandez nos créations en direct !</span>
                    <!-- <b-button class="go-button">Go</b-button> -->
                  </div>
                <!-- </router-link> -->
              </div>
            </div>
          </b-col>

          <b-col cols="4">
            <b-row class="fifty-row">
              <b-col>
                <div class="tile">
                  <div class="zoomable brewery">
                    <router-link :to="{name: 'about'}">
                        <div class="tile-text-wrapper">
                        <h2 class="tile-title">La brasserie</h2>
                        <span class="tile-description">Qui est le Singe ?</span>
                        <!-- <b-button class="go-button">Go</b-button> -->
                      </div>
                    </router-link>
                  </div>
                </div>
              </b-col>
            </b-row>

            <b-row class="fifty-row">
              <b-col>
                <div class="tile">
                  <div class="zoomable recycling">
                    <router-link :to="{name: 'recycle'}">
                      <div class="tile-text-wrapper">
                        <h2 class="tile-title">Recyclage</h2>
                        <span class="tile-description">Verre recyclé, déchêts revalorisés, ...</span>
                        <b-button class="go-button">Go</b-button>
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

var data = {
}

export default {
  name: 'Home',

  components: {
    MonkeyFooter
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

v
<style lang="scss">

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

                background-image: url('/static/images/home/comingsoon.png');
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

            padding: 3vh;

            max-width: 80%;
            min-width: 50%;

            position: absolute;
            bottom: 0;
            left: 20%;
            right: auto;

            color: white;

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
                font-size: 1.2em;
                font-variant: small-caps;
                padding-bottom: 6px;

                &::after {
                    content: '';
                    position: absolute;
                    width: 10%;
                    height: 1px;
                    left: 0;
                    bottom: 0;
                    background-color: white;
                }
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
    background: url(/static/images/home/beers_text.png), url(/static/images/home/beers.gif);
    background-size: 35%, cover !important;
    background-position: 47% 39%, center !important;
}

.brewlab {
    background: url('/static/images/home/brewlabshop_text.png'), url('/static/images/home/brewlab.jpg');
}

.dealers {
    background: url('/static/images/home/dealers_text.png'), url('/static/images/home/dealers.jpg');
    background-size: 60%, cover !important;
}


.shop {
    background: url('/static/images/home/shop_text.png'), url('/static/images/home/shop.jpg');

    &:hover {
        background: url('/static/images/home/shop_text_overlay.png'), url('/static/images/home/shop_text.png'), url('/static/images/home/shop.jpg') !important;
        background-size: 43.5%, 35%, cover !important;
        background-repeat: no-repeat, no-repeat, no-repeat !important;
        background-position: center, center,  center !important;
    }
}

.brewery {
    background-image: url('/static/images/home/brewery_text.png'), url('/static/images/home/brewery.jpg');
}

.recycling {
    background-image:  url('/static/images/home/recycling_text.png'), url('/static/images/home/recycling.jpg');
}

</style>
