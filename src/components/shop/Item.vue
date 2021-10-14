// -*- mode: vue; js-indent-level: 2; -*-
<template lang="html">
  <li class="item">
    <div>
    <b-row no-gutters align-h="center">

      <!-- illustration -->
      <b-col sm="12" lg="12" class="illustration">
        <div class="bottles">
          <div class="bottle front">
            <router-link :to="{'name': 'item-detail', params: {'slug': item.code}}"><img class="label" :src=item.thumbnail|erp_static_url></router-link>
          </div>
        </div>
      </b-col>
    </b-row>

    <b-row no-gutters align-h="center">
      <b-col sm="12" lg="12" class="info" align="center" align-v="bottom">
        <h3><router-link :to="{'name': 'item-detail', params: {'slug': item.code}}">{{ item.name }}</router-link></h3>

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
  import addOrderableItemToCartWidget from './AddOrderableItemToCartWidget'
import { mapState } from 'vuex'

export default {
  name: 'Item',
  components: {
    addOrderableItemToCartWidget
  },

  props: {
    item: Object,
    itemIdx: Number
  },

  data: function () {
    return {
      is_loading: true
    }

  },

  mounted: function () {
    this.$store.dispatch('LOAD_ORDERABLE_ITEM_DETAILS', {item: this.item})
      .then(() =>
            this.is_loading = false
           )
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

    ...mapState({
      item_details: function (state) {
        return state.orderable_item_details[this.item['name']]
      }
    }),

    ...mapState(['isAuthenticated'])
  }

}
</script>

<style lang="scss" scoped>

  h3 {
  color: black;
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

        text-decoration: none;
    }


    .info {
        span {
            color:black;
        }

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

        min-height: 20vh;

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
