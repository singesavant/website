// -*- mode: vue; js-indent-level: 2; -*-
<template lang="html">
  <div class="product-list">
    <beer-header title-img="/images/come/icon.png" nolink></beer-header>

    <b-row align-h="center" no-gutters  class="paragraphs">
      <b-col cols="8">
        <b-row align-h="center" no-gutters>
          <b-col>
            <b-row class="paragraphs-row" no-gutters >
              <b-col align-v="bottom" sm="6">
                <img class="full" src="/images/come/map.png" alt="carte"/>
              </b-col>
              <b-col class="text" align-v="bottom" sm="6">

                <p>
                  <strong>Taproom du Singe Savant</strong><br/>
                  94 rue d'Arras <br/>
                  59000 Lille [<a href="https://goo.gl/maps/9BYJHruo2tMstEpi7">Google Maps</a>]
                </p>

                <p>Métro <strong>Porte d'Arras</strong></p>

                <p>
                  Tél: 03.28.05.28.58 - Email: contact AT singe-savant.com
                </p>

                <p>
                  La taproom est ouverte aux jours et horaires suivants :<br/>
			<ul>
				<li><strong>Mardi :</strong> 16h-23h</li>
				<li><strong>Mercredi :</strong> 16h-23h</li>
				<li><strong>Jeudi :</strong> 16h-23h</li>
				<li><strong>Vendredi :</strong> 16h-00h</li>
				<li><strong>Samedi :</strong> 12h-00h</li>
			</ul>
                </p>

                <p>
                  N'hésitez pas à venir nous saluer, <strong>nous vendons en direct</strong> !
                  <br/>
                  Notre taproom est accessible en voiture, vélo, longboard, ...
                </p>

              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    <monkey-footer/>


    <!--

    <b-row class="justify-content-md-center old-beers">
      <b-col cols="10">
        <h2>Vous avez tout bu :</h2>

        <b-row class="justify-content-md-center beer-list">
          <b-col align="center" cols="2" v-for="beer in orderBy(beers_not_produced_anymore, 'name')" :key="beer.name">
            <beer-card :beer="beer"/>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    -->

  </div>
</template>

<script lang="js">
import { mapState } from 'vuex'
import BeerHeader from './beers/Header'
import MonkeyFooter from './Footer'

var data = {
}

export default {
  name: 'Contact',

  computed: {
    ...mapState([
    ])
  },

  components: {
    BeerHeader,
    MonkeyFooter
  },

  data: function () {
    return data
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.beer-list {
  margin-top: 50px;
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
        p {
            font-weight: 300;
        }

    }
}

.beer-header {
    background-image: url(/images/come/header.jpg) !important;
}
</style>
