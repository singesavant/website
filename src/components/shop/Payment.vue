// -*- mode: vue; js-indent-level: 2; -*-
<template lang="html">
  <b-overlay :show="is_loading" rounded="sm">


    <b-modal size="xl"  centered @show="onACSModalShow" id="payment-acs-modal" title="Vérification ACS" hide-footer>
      <b-form v-show="!hide_acs_form" ref="acsform" name="triggerACSForm" :action="acs.url" target="acs-frame" method="POST">
        <input type="hidden" name="PaReq" :value="acs.pa_req"/>
        <input type="hidden" name="TermUrl" :value="acs.term_url"/>
        <input type="hidden" name="MD" :value="acs.md" />
        <b-button variant="primary" @click="start_acs" type="submit"><b-icon icon="check-circle"/>&nbsp;Cliquez pour démarrer la vérification avec votre banque</b-button>
      </b-form>

      <b-embed ref="acsframe" name="acs-frame" type="iframe"></b-embed>
    </b-modal>

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
  acs:{
    checkout_id: '',
    url: '',
    pa_req:'',
    term_url: '',
    md: ''
  },

  hide_acs_form: false,

  cardData: {
     cardName: '',
     cardNumber: '',
     cardMonth: null,
     cardYear: null,
     cardCvv: ''
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

    var my_this = this

    // Sumup Hack event handler for 3DSecure
    window.addEventListener("message", function(event) {
      var event_data = event.data
      if (event_data.type == "SumUpCard") {
        if (event_data.message == 'confirmation-success') {
          my_this.validatePayment(data.acs.checkout_id)
        } else {
          my_this.$bvModal.hide('payment-acs-modal')
          my_this.$bvModal.show('payment-error-modal')
        }

      }

    }, false)

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

    start_acs: function () {
      data.hide_acs_form = true
    },

    onACSModalShow: function () {
      data.hide_acs_form = false
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

      var sumupAxios = axios.create({
        baseURL: 'https://api.sumup.com/v0.1/',
        withCredentials: false
      })

      var requestData = {
        payment_type: 'card',
        card: {
          cvv: data.cardData.cardCvv,
          expiry_month: data.cardData.cardMonth.toString(),
          expiry_year: data.cardData.cardYear.toString(),
          number: data.cardData.cardNumber.replace(/\s/g, ''),
          name: data.cardData.cardName
        }
      }

      sumupAxios.put('/checkouts/' + data.checkout.id, requestData)
        .then((response) => {
          if (response.data['status'] == 'ENROLLED') {
            data.acs = {
              checkout_id: data.checkout.id,
              url: response.data['acs_url'],
              pa_req: response.data['pa_req'],
              term_url: "https://api.sumup.com"+response.data['term_url'],
              md: response.data['transaction_id']
            }
            this.$bvModal.show('payment-acs-modal')
          } else {
            this.validatePayment(response.data['id'])
          }
        })
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
