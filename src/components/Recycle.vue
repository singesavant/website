// -*- mode: vue; js-indent-level: 2; -*-
<template lang="html">

  <div class="recycle">
    <beer-header title-img="/images/recycle/logo.png" nolink></beer-header>

    <b-row align-h="center" no-gutters  class="paragraphs">
      <b-col cols="8">
        <b-row align-h="center" no-gutters>
          <b-col>
            <b-row class="paragraphs-row" no-gutters >
              <b-col class="text" align-v="bottom" sm="12">

                <h2>Un Singe, des Bouteilles et une Diva</h2>

                <p>
                  <q>En 2018, environ <strong>24.000 bouteilles</strong> seront
                  sauvées des déchetteries lilloises par la brasserie.</q>
                </p>

              </b-col>

              <b-col class="text" align-v="bottom" sm="6">
                <h3></h3>
                <p>
                  Plus de <strong>60%</strong> des bouteilles utilisées à la
                  brasserie sont issues de <strong>notre filière de
                  récupération</strong> de verre, mise en place dès le début du
                  projet.
                </p>

                <p>
                  Ces bouteilles récoltées, normalement <strong>destinées à la
                  benne</strong> car <strong>non consignées</strong>, sont
                  cependant <strong>parfaitement réutilisables</strong>.
                </p>

                <p>
                  Faire fondre une nouvelle bouteille consomme
                  environ <strong>345g de CO2</strong> (<em>source</em>
                  : <a target="_new"
                  href="https://www.consoglobe.com/tetra-pak-emballe-verre-2511-cg">tetrapak</a>),
                  alors que notre filière semble consommer <strong>moins de 30g
                  de CO2</strong> par bouteille selon nos <a href="#"
                  v-b-tooltip.hover title="On les publie bientôt !">premiers
                  calculs</a>, soit environ <strong>12 fois moins</strong>...
                  autant vous dire qu'<strong>on continue d'y croire</strong> !
                </p>

              </b-col>

              <b-col class="text" align-v="bottom" sm="6">
                <h4>Le chant de la <em>Diva</em></h4>
                <p>
                  C'est grâce à notre <strong>laveuse de 1972</strong>, rachetée
                  et importée de Suisse, que nous pouvons laver un peu plus
                  de <strong>300 bouteilles par heure</strong> et ainsi être
                  autonomes.
                </p>
                
                <p>
                  Appelée chez nous "la <em>Diva</em>" pour son chant mécanique,
                  elle permet de <strong>décoller les étiquettes</strong>
                  et <strong>résidus organiques</strong> à l’intérieur des
                  bouteilles grâce à des jets à haute pression et des brosses
                  supersoniques. Les bouteilles sont ensuite rincées et
                  désinfectées pour être prêtes pour <strong>une nouvelle
                  vie</strong>.
                </p>
              </b-col>


              <b-col align-v="bottom" sm="12">
                <d-player ref="player" :options="video_options"></d-player>
              </b-col>

              <b-col class="text" align-v="bottom" sm="6">
                <h4>Merci aux pros !</h4>
                <p>
                  Grâce aux <strong>partenaires</strong> (bars, restaurants,
                  traiteurs, …) qui nous ont fait <strong>confiance</strong> et
                  ont été <strong>enthousiastes</strong> par cette idée folle,
                  nous récoltons aujourd'hui lors de <strong>nos
                  tournées</strong> la <strong>majeure partie des
                  bouteilles</strong> nécessaires à couvrir l'appétit toujours
                  grandissant des lillois pour les bières du Singe.
                </p>

                <p>
                  Vous pouvez retrouver la <strong>liste de nos
                  partenaires</strong> sur la carte ci-dessous : <strong>big
                  up</strong> pour leur participations !<br/> Par ailleurs, si vous êtes pro ou
                  connaissez un potentiel spot de ramassage sur la Métropole,
                  n'hésitez pas à
                  <router-link :to="{name: 'contact'}">nous contacter</router-link> !
                </p>

                <l-map ref="recycle-map" class="recycle-map" :zoom="zoom" :min-zoom="minZoom" :max-zoom="maxZoom" :center="center">
                  <l-tile-layer url="http://{s}.tile.stamen.com/toner-lite/{z}/{x}/{y}.png"></l-tile-layer>
                  <l-marker v-for="partner in partners" :key="partner.name" :icon="stickerIcon" :lat-lng="partner.position" :title="partner.name" :draggable="false">
                    <l-popup :content="make_popup_content(partner)">
                    </l-popup>
                  </l-marker>
                </l-map>

              </b-col>


              <b-col class="text" align-v="bottom" sm="6">
                <h4>Vous faîtes la différence</h4>
                <p>
                  Sans <strong>votre aide</strong>, nous ne récupérons
                  qu’une <strong>infime partie</strong> des bouteilles que nous
                  distribuons.
                </p>

                <p>
                  C'est pourquoi vous pouvez nous ramener <strong>toutes les bouteilles vides du singe savant</strong>
                  directement <router-link :to="{name: 'contact'}">à la
                  brasserie</router-link>. C'est aussi une bonne occasion pour
                  venir <strong>découvrir les nouveautés et
                  avant-premières</strong>, vous ne perdrez pas votre temps, on
                  a toujours quelque chose à vous raconter !
                </p>

                <p>
                  Vous souhaitez <strong>vous organiser</strong> entre voisins,
                  colocs, ami-e-s, collègues ou autres pour nous rendre vos bouteilles vides ?
                  C'est tout à fait possible ! Nous
                  pouvons <strong>venir les récupérer chez vous</strong> à partir
                  de <strong>100 bouteilles du Singe</strong> collectées. N'hésitez pas à
                  <router-link :to="{name: 'contact'}">nous contacter</router-link>.
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

