// -*- mode: vue; js-indent-level: 2; -*-
<template lang="html">

  <div class="recycle">
    <beer-header title-img="/static/images/recycle/logo.png" nolink></beer-header>

    <b-row align-h="center" no-gutters  class="paragraphs">
      <b-col cols="8">
        <b-row align-h="center" no-gutters>
          <b-col>
            <b-row class="paragraphs-row" no-gutters >
              <b-col class="text" align-v="bottom" sm="12">

                <h2>Nos bouteilles ressuscitent !</h2>

                <p>
                  <blockquote>En 2018, environ <strong>24.000 bouteilles</strong> seront
                  sauvées des déchetteries lilloises par la brasserie.</blockquote>
                </p>

              </b-col>

              <b-col class="text" align-v="bottom" sm="6">
                <p>
                  Plus de <strong>99%</strong> des bouteilles utilisées à la
                  brasserie sont collectées via notre <strong>filière de récupération</strong> de
                  verre. Ces bouteilles, normalement <strong>destinées à la benne</strong> car
                  <strong>non consignées</strong>, sont cependant <strong>parfaitement réutilisables</strong>.
                </p>
              </b-col>

              <b-col class="text" align-v="bottom" sm="6">
                <p>
                  Plus de <strong>99%</strong> des bouteilles utilisées à la
                  brasserie sont collectées via notre <strong>filière de récupération</strong> de
                  verre. Ces bouteilles, normalement <strong>destinées à la benne</strong> car
                  <strong>non consignées</strong>, sont cependant <strong>parfaitement réutilisables</strong>.
                </p>
              </b-col>


              <b-col align-v="bottom" sm="12">
                <d-player ref="player" :options="video_options"></d-player>
              </b-col>

              <b-col class="text" align-v="bottom" sm="6">
                <h4>Merci aux pros !</h4>
                <p>
                  De nombreux partenaires (bars, restaurants, traiteurs, …) nous
                  accompagnent pour mener cette mission à bien et nous donnent
                  leurs bouteilles non consignées pour que nous puissions leur
                  offrir une seconde vie. C'est grâce à eux que nous avons assez
                  de bouteilles pour satisfaire l'appétit toujours grandissant
                  que les Lillois ont pour les bières du Singe.
                </p>

                <v-map ref="map" class="dealer-map" :zoom="zoom" :min-zoom="minZoom" :max-zoom="maxZoom" :center="center">
                  <v-tilelayer url="http://{s}.tile.stamen.com/toner-lite/{z}/{x}/{y}.png"></v-tilelayer>
                  <v-marker v-for="dealer in dealers" :key="dealer.name" :icon="stickerIcon" :lat-lng="dealer.position" :title="dealer.name" :draggable="false">
                    <v-popup :content="make_popup_content(dealer)">
                    </v-popup>
                  </v-marker>
                </v-map>
                
              </b-col>


              <b-col class="text" align-v="bottom" sm="6">
                <h4>Vous faîtes la différence</h4>
                <p>
                  Vous pouvez également nous ramener vos bouteilles de bière
                  vides à la brasserie.
                </p>
              </b-col>

            </b-row>
          </b-col>
        </b-row>

        <monkey-footer/>
      </b-col>
    </b-row>
  </div>


</template>

<script lang="js">
import { mapState } from 'vuex'

import L from 'leaflet'
import MonkeyFooter from './Footer'
import BeerHeader from './beers/Header'

import VueDPlayer from 'vue-dplayer'
import 'vue-dplayer/dist/vue-dplayer.css'

import Vue2Leaflet from 'vue2-leaflet'

var ResizedIcon = L.Icon.extend({options: {iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20]}})

var data = {
  video_options: {
    video: {
      url: '/static/videos/bottle-recycling.webm'
      // pic: 'http://static.smartisanos.cn/pr/img/video/video_03_cc87ce5bdb.jpg'
    },
    autoplay: false
  },
  zoom: 13.0,
  minZoom: 13.0,
  maxZoom: 15.0,
  center: [50.6330, 3.0612],
  stickerIcon: new ResizedIcon({iconUrl: '/static/images/marker-icon.png'}),
  partners: [
    {name: 'Brasserie du Singe Savant', type: 'Quartiers Généraux!', link: 'http://www.singe-savant.com/', position: [50.619011, 3.077805]}
  ]
}

export default {
  name: 'Recycle',

  components: {
    'v-tilelayer': Vue2Leaflet.TileLayer,
    'v-marker': Vue2Leaflet.Marker,
    'v-map': Vue2Leaflet.Map,
    'v-popup': Vue2Leaflet.Popup,
    'monkey-footer': MonkeyFooter,
    BeerHeader,
    'd-player': VueDPlayer
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
  @import "~leaflet/dist/leaflet.css";

.paragraphs {
    background-color: #eee;
}

.paragraphs-row {
    margin-top: -10vh;
    background-color: white;
    margin-bottom: 10vh;
    padding-bottom: 10vh;

    img.full {
        width:100%;
        height: 100%;
        object-fit:contain;
    }

    .text {
        padding: 10px;
        text-align: justify;

        p {
            font-weight: 300;
        }

    }
}

.beer-header {
    background-image: url(/static/images/recycle/header.jpg) !important;
    background-position: 10%;
}

blockquote {
    background: #f9f9f9;
    border-left: 10px solid #ccc;

    padding: 0.5em 10px;
    quotes: "\201C""\201D""\2018""\2019";

    font-weight: 300;
    font-style: italic;
}
blockquote:before {
    color: #ccc;
    content: open-quote;
    font-size: 4em;
    line-height: 0.1em;
    margin-right: 0.25em;
    vertical-align: -0.4em;
}
blockquote p {
    display: inline;
}


</style>
