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

      <l-map :zoom="zoom" :center="center" :min-zoom="minZoom" :max-zoom="maxZoom">
        <l-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" :attribution="attribution"></l-tilelayer>
        <l-marker :position="center" :title="title" :opacity="opacity" :draggable="draggable">
          <l-tooltip content="a tooltip"></l-tooltip>
        </l-marker>

        <l-marker :position="marker" :title="title" :opacity="opacity" :draggable="false">
          <l-popup content="a popup"></l-popup>
        </l-marker>
      </l-map>

      <p>Faites gaffe, toutes les bouteilles ne sont pas récupérable, les bouteilles déposées doivent respecter la charte suivante :

*INFOGRAPHIE*

    Pour vous récompenser de vos services vous recevrez des crédits directement utilisable à la brasserie.</p>

      <p>Que la collecte commence!</p>

    </div>
  </div> <!-- /recycle -->
</template>

<script lang="js">
import { mapState } from 'vuex'

var data = {
  zoom: 13,
  center: [51.505, -0.09],
  marker: [51.500, 0.00],
  minZoom: 8,
  maxZoom: 15,
  url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
  attribution: 'vue-leaflet',
  title: 'vue-leaflet',
  opacity: 1,
  draggable: true,
  attributionControl: false
}

export default {
  name: 'Recycle',

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
