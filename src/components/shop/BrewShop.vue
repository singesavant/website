// -*- mode: vue; js-indent-level: 2; -*-
<template lang="html">
  <div class="brewshop">
    <beer-header title-img="/images/brewshop/logo.png" nolink></beer-header>

    <b-row align-h="center" no-gutters class="paragraphs">
      <b-col cols="8">
        <b-row align-h="center" no-gutters>
          <b-col>
            <b-row class="paragraphs-row first" no-gutters >
              <b-col class="text" align-v="bottom" sm="12">
                <h1>Malts, Houblons & Levure</h1>

                <p>
                  Vous êtes <strong>brasseur amateur</strong> ? Nous aussi ! 
                </p>

                <p>
                  Notre BrewShop vous propose toutes les <strong>matières
                  premières</strong> pour
                  <strong>brasser à la maison</strong> ou
                  au <router-link :to="{name: 'brewlab'}"><strong>BrewLab</strong></router-link>. Comme toujours, si vous avez
                  besoin de conseils, nous sommes sur place pour <strong>vous
                  aiguiller</strong> pour votre prochaine recette.
                </p>

                <p>
                  Pensez à apporter vos <strong>sachets</strong>
                  ou <strong>bocaux</strong> pour <strong>limiter les
                  déchets</strong>.
                </p>

                <p>
                  Pour <strong>commander</strong> ou avoir des précisions, vous
                  pouvez tout simplement <router-link :to="{name: 'contact'}">venir à la brasserie</router-link>, nous envoyer un
                  <router-link :to="{name: 'contact'}">e-mail</router-link> ou
                  nous <router-link :to="{name: 'contact'}">appeler</router-link>.
                </p>

              </b-col>
            </b-row>

            <b-row class="paragraphs-row" no-gutters >
              <b-col class="text" align-v="bottom" sm="6">
                <h2 class="malts">Malts</h2>

                <p>
                  Nos malts proviennent principalement de la gamme <strong>Agriculture Biologique</strong> de la <a href="http://www.castlemalting.com/CastleMaltingMalts.asp?Language=French" target="_new">Malterie du Château</a>.
                </p>

                <p>
                  En tant que membre du BrewLab, vous pouvez <strong>concasser
                  gratuitement</strong> sur place et bénéficiez
                  de <strong>10%</strong> dès 5kg puis <strong>20%</strong> à
                  partir de 25kg.
                </p>

                <p>
                  Les sacs sont en <strong>libre service</strong>, goûtez, pesez
                  et servez-vous !
                </p>

                <malt-list />
              </b-col>

              <b-col class="text" align-v="bottom" sm="6">
                <h2 class="hops">Houblons</h2>

                <p>
                  En fonction des variétés et disponibilités, nos houblons
                  proviennent de plusieurs sources : <a target="_new"
                  href="https://ychhops.com/">Yakima</a>, <a target="_new"
                  href="https://www.charlesfaram.co.uk/">Charles
                  Faram</a>, <a target="_new"
                  href="http://www.cophoudal.fr/">CopHoudal</a>, ... Nous
                  favorisons les houblons d'<strong>origine biologique</strong>
                  dès lors qu'on nous en offre la possibilité.
                </p>

                <p>
                  Nos houblons sont immédiatement <strong>reconditionnés sous
                  vide</strong>, gardés à l'<strong>abri de la lumière</strong>
                  et à <strong>basse température</strong>.
                </p>

                <p>
                  En tant que membre du BrewLab, vous
                  obtenez <strong>5%</strong> de réduction dès 400g
                  et <strong>15%</strong> à partir de 600g.
                </p>

                <hop-list />

                <h2 class="other">Et le reste ?</h2>

                <p>
                  Bien que non listées pour le moment ici, nous vous proposons
                  aussi des <strong><router-link :to="{name:
                  'recycle'}">bouteilles propres
                  recyclées</router-link></strong>, des bouteilles sales que
                  vous pouvez laver sur place, des <strong>levures</strong>,
                  <strong>tests de contamination</strong>, <strong>capsules</strong> et d'autres
                  matières premières nécessaires au brassage. N'hésitez pas à
                  nous solliciter !
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
import MaltList from './items/MaltList'
import HopList from './items/HopList'
import MonkeyFooter from '../Footer'
import BeerHeader from '../beers/Header'

import { mapState } from 'vuex'

var data = {
  isFlickering: false
}

export default {
  name: 'BrewShop',

  components: {
    MaltList,
    HopList,
    'monkey-footer': MonkeyFooter,
    BeerHeader

  },
  data: function () {
    return data
  },
  mounted: function () {
    this.toggleFlickering()
  },
  methods: {
    login () {
      this.$store.dispatch('login')
    },

    toggleFlickering () {
      this.isFlickering = !this.isFlickering
      setTimeout(this.toggleFlickering, 2000)
    }
  },
  computed: mapState(['isAuthenticated'])
}
</script>

<style lang="scss" scoped>

h2.malts:before {
    content: "";
    display: block;
    background: url('/images/brewshop/malt_logo.png') no-repeat;
    background-size: contain;
    width: 40px;
    height: 40px;
    float: left;
    margin: 0 6px 0 0;
}

h2.hops:before {
    content: "";
    display: block;
    background: url('/images/brewshop/hop_logo.png') no-repeat;
    background-size: contain;
    width: 40px;
    height: 40px;
    float: left;
    margin: 0 6px 0 0;
}

h2.other {
margin-top: 40px;
}

h2.other:before {
    content: "";
    display: block;
    background: url('/images/brewshop/malt_logo.png') no-repeat;
    background-size: contain;
    width: 40px;
    height: 40px;
    float: left;
    margin: 0 6px 0 0;
}





.beer-header {
    background-image: url(/images/brewshop/header.jpg) !important;
    background-position: 10%;
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

    &, .first {
        margin-bottom: 0px;
        padding-bottom: 50px;
    }

}

</style>
