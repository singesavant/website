// -*- mode: vue; js-indent-level: 2; -*-
<template lang="html">
  <b-overlay :show="is_loading" rounded="sm">
    <!-- {{ checkout.amount }}{{ checkout.currency }}-->

    <b-modal id="payment-error-modal" title="Erreur de Paiement" hide-footer>
      <p>Une erreur s'est produite pendant le paiement :'(</p>

      <p v-if="errors">{{ errors }}</p>
      <p v-else>Vérifiez votre numéro de carte ?</p>

      <p>
        Un problème pour payer ? <router-link :to="{name: 'contact'}">Contactez-nous !</router-link>
      </p>

      <b-button class="mt-3" block @click="$bvModal.hide('payment-error-modal')">OK</b-button>
    </b-modal>

    <form @submit="submit_payment">
      <card-form :form-data="cardData" isCardNumberMasked=""/>
    </form>
  </b-overlay>
</template>

<script lang="js">
import { mapState } from 'vuex'

import axios from 'axios'
import CardForm from '../CardForm.vue'

var data = {
   cardData: {
     cardName: 'Bob Robert',
     cardNumber: '4111111111111111',
     cardMonth: '11',
     cardYear: '2022',
     cardCvv: '938'
  },
  checkout: null,
  is_loading: false,
  errors: ""
}

export default {
  name: 'SumUpPayment',
  components: {
    CardForm
  },
  created: function () {
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

  mounted: function () {
    data.is_loading = true

    axios.get('/shop/orders/' + this.$route.params.slug + '/payment')
      .then((response) => {
        //If we get an empty response, it is probably already payed.

        if (response.data['status'] == 'ALREADY_PAID') {
          alert("ALREADY PAYED!")
          this.validatePayment(this.$route.params.slug)
        }
        else {
          data.checkout = response.data
          data.is_loading = false
        }
        })
  },
  methods: {

    // With the response from Sumup, send that to server to validate payment
    validatePayment:function (checkout_id) {
      axios.post('/shop/orders/' + this.$route.params.slug + '/payment', {'checkout_id': checkout_id})
        .then(() => {
          this.$router.push({'name': 'so-giveaway'})
        })

      this.$store.dispatch('LOAD_CART')
    },

    // Create a checkout at sumup and send card info
    submit_payment: function () {
      data.is_loading = true

      var sumupAxios = axios.create({
        baseURL: 'https://api.sumup.com/v0.1/',
        withCredentials: false
      })

      var requestData = {
        payment_type: 'card',
        card: {
          cvv: data.cardData.cardCvv,
          expiry_month: data.cardData.cardMonth,
          expiry_year: data.cardData.cardYear,
          number: data.cardData.cardNumber.replace(/\s/g, ''),
          name: data.cardData.cardName
        }
      }

      sumupAxios.put('/checkouts/' + data.checkout.id, requestData)
        .then((response) => { this.validatePayment(response.data['id']) })
        .catch((error) => {
          if (error.response) {
            if (error.response.status == 409)
              data.errors = "Ce paiement a déjà été effectué !"
            else if (error.message)
              data.errors = error.message
          }

          this.$bvModal.show('payment-error-modal')

        })
        .finally(() => data.is_loading = false)
    }
  }

}
</script>

<style lang="scss">
@import 'src/assets/css/creditcard.scss';
</style>
