// -*- mode: vue; js-indent-level: 2; -*-
<template lang="html">
  <ul class="item-list">
    <b-row class="orderable-item-container justify-content-md-center">
      <b-col sm=2 v-for="item in items">
        <li class="item">
          <!-- illustration -->
          <b-row>
          <b-col cols=12 class="illustration">
            <div class="bottles">
              <div class="bottle front">
                <img class="top" src="static/images/bottle-75-top.png" alt="bottle top">
                <img class="label" v-bind:src=item.thumbnail|erp_static_url>
                <img class="bottom" src="static/images/bottle-75-bottom.png" alt="bottle bottom">
              </div>

              <div class="bottle back">
                <img class="top" src="static/images/bottle-75-top.png" alt="bottle top">
                <img class="label" v-bind:src=item.thumbnail|erp_static_url>
                <img class="bottom" src="static/images/bottle-75-bottom.png" alt="bottle bottom">
              </div>
            </div>
          </b-col>

          <!-- info -->
          <b-col cols=12 class="info">
            <span class="name">{{item.name}}</span>
            <span class="price">{{item.price}}€</span>
            <add-orderable-item-to-cart-widget :item="item"/>
          </b-col>

          </b-row>
        </li>
      </b-col>
    </b-row>
  </ul>

</template>

<script lang="js">
import { mapState } from 'vuex'
import addOrderableItemToCartWidget from './AddOrderableItemToCartWidget'

export default {
  name: 'orderableItemList',
  components: {
    addOrderableItemToCartWidget
  },
  props: {
    item_group: null
  },
  filters: {
    erp_static_url (uri) {
      return 'https://erp.singe-savant.com/' + uri
    }
  },
  computed:
    mapState({
      items: 'orderable_items'
    }),
  mounted: function () {
    this.$store.dispatch('LOAD_ORDERABLE_ITEM_LIST', { item_group: this.item_group })
  }
}
</script>

<style lang="scss" scoped>
  ul.item-list {
    width:100%;
    margin: 0px;
    padding: 0px;
    margin-bottom: 0px !important;

    z-index: 3;

    list-style-type: none;
  }

.orderable-item-container {

    li.item {
        .info {
            width: 50%;
            height: 100%;
            color: white;

            .name {
                font-weight: bold;
                margin-top: auto;
            }

        }


        .illustration {

            width: 50%;
            height: 100%;

            padding-right: 10px;

            .bottles {

                position: relative;

                width: 100%;
                height: 100%;

                div.bottle {

                    &.front {
                        width: 70%;

                        height: 100%;
                        left: 30%;
                        z-index: 20;
                    }

                    &.back {
                        position:absolute;
                        width: 50%;

                        height: 80%;

                        top: 30px;


                        left: 10px;
                        z-index: 19;
                    }


                    img {
                        width: 100%;
                    }
                }
            }

        }
    }

}
</style>
