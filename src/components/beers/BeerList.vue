// -*- mode: vue; js-indent-level: 2; -*-
<template lang="html">
  <div class="product-list">
    <beer-header title-img="/images/home/beers_text.png" nolink></beer-header>

    <b-overlay :show="is_loading">
      <b-row v-if="gifts_in_production.length > 0" align-h="center" class="gifts-section">
        <b-col cols="8">
          <center><h2>Packs et idées (auto)cadeaux</h2></center>
          <b-row align-h="center" class="available-gifts">
            <b-col>
              <b-row class="gift-list" align-v="top">
                <b-col align-v="bottom" sm="4" align="center" v-for="gift in orderBy(gifts_in_production,'name')" :key="gift.web_name">
                  <beer-card :beer="gift"/>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-col>
      </b-row>

      <b-row align-h="center" class="beers-section">
        <b-col cols="8">
          <center><h2>Les biéres en vente à la <router-link :to="{name: 'contact'}" class="title-link">boutique</router-link> actuellement</h2></center>
          <b-row align-h="center" class="available-beers">
            <b-col>
              <b-row class="beer-list" align-v="top">
                <b-col align-v="bottom" sm="4" align="center" v-for="beer in orderBy(beers_in_production,'name')" :key="beer.web_name">
                  <beer-card :beer="beer"/>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-overlay>
    <monkey-footer/>
  </div>
</template>

<script lang="js">
import { mapState } from 'vuex'
import BeerHeader from './Header'
import BeerCard from './BeerCard'
import MonkeyFooter from '../Footer'
import Vue2Filters from 'vue2-filters'

var data = {
  is_loading: false
}

export default {
  name: 'BeerList',

  computed: {
    ...mapState([
      'beers',
      'gifts'
    ]),

    beers_in_production: function () {
      return this.beers.filter(beer => beer.published === true)
    },

    beers_not_produced_anymore: function () {
      return this.beers.filter(beer => beer.published === true)
    },

    gifts_in_production: function () {
      return this.gifts.filter(gift => gift.published === true)
    }
  },

  components: {
    BeerHeader,
    BeerCard,
    MonkeyFooter
  },

  mixins: [Vue2Filters.mixin],

  data: function () {
    return data
  },
  mounted: function () {
    this.is_loading = true
    Promise.all([
      this.$store.dispatch('LOAD_BEER_LIST'),
      this.$store.dispatch('LOAD_BEER_LIST', { item_group: 'cadeaux' })
    ]).then(() => {
      this.is_loading = false
    })
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.beer-list {
  margin-top: 20px;
}

.product-list {
    background-color: #eee;
}

.beers-section {
    margin-top: 10px;
}

.available-beers {
    background-color: white;
    margin-bottom: 10vh;
    padding-bottom: 10px;
}

.gifts-section {
    margin-top: 20px;
}

.gift-list {
  margin-top: 20px;
}

.available-gifts {
    background-color: white;
    margin-bottom: 20px;
    padding-bottom: 10px;
}


.title-link {
    color: #212529 !important;
    text-decoration: none;
    
    &:hover {
        color: #212529 !important;
        text-decoration: none;
    }
    
    &:visited {
        color: #212529 !important;
    }
}

.old-beers{
    background-color: #eee;
    margin-top: 10px;

    h2 {
        width: 100%;
        text-align: center;
        margin-bottom: 30px;
    }
}
</style>
