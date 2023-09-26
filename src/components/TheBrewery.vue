// -*- mode: vue; js-indent-level: 2; -*-
<template lang="html">
  <div class="product-list">
    <beer-header title-img="/images/brewery/logo.png" nolink></beer-header>

    <b-row align-h="center" no-gutters  class="paragraphs">
      <b-col cols="8">
        <b-row align-h="center" no-gutters>
          <b-col>
            <b-row class="paragraphs-row" no-gutters >
              <b-col align-v="bottom" sm="6">
                <img class="full" src="/images/brewery/monkey-looking.jpg" alt="Singe qui brasse"/>
              </b-col>
              <b-col class="text" align-v="bottom" sm="6">

                <p>
                  Le <strong>Singe savant</strong> est une micro-brasserie <strong>coopérative et indépendante</strong>, située à <strong>Lille</strong> dans le <router-link :to="{name: 'contact'}">quartier de <strong>Moulins</strong></router-link>.
                </p>

                <p>
                  Nous avons à coeur de brasser des recettes <strong>créatives</strong> et <strong>inovantes</strong>, réalisées au maximum avec des <strong>matières premières biologiques</strong> et <strong>locales</strong>. Nous privilégions les <strong>circuits courts</strong> et essayons de <strong><router-link :to="{name: 'recycle'}">réduire nos déchets</router-link></strong> tant que possible.
                </p>

                <p>
                  Le plus simple est de venir en discuter avec nous, vous trouverez les horaires d'ouverture de notre taproom <router-link :to="{name: 'contact'}">ici</router-link>.
                </p>

              </b-col>

              <b-col class="text" align-v="bottom" sm="6">
                <blockquote class="paradox">
                  Le paradoxe du singe savant est un théorème selon lequel un
                  singe qui tape indéfiniment et au hasard sur le clavier d’une
                  machine à écrire pourra « presque sûrement » écrire un texte
                  improbable, tel qu’Hamlet de Shakespeare.” -- imaginez alors
                  s’il commence à brasser de la bière !
                </blockquote>

                <p>
                  <strong>Créer</strong>, <strong>improviser</strong>, <strong>explorer</strong> et <strong>partager</strong> !
                </p>

                <p>
                  Notre <router-link :to="{name: 'beer-list'}">gamme</router-link> est composée de recettes <strong>permanentes</strong> et <strong>exploratoires</strong>. Ces dernières, éphémères, sont des <strong>brassins limités</strong> sortant très régulièrement (~1-2 fois/mois) avec lesquels nous partageons nos <strong>explorations brassicoles</strong>.
                </p>


              </b-col>
              <b-col align-v="bottom" sm="6">
                <img class="full" src="/images/brewery/hops.jpg" alt="Houblons"/>
              </b-col>

              <b-col align-v="bottom" sm="6">
                <img class="full" src="/images/brewery/magasin.jpg" alt="Magasin"/>
              </b-col>

              <b-col class="text" align-v="bottom" sm="6">

                  <h4>Nous vendons en direct</h4>

                <p>
                  Toutes nos recettes sont disponible <router-link :to="{name: 'contact'}">dans notre bar / boutique</router-link> à la fois en <strong>bouteilles</strong> mais aussi en <strong>pression</strong>. Si vous prévoyez un événement et que vous voulez des fûts et une tireuse n'hésitez pas à <router-link :to="{name: 'contact'}">nous appeller</router-link> ou à envoyer <a href="mailto:contact@singe-savant.com">un mail</a> pour discuter de votre projet.
                </p>

                <p>Vous cherchez nos bières autre part dans Lille ? Jetez un œil à <router-link :to="{name: 'dealers'}">notre carte de distribution</router-link>.</p>

              </b-col>


              <b-col class="text" align-v="bottom" sm="6">
                  <h4>La brasserie se partage !</h4>
                <p>
                  Au delà d'une brasserie de production, le Singe propose un <router-link :to="{name: 'brewlab'}">BrewLab</router-link> composé d'une <strong>école de brassage</strong> où apprendre et s'améliorer. C'est aussi un lieu où <strong>échanger</strong> avec les autres passionné-e-s et un <router-link :to="{name: 'shop'}">BrewShop</router-link> où acheter vos <strong>matières premières</strong>. Sensations fortes garanties ! N'hésitez pas à <router-link :to="{name: 'contact'}">nous contactez</router-link> si vous êtes intéressé-e.
                </p>
              </b-col>
              <b-col align-v="bottom" sm="6">
                <img class="full" src="/images/brewery/brewlab.jpg" alt="BrewLab"/>
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
  name: 'TheBrewery',

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
    background-image: url(/images/brewery/header.jpg) !important;
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
