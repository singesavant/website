// -*- mode: vue; js-indent-level: 2; -*-
<template lang="html">
  <div class="brewlab">
    <beer-header title-img="/images/brewlab/logo.png" nolink></beer-header>

    <b-row align-h="center" no-gutters class="paragraphs">
      <b-col cols="8">
        <b-row align-h="center" no-gutters>
          <b-col>

            <b-row class="paragraphs-row first" no-gutters >
              <b-col class="text" align-v="bottom" sm="12">
                <h1>Les ateliers de brassage</h1>

                <p>
		
		L’envie de brasser votre propre bière vous brûle depuis quelque temps ?

		Bienvenue au BREWLAB, cercle des fanatiques de la bière et atelier de brassage dans le quartier de Moulins, à Lille.

		En compagnie des singes brasseurs et brasseuses, vous allez apprendre et appliquer tous les secrets de la fabrication de la bière ! Quel que soit votre niveau, nos ateliers sont aussi bien une <strong>initiation</strong> pour les débutants qu’un <strong>perfectionnement</strong> pour les amateurs ayant déjà brassé.
	<center><b-button variant="primary" href="./brewlab/resa">Réserver un atelier</b-button></center>
                </p>

              </b-col>
            </b-row>

            <b-row class="paragraphs-row" no-gutters >
              <b-col class="text beginner-column" align-v="bottom" sm="6">
                <h2 class="beginner">Les ateliers encadrés</h2>

		<ul>
			<li>
				<p><strong>Recette :</strong> Vous recevez un questionnaire sur vos goûts et le style de bière que vous voulez brasser. L’équipe du Singe savant écrit une recette <strong>sur mesure</strong> pour vous !</p>
			</li>
			<li>
				<p><strong>Journée de formation et de brassage :</strong> Samedi, de 9h30 à 16h, au cœur de la brasserie, vous apprenez tous les principes et étapes du brassage, du concassage à la fermentation. Et avec l’aide des Singes, vous passez à l’action ! En fin de journée, on se récompense avec une <strong>dégustation</strong> des dernières bières du Singe.</p>
			</li>
			<li>
				<p><strong>Demi-journée d’embouteillage :</strong> Samedi matin ou après-midi, quelques semaines après le brassage, la fermentation est finie, vous venez embouteiller vos <strong>20 litres</strong> de bière et repartez avec !</p>
			</li>
		</ul>

                <img class="illustration-picture short" src="/images/brewlab/mashing.jpg" alt="mashing"/>

                <h4>C'est combien ?</h4>
                <p>
                  La formule coûte <strong>300€</strong>, pour <strong>une ou deux personnes</strong>
                </p>

                <h4>Comment réserver ?</h4>

                <p>
			Que ce soit pour réserver une date ou pour offrir vous pouvez le faire en ligne sur <a href="./brewlab/resa">cette page</a>. Si vous avez la moindre question vous pouvez également envoyer un mail à <a href="mailto:brewlab@singe-savant.com">brewlab@singe-savant.com</a>.
                </p>
              </b-col>

              <b-col class="text" align-v="bottom" sm="6">
                <h2 class="confirmed">Les ateliers autonomes</h2>

                <p>Vous avez déjà suivi un BREWLAB au Singe Savant et vous voulez revenir brasser ? Ou vous brassez déjà chez vous, le Grainfather n’a pas de secret pour vous mais vous en avez marre de ruiner votre cuisine ?</p>

                <p>
			Un poste vous est réservé pour brasser en semi-autonomie.
		</p>
	
		<p><strong>Conditions :</strong> Vous avez écrit votre recette auparavant, vous maîtrisez les étapes de brassage, de nettoyage et de désinfection.</p>

		<p>Un singe garde un œil sur votre brassin, mais vous restez aux commandes !</p>

                <h4>C'est combien ?</h4>
                <p>
                  La formule coûte <strong>150€</strong>, pour <strong>une ou deux personnes</strong>, matières premières et bouteilles incluses
                </p>

                <h4>Comment réserver ?</h4>

                <p>
			Écrivez à <a href="mailto:brewlab@singe-savant.com">brewlab@singe-savant.com</a> pour faire une demande.
                </p>
                <img class="illustration-picture short" src="/images/brewlab/brassage_baby.gif" alt="babyfoot"/>

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
import MonkeyFooter from '../Footer'
import BeerHeader from '../beers/Header'

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
    background: url('/images/brewlab/beginner-icon.png') no-repeat;
    background-size: contain;
    width: 37px;
    height: 37px;
    float: left;
    margin: 0 6px 0 0;
}

h2.confirmed:before {
    content: "";
    display: block;
    background: url('/images/brewlab/confirmed-icon.png') no-repeat;
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
    background-image: url(/images/brewlab/header.jpg) !important;
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
