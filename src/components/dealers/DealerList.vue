// -*- mode: vue; js-indent-level: 2; -*-
<template lang="html">
  <b-row no-gutters class="dealer-map-container">
    <b-col cols=12>
      <v-map class="dealer-map" :zoom="zoom" :min-zoom="minZoom" :max-zoom="maxZoom" :center="center">
        <v-tilelayer url="http://{s}.tile.stamen.com/toner-lite/{z}/{x}/{y}.png"></v-tilelayer>

        <v-marker v-for="dealer in dealers" :key="dealer.name" :lat-lng="dealer.position" :title="dealer.name" :draggable="false">
          <v-popup :content="dealer.type"></v-popup>
        </v-marker>

      </v-map>
    </b-col>
  </b-row>
</template>

<script lang="js">
import Vue2Leaflet from 'vue2-leaflet'

var data = {
  zoom: 13.0,
  minZoom: 13.0,
  maxZoom: 15.0,
  center: [50.6330, 3.0612],

  dealers: [
    {name: 'La Rumeur', type: 'Bar/Resto', link: 'https://www.facebook.com/larumeur.fr/', position: {lat: 50.623532, lng: 3.0730003}}
  ]
}

export default {
  name: 'DealerList',

  components: {
    'v-tilelayer': Vue2Leaflet.TileLayer,
    'v-marker': Vue2Leaflet.Marker,
    'v-map': Vue2Leaflet.Map,
    'v-popup': Vue2Leaflet.Popup
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
  @import "~leaflet/dist/leaflet.css";

  .dealer-map-container {
    height: 500px;
  }

  .dealer-map {
      z-index:1;
      width: 100%;
      height: 100vh;
    }

</style>
