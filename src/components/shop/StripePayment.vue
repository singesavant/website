// -*- mode: vue; js-indent-level: 2; -*-
<template lang="html">
  <b-overlay :show="is_loading" rounded="sm">

  <b-modal id="payment-error-modal" title="Erreur de Paiement" hide-footer>
      <p>Une erreur s'est produite pendant le paiement :'(</p>

      <p v-if="errors">{{ errors }}</p>
      <p v-else>Vérifiez votre numéro de carte ?</p>

      <p>
        Un problème pour payer ? <router-link :to="{name: 'contact'}">Contactez-nous !</router-link>
      </p>

      <b-button class="mt-3" block @click="$bvModal.hide('payment-error-modal')">OK</b-button>
  </b-modal>

  <div v-if="checkout">

  <h5>Veuillez saisir vos informations de paiement :</h5>
    <stripe-elements
      ref="elementsRef"
      :pk="publishableKey"
      :amount="checkout.stripe_amount"
      @token="tokenCreated"
      @loading="loading = $event"
      >
    </stripe-elements>
    <b-button variant="primary" @click.prevent="submit">Payer {{checkout.amount}}€</b-button>

  </div>


  </b-overlay>
</template>

<script lang="js">

import { mapState } from 'vuex'

import axios from 'axios'
import { StripeElements } from 'vue-stripe-checkout';

var data = {
  publishableKey: process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY,

  checkout: null,
  is_loading: false,
  errors: ""
}

export default {
  name: 'StripePayment',
  components: {
    StripeElements
  },
  filters: {
    erp_static_url (uri) {
      return 'https://erp.singe-savant.com/' + uri
    }
  },
  data: function () {
    return data
  },
  computed:
    mapState({
    }),

  created: function () {

  },

  mounted: function () {
    data.is_loading = true

    axios.get('/shop/orders/' + this.$route.params.slug + '/payment')
      .then((response) => {
        data.checkout = response.data
        data.is_loading = false
      })

  },
  methods: {
    submit () {
      this.$refs.elementsRef.submit()
    },

    tokenCreated () {
      data.is_loading = true

      this.$refs.elementsRef.stripe.confirmCardPayment(this.checkout.client_secret, {
        payment_method: {
          card: this.$refs.elementsRef.card,
          billing_details: {
            name: this.checkout.customer
          }
        }}).then((result) => {
          if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            data.errors = result.error.message

            this.$bvModal.show('payment-error-modal')

            data.is_loading = false
          } else {
            // The payment has been processed!
            if (result.paymentIntent.status === 'succeeded') {
              // Show a success message to your customer
              // There's a risk of the customer closing the window before callback
              // execution. Set up a webhook or plugin to listen for the
              // payment_intent.succeeded event that handles any business critical
              // post-payment actions.
              this.validatePayment(result.paymentIntent.id).then(() =>
                                                                 data.is_loading = false
                                                                )

            }
          }
        })

    },

    // With the response from Sumup, send that to server to validate payment
    validatePayment:function (checkout_id) {
      axios.post('/shop/orders/' + this.$route.params.slug + '/payment', {'checkout_id': checkout_id})
        .then(() => {
          this.$router.push({'name': 'so-giveaway', params: {slug: this.$route.params.slug}})
        })

      this.$store.dispatch('LOAD_CART')
    },

    // Create a checkout at sumup and send card info
    submit_payment: function () {
      data.is_loading = true
    }

  }

}
</script>

<style lang="scss">
#payment-form {
button {
visibility: hidden;
}

}

</style>
