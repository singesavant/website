// -*- mode: vue; js-indent-level: 2; -*-

<template lang="html">
  <div class="cart-buttons">
    <div class="product-qtty">
      <button @click="qttyDown()" class="qtty-modifier">-</button>
      <input type="number" v-model:value="qtty" min="1" max="10"/>
      <button @click="qttyUp()" class="qtty-modifier">+</button>
    </div>

    <button class="add-to-cart" type="button" @click="addPreOrderItemToCart(item)">Ajouter au panier</button>
  </div>
</template>

<script lang="js">

var data = {
  qtty: 1
}

export default {
  name: 'addPreOrderItemToCart',
  data: function () {
    return data
  },
  props: [
    'item'
  ],
  watch: {
    qtty: function (val, oldVal) {
      if (val <= 0 || val > 10) {
        this.qtty = oldVal
      }
    }
  },
  methods: {
    qttyUp () {
      this.qtty++
    },
    qttyDown () {
      if (this.qtty > 1) {
        this.qtty--
      }
    },
    addPreOrderItemToCart (item) {
      this.$store.dispatch('ADD_PREORDERABLE_ITEM_TO_CART', {item: item, quantity: this.qtty})
    }
  }
}
</script>

<style lang="scss">

.cart-buttons {
    display: flex;
    flex-direction: column;
    width: 100%;

    .product-qtty {
        height: 30px;

        button.qtty-modifier {
            float: left;
            display: inline;
            background-color: white;
            border-radius: 10px;
            text-align: center;
            font-weight: bold;
            border: none;
        }

        input {
            float: left;
            display: inline;
            margin-right: 10px;
            margin-left: 10px;
            border-radius: 25px;
            border: none;
            text-align: center;
            width: 50%;

            -moz-appearance: textfield;
            -webkit-appearance: none;
        }

    }



    button.add-to-cart {
        background-color: #d06f5a;
        border: none;
        color: white;

        margin-top: 10px;

        font-weight: bold;

        width: 100%;
        height: 40px;
    }

}
  </style>
