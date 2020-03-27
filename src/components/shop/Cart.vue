//-*- mode: vue; js-indent-level: 2; -*-

<template lang="html">
  <div v-show="product_count > 0" class="cart" v-if="isAuthenticated">
    <a href="javascript:;"  @click="toggleCartDetail()" v-b-tooltip.hover title="Afficher votre panier">
      <img class="icon" src="/images/cart.png" alt="cart"/>
    </a>

    <div class="info" @click="toggleCartDetail()">
      <span class="product_count">{{ product_count }} {{ product_count | pluralize('article') }}</span>
<!--      <span v-else class="product_count">Votre panier est vide</span> -->
      <span v-show="product_count > 0" class="grand_total">{{ rounded_total|currency('', 2) }}€</span>
    </div>

    <submit-cart-button :isActive="product_count > 0" v-bind:cart="cart" />

    <div v-bind:class="{ deployed: isCartVisible }" class="cart-details">

      <a href="javascript:;" @click="hideCartDetail()">
        <b-icon icon="x-circle-fill"/> Fermer
      </a>

      <b-table-simple class="article-lines">
        <b-thead>
          <b-tr>
            <b-th>Item</b-th>
            <b-th>Qtté</b-th>
            <b-th>Total</b-th>
            <b-th>&#9760;</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr v-for="item in cart.items" v-bind:key="item.product.name">
            <b-td>{{item.product.name}}</b-td>
            <b-td>x{{item.quantity}}</b-td>
            <b-td>{{item.line_price | currency('', 2) }}€</b-td>
            <b-td><b-button @click="removeItemFromCart(item)" class="remove vertical-align-middle"><b-icon icon="x"></b-icon></b-button></b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
    </div>
  </div>
</template>

<script lang="js">

import { mapState } from 'vuex'
import submitCartButton from './submitCartButton'

var data = {
  isCartVisible: false
}

export default {
  name: 'Cart',
  components: {
    submitCartButton
  },

  data: function () {
    return data
  },

  methods: {
    showCartDetail: function () {
      this.isCartVisible = true
    },
    hideCartDetail: function () {
      this.isCartVisible = false
    },

    toggleCartDetail: function () {
      this.isCartVisible = !this.isCartVisible
    },

    removeItemFromCart (item) {
      this.$store.dispatch('REMOVE_ORDERABLE_ITEM_FROM_CART', {item: item})
    }
  },
  computed: {
    product_count () {
      if (this.$store.state.cart.items) {
        var count = 0
        for (var item of this.$store.state.cart.items) {
          count += item.quantity
        }
        return count
      } else return 0
    },
    rounded_total () {
      if (this.$store.state.cart.grand_total) {
        return Number((this.$store.state.cart.grand_total).toFixed(2))
      } else return 0
    },
    ...mapState(['cart', 'isAuthenticated'])
  },
  mounted: function () {
    this.$store.dispatch('LOAD_CART')

    this.$watch("product_count", () => this.showCartDetail())
  }
}
</script>

<style lang="scss">
.cart {
    top: 2vh;
    right: 2vw;

    color: white;

    display: flex;
    flex-direction: row;
    align-items: center;

    table tr td {
        white-space:nowrap;
        padding-right: 10px;
        padding-left: 10px;
    }

    .info {
        display: flex;
        flex-direction: column;

        font-size: 0.8em;
        line-height: 1.4em;

        .product_count {
            margin-right: 10px;
            margin-left: 10px;
        }

        .grand_total {
            font-weight: bold;
            margin-right: 10px;
            margin-left: 10px;
        }

    }

    img.icon {


        padding: 0.5vh;
        border:1px solid white;
        border-radius: 500px;
    }

}



.cart-details {

    &.deployed {
        right:0;
    }

    right: -30vw;
    top:0;
    margin-top: 7.9vh;
    bottom: 0px;

    max-width: 30vw;

    height: 100%;

    table td, thead {
        color: white !important;
    }


    position: fixed !important;

    padding: 10px;

    z-index: 200;

    transition-timing-function: linear;
    transition: 0.4s;

    background-color: rgba(0, 0, 0, 0.9);

    button.remove {
        background-color: #d06f5a;
        border: none;
        color: white;

        font-weight: bold;

        width: 100%;
        height: 30px;
    }
}

</style>
