// -*- mode: vue; js-indent-level: 2; -*-
<template lang="html">
  <div class="product">
    <beer-header :title="beer.name"></beer-header>

    <b-row class="badge-header" align-h="center">
      <b-col class="background" sm="8">
        <img class="label" :src="beer.website_image|erp_static_url" :alt="beer.name">
      </b-col>
    </b-row>

    <b-row class="about" align-h="center">
      <b-col sm="4" class="left">
        <div class="text">
          <h2  class="beer-subtitle">Qu'est ce que ?</h2>
          <p class="description" v-html='beer.website_long_description_html'></p>
        </div>
      </b-col>
      <b-col class="right" sm="4">
        <b-row align-h="center">
          <div class="text">
            <b-col cols="12">
              <div class="caract-section" v-if="website_specifications.apparence">
                <h2 class="beer-subtitle">Caractéristiques</h2>

                <!-- Style -->
                <b-row v-if="website_specifications.style">
                  <b-col class="caract-title" cols="4">
                    Style
                  </b-col>
                  <b-col class="caract-value" cols="8">
                    {{ website_specifications.style }}
                  </b-col>
                </b-row>

                <!-- ABV -->
                <b-row v-if="website_specifications.abv">
                  <b-col class="caract-title" cols="4">
                    Alcool
                  </b-col>
                  <b-col class="caract-value" cols="8">
                    {{ website_specifications.abv }}
                  </b-col>
                </b-row>

                <!-- Appareance -->
                <b-row v-if="website_specifications.apparence">
                  <b-col class="caract-title" cols="4">
                    Apparence
                  </b-col>
                  <b-col class="caract-value" cols="8">
                    {{ website_specifications.apparence }}
                  </b-col>
                </b-row>

                <!-- Arome -->
                <b-row v-if="website_specifications.aroma">
                  <b-col class="caract-title" cols="4">
                    Arôme
                  </b-col>
                  <b-col class="caract-value" cols="8">
                    {{ website_specifications.aroma }}
                  </b-col>
                </b-row>

                <!-- Gout -->
                <b-row v-if="website_specifications.gout">
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

              <div class="caract-section" v-if="website_specifications.ibu">
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
          </div>
        </b-row>
      </b-col>
    </b-row>

    <b-row class="buy" align-h="center">
      <b-col cols="8">
        Commandez en ligne<br/> et faîtes vous livrer à vélo !<br/>
        <b-button id="go-to-shop" variant="secondary">Accéder au shop</b-button>
        <b-tooltip target="go-to-shop" title="Bientôt disponible ! En attendant, envoyez-nous votre commande par e-mail :)"/>

        <p class="smaller">(Vous pouvez aussi acheter <router-link :to="{name: 'contact'}">sur place</router-link>)</p>
      </b-col>
    </b-row>

    <b-row class="other-beers justify-content-md-center">
      <b-col cols="12" align="center">
        <b-row>
          <b-col cols="2" offset="5">
            <h2 class="beer-subtitle">D'autres recettes ?</h2>
          </b-col>
        </b-row>
      </b-col>

      <b-col cols="12">
        <b-row class="justify-content-md-center beer-list" align-h="center">
          <b-col class="align-bottom" sm="2" align="center" v-for="beer in get_five_other_beers" :key="beer.name">
            <beer-card :beer="beer"/>
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
</template>

<script lang="js">
import { mapState } from 'vuex'
import Vue from 'vue'

import lodash from 'lodash'
import VueLodash from 'vue-lodash'

Vue.use(VueLodash, lodash)
import BeerHeader from './Header.vue'
import BeerCard from './BeerCard.vue'
import MonkeyFooter from '../Footer.vue'

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
      get_five_other_beers: function () {
        return this._.sampleSize(this.beers.filter(beer => beer.disabled === false && beer.name !== this.beer.name), 5)
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
    BeerCard,
    MonkeyFooter
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
    height: 50vh;



    .col-8 {
        background-image: url(/static/images/product/bg-shop.jpg);
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
    background-color: #eee;

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
