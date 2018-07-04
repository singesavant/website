// -*- mode: vue; js-indent-level: 2; -*-
<template lang="html">
  <div class="brewlab">
    <beer-header title-img="/static/images/brewlab/logo.png" nolink></beer-header>

    <b-row align-h="center" no-gutters class="paragraphs">
      <b-col cols="8">
        <b-row align-h="center" no-gutters>
          <b-col>
            <b-row class="paragraphs-row first" no-gutters >
              <b-col class="text" align-v="bottom" sm="12">
                <h1>Envie de Brasser ?</h1>

                <p>
                  <blockquote>Que vous souhaitiez <strong>vous initier au brassage</strong>
                  ou <strong>venir pratiquer ailleurs qu'à la maison</strong>,
                  le BrewLab du Singe vous accueille <strong>toute la
                  semaine</strong> !</blockquote>
                </p>

              </b-col>
            </b-row>

            <b-row class="paragraphs-row" no-gutters >
              <b-col class="text beginner-column" align-v="bottom" sm="6">
                <h2 class="beginner">Je débute</h2>

                <p>
                  Nous proposons <strong>formule d'initiation</strong> pour
                  rejoindre le <strong>clan des brasseurs</strong>, que vous
                  soyez seul-e ou en groupe !
                </p>

                <img class="illustration-picture" src="/static/images/brewlab/invit.png" alt="invitation"/>

                <p>
                  La formule est simple et complète : vous apprenez
                  la <strong>théorie</strong>, <strong>goûtez</strong> plein de
                  choses, écrivez
                  une <strong>recette</strong>, <strong>brassez</strong> votre
                  bière, la mettez en <strong>bouteille</strong> et
                  repartez <strong>heureux-se</strong> avec environ <strong>30
                  bouteilles</strong> de 75cl ou <strong>60 bouteilles</strong>
                  de 33cl ! En gros, <strong>1 journée et demi</strong> de votre
                  temps pour repartir avec de <strong>belles
                  connaissances</strong> brassicoles.
                </p>

                <h4>C'est combien ?</h4>
                <p>
                  La formule coûte <strong>210€ pour une personne</strong> et
                  <strong>80€ de plus par personne supplémentaire</strong>. Si
                  vous souhaitez être accompagné-e par un-e ami-e qui ne fait que
                  regarder, c'est <strong>gratuit</strong>, évidemment !
                </p>

                <p>
                  Et si vous souhaitez <strong>offrir</strong>, nous avons un
                <strong>coupon d'invitation</strong> qui fera son effet à
                glisser dans une enveloppe.
                </p>

                <h4>Comment réserver ?</h4>

                <p>
                  Planifiez votre brassin <strong>un peu à l'avance</strong>, le
                  BrewLab est souvent assez chargé ! Contactez-nous
                  par <router-link :to="{name: 'contact'}">téléphone</router-link>,
                  <router-link :to="{name:'contact'}">e-mail</router-link>
                  ou <a href="http://m.me/brasserie.singe.savant/" target="_new">facebook</a> pour <strong>réserver</strong> ou
                  en <strong>discuter</strong>.
                  <br/>
                  <b-button href="http://m.me/brasserie.singe.savant/" variant="primary" target="_new" class="float-right">Réserver via Facebook</b-button>
                  <br/>
                </p>


                <img class="illustration-picture short" src="/static/images/brewlab/mashing.jpg" alt="mashing"/>


                <h4>En détails</h4>
                <p>

                  <strong class="foreword">2 heures pour avoir les clés.</strong> Votre
                  apprentissage commencera par une <strong>discussion déambulatoire de 2
                  heures</strong> dans la brasserie où vous apprendrez à <strong>découvrir les
                  matières premières</strong> (malts, houblons, levures), comprendre la
                  <strong>chimie du brassage</strong> et vous <strong>faire la
                  main</strong> sur le matériel de production.
                  Toutes <strong>les questions sont permises et
                  encouragées</strong>, ce n'est pas parce que vous débutez
                  qu'il faut brider votre soif de savoir !

                  <br/>

                  A la fin de la session, nous nous posons autour d'une table
                  pour <strong>écrire avec vous une recette</strong> qui reflète
                  vos goûts et les intuitions que vous avez acquises pendant les
                  deux heures.
                </p>


                <p>
                  <strong class="foreword">1 journée pour brasser.</strong>
                  C'est le grand jour ! Sous l'<strong>œil attentif des
                  Singes</strong>, vous brasserez sur notre <strong>brasserie de
                  30L</strong> pendant une journée complète
                  pour <strong>réaliser la recette</strong> de vos rêves. On
                  démarre par le concassage du grain, jusqu'à la mise en
                  fermentation de votre future bière préférée !

                </p>

                <p>
                  <strong class="foreword">3 heures pour embouteiller.</strong>
                  Environ 15 jours plus tard, vous revenez pour mettre votre bière en
                  bouteilles. Choisissez vos formats de bouteilles,
                  retroussez vos manches et c'est parti pour 2-3 heures de
                  <strong>remplissage</strong> et <strong>capsulage</strong>.
                </p>

                <p>
                  Vous <strong>repartez alors chez vous avec vos
                  bouteilles</strong> qui resteront en garde encore quelques
                  dizaines de jour avant le moment tant attendu de la
                  <strong>dégustation</strong> !
                </p>


                <img class="illustration-picture " src="/static/images/brewlab/bottling.jpg" alt="bottling"/>



              </b-col>

              <b-col class="text" align-v="bottom" sm="6">
                <h2 class="confirmed">Je brasse déjà</h2>

                <p>
                  Si vous brassez déjà et que vous en avez <strong>marre de
                  ruiner votre cuisine</strong> et/ou
                  souhaitez <strong>renforcer votre pratique</strong>,
                  le <em>BrewLab</em> est fait pour vous !
                </p>

                <p>
                  Vous souhaitez juste <strong>acheter des matières premières</strong> ? Rendez-vous
                  dans le <router-link :to="{name: 'brewshop'}"><strong>BrewShop</strong></router-link> !
                </p>

                <h4>Comment ça marche ?</h4>

                <p>
                  Il vous suffit de vous inscrire au <em>BrewLab</em>
                  (<strong>30€/an</strong>) pour accéder à <strong>tous les
                  outils</strong> (concasseurs, laboratoire, capsuleuse, ...).
                  Vous pouvez alors venir <strong>quand vous le
                  souhaitez</strong> pour <strong>préparer vos
                  brassins</strong>, consulter la <strong>bibliothèque
                  brassicole</strong>, <strong>percer</strong> une cuve,
                  demander un <strong>avis</strong> sur une recette, ...
                </p>

                <p>
                  <strong class="foreword">Brassez !</strong> Si vous souhaitez <strong>brasser</strong>, nous proposons une
                   <strong>brasserie monocuve</strong> de <strong>30 litres</strong> que vous
                   pouvez utiliser pour <strong>45€ / journée</strong> (produits de nettoyage
                   inclus) --<strong>seul-e</strong> ou à <strong>plusieurs adhérants</strong>. 
                </p>

                <img class="illustration-picture short" src="/static/images/brewlab/brassage_baby.gif" alt="babyfoot"/>

                <p>
                  <strong class="foreword">Envie de vous améliorer ?</strong> Choisissez une
                  <strong>thématique</strong> et <strong>bookez un
                  Singe</strong> rien que pour vous ! Sur une session d'une à
                  deux heures, nous <strong>répondons à vos questions</strong>
                  et/ou nous vous aidons à <strong>travailler sur votre
                  projet</strong>. La session coûte <strong>50€ /
                    personne</strong>.
                </p>

                <h4>Réserver / En savoir plus</h4>
                <p>
                  Pour <strong>réserver un créneau</strong>, un <strong>brassin</strong> ou en <strong>savoir plus</strong>, contactez-nous
                  par <router-link :to="{name: 'contact'}">téléphone</router-link>,
                  <router-link :to="{name:'contact'}">e-mail</router-link>
                  ou <a href="http://m.me/brasserie.singe.savant/" target="_new">facebook</a>.
                  <br/>
                  <b-button href="http://m.me/brasserie.singe.savant/" variant="primary" target="_new" class="float-right">Réserver via Facebook</b-button>
                  <br/>
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
import MonkeyFooter from './Footer'
import BeerHeader from './beers/Header'

import { mapState } from 'vuex'

var data = {
}

export default {
  name: 'BrewLab',

  components: {
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


h2.beginner:before {
    content: "";
    display: block;
    background: url('/static/images/brewlab/beginner-icon.png') no-repeat;
    background-size: contain;
    width: 37px;
    height: 37px;
    float: left;
    margin: 0 6px 0 0;
}

h2.confirmed:before {
    content: "";
    display: block;
    background: url('/static/images/brewlab/confirmed-icon.png') no-repeat;
    background-size: contain;
    width: 37px;
    height: 37px;
    float: left;
    margin: 0 6px 0 0;
}



.foreword {
    font-variant: small-caps;
}


h1 {
  font-variant: small-caps;

}

h4 {
margin-top: 20px;

}

.illustration-picture {
    width: 100%;
    margin-bottom: 20px;

}

.short {
    clip-path: inset(10vh 0px 10vh 0px);
    margin-top: -10vh;
    margin-bottom: -10vh;
}



.beer-header {
    background-image: url(/static/images/brewlab/header.jpg) !important;
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

.beginner-column {

border-right: 1px solid #eee;

}


</style>
