// -*- mode: vue; js-indent-level: 2; -*-
<template lang="html">
  <div class="shop">

    <div class="floor">
    </div>

    <div class="neon">
      <div v-bind:class="{ flicker: isFlickering }" class="overlay"></div>
    </div>

    <!-- product list -->
    <div id="products">
      <b-row no-gutters class="product-list-container justify-content-md-center">
          <b-col sm="12" md="10">

              <b-alert show dismissible fade>
                  <h3>Nous avons un (petit) bug !</h3>
                  Rien de grave, mais si vous <strong>ne voyez pas apparaître le bouton "J'achète"</strong> après avoir ajouté des articles dans votre panier, c'est de <strong>notre faute</strong>, désolé !<br/>
                  <hr/>
                  Vous pouvez <strong>facilement le contourner</strong> en ouvrant une fenêtre de navigation privée :<br/>
                  <ul>
                      <li>Sur votre navigateur, cliquez sur l'icone en haut à droite avec les <strong>trois points</strong> (Chrome) ou les <strong>trois barres</strong> (Firefox)</li>
                      <li>puis <strong>Nouvelle fenêtre de navigation privée</strong></li>
                  </ul>
                  Il vous suffit de <strong>vous connecter</strong> et tout devrait fonctionner. <em>Merci les monkeys bidouilleurs</em>, on corrige ça au plus vite !
              </b-alert>


          <!-- Browser compatibility warning -->
          <b-alert show v-if="check_browser()" variant="danger" dismissible fade>
            <h4>Attention ! Votre navigateur risque de ne pas fonctionner avec notre Shop, désolé ! Merci d'utiliser Firefox ou Chrome.</h4>
          </b-alert>

          <!--
          <b-alert show variant="dark" dismissible fade>
            <h4 class="alert-heading">Livraison : COVID-19 & LOVE MONEY</h4>

            <p>
              <em>En ces temps de singe maigre, merci d'être toujours avec nous les monkeys !</em>
            </p>
            <b-row>
              <b-col sm="12" md="6">
                <p>
                  <b-img left src="/images/shop/corona/crocrovirus.png" blank-color="#ccc" width="100%" alt="bouteilles"></b-img>
                  Comme vous le savez, nous avons choisi de <strong>fermer la boutique physique</strong> dès le début d'épidémie du <em>COVID</em> pour éviter de contribuer à la propagation.
                  <br/>
                  Après une longue réflexion, nous avons décidé de mettre en place un <strong>service de livraison, par nous-même</strong>.
                  Pourquoi ? Car même si la bière n'est pas une boisson de première nécessité (#eaudurobinet), nous pensons qu'il s'agit d'une bonne manière :
                  <ul>
                    <li>d'<strong>éviter vos déplacements</strong></li>
                    <li>de garantir que les <strong>gestes barrières</strong> sont bien respectés (par nous)</li>
                    <li>de lutter contre la <strong>morosité à la maison</strong></li>
                    <li>de vous offrir une alternative aux <strong>marques industrielles</strong></li>
                  </ul>
                </p>

                <p>
                  Pendant la livraison, nous vous garantissons un <a id="protocol" href="#" tabindex="0"><strong>protocole d'hygiène le plus strict</strong></a> et un minimum d'impact grâce à notre <strong>MonkeyMobile électrique</strong>.

                  <b-popover target="protocol" triggers="hover" placement="top">
                    <template v-slot:title>Comment allons-nous préparer votre commande ?</template>
                    <b-img src="/images/shop/corona/process.png" alt="Process d'hygiène" width="400vw"></b-img>
                  </b-popover>

                </p>

                <p><b-icon icon="watch"/>&nbsp;Concernant le délai, nous vous <strong>livrerons les Mardi et Vendredi</strong>. Il vous suffit de commander <strong>24H à l'avance</strong> pour que nous puissions préparer votre commande. Livraison sur <strong>Lille et ses villes périphériques</strong>.
                </p>


              </b-col>

              <b-col sm="12" md="6">
                <p>
                  <b-img left src="/images/shop/corona/bouteille3.png" blank-color="#ccc" width="100%" alt="bouteilles"></b-img>
                  Vous le savez, la plupart de <strong>vos lieux préférés sont fermés</strong> en ce moment. Malgré les mesures financières annoncées par le gouvernement, c'est un <strong>moment extrêmement difficile</strong> pour les bars, restaurants et autres indépendants.
                </p>

                <p>
                  Ces établissements sont pour beaucoup <strong>nos partenaires</strong>... Et au singe, nous <strong>les kiffons</strong> !
                </p>


                <p>
                  C'est pourquoi, nous nous engageons à <strong>reverser 5% de votre commande</strong> à l'établissement de votre choix.
                  A la fin de votre commande, vous serez invité.e.s à <strong>choisir le lieu de votre cœur</strong> et vous pourrez lui <strong>attribuer un crédit</strong> grâce à votre commande.
                <p>

                <p>Grâce à ce système, nous espérons <strong>alléger un peu le besoin de trésorerie de nos partenaires</strong> pour leurs reprises !</p>

              </b-col>

            </b-row>


            <hr>

            <div class="mb-0">
              <b-img left src="/images/shop/corona/laptop.png" blank-color="#ccc" width="100%" alt="sipping"></b-img>
              <p>
                Le personnel soignant demande de <strong>minimiser les déplacements</strong> : pour nous aider, <strong>évitez de faire des micros commandes</strong>.
                <br/>
                Du coup, on vous <strong>offre la livraison</strong> à partir de 50€ ! <br/>
                Bon achat et <strong>#KIFFEZ CHEZ VOUS</strong>, la meilleure manière de protéger nos proches !
              </p>
              <p>

              </p>
            </div>
          </b-alert>
          -->
        </b-col>
      </b-row>



      <!-- <b-row no-gutters class="product-list-container justify-content-md-center">
           <b-col sm="10" md="10" class="product-friends">
           <h2 class="orderable-category"><b-icon icon="tag-fill"/>&nbsp;Les Packs</h2>
           <orderable-item-list item_group="Bières - Packs"/>
           </b-col>
           </b-row>
      -->

      <b-row no-gutters class="product-list-container justify-content-md-center">
        <b-col sm="10" md="10">
          <orderable-item-list item_group="Bières du Singe">
            <template #default="{ item, itemIdx }">
              <beer-item :item="item" :itemIdx="itemIdx"></beer-item>
            </template>
          </orderable-item-list>
        </b-col>
      </b-row>


      <b-row no-gutters class="product-list-container justify-content-md-center">
        <b-col sm="10" md="10" class="product-friends">
          <h2 class="orderable-category"><b-icon icon="star"/>&nbsp;Merch & Friends</h2>
          <em>Merch du Singe & du made in local, avec les mêmes valeurs que nous, sur d'autres thématiques !</em>
          <orderable-item-list item_group="Merchandising"/>
        </b-col>
      </b-row>

    </div>

  </div>
