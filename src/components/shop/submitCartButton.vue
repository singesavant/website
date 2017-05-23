<template lang="html">
  <div>
    <button type="button" v-bind:class="{ active: isActive }" class="order" @click="submitCart(cart)">Réserver &#x2714;</button>
  </div>
</template>

<script lang="js">
export default {
  name: 'submitCartButton',
  props: ['cart', 'isActive'],
  methods: {
    submitCart (cart) {
      this.$store.dispatch('SUBMIT_CART', {cart: cart})
    }
  }
}
</script>

<style lang="scss">
button {

    &.order {
      font-weight: bold;
      font-size: 1.2em;
      border: none;
      background-color: grey;
      color: black;
      padding-top: 0.8vh;
      padding-bottom: 0.8vh;
      padding-left: 0.5vw;
      padding-right: 0.5vw;

      visibility: hidden;
    }

    &.active {
        color: white;
        background-color: #d06f5a;

        visibility: visible;
    }

}


</style>
