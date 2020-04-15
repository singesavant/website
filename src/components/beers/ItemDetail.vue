// -*- mode: vue; js-indent-level: 2; -*-
<template lang="html">
  <b-overlay :show="is_loading" sm="rounded">
  <div class="product" v-if="!is_loading && item">

    <b-row align-h="center">
      <b-col cols="3" class="text-center upper-header">
        <b-icon icon="bucket"/>&nbsp;<router-link :to="{name: 'shop'}">Retour au shop</router-link>
      </b-col>
    </b-row>


    <b-row class="about" align-h="center">
      <b-col md="8" sm="10" class="left">
        <b-row>

          <!-- left pane -->
          <b-col md="6" class="text-center">
            <b-img class="label" :src="item.website_image|erp_static_url" :alt="item.name"/>

            <b-row class="online-order" align-h="center" v-if="isAuthenticated">
              <b-col align="left" align-v="bottom" cols="10">
                <h2 class="beer-subtitle"><b-icon icon="bucket"/>&nbsp;Commander en ligne</h2>
                <add-orderable-item-to-cart-widget :item="item" />
              </b-col>
            </b-row>

          </b-col>

          <b-col md="6">
            <b-row align-h="center">
              <h2  class="beer-subtitle">{{ item.name }}</h2>
              <p class="description" v-html='item.website_long_description_html'></p>
            </b-row>
          </b-col>

        </b-row>

        <b-row align-h="center" v-if="item.slideshow_items">
          <b-carousel
            id="item-carousel"
            :interval="4000"
            controls>

            <b-carousel-slide v-for="picture in item.slideshow_items" :key="picture.name"
                              :img-src="picture.image|erp_static_url"
                              ></b-carousel-slide>
          </b-carousel>
        </b-row>


      </b-col>
    </b-row>



    <b-row class="buy" align-h="center">
      <b-col cols="8">
        Commandez en ligne,<br/>
        nous vous livrons en MonkeyMobile électrique !<br/>
        <router-link :to="{name: 'shop'}">
          <b-button id="go-to-shop" variant="primary" >Go Shop !</b-button>
        </router-link>

        <!-- <p class="smaller">(Vous pouvez aussi acheter <router-link :to="{name: 'contact'}">sur place</router-link>)</p> -->
      </b-col>
    </b-row>

    <b-row class="other-beers justify-content-md-center">
      <b-col cols="12" align="center">
        <b-row>
          <b-col cols="2" offset="5">
            <h2 class="beer-subtitle">Une bière ?</h2>
          </b-col>
        </b-row>
      </b-col>

      <b-col cols="12" v-if="beers">
        <b-row class="justify-content-md-center beer-list" align-h="center">
          <b-col class="align-bottom" sm="2" align="center" v-for="item in get_five_other_beers" :key="item.name">
            <beer-card :beer="item"/>
          </b-col>
        </b-row>
        <b-row align-h="center" class="all-beers">
          <b-col align="center">
            <b-button variant="primary" :to="{name: 'beer-list'}">Voir toutes les bières</b-button>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    <monkey-footer/>

  </div>
  </b-overlay>
</template>

<script lang="js">
import { mapState } from 'vuex'
import Vue from 'vue'

import lodash from 'lodash'
import VueLodash from 'vue-lodash'

Vue.use(VueLodash, lodash)

import BeerCard from './BeerCard.vue'
import MonkeyFooter from '../Footer.vue'
import AddOrderableItemToCartWidget from '../shop/AddOrderableItemToCartWidget.vue'

import _ from 'lodash'

export default {
  name: 'ItemDetail',

  computed: {
    ...mapState({
      item: 'current_beer_details'
    }),
    ...mapState(['isAuthenticated', 'beers']),
    ...{
      get_five_other_beers: function () {
        return _.sampleSize(this.beers.filter(item => item.disabled === false && item.name !== this.item.name), 5)
      },
      get_left_image_url: function () {
        var item = _.find(this.item.slideshow_items, {heading: 'left'})
        if (item) {
          return item.image
        }
      }
    }
  },

  components: {
    BeerCard,
    MonkeyFooter,
    AddOrderableItemToCartWidget
  },

  data: function () {
    return {
      is_loading: false
    }
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },
  beforeUpdate: function () {
    window.scrollTo(0, 0)
  },
  mounted: function () {
    this.fetchData()
    this.$store.dispatch('LOAD_BEER_LIST')
  },
  methods: {
    fetchData: function () {
      this.is_loading = true
      this.$store.dispatch('LOAD_BEER_DETAILS', {slug: this.$route.params.slug})
        .then(() => {
          this.is_loading = false
        })

    }
  },
  filters: {
    erp_static_url (uri) {
      return 'https://erp.singe-savant.com/' + uri
    }
  }

}
</script>

<style lang="scss" scoped>

  .online-order {
    margin-top: 5vh;
  }


  .upper-header {
   margin-bottom: 2vh;
  }

.other-beers {

  margin-top: 20px;
  margin-bottom: 20px;
}

.hop-list {
    list-style-type: none;
    text-align: center;
    padding: 0px;

    .hop {
        display: inline;
        text-transform: capitalize;
        width: 20px;
        height: 20px;
        border: 1px solid black;
        padding: 10px;
        margin: 10px;
        font-size:12px;
        letter-spacing:0px;
        color:black;
        background-color: white;
        line-height: 50px;
        border-radius: 5px;

    }

}

.buy {
    height: 50vh;



    .col-8 {
        background-image: url(/images/product/bg-shop.jpg);
        background-size: cover;

        text-align: center;

        font-size: 4vh;
        color: white;
        text-transform: uppercase;

        padding-top: 10vh;

        button, a {
            margin-top: 5vh;
        }

        a {
            color: #d06f5a;
        }

        .smaller {
            margin-top: 1em;
            font-size: 1rem;
        }

    }
}

h2.beer-subtitle {
    width: 100%;
    text-align: center;
    font-size: 1.2em;
    font-variant: small-caps;

    background: url(/images/product/h2-icon.png), url(/images/product/h2-icon.png);
    background-size: auto 100%;
    background-repeat: no-repeat;
    background-position: 0%, 100%;

    margin-bottom: 20px;
    margin-right: 4vw !important;
}

.product {

    padding-top: 15vh;
    height: 100%;
    width: 100%;
    background-color: #eee;

    img {
        padding-top: 10vh;
    }


    .badge-header {
        text-align: center;
        background-color: rgba(0, 0, 0, 0);
        position: relative;
        margin-top: -10vh;
        height: 40vh;

        img {
            height: 50vh;
            background-color: white;
            border-radius: 50%;
            position: absolute;
            top: -15vh;
            margin-left: -25vh;

        }

        .background {
            background-color: white;
        }
    }


    .about {
        justify-content: center;

        .left, .right {
            background-color: white;

            line-height: 200%;

            padding-top: 4vh;

            .text {
                padding: 40px;
            }


            .caract-section {
                margin-bottom: 30px;
                &::first {
                }

                .row {
                    margin-bottom: 10px;

                }
            }

            .caract-value {
                font-weight: 300;
            }

            .description {
                text-align: justify;
                font-weight: 300;
                padding-right: 4vw;
            }

        }
    }

    .more {
        background-color: white;
        justify-content: center;

        .left {
          padding: 40px;
        }
    }
}
</style>
