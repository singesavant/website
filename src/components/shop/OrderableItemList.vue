<template lang="html">
  <div class="orderable-item-container">
    <ul class="item-list">
      <li class="item" v-for="item in items">

        <!-- illustration -->
        <div class="illustration">
          <div class="bottles-75cl">
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
        </div>

        <!-- info -->
        <div class="info">
          <span class="name">{{item.name}}</span>
          <span class="price">{{item.price}}€</span>
          <add-orderable-item-to-cart-widget :item="item"/>
        </div>

      </li>
    </ul>
  </div>
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

<style lang="scss">
.orderable-item-container {
    align: center;

    height: 40vh;

    margin-bottom: 5%;


    ul.item-list {
        margin: 0;
        padding: 0;
        list-style-type: none;
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;


        li.item {
            height: 100%;

            display: flex;
            flex-direction: row;
            align-items: flex-end;


            .info {
                width: 50%;
                height: 100%;
                color: white;

                display: flex;
                flex-direction: column;

                .name {
                    font-weight: bold;
                    margin-top: auto;
                }

            }


            .illustration {
                width: 50%;
                height: 100%;

                padding-right: 10px;

                .bottles-75cl {

                    position: relative;

                    width: 100%;
                    height: 100%;

                    div.bottle {
                        position: absolute;

                        &.front {
                            width: 70%;

                            height: 100%;
                            left: 30%;
                            z-index: 20;
                        }

                        &.back {
                            width: 50%;

                            height: 80%;

                            top: 30px;


                            left: 10px;
                            z-index: 19;
                        }

                        display: flex;
                        flex-direction: column;

                        img {
                            width: 100%;
                        }

                    }
                }

            }

        }
    }

}


</style>
