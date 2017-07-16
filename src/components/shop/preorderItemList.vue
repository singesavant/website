<template lang="html">
  <div class="preorder-item-container">
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
          <add-pre-order-item-to-cart :item="item"/>
        </div>

      </li>
    </ul>
  </div>
</template>

<script lang="js">
import { mapState } from 'vuex'
import addPreOrderItemToCart from './addPreOrderItemToCart'

export default {
  name: 'preorderItemList',
  components: {
    addPreOrderItemToCart
  },
  filters: {
    erp_static_url (uri) {
      return 'https://erp.singe-savant.com/' + uri
    }
  },
  computed:
    mapState({
      items: 'preorderable_items'
    }),
  mounted: function () {
    this.$store.dispatch('LOAD_PREORDERABLE_ITEM_LIST')
  }
}
</script>

<style lang="scss">
.preorder-item-container {
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
            width: 25vw;
            height: 100%;

            display: flex;
            flex-direction: row;
            align-items: flex-end;

            margin-left: 5vw;
            margin-right: 5vw;

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
                margin-left: 20px;
                margin-right: 20px;


                .bottles-75cl {

                    position: relative;

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