</template>

<script lang="js">

import orderableItemList from './OrderableItemList'
import BeerItem from './BeerItem'
import { mapState } from 'vuex'

var data = {
    isFlickering: false
}

export default {
  name: 'Shop',

  components: {
    orderableItemList,
    BeerItem
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

    check_browser() {
      return (this.$browserDetect.isSafari
               || this.$browserDetect.isOpera
              || this.$browserDetect.isEdge
              || this.$browserDetect.isIE)
    },


    toggleFlickering () {
      this.isFlickering = !this.isFlickering
      setTimeout(this.toggleFlickering, 2000)
    }
  },
  computed: mapState(['isAuthenticated'])
}
</script>

<style lang="scss">
  .popover {
    max-width: 100vw !important;
}

</style>

<style lang="scss" scoped>



.shop {
    font-weight: 300;


    h2.orderable-category {
        color: white;
    }


    p.lettrine::first-letter {
        font-size:2em;

    }


    img.float-left {
        margin-right: 10px;
    }


    .alert {
        background-color: rgba(215, 215, 215, 0.9) !important;
        z-index: 10;
    }


    padding-top: 10vh;
    background: url('/images/shop/wall_floor.jpg'), url('/images/shop/background.jpg');
    background-repeat: no-repeat, no-repeat;
    background-attachment: fixed, fixed;
    background-position: bottom, center left !important;
    background-size: 100%, cover !important;

    min-height: 100vh;
    z-index: 1;


    .product-list-container {
        z-index: 3;

    }

    .product-friends {
        h2 {
            color: black !important;
            font-variant: small-caps;
        }

        li.item > a {
            color: black !important;
        }


        z-index: 10;
        margin-top: 5vh;
        margin-bottom: 5vh;
        padding: 4vh;
        background-color: rgba(255, 255, 255, 0.9);
        border-radius: 10px;
        border: 2px solid #555;
    }


    .neon {
        background: url('/images/shop/shop_light.png'), url('/images/shop/shop_cross.png');
        background-position: center, center;
        background-repeat: no-repeat, no-repeat;
        background-size: cover;

        height: 25vw;
        width: 25vw;

        margin-left: -12.5vw;
        margin-top: -12.5vw;

        top: 40%;
        left: 50%;

        position: fixed;

        z-index: 2;

        .overlay {
            width: 100%;
            height: 100%;

            background: url('/images/shop/shop_light_overlay.png');
            background-position: center center;
            background-repeat: no-repeat;
            background-size: cover;


            &.flicker {
                animation: flickering .1s cubic-bezier(.2, 0, 0.5, 1.0) 1.5s alternate;
            }

            @keyframes flickering {
                to { opacity: 1; }
                from { opacity: 0; }
            }
        }
    }
}

</style>
