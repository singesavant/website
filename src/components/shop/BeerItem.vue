// -*- mode: vue; js-indent-level: 2; -*-
<template lang="html">
  <li class="item">
    <div>
    <b-row no-gutters align-h="center">

      <!-- illustration -->
      <b-col sm="12" lg="12" class="illustration">


        <div class="bottles">
            <div class="bottle front">
              <img class="top" src="/images/bottle-75-top.png" alt="bottle top">
              <a :id="`link-hover-`+itemIdx" href.prevent="javascript:;" tabindex="0">
                <img class="label" :src=item.thumbnail|erp_static_url>
              </a>
              <img class="bottom" src="/images/bottle-75-bottom.png" alt="bottle bottom">
            </div>
          <b-popover :target="`link-hover-`+itemIdx" triggers="hover click blur" v-if="item_details">
            <template v-slot:title>{{ website_specifications.style }} - {{ website_specifications.abv }}%</template>
            <table class="beer-popover-table">
              <tr>
                <td class="category">Amertume</td>
                <td align-v="middle"><IBUGauge :ibus="website_specifications.ibu"/></td>
              </tr>

              <tr>
                <td class="category">Goût</td>
                <td>{{  website_specifications.gout }}</td>
              </tr>

              <tr>
                <td class="category">Arôme</td>
                <td>{{  website_specifications.aroma }}</td>
              </tr>

              <tr>
                <td class="category">Robe</td>
                <td>{{  website_specifications.apparence }}</td>
              </tr>

            </table>

            [+]&nbsp;<router-link :to="{'name': 'beer-detail', params: {'slug': item.code}}"> d'infos sur {{ item.name }}</router-link>
          </b-popover>

        </div>
      </b-col>
    </b-row>

    <b-row no-gutters align-h="center">
      <b-col sm="12" lg="12" class="info" align="center" align-v="bottom">
          <h3 v-if="isAuthenticated" ><router-link :to="{'name': 'beer-detail', params: {'slug': item.code}}">{{ item.name }}</router-link></h3>
          <h3 v-else v-b-tooltip.hover title="Connectez-vous pour commander">{{ item.name }}</h3>
        <b-overlay :show="!item_details" v-if="isAuthenticated">
          <add-orderable-item-to-cart-widget :item="item_details"/>
        </b-overlay>
        <span v-else><strong>[Connectez vous pour commander]</strong></span>
      </b-col>
    </b-row>


    </div>



  </li>

</template>

<script lang="js">


     import { mapState } from 'vuex'
     import IBUGauge from '../beers/Ibu.vue'

import Item from './Item.vue'

export default {
  extends: Item,

  name: 'BeerItem',
  components: {
    IBUGauge
  },

  filters: {
    erp_static_url (uri) {
      return 'https://erp.singe-savant.com/' + uri
    }
  },
  computed: {
    ...mapState({
      website_specifications: function () {
        var specs = {}
        for (var idx in this.item_details.website_specifications) {
          specs[this.item_details.website_specifications[idx].label] = this.item_details.website_specifications[idx].description
        }

        return specs
      }

    })
  }

}
</script>

<style lang="scss" scoped>

.beer-popover-table {
  font-weight: 300;
  font-style: italic;

  .category {
      font-style: normal;
      font-weight: 800;
  }
}



.recto-verso {
    display: none;
    visibility: hidden;

    &.active {
        display: flex;
        visibility: visible;
    }
}

li.item {
    z-index: 3;

    a {
        color: white !important;
        text-decoration: none;
    }


    .info {
        z-index: 3;

        width: 50%;
        height: 100%;
        color: white;

        .name {
            font-weight: bold;
            margin-top: auto;
            text-transform: uppercase;
        }

    }

    .illustration {
        z-index:10;
        position: relative;
        width: 50%;

        min-height: 50vh;

        padding-right: 10px;

        .bottles {
            width: 100%;
            height: 100%;
            position: relative;

            overflow: hidden;

            div.bottle {

                position: absolute;

                margin-bottom: 10px;

                bottom: 0;

                &.front {
                    $width: 30%;

                    z-index: 5;

                    width: $width;

                    left: 50%;
                    margin-left: -$width / 2.0;
                }

                &.back {
                    $width: 100%;

                    z-index: 4;
                    width: $width;
                }

                &.left {
                    left: 50%;
                    margin-left: 10%;
                }

                &.right {
                    right: 50%;
                    margin-right: 10%;
                }

                img {
                    width: 100%;
                    vertical-align: top;
                }

                img.label {
                    background-color: white;
                    object-fit: fill;
                    // clip-path: inset(5px 10px);
                    margin-bottom: 0px;
                    margin-top: 0px;
                    padding-top: 20px;
                    padding-bottom: 20px;
                    padding-left: -2.5px;
                    padding-right: -2.5px;
                }
            }
        }

    }
}

/* entire container, keeps perspective */
.flip-container {
    perspective: 1000px;
}
/* flip the pane when hovered */
.flip-container .flipped {
		transform: rotateY(180deg);
}

.flip-container {
    margin-top:15vh;
    margin-bottom: 15vh;
    height: 40vh;
}

/* flip speed goes here */
.flipper {
    transition: 0.6s;
    transform-style: preserve-3d;
    width:100%;
    height: 100%;
}

/* hide back of pane during swap */
.front, .back {
    backface-visibility: hidden;
}

/* front pane, placed above back */
.front {
    z-index: 2;
    /* for firefox 31 */
    transform: rotateY(0deg);
}

/* back, initially hidden pane */
.back {
    transform: rotateY(180deg);
}

</style>
