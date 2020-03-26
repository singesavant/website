<template lang="html">
  <div>
    <b-overlay :show="is_loading">
      <b-button type="button" variant="primary" v-bind:class="{ active: isActive }" class="order" @click="reviewOrder(cart)">J'achète&nbsp;<b-icon icon="check-circle"></b-icon></b-button>
    </b-overlay>

  </div>
</template>

<script lang="js">
  var data = {
      is_loading: false
  }


    export default {
        name: 'submitCartButton',
        props: {
            'cart': Object,
            'isActive': Boolean
        },

        data: function() {
            return data
        },

        mounted: function() {
            data.is_loading = false
        },

        methods: {
            reviewOrder (cart) {
                data.is_loading = true

                this.$store.dispatch('SUBMIT_CART', {cart: cart}).then(data => {

                    if (this.$router.currentRoute.name == 'so-checkout') {
                        this.$router.go(0)
                    }
                    else {
                        this.$router.push({name: 'so-checkout', params: {slug: data.name}})
                    }

                }).finally(() => {
                    data.is_loading = false
                })

            },

            submitCart (cart) {
                data.is_loading = true
                this.$store.dispatch('SUBMIT_CART', {cart: cart}).then(data => {
                    data.is_loading = false
                    this.$router.push({name: 'so-checkout', params: {slug: data.name}})
                })
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
