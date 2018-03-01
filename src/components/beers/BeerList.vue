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

    <b-row class="justify-content-md-center">
      <b-col cols="10">
        <b-row class="justify-content-md-center beer-list" align-v="top">
          <b-col class="align-bottom" sm="3" align="center" cols="2" v-for="beer in orderBy(beers_in_production,'name')" :key="beer.name">
            <router-link :to="{name: 'beer-detail', params: {slug: beer.code}}">
              <div class="beer">
                <img class="beer-label-round" :src="beer.thumbnail|erp_static_url" :alt="beer.name">
                <!-- <p class="card-text" v-html="$options.filters.truncate(beer.description_html, 200, '...')"></p> -->
                <h3>{{ beer.name }}</h3>
              </div>
            </router-link>
          </b-col>
        </b-row>
      </b-col>
    </b-row>


    <b-row class="justify-content-md-center old-beers">
      <b-col cols="10">
        <h2>Vous avez tout bu :</h2>

        <b-row class="justify-content-md-center beer-list">
          <b-col align="center" cols="2" v-for="beer in beers_not_produced_anymore" :key="beer.name">
            <router-link :to="{name: 'beer-detail', params: {slug: beer.code}}">
              <div class="beer">
                <img class="beer-label-round" :src="beer.thumbnail|erp_static_url" :alt="beer.name">
                <!-- <p class="card-text" v-html="$options.filters.truncate(beer.description_html, 200, '...')"></p> -->
                <h3>{{ beer.name }}</h3>
              </div>
            </router-link>
          </b-col>
        </b-row>
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

<style lang="scss" scoped>
.beer-list {
  margin-top: 50px;
}

.beer-label-round {
    border: 1px solid black;
    width: 90%;
    object-fit: fill;
    clip-path: circle(35% at center);

    padding: 0px;
    margin: -30px;
}

.beer {
    color:black;
    font-variant: small-caps;


    img {
        transition: all .3s ease-in-out;
    }

    &:hover {

      img {
        transition: all .3s ease-in-out;
        transform: scale(1.05);
      }
    }
}

.old-beers{
    background-color: #eee;
    margin-top: 30px;

    h2 {
        margin-top: 20px;
    }
}
</style>
