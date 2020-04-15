// -*- mode: vue; js-indent-level: 2; -*-
<template lang="html">
  <div class="product-list">
    <beer-header title-img="/images/home/beers_text.png" nolink></beer-header>

    <b-overlay :show="is_loading">
      <b-row align-h="center">
      <b-col cols="8">
        <b-row align-h="center" class="available-beers">
          <b-col>
            <b-row class="beer-list" align-v="top">
              <b-col align-v="bottom" sm="4" align="center" v-for="beer in orderBy(beers_in_production,'name')" :key="beer.name">
                <beer-card :beer="beer"/>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    <b-row align-h="center">
      <b-col cols="8">
        <b-row align-h="center" class="old-beers">
          <h2 class="old-header">.:[Vous avez tout bu]:.</h2>
          <b-col>
            <b-row class="beer-list" align-v="top">
              <b-col align-v="bottom" sm="4" align="center" v-for="beer in orderBy(beers_not_produced_anymore,'name')" :key="beer.name">
                <beer-card :beer="beer"/>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    </b-overlay>


    <monkey-footer/>


    <!--

    <b-row class="justify-content-md-center old-beers">
      <b-col cols="10">
        <h2>Vous avez tout bu :</h2>

        <b-row class="justify-content-md-center beer-list">
          <b-col align="center" cols="2" v-for="beer in orderBy(beers_not_produced_anymore, 'name')" :key="beer.name">
            <beer-card :beer="beer"/>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    -->

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
      'beers'
    ]),

    beers_in_production: function () {
      return this.beers.filter(beer => beer.disabled === false)
    },

    beers_not_produced_anymore: function () {
      return this.beers.filter(beer => beer.disabled === true)
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
    this.$store.dispatch('LOAD_BEER_LIST')
      .then(() =>
            this.is_loading = false
           )
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.beer-list {
  margin-top: 50px;
}

.product-list {
    background-color: #eee;
}

.available-beers {
    margin-top: -10vh;
    background-color: white;
    margin-bottom: 10vh;
    padding-bottom: 10vh;
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
