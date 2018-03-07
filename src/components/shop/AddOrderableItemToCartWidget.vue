// -*- mode: vue; js-indent-level: 2; -*-

<template lang="html">
  <div class="cart-buttons">
    <div class="product-qtty">
      <b-button @click="qttyDown()" class="qtty-modifier">-</b-button>
      <b-input type="number" v-model:value="qtty" min="1" max="10"/>
      <b-button @click="qttyUp()" class="qtty-modifier">+</b-button>
    </div>

    <b-button class="add-to-cart" type="button" @click="addOrderableItemToCart(item)">Ajouter au panier</b-button>
  </div>
</template>

<script lang="js">

export default {
  name: 'addOrderableItemToCartWidget',
  data: function () {
    return {
      qtty: 1
    }
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
  mounted: function () {
    alert('ya')
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
    addOrderableItemToCart (item) {
      this.$store.dispatch('ADD_ORDERABLE_ITEM_TO_CART', {item: item, quantity: this.qtty})
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

        display: inline-block;
        height: 30px;

        button.qtty-modifier {
            display: inline;
            background-color: white;
            border-radius: 10px;
            text-align: center;
            font-weight: bold;
            border: none;
        }

        input {
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