import { LMap, LMarker, LPopup, LTileLayer } from 'vue2-leaflet'

var ResizedIcon = L.Icon.extend({options: {iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20]}})

var data = {
  video_options: {
    video: {
      url: '/videos/bottle-recycling.webm'
      // pic: 'http://static.smartisanos.cn/pr/img/video/video_03_cc87ce5bdb.jpg'
    },
    autoplay: false
  },
  zoom: 13.0,
  minZoom: 13.0,
  maxZoom: 15.0,
  center: [50.6330, 3.0612],
  stickerIcon: new ResizedIcon({iconUrl: '/images/marker-icon.png'}),
  partners: [
    {name: 'Ripaille', type: 'Resto', link: 'http://www.ripaille-lille.fr/', position: [50.6386031, 3.0560171]},
    // Bars
    {name: 'Uno\'s', type: 'Bar', link: 'http://unosbar.com/', position: [50.6260794, 3.0446603]},
    {name: 'DIY Café', type: 'Bar', link: 'https://www.facebook.com/doityourselfcafe/', position: [50.6275895, 3.0398153]},
    {name: 'La Mousse Touch', type: 'Bar', link: 'https://www.facebook.com/Moussetouch8/', position: [50.6271711, 3.0676324]},
    {name: 'Le Beerchope', type: 'Bar/Cave', link: 'https://www.facebook.com/BeerChopeLille/', position: [50.6415644, 3.0634995]},
    {name: 'L\'idéal', type: 'Bar', link: 'https://www.facebook.com/Lidealcafeepicerie/', position: [50.6264965, 3.0643873]},
    {name: 'L\'Annexe', type: 'Bar', link: 'https://www.facebook.com/AnneSoetAlex/', position: [50.65475, 3.08534]},
    {name: 'Le Monde Moderne', type: 'Bar', link: 'https://www.facebook.com/lemondemoderne/', position: [50.63753, 3.06385]},
    {name: 'Lokarria', type: 'Bar', link: 'https://www.facebook.com/Lokarria-1411907759105354/', position: [50.6271622, 3.0570218]},
    {name: 'La Ripaille', type: 'Bar', link: 'https://www.facebook.com/ripaillelille/', position: [50.63878, 3.0560813]},
    {name: 'Le Beerstro', type: 'Bar', link: 'https://www.facebook.com/beerstrolille/', position: [50.643328, 3.0584703]},

    // Magasins
    {name: 'SuperQuinquin', type: 'Magasin', link: 'http://superquinquin.fr/', position: [50.6329646, 3.0856811]}
  ]
}

export default {
  name: 'Recycle',

  components: {
    LMap,
    LPopup,
    LMarker,
    LTileLayer,

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
    make_popup_content (dealer) {
      return '<a href="' + dealer.link + '" target="_new">' + dealer.name + '</a> (' + dealer.type + ')'
    }
  },
  computed: mapState([])
}
</script>


<style lang="scss" scoped>
@import "~leaflet/dist/leaflet.css";

h2 {
    font-variant: small-caps;
}


.recycle-map  {
    width: 100%;
    position: relative;
    display: block !important;
    height: 40vh;
}


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
        padding: 3vh;
        text-align: justify;

        p {
            font-weight: 300;
        }

    }
}

.beer-header {
    background-image: url(/images/recycle/header.jpg) !important;
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
