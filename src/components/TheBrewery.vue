// -*- mode: vue; js-indent-level: 2; -*-
<template lang="html">
  <div class="product-list">
    <beer-header title-img="/static/images/brewery/logo.png" nolink></beer-header>

    <b-row align-h="center" no-gutters  class="paragraphs">
      <b-col cols="8">
        <b-row align-h="center" no-gutters>
          <b-col>
            <b-row class="paragraphs-row" no-gutters >
              <b-col align-v="bottom" sm="6">
                <img class="full" src="/static/images/brewery/monkey-looking.jpg" alt="Singe qui brasse"/>
              </b-col>
              <b-col class="text" align-v="bottom" sm="6">

                <p>
                  Le <b>Singe savant</b> est une micro-brasserie urbaine, de <b>cœur de ville</b>, située à <b>Lille</b> dans le <router-link :to="{name: 'contact'}">quartier de <b>Moulins</b></router-link>.
                </p>

                <p>
                  Nous brassons sur un <b>système numérique de 200 litres construit par nos soins</b> et bichonné pour nous permettre de réaliser toutes les recettes imaginées dans nos cerveaux de singes.
                </p>

                <p>
                  Au delà de l'aspect brassicole, nous mettons un point d'honneur à travailler au maximum avec des <b>matières premières biologiques</b>, privilégions les <b>circuits courts</b> et essayons de <b><router-link :to="{name: 'recycle'}">réduire nos déchets</router-link></b> tant que possible.
                </p>

                <p>
                  Le plus simple est de venir en discuter avec nous, la
                  brasserie est ouverte du <strong>lundi au vendredi</strong>,
                  de 10h à 19h. <router-link :to="{name: 'contact'}">Prenez contact</router-link> !
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
                  <b>Créer</b>, <b>improviser</b>, <b>explorer</b> et <b>partager</b> !
                </p>

                <p>
                  Notre <router-link :to="{name: 'beer-list'}">gamme est composée de recettes <b>permanentes</b> et <b>exploratoires</b></router-link>. Ces dernières, éphémères, sont des <b>brassins limités</b> sortant très régulièrement (~1-2 fois/mois) dans lesquels nous <b>partageons nos explorations brassicoles</b>. Et c'est vous qui <b>votez</b> pour les ré-éditer ou non !
                </p>


              </b-col>
              <b-col align-v="bottom" sm="6">
                <img class="full" src="/static/images/brewery/hops.jpg" alt="Houblons"/>
              </b-col>

              <b-col align-v="bottom" sm="6">
                <img class="full" src="/static/images/brewery/magasin.jpg" alt="Magasin"/>
              </b-col>

              <b-col class="text" align-v="bottom" sm="6">

                <p>
                  <h4>Nous vendons en direct</h4>
                </p>

                <p>
                  Toutes nos recettes sont <b>disponibles en brasserie</b> à la fois en <b>bouteilles</b> mais aussi en <b>fûts</b> si vous prévoyez un événement. N'hésitez pas à <router-link :to="{name: 'contact'}">venir</router-link> faire vos achats ou discuter de votre projet.
                </p>

                <p>Vous cherchez nos bières sur Lille ? Jetez un œil à <router-link :to="{name: 'dealers'}">notre carte de distribution</router-link>.</p>

                <p>Also, if you're a <b>foreign traveller</b>, we'll be happy to give you a tour of the brewery in <b>english</b>.</p>

              </b-col>


              <b-col class="text" align-v="bottom" sm="6">
                <p>
                  <h4>La brasserie se partage !</h4>
                </p>
                <p>
                  Au delà d'une brasserie de production, le Singe propose un <b>BrewLab</b> composé d'une <b>école de brassage</b> où apprendre et s'améliorer. C'est aussi un lieu où <b>échanger</b> avec les autres passionné-e-s et un <b>BrewShop</b> où acheter vos <b>matières premières</b> ainsi que votre <b>matériel de brassage</b>. Sensations fortes garanties ! N'hésitez pas à <router-link :to="{name: 'contact'}">nous contactez</router-link> si vous êtes intéressé-e.
                </p>

              </b-col>
              <b-col align-v="bottom" sm="6">
                <img class="full" src="/static/images/brewery/brewlab.jpg" alt="BrewLab"/>
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
    background-image: url(/static/images/brewery/header.jpg) !important;
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
