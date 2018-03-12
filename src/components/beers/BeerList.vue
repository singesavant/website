// -*- mode: vue; js-indent-level: 2; -*-
<template lang="html">
  <div class="product">
    <beer-header title="Les Bières"></beer-header>

    <b-row class="justify-content-md-center">
      <b-col cols="10">
        <b-row class="justify-content-md-center beer-list" align-v="top">
          <b-col class="align-bottom" sm="3" align="center" cols="2" v-for="beer in orderBy(beers_in_production,'name')" :key="beer.name">
            <beer-card :beer="beer"/>
          </b-col>
        </b-row>
      </b-col>
    </b-row>


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

var data = {
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
    BeerCard
  },

  data: function () {
    return data
  },
  mounted: function () {
    this.$store.dispatch('LOAD_BEER_LIST')
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.beer-list {
  margin-top: 50px;
}



.old-beers{
    background-color: #eee;
    margin-top: 30px;

    h2 {
        margin-top: 20px;
    }
}
</style>
