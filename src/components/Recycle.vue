// -*- mode: vue; js-indent-level: 2; -*-
<template lang="html">
  <div id="recycle">
    <h1>Projet 0:<br/>Re-cycle</h1>

    <div class="page">
      <h2>??</h2>
      <p>Le singe et son équipe se sont donné pour mission de garder leur jungle urbaine propre et respirable.</p>
      <p>Par exemple la brasserie s'est fixée comme règle de n'utiliser que des bouteilles de réutilisation, pour qu'aucune bouteille neuve ne soit fondue au nom du Singe.</p>

      <p>Pour mener cette mission à bien, on a besoin de vous!</p>

      <p>Sur la carte suivante se trouvent les points de collecte du singe dans lesquels vous pouvez déposer vos bouteilles vide.</p>

      <div id="app" style="height: 100%">
        <v-map :zoom=13 :center="[51.505, -0.09]">
          <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
          <v-marker :lat-lng="[51.500, 0.00]"></v-marker>
        </v-map>
      </div>

      <p>Faites gaffe, toutes les bouteilles ne sont pas récupérable, les bouteilles déposées doivent respecter la charte suivante :

*INFOGRAPHIE*

    Pour vous récompenser de vos services vous recevrez des crédits directement utilisable à la brasserie.</p>

      <p>Que la collecte commence !</p>

    </div>
  </div> <!-- /recycle -->
</template>

<script lang="js">
import { mapState } from 'vuex'

import Vue2Leaflet from 'vue2-leaflet'

var data = {
}

export default {
  name: 'Recycle',

  components: {
    'v-tilelayer': Vue2Leaflet.TileLayer,
    'v-marker': Vue2Leaflet.Marker,
    'v-map': Vue2Leaflet.Map
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


<style lang="scss" scoped>
  #recycle {
    background-color: #14141e;
    background-repeat: repeat;
    background-position: center top;
    width: 100%;
    height: 100%;

    padding-top: 50px;

                h1 {
                    background-image: url('/static/images/brewshop/logo.png');
                    background-size: auto 100%;
                    background-repeat: no-repeat no-repeat;

                    padding-left: 120px;
                    padding-top: 5px;
margin-left: 50px;

                    font-size: 4em;
                    color: white;
                    text-transform: uppercase;
                    line-height: 80%
                }


    .page {
       background-color: white;
       margin: 50px;
       margin-top: 10px;
       color: grey;
        padding: 40px;

               h2 {
                   color: black;
                   font-size: 2.5em;
                   text-transform: uppercase;
                   margin-bottom: 0px;
               }

   }
  }
</style>
