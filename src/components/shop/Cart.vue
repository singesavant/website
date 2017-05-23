//-*- mode: vue; js-indent-level: 2; -*-

<template lang="html">
  <div class="cart" v-if="cart" v-on:mouseover="showCartDetail()" v-on:mouseout="hideCartDetail()">
    <img class="icon" src="/static/images/cart.png" alt="cart"/>

    <span v-if="product_count > 0" class="product_count">{{ product_count }} {{ product_count | pluralize('article') }}</span>
    <span v-if="product_count == 0" class="product_count">Votre panier est vide</span>
    |
    <span class="grand_total">{{ rounded_total|currency('', 2) }}€</span>

    <submit-cart-button :isActive="product_count > 0" :cart="this.$store.cart" />

    <div v-if="isCartVisible" class="cart-details">
      <table class="article-lines">
        <thead>
          <tr>
            <th>Item</th>
            <th>Qtté</th>
            <th>Total</th>
            <th>&#9760;</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cart.items">
            <td>{{item.product.name}}</td>
            <td>x{{item.quantity}}</td>
            <td>{{item.line_price | currency('', 2) }}€</td>
            <td><button @click="removeItemFromCart(item)" class="remove">&#xd7;</button></td>
          </tr>
        </tbody>
      </table>
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
    removeItemFromCart (item) {
      this.$store.dispatch('REMOVE_PREORDERABLE_ITEM_FROM_CART', {item: item})
    }
  },

  computed: {
    product_count () {
      if (this.$store.state.cart.items) {
        var count = 0
        for (var item of this.$store.state.cart.items) {
          console.debug(item)
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
    ...mapState(['cart'])
  },
  mounted: function () {
    this.$store.dispatch('LOAD_CART')
  }
}
</script>

<style lang="scss">
.cart {

    table tr td {
        white-space:nowrap;
        padding-right: 10px;
        padding-left: 10px;
    }

    position: absolute;
    top: 2vh;
    right: 2vw;

    color: white;

    display: flex;
    flex-orientation: column;
    align-items: center;

    img.icon {
      margin-top: -6px;
    }

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

.cart-details {
    position: absolute;
    top: 6vh;
    right: 10px;

    padding: 10px;

    z-index: 100;

    background-color: rgba(0.5, 0.5, 0.5, 0.5);

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
