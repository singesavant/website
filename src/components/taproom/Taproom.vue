// -*- mode: vue; js-indent-level: 2; -*-
<template lang="html">
  <div class="product-list">
    <beer-header title-img="/images/taproom/logo.png" nolink></beer-header>

    <b-row align-h="center" no-gutters  class="paragraphs">
      <b-col cols="8">
        <b-row align-h="center" no-gutters>
          <b-col>
            <b-row class="paragraphs-row" no-gutters >
              <b-col align-v="bottom" sm="6">
                <img class="full" src="/images/taproom/terrasse.jpg" alt="Terrasse à Moulins"/>
              </b-col>
              <b-col class="text" align-v="bottom" sm="6">
                
                <p>
                  Le bar du <strong>Singe Savant</strong> a ouvert ses portes en mai 2023. Il fait partie intégrante de notre <strong>coopérative</strong> ! Il est situé au 94 de la rue d'Arras, à 120 mètres de la brasserie.
                </p>

                <p>
                  Ce bar est pour nous l'occasion d'aller toujours plus loin dans notre démarche de circuit court, de local et d'écologie.
                </p>

                <p>
                  Nous faisons notre maximum pour y pratiquer des prix raisonnables et pour que la qualité soit à portée de tous.
                </p>

              </b-col>
            </b-row>
              
            <b-row class="paragraphs-row" no-gutters >
              <b-col class="text" align-v="bottom" sm="6">

                <h4>Déguster</h4>

                <p>
                  Vous pourrez y goûter <strong>12 recettes en pression</strong> : majoritairement celles du Singe mais on essaie de toujours avoir une ou deux références de bières des brasseries de nos potes, d'ici ou d'ailleurs, à vous faire découvrir ou redécouvrir !
                </p>

                <p>
                  Nous proposons également des galopins, pour que vous puissiez assouvir votre curiosité. L'équipe du singe est également disponible et formée pour répondre à vos questions, et vous conseiller en fonction de vos goûts.
                </p>
                <p>
			Vous pouvez également réserver un créneau de dégustation guidé précédé d'une visite de la brasserie en cliquant sur le bouton ci-dessous !
                </p>

		<p>
                        <center><b-button variant="primary" to="brewery/visit">Réserver une visite / dégustation</b-button></center>
                </p>


              </b-col>
              <b-col align-v="bottom" sm="6">
                <img class="full" src="/images/taproom/taproom-pompe.jpg" alt="Service pression"/>
              </b-col>
            </b-row>

            <b-row class="paragraphs-row" no-gutters >
              <b-col align-v="bottom" sm="6">
                <img class="full" src="/images/taproom/bouffe.jpg" alt="Magasin"/>
              </b-col>

              <b-col class="text" align-v="bottom" sm="6">

                <h4>Manger</h4>

                <p>
                  Parce que boire l'apéro, c'est cool, mais en mangeant un bout en même temps, c'est carrément mieux ! Tous les soirs à partir de <strong>19h</strong>, nous vous proposons une carte courte de plats, à <strong>partager</strong> ou en <strong>portion individuelle</strong>, renouvelée régulièrement.
                </p>

                <p>
                  Nous cherchons à cuisiner comme nous brassons : de manière <strong>créative</strong>, avec des ingrédients de <strong>qualité</strong>, en collaborant au maximum avec des maraîchers <strong>locaux</strong> pour vous offrir des plats <strong>faits maison</strong>, en toute <strong>indépendance</strong>.
                </p>

                <p>
                  Pour accompagner votre apéro, découvrez notre assortiment de boissons sans alcool, locales et/ou biologiques, ainsi qu'une sélection de vins et de cocktails, élaborée dans la même logique de qualité, de <strong>créativité</strong> et de produits de <strong>proximité</strong>.
                </p>

              </b-col>
            </b-row>

            <b-row class="paragraphs-row" no-gutters >
              <b-col class="text" align-v="bottom" sm="6">
                <h4>Se poser</h4>

                <p>
                  Pour que le plus grand nombre puisse <strong>se sentir comme à la maison</strong>, on a mis tout ce qu’on aime dans ce lieu. Des jeux pour tous les âges, une table à langer, des canapés, des bouquins sur la bière, de la lumière chaleureuse …
                </p>

                <p>
                  Mais le bar du Singe c’est aussi et surtout un grand espace capable d'accueillir plus de 100 personnes, que ce soit pour des <strong>concerts</strong>, <strong>spectacle de théâtre</strong>, ou simplement pour venir <strong>boire un verre</strong>!
                </p>

                <p>
                  Il est possible de réserver des tables pour les grands groupes (à partir de 8 personnes) en nous écrivant sur <a href="mailto:bar@singe-savant.com">bar@singe-savant.com</a> ou sur nos réseaux sociaux <a href="https://www.facebook.com/bardusingesavant" target="_blank">Facebook</a> ou <a href="https://www.instagram.com/lesingesavant_bar/" target="_blank">Instagram</a>).
                </p> 
              </b-col>
              <b-col align-v="bottom" sm="6">
                <img class="full" src="/images/taproom/taproom-jeux.jpg" alt="Jeux, canapés, comme à la maison"/>
              </b-col>
            </b-row>

            <b-row class="paragraphs-row" no-gutters >
              <b-col align-v="bottom" sm="6">
                <img class="full" src="/images/taproom/taproom-shop.jpg" alt="Magasin"/>
              </b-col>
            
              <b-col class="text" align-v="bottom" sm="6">

                <h4>Emporter</h4>

                  <p>
                    Initialement implantée à la brasserie, notre boutique a déménagé au bar avec un vrai espace dédié. Vous y trouverez toute notre gamme de bouteilles, en 33 et 75cl, au frais ou non, à emporter chez vous, ainsi que des bières brassées en collaboration avec d’autres brasseries !
                  </p>

                  <p>
                    Nous proposons également d’autres produits du Singe, comme du vinaigre de bière, des fringues, des verres… La boutique est ouverte aux mêmes horaires que le bar, mais ferme à 22h.
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
import BeerHeader from '../beers/Header'
import MonkeyFooter from '../Footer'

var data = {
}

export default {
  name: 'Brewery',

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
    background-image: url(/images/taproom/header.jpg) !important;
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
