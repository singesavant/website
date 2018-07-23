// -*- mode: vue; js-indent-level: 2; -*-
<template lang="html">
  <b-row no-gutters class="dealer-map-container">
    <b-col cols=12>
      <v-map ref="map" class="dealer-map" :zoom="zoom" :min-zoom="minZoom" :max-zoom="maxZoom" :center="center">
        <v-tilelayer url="http://{s}.tile.stamen.com/toner-lite/{z}/{x}/{y}.png"></v-tilelayer>

        <v-marker v-for="dealer in dealers" :key="dealer.name" :icon="stickerIcon" :lat-lng="dealer.position" :title="dealer.name" :draggable="false">
          <v-popup :content="make_popup_content(dealer)">
          </v-popup>
        </v-marker>

      </v-map>

      <monkey-footer/>
    </b-col>
  </b-row>

</template>

<script lang="js">
import Vue2Leaflet from 'vue2-leaflet'
import L from 'leaflet'
import MonkeyFooter from '../Footer'

var ResizedIcon = L.Icon.extend({options: {iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20]}})

var data = {
  zoom: 13.0,
  minZoom: 13.0,
  maxZoom: 15.0,
  center: [50.6330, 3.0612],
  stickerIcon: new ResizedIcon({iconUrl: '/static/images/marker-icon.png'}),

  dealers: [
    {name: 'Brasserie du Singe Savant', type: 'Quartiers Généraux!', link: 'http://www.singe-savant.com/', position: [50.619011, 3.077805]},

    // Restaurants
    // {name: 'La Rumeur', type: 'Bar/Resto', link: 'https://www.facebook.com/larumeur.fr/', position: [50.623532, 3.0730003]},
    {name: 'Ripaille', type: 'Resto', link: 'http://www.ripaille-lille.fr/', position: [50.6386031, 3.0560171]},
    {name: 'BelleRose', type: 'Bar/Resto', link: 'https://www.bellerose.fr/', position: [50.6391984, 3.0565078]},
    {name: 'La face B', type: 'Resto', link: 'http://lafaceblille.com/', position: [50.6236689, 3.0405098]},

    // Bars
    {name: 'Uno\'s', type: 'Bar', link: 'http://unosbar.com/', position: [50.6260794, 3.0446603]},
    {name: 'DIY Café', type: 'Bar', link: 'https://www.facebook.com/doityourselfcafe/', position: [50.6275895, 3.0398153]},
    {name: 'La Mousse Touch', type: 'Bar', link: 'https://www.facebook.com/Moussetouch8/', position: [50.6271711, 3.0676324]},
    {name: 'Le Beerchope', type: 'Bar/Cave', link: 'https://www.facebook.com/BeerChopeLille/', position: [50.6415644, 3.0634995]},
    {name: 'L\'idéal', type: 'Bar/Epicerie', link: 'https://www.facebook.com/Lidealcafeepicerie/', position: [50.6265298, 3.0622277]},
    {name: 'Le Ressourcerie', type: 'Bar', link: 'https://www.facebook.com/laressourceriebar/', position: [50.636162, 3.059049]},
    {name: 'Taverne Duchenot', type: 'Bar/Resto', link: 'http://taverne-duchenot.fr/', position: [50.749309, 2.250787]},
    {name: 'L\'illustration', type: 'Bar', link: 'http://www.bar-lillustration.fr/', position: [50.6394789, 3.0562629]},

    // Magasins
    {name: 'SuperQuinquin', type: 'Magasin', link: 'http://superquinquin.fr/', position: [50.6329646, 3.0856811]},
    {name: 'Mes Voisins Producteurs', type: 'Magasin en ligne', link: 'https://www.mesvoisinsproducteurs.com/collections/bieres-et-cidres', position: [50.6249887, 3.0984093]},
      //    {name: 'Célestin', type: 'Cave', link: 'http://www.celestinlille.fr/', position: [50.639589, 3.059731]},
    {name: 'Quai des saveurs (Halles)', type: 'Magasin', link: 'https://www.facebook.com/quaidessaveurs.59/', position: [50.6266814, 3.0493332]},
    {name: 'L\'épicerie équitable (Halles)', type: 'Magasin', link: 'http://lille.epicerie-equitable.com/', position: [50.6261559, 3.0466974]},
    {name: 'L\'Abbaye des Saveurs', type: 'Cave', link: 'https://www.facebook.com/Abbaye-Des-Saveurs-Lille-286430299047/?rf=250891748442500', position: [50.6406741, 3.0590201]},
    {name: 'Robin des Bio', type: 'Magasin', link: 'http://www.robindesbio.org/', position: [50.626514, 3.0650758]},
    {name: 'Les Caves de Jules', type: 'Cave', link: 'http://www.lacavedejules.fr/', position: [50.6535437, 3.076412]},
    {name: 'Les Vins d\'Aurélien', type: 'Cave', link: 'http://www.lesvinsdaurelien.fr/', position: [50.6338339, 3.058698]},
    {name: 'Un grain dans le bocal', type: 'Epicerie', link: 'http://ungraindanslebocal.com/', position: [50.6746152, 3.1815381]},
    {name: 'L\'ilot saveurs', type: '', link: 'https://www.facebook.com/lilotsaveursLeforest/', position: [50.4377566, 3.0606366]},

    // livraison
    {name: 'La Coroutine', type: 'Espace de Coworking (Livraison)', link: 'http://lacoroutine.org/', position: [50.629472, 3.069627]},
    {name: 'Ruche de Lille-Europe', type: 'Ruche (Livraison)', link: 'https://laruchequiditoui.fr/fr/assemblies/9523', position: [50.639412, 3.075413]},
    {name: 'Ruche d\'Euratechnologies', type: 'Ruche (Livraison)', link: 'https://laruchequiditoui.fr/fr/assemblies/811', position: [50.633315, 3.020232]}
  ]
}

export default {
  name: 'DealerList',

  components: {
    'v-tilelayer': Vue2Leaflet.TileLayer,
    'v-marker': Vue2Leaflet.Marker,
    'v-map': Vue2Leaflet.Map,
    'v-popup': Vue2Leaflet.Popup,
    'monkey-footer': MonkeyFooter
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
    make_popup_content (dealer) {
      return '<a href="' + dealer.link + '" target="_new">' + dealer.name + '</a> (' + dealer.type + ')'
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~leaflet/dist/leaflet.css";

  .dealer-map-container {
    height: 100vh;
  }

  .dealer-map {
      z-index:1;
      width: 100%;
      height: 100%;
    }

</style>
