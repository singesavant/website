// -*- mode: vue; js-indent-level: 2; -*-
<template lang="html">
  <b-row no-gutters class="dealer-map-container">
      <b-col cols=12>
          <div class="zoom-controls">
              <button @click="zoomIn" class="zoom-btn zoom-in">+</button>
              <button @click="zoomOut" class="zoom-btn zoom-out">−</button>
          </div>

          <div class="filter-icons">
              <div 
                  v-for="type in availableTypes" 
                  :key="type" 
                  class="filter-icon"
                  :class="{ 'filter-icon-active': selectedTypes.includes(type) }"
                  @click="toggleType(type)"
              >
                  <i :class="getMarkerIconClass(type)"></i>
                  <div class="filter-tooltip">{{ type }} ({{ getDealerCountByType(type) }})</div>
              </div>
          </div>

          <MglMap ref="map" :accessToken="accessToken" :mapStyle="mapStyle" :minZoom="minZoom" :maxZoom="maxZoom" :center="center" :zoom="zoom" :pitch="20">
              <MglMarker v-for="dealer in filteredDealers" :key="dealer.name" :coordinates="dealer.position" :title="dealer.name" :draggable="false">
                  <div slot="marker" class="custom-marker">
                      <i :class="getMarkerIconClass(dealer.spot_type)"></i>
                  </div>
                  <MglPopup>
                      <div>
                          <h4>{{ dealer.name }}</h4>
                          {{ dealer.spot_type }}
                          <br/>
                          {{ filterAddress(dealer.address) }}
                      </div>
                  </MglPopup>
              </MglMarker>

          </MglMap>

      <monkey-footer/>
    </b-col>
  </b-row>

</template>

<script lang="js">
import { mapState } from 'vuex'
import MonkeyFooter from '../Footer'

import Mapbox from "mapbox-gl";
import { MglMap, MglMarker, MglPopup } from "vue-mapbox";


// var ResizedIcon = L.Icon.extend({options: {iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20]}})

var data = {
    zoom: 13.0,
    minZoom: 8.0,
    maxZoom: 15.0,
    center: [3.0612, 50.6330],
    stickerIcon: null, //new ResizedIcon({iconUrl: '/images/marker-icon.png'}),

    accessToken: "pk.eyJ1Ijoic2luZ2VzYXZhbnQiLCJhIjoiY2tsY2RiY2J6MG9nMzJ3czR3ejdwcGZxOCJ9.OfGS7zMY7PuU0kVjJrPm2Q", // your access token. Needed if you using Mapbox maps
    mapStyle: "mapbox://styles/mapbox/dark-v10", // your map style
    selectedTypes: [],
    showFilterPanel: false
}

