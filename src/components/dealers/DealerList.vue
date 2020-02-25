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
    {name: 'L\'empreinte', type: 'Resto', link: 'https://www.empreinterestaurant.com/', position: [50.6294906, 3.0205056]},
    {name: 'L\'annexe', type: 'Resto', link: 'https://www.lannexe-lille.fr/', position: [50.65477, 3.0830933]},
    {name: 'Wally\'s Coffee', type: 'Resto/Coffee Shop', link: 'http://wallyscoffee.fr/', position: [50.6327198, 3.062177]},
    {name: 'Le Bloempot', type: 'Resto', link: 'http://www.bloempot.fr/', position: [50.6380896, 3.0560483]},
    {name: 'Le Lovibond', type: 'Bar/Resto', link: 'https://www.facebook.com/Lovibond1.0/', position: [50.6308553, 3.0615832]},
    {name: 'Le Comptoir Végétal', type: 'Resto', link: 'http://le-comptoir-vegetal.fr', position: [50.6379621, 3.0236949]},
    {name: 'Le Court Debout', type: 'Resto', link: 'https://le-court-debout.com', position: [50.6330376, 3.0611566]},
    {name: 'Michel', type: 'Resto', link: 'https://www.instagram.com/michel_lille/', position: [50.6329473, 3.0660118]},
    {name: 'Maki Kozmo', type: 'Resto', link: 'https://www.facebook.com/KOZMOlille/?ref=bookmarks', position: [50.6363241, 3.0631706]},
    {name: 'Le Sebastopol', type: 'Resto', link: 'http://www.restaurantsebastopol.com/', position: [50.6288704, 3.0568223]},
    {name: 'We are ARA', type: 'Resto', link: 'http://www.weareara.com/', position: [50.6368018, 3.0628044]},
    {name: 'Bierbuik Bloemeke', type: 'Resto', link: 'http://www.bierbuik.fr/', position: [50.6393771, 3.0559816]},
    {name: 'BooKKafé', type: 'Resto', link: 'https://www.facebook.com/Bookafebruay/', position: [50.4247591, 2.6291639]},
    {name: 'Auberge du Vert Mont', type: 'Auberge Resto', link: 'http://www.vertmont.fr/', position: [50.7929067, 2.7011755]},
    {name: 'Le Vagabond', type: 'Resto', link: 'https://le-vagabond.net/', position: [50.6461058, 3.0535296]},
    {name: 'Chez mon cousin', type: 'Resto', link: 'http://chezmoncousin.net/', position: [50.6380195, 3.0214976]},
    {name: 'Le Rituel', type: 'Resto/Bar', link: '#', position: [50.6323823, 3.0551686]},
    {name: 'Aux éphérites', type: 'Resto', link: 'https://www.auxepherites.com/', position: [50.6297122, 3.0593384]},
    {name: 'Babe', type: 'Resto/Bar', link: 'http://babe-lille.fr', position: [50.6344238, 3.0589335]},
    {name: 'Les Intrépides', type: 'Store', link: '#', position: [50.6392446, 3.0625697]},

    {name: 'Meltdown', type: 'Bar', link: 'https://www.facebook.com/DisrespectLille/', position: [50.6327164, 3.0513703]},

    {name: 'Bleu Canard', type: 'Resto', link: 'https://www.bleucanard-lille.com/', position: [50.6363465, 3.0637507]},
    {name: 'The Queen Victoria', type: 'Bar', link: 'http://www.queenvictoria.fr/', position: [50.6293788, 3.0564167]},

    {name: 'The Fridge', type: 'Bar', link: 'http://www.thefridge.fr/', position: [50.6308707, 3.0530225]},
    {name: 'Chur Chill', type: 'Bar', link: 'https://www.facebook.com/Church.Chill.Lille/', position: [50.6327391, 3.0495411]},
    {name: 'Cerise sur l\'apéro', type: 'Store', link: '#', position: [50.6469194, 3.0566221]},
    {name: 'Histoire de goût', type: 'Store', link: 'https://www.unehistoiredegouts.fr/', position: [50.6312656, 2.7669805]},
    {name: 'Dame C.', type: 'Bar', link: 'https://bardamec.wixsite.com/ledamec', position: [50.637848, 3.0562262]},
    {name: 'Frères Delassic', type: 'Cheese Stop', link: 'https://www.fromage-delassic.fr/', position: [50.6395753, 3.0624217]},
    {name: 'Caf&diskaire', type: 'Bar', link: 'https://www.facebook.com/lecafediskaire', position: [50.6303986, 3.043088]},

    // Bars
    {name: 'La Dilletante', type: 'Bar', link: 'https://www.facebook.com/LaDiletLille/', position: [50.6433721, 3.0576505]},
    {name: 'Le Barboteur', type: 'Bar/Resto', link: 'https://www.facebook.com/LeBarboteur.restautant.bar/', position: [50.6293752, 3.0191921]},
    {name: 'Uno\'s', type: 'Bar', link: 'http://unosbar.com/', position: [50.6260794, 3.0446603]},
    {name: 'DIY Café', type: 'Bar', link: 'https://www.facebook.com/doityourselfcafe/', position: [50.6275895, 3.0398153]},
    {name: 'La Mousse Touch', type: 'Bar', link: 'https://www.facebook.com/Moussetouch8/', position: [50.6271711, 3.0676324]},
    {name: 'Le Beerchope', type: 'Bar/Cave', link: 'https://www.facebook.com/BeerChopeLille/', position: [50.6415644, 3.0634995]},
