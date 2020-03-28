// -*- mode: vue; js-indent-level: 2; -*-
<template lang="html">
  <li class="item" v-if="in_stock">
    <div :class="{ flipped: isFlipped }">
    <b-row no-gutters align-h="center">

      <!-- illustration -->
      <b-col sm="12" lg="12" class="illustration">
        <div class="bottles">
          <div class="bottle front">
            <img class="top" src="/images/bottle-75-top.png" alt="bottle top">
            <img class="label" :src=item.thumbnail|erp_static_url>
            <img class="bottom" src="/images/bottle-75-bottom.png" alt="bottle bottom">
          </div>
        </div>
      </b-col>
    </b-row>

    <b-row no-gutters align-h="center">
      <b-col sm="12" lg="12" class="info" align="center" align-v="bottom">
        <h3 v-if="isAuthenticated" v-b-tooltip.hover title="Cliquez pour découvrir la recette"><router-link :to="{'name': 'beer-detail', params: {'slug': item.code}}">{{ item.name }}</router-link></h3>
        <h3 v-else v-b-tooltip.hover title="Connectez-vous pour commander">{{ item.name }}</h3>
        <add-orderable-item-to-cart-widget :item="item" v-if="isAuthenticated"/>
        <span v-else><strong>[Connectez vous pour commander]</strong></span>
      </b-col>
    </b-row>
</div>
  </li>

</template>

<script lang="js">
  import addOrderableItemToCartWidget from './AddOrderableItemToCartWidget'
import { mapState } from 'vuex'

export default {
  name: 'BeerItem',
  components: {
    addOrderableItemToCartWidget
  },
  props: {
    item: null
  },

  data: function () {
    return {
      isFlipped: false
    }
  },

  filters: {
    erp_static_url (uri) {
      return 'https://erp.singe-savant.com/' + uri
    }
  },
  computed: {
    in_stock: function () {
      var inStock = false

      if (this.item.has_variants) {
        for (var variant in this.item.variants) {
          inStock |= (variant.orderable_qty > 0)
        }
      }

      return inStock
    },
    ...mapState(['isAuthenticated'])
  },

  methods: {
    flip: function () {
      this.isFlipped = !this.isFlipped
    }
  }

}
</script>

<style lang="scss" scoped>
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