export default {
    name: 'DealerList',

    components: {
        MglMap,
        MglMarker,
        MglPopup,

        'monkey-footer': MonkeyFooter
    },

    filters: {
        erp_static_url (uri) {
            return 'https://erp.singe-savant.com/' + uri
        }
    },

    computed: {
        ...mapState([
            'dealers'
        ]),
        availableTypes () {
            const types = new Set()
            this.dealers.forEach(dealer => {
                if (dealer.spot_type) {
                    types.add(dealer.spot_type)
                }
            })
            return Array.from(types).sort()
        },
        filteredDealers () {
            if (!this.dealers || this.dealers.length === 0) {
                return []
            }
            if (this.selectedTypes.length === 0) {
                // Si aucun type sélectionné, ne rien afficher
                return []
            }
            return this.dealers.filter(dealer => {
                return this.selectedTypes.includes(dealer.spot_type)
            })
        }
    },

    data: function () {
        return data
    },

    mounted: function () {
        this.$store.dispatch('LOAD_DEALER_LIST')
    },
    watch: {
        dealers: {
            handler () {
                // Initialiser avec tous les types sélectionnés si c'est la première fois
                if (this.selectedTypes.length === 0 && this.availableTypes.length > 0) {
                    this.selectedTypes = [...this.availableTypes]
                }
            },
            immediate: true
        }
    },

    created() {
        // We need to set mapbox-gl library here in order to use it in template
        this.mapbox = Mapbox;
    },

    methods: {
        make_popup_content (dealer) {
            return '<a href="' + dealer.link + '" target="_new">' + dealer.name + '</a> (' + dealer.type + ')'
        },
        filterAddress (address) {
            if (!address) return ''
            // Enlever les parties "Phone :" et "Email :" et tout ce qui suit
            let filtered = address
            // Enlever "Phone :" et tout ce qui suit
            const phoneIndex = filtered.indexOf('Phone:')
            if (phoneIndex !== -1) {
                filtered = filtered.substring(0, phoneIndex).trim()
            }
            // Enlever "Email :" et tout ce qui suit
            const emailIndex = filtered.indexOf('Email:')
            if (emailIndex !== -1) {
                filtered = filtered.substring(0, emailIndex).trim()
            }
            return filtered
        },
        zoomIn () {
            if (this.zoom < this.maxZoom) {
                this.zoom = Math.min(this.zoom + 1, this.maxZoom)
            }
        },
        zoomOut () {
            if (this.zoom > this.minZoom) {
                this.zoom = Math.max(this.zoom - 1, this.minZoom)
            }
        },
        toggleType (type) {
            const index = this.selectedTypes.indexOf(type)
            if (index > -1) {
                this.selectedTypes.splice(index, 1)
            } else {
                this.selectedTypes.push(type)
            }
        },
        getDealerCountByType (type) {
            if (!this.dealers || this.dealers.length === 0) {
                return 0
            }
            return this.dealers.filter(dealer => dealer.spot_type === type).length
        },
        getMarkerIconClass (spotType) {
            // Déterminer le type d'icône selon le spot_type
            const type = (spotType || '').toLowerCase()
            
            if (type.includes('resto') || type.includes('restaurant')) {
                return 'las la-hamburger' // Hamburger pour les restaurants
            } else if (type.includes('cave') || type.includes('épicerie') || type.includes('epicerie') || type.includes('magasin') || type.includes('store')) {
                return 'las la-shopping-bag' // Sac de shopping pour les caves et épiceries
            } else if (type.includes('bar')) {
                return 'las la-beer' // Bière pour les bars
            } else {
                return 'las la-map-marker' // Icône par défaut
            }
        }
    }
}
</script>

<style lang="scss" scoped>
  @import "~leaflet/dist/leaflet.css";

  .dealer-map-container {
    height: 100vh;
    position: relative;
  }

  .dealer-map-container > .col {
    position: relative;
  }

  .dealer-map {
      z-index:1;
      width: 100%;
      height: 100%;
    }

  .zoom-controls {
      position: absolute;
      top: calc(8vh + 10px);
      left: 10px;
      z-index: 10;
      display: flex;
      flex-direction: row;
      gap: 2px;
      pointer-events: auto;
    }

  .zoom-btn {
      width: 40px;
      height: 40px;
      background-color: #fff;
      border: 1px solid #ccc;
      border-radius: 4px;
      cursor: pointer;
      font-size: 20px;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      transition: background-color 0.2s;
    }

  .zoom-btn:hover {
      background-color: #f0f0f0;
    }

  .zoom-btn:active {
      background-color: #e0e0e0;
    }

  .filter-icons {
      position: absolute;
      top: calc(8vh + 60px);
      left: 10px;
      z-index: 10;
      display: flex;
      flex-direction: column;
      gap: 8px;
      pointer-events: auto;
    }

  .filter-icon {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background-color: white;
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4), 0 0 0 2px rgba(255, 255, 255, 0.8);
      cursor: pointer;
      transition: opacity 0.2s, transform 0.2s;
      opacity: 0.3;
    }

  .filter-icon:hover {
      transform: scale(1.1);
    }

  .filter-icon:hover .filter-tooltip {
      visibility: visible;
      opacity: 1 !important;
    }

  .filter-icon-active {
      opacity: 1;
    }

  .filter-icon i {
      font-size: 24px;
      color: #d06f5a;
    }

  .filter-tooltip {
      position: absolute;
      top: 50%;
      left: 50px;
      transform: translateY(-50%);
      background-color: #000000;
      color: white;
      padding: 6px 10px;
      border-radius: 4px;
      font-size: 12px;
      white-space: nowrap;
      visibility: hidden;
      opacity: 0;
      transition: opacity 0.2s, visibility 0.2s;
      pointer-events: none;
      z-index: 10000;
    }

  .filter-tooltip::before {
      content: '';
      position: absolute;
      right: 100%;
      top: 50%;
      transform: translateY(-50%);
      border: 5px solid transparent;
      border-right-color: #000000;
    }

  .custom-marker {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      width: 40px;
      height: 40px;
      background-color: white;
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4), 0 0 0 2px rgba(255, 255, 255, 0.8);
    }

  .custom-marker i {
      font-size: 32px;
      color: #d06f5a;
      z-index: 1;
    }

</style>
