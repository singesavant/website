// -*- mode: vue; js-indent-level: 2; -*-
<template lang="html">
  <div class="product">
    <beer-header :title="beer.name"></beer-header>

    <b-row class="about" align-h="center">
      <b-col cols="4" class="left">
        <img :src="get_left_image_url|erp_static_url" alt="big">
      </b-col>
      <b-col cols="4" class="right">
        <div class="text">
          ..<router-link :to="{name: 'beer-list'}">retour aux bières</router-link>
          <h2  class="beer-subtitle">Qu'est ce que ?</h2>
          <p v-if="website_specifications.style">{{ website_specifications.style }} - {{ website_specifications.abv }}%</p>

          <p v-html='beer.website_long_description_html'></p>
         </div>
      </b-col>
    </b-row>

    <b-row class="more" align-h="center">
      <b-col class="grey-bg" cols="4">
        <b-row align-h="center">
          <b-col cols="10" class="left">
            <div class="caract-section" v-if="website_specifications.apparence">
              <h2 class="beer-subtitle">Caractéristiques</h2>

              <!-- Appareance -->
              <b-row>
                <b-col class="caract-title" cols="4">
                  Apparence
                </b-col>
                <b-col class="caract-value" cols="8">
                  {{ website_specifications.apparence }}
                </b-col>
              </b-row>

              <!-- Arome -->
              <b-row>
                <b-col class="caract-title" cols="4">
                  Arôme
                </b-col>
                <b-col class="caract-value" cols="8">
                  {{ website_specifications.aroma }}
                </b-col>
              </b-row>

              <!-- Gout -->
              <b-row>
                <b-col class="caract-title" cols="4">
                  Goût
                </b-col>
                <b-col class="caract-value" cols="8">
                  {{ website_specifications.gout }}
                </b-col>
              </b-row>
            </div>

            <div class="caract-section" v-if="website_specifications.hops">
              <h2 class="beer-subtitle">Houblons</h2>
              <ul class="hop-list">
                <li class="hop" v-for="hop in website_specifications.hops.split(',')">{{ hop }}</li>
              </ul>
            </div>

            <div class="caract-section" v-if="website_specifications.hops">
              <h2 class="beer-subtitle">Amertume</h2>
              <ul class="ibus" id="ibu-container">
                <li v-for="n in get_ibus" class="bullet ibu-bullet"></li><li v-for="n in get_missing_ibus" class="bullet no-ibu-bullet"></li>
              </ul>

              <b-tooltip target="ibu-container" placement="bottom">
              <span class="ibu-comment" v-if="get_ibus == 1">Pas du tout amère</span>
              <span class="ibu-comment" v-if="get_ibus == 2">Légèrement amère</span>
              <span class="ibu-comment" v-if="get_ibus == 3">Assez amère</span>
              <span class="ibu-comment" v-if="get_ibus == 4">Amertume soutenue</span>
              <span class="ibu-comment" v-if="get_ibus == 5">Très amère</span>
              </b-tooltip>

            </div>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="4" class="right">
        <img class="label" :src="beer.website_image|erp_static_url" :alt="beer.name">
      </b-col>
    </b-row>

    <b-row class="buy" align-h="center">
      <b-col cols="4" class="left">
      </b-col>
      <b-col cols="4" class="right">
      </b-col>
    </b-row>


    <b-row class="other-beers justify-content-md-center">
      <b-col cols="10">
        <b-row class="justify-content-md-center beer-list">
          <b-col class="align-bottom" sm="3" align="center" cols="2" v-for="beer in get_four_other_beers" :key="beer.name">
            <beer-card :beer="beer"/>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

  </div>
</template>

<script lang="js">
import { mapState } from 'vuex'
import Vue from 'vue'

import lodash from 'lodash'
import VueLodash from 'vue-lodash'

Vue.use(VueLodash, lodash)
import BeerHeader from './Header.vue'
import BeerCard from './BeerCard.vue'

export default {
  name: 'ProductDetail',

  computed: {
    ...mapState({
      beer: 'current_beer_details'
    }),
    ...mapState(['isAuthenticated', 'beers']),
    ...{
      website_specifications: function (key) {
        var specs = {}
        for (var idx in this.beer.website_specifications) {
          specs[this.beer.website_specifications[idx].label] = this.beer.website_specifications[idx].description
        }

        return specs
      },
      get_ibus: function () {
        return parseInt(this.website_specifications['ibu'])
      },
      get_missing_ibus: function () {
        return (5 - parseInt(this.website_specifications['ibu']))
      },
      get_four_other_beers: function () {
        return this._.sampleSize(this.beers.filter(beer => beer.disabled === false && beer.name !== this.beer.name), 4)
      },
      get_left_image_url: function () {
        var item = this._.find(this.beer.slideshow_items, {heading: 'left'})
        if (item) {
          return item.image
        }
      }
    }
  },

  components: {
    BeerHeader,
    BeerCard
  },

  data: function () {
    return {}
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },
  beforeUpdate: function (to, from, next) {
    window.scrollTo(0, 0)
  },
  created: function () {
    this.fetchData()
    this.$store.dispatch('LOAD_BEER_LIST')
  },
  methods: {
    fetchData: function () {
      this.$store.dispatch('LOAD_BEER_DETAILS', {slug: this.$route.params.slug})
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
    background-color: black;
    height: 2px;
}

h2.beer-subtitle {
    width: 100%;
    text-align: center;
    font-size: 1.2em;
    font-variant: small-caps;

    background: url(/static/images/product/h2-icon.png), url(/static/images/product/h2-icon.png);
    background-size: auto 100%;
    background-repeat: no-repeat;
    background-position: 0%, 100%;

    margin-bottom: 20px;
}

.ibu-comment {
    text-align: center;
    width: 100%;
    font-weight: 300;
}

.ibus {
    list-style-type: none;
    text-align: center;
    padding: 0px;

    .bullet {
        display: inline-block;
        width: 20px;
        height: 20px;

        border: 1px solid;
        border-radius: 50px;

        margin-left: 2px;
        margin-right: 2px;
    }

    li.ibu-bullet {

        background-color: black;
        color: black
    }
    li.no-ibu-bullet {

    }


}

.product {
    height: 100%;
    width: 100%;

    background-color: white;

    .about {
        background-color: black;
        justify-content: center;

        .left {
            padding-left: 0;
            padding-right: 0;
            img {
                object-fit: cover;
                min-height: 100%;
            }
        }

        .right {
            background-color: white;
            line-height: 200%;

            .text {
                padding: 40px;

          }
        }
    }

    .grey-bg {
        background-color: #eee;
    }

    .more {
        background-color: white;
        justify-content: center;

        .left {
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


        .right {
            text-align: center;
          background-color: white;

          img {
              height: 100%;
              max-width: 100%;
          }

        }
    }
}
</style>
