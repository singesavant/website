// -*- mode: vue; js-indent-level: 2; -*-
<template lang="html">
  <div class="product">
    <div class="header">
      <div class="title">
        <div class="rectangle">
          <h1>Les<br/>Bières</h1>
        </div>
        <div class="triangle">
        </div>
      </div>
    </div>


    <h2>Actuellement</h2>

    <b-row>
      <b-col cols="2" v-for="beer in beers_in_production" :key="beer.name">
        <b-card :title="beer.name"
                :img-src="beer.thumbnail|erp_static_url"
                :img-alt="beer.name">
          <p class="card-text" v-html="$options.filters.truncate(beer.description_html, 200, '...')"></p>

          <router-link :to="{name: 'beer-detail', params: {slug: beer.code}}">Voir</router-link>
        </b-card>
      </b-col>
    </b-row>

    <h2>Les anciennes</h2>

    <b-row>
      <b-col cols="2" v-for="beer in beers_not_produced_anymore" :key="beer.name">
        <b-card :title="beer.name"
                :img-src="beer.thumbnail|erp_static_url"
                :img-alt="beer.name">
          <p class="card-text" v-html="$options.filters.truncate(beer.description_html, 200, '...')"></p>

          <router-link :to="{name: 'beer-detail', params: {slug: beer.code}}">Voir</router-link>
        </b-card>
      </b-col>
    </b-row>

  </div>
</template>

<script lang="js">
import { mapState } from 'vuex'

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
  },
  filters: {
    erp_static_url (uri) {
      return 'https://erp.singe-savant.com/' + uri
    }
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