//    {name: 'L\'idéal', type: 'Bar/Epicerie', link: 'https://www.facebook.com/Lidealcafeepicerie/', position: [50.6265298, 3.0622277]},
//    {name: 'Le Ressourcerie', type: 'Bar', link: 'https://www.facebook.com/laressourceriebar/', position: [50.636162, 3.059049]},
    {name: 'Taverne Duchenot', type: 'Bar/Resto', link: 'http://taverne-duchenot.fr/', position: [50.749309, 2.250787]},
//    {name: 'L\'illustration', type: 'Bar', link: 'http://www.bar-lillustration.fr/', position: [50.6394789, 3.0562629]},
    {name: 'Le Baragouin', type: 'Bar', link: 'https://www.facebook.com/baragouin/', position: [50.367148, 3.0790493]},
    {name: 'La Capsule', type: 'Bar', link: 'https://www.bar-la-capsule.fr/', position: [50.6404977, 3.0579524]},
//    {name: 'Le café des Six Roses', type: 'Bar', link: 'https://www.facebook.com/les6Roses/', position: [50.6310673, 3.0500399]},
    {name: 'La biche et le renard', type: 'Bar/Shop', link: 'https://www.facebook.com/La-Biche-Le-Renard-653452244737057/', position: [50.6414941, 3.0634136]},
    {name: 'Le fut et à mesure', type: 'Bar', link: 'http://www.aufutetamesure.fr/', position: [50.6328065, 3.0515258]},
    {name: 'Le loc\'ale', type: 'Bar', link: 'https://loc-ale.com/', position: [50.628016, 3.0523155]},
    {name: 'Bière et Compagnie', type: 'Bar', link: 'http://www.bieresetcompagnie.fr/', position: [49.4040926, 2.7839231]},
    {name: 'Le Jaja', type: 'Bar', link: 'https://www.facebook.com/JajaLille/', position: [50.6440966, 3.0563951]},
//    {name: 'Les Chineurs', type: 'Bar', link: 'https://www.facebook.com/Leschineurs.lille/', position: [50.6377921, 3.0561421]},

    // Magasins
    {name: 'SuperQuinquin', type: 'Magasin', link: 'http://superquinquin.fr/', position: [50.6329646, 3.0856811]},
//    {name: 'Mes Voisins Producteurs', type: 'Magasin en ligne', link: 'https://www.mesvoisinsproducteurs.com/collections/bieres-et-cidres', position: [50.6249887, 3.0984093]},
      //    {name: 'Célestin', type: 'Cave', link: 'http://www.celestinlille.fr/', position: [50.639589, 3.059731]},
    {name: 'Bières des Halles', type: 'Magasin', link: 'https://www.facebook.com/quaidessaveurs.59/', position: [50.6266814, 3.0493332]},
    {name: 'L\'épicerie équitable (Halles)', type: 'Magasin', link: 'http://lille.epicerie-equitable.com/', position: [50.6261559, 3.0466974]},
    {name: 'L\'Abbaye des Saveurs', type: 'Cave', link: 'https://www.facebook.com/Abbaye-Des-Saveurs-Lille-286430299047/?rf=250891748442500', position: [50.6406741, 3.0590201]},

    {name: 'La cave de Montreuil', type: 'Cave', link: 'https://lacavedemontreuil.com/', position: [50.4624727, 1.7580777]},
    {name: 'Le Touquet vins', type: 'Cave', link: 'http://www.letouquet-vins.com/', position: [50.5161991, 1.5971495]},
//    {name: 'Robin des Bio', type: 'Magasin', link: 'http://www.robindesbio.org/', position: [50.626514, 3.0650758]},
    {name: 'Les Caves de Jules', type: 'Cave', link: 'http://www.lacavedejules.fr/', position: [50.6535437, 3.076412]},
    {name: 'L\'autre cave', type: 'Cave', link: 'https://www.lautrecave.com/', position: [50.7100186, 2.9957717]},
    {name: 'Les Vins d\'Aurélien', type: 'Cave', link: 'http://www.lesvinsdaurelien.fr/', position: [50.6338339, 3.058698]},
    {name: 'Un grain dans le bocal', type: 'Epicerie', link: 'http://ungraindanslebocal.com/', position: [50.6746152, 3.1815381]},
    {name: 'L\'ilot saveurs', type: '', link: 'https://www.facebook.com/lilotsaveursLeforest/', position: [50.4377566, 3.0606366]},
    {name: 'Les épicentriques', type: 'Epicerie', link: 'http://www.lesepicentriques.fr/', position: [50.626468, 3.0456393]},
    {name: 'Les mains dans le guidon', type: 'Atelier Vélo', link: 'http://www.lesmainsdansleguidon.fr/', position: [50.629381, 3.0520384]},

    // Hotel
    //    {name: 'Novotel Centre Gares', type: 'Hotel', link: 'https://www.accorhotels.com/fr/hotel-3165-novotel-lille-centre-gares/index.shtml', position: [50.6345226, 3.0711482]},
    {name: 'Clarance', type: 'Hotel', link: 'https://www.clarancehotel.com/', position: [50.6388153, 3.0547882]}

    // livraison
    // {name: 'La Coroutine', type: 'Espace de Coworking (Livraison)', link: 'http://lacoroutine.org/', position: [50.629472, 3.069627]},
    // {name: 'Le Mutualab', type: 'Espace de Coworking (Livraison)', link: 'https://www.mutualab.org/', position: [50.6296492, 3.0592892]}
    // {name: 'Ruche de Lille-Europe', type: 'Ruche (Livraison)', link: 'https://laruchequiditoui.fr/fr/assemblies/9523', position: [50.639412, 3.075413]},
    // {name: 'Ruche d\'Euratechnologies', type: 'Ruche (Livraison)', link: 'https://laruchequiditoui.fr/fr/assemblies/811', position: [50.633315, 3.020232]}
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
