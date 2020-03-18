// -*- mode: vue; js-indent-level: 2; -*-
<template lang="html">
  <div v-if="checkout != null">
    <h1>Payer!</h1>

    <b-link :to="{name: 'sales-orders'}">Retourner aux commandes</b-link>

    <h2>{{ checkout.checkout_reference }}</h2>

    <h3>{{ checkout.amount }}{{ checkout.currency }}</h3>

    <!-- <card v-model="cardDetail"></card> -->
    <form>
      <input name="number" placeholder="Card number" type="tel" v-model="cardDetail.number" v-card-focus>
      <input name="name" placeholder="Full name" type="text" v-model="cardDetail.name" v-card-focus>
      <input name="expiry" placeholder="MM/YY" type="tel" v-model="cardDetail.expiry" v-card-focus>
      <input name="cvc" placeholder="CVC" type="number" v-model="cardDetail.cvc" v-card-focus>

      <b-button v-on:click="submit_payment">Payer!</b-button>
    </form>


  </div>

</template>

<script lang="js">
import { mapState } from 'vuex'

import axios from 'axios'



let defaultProps = {
  number: '4222222222222',
  name: 'Tester',
  expiry: '11/20',
  cvc: '123'
}

var data = {
  cardDetail: defaultProps,
  checkout: null
}

export default {
  name: 'SumUpPayment',
  components: {
    // card
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
    axios.get('/shop/orders/' + this.$route.params.slug + '/checkout')
      .then((response) => { data.checkout = response.data })
  },
  methods: {
    submit_payment: function () {
      var sumupAxios = axios.create({
        baseURL: 'https://api.sumup.com/v0.1/',
        withCredentials: false
      })

      var requestData = {
        payment_type: 'card',
        card: {
          cvv: data.cardDetail.cvc,
          expiry_month: data.cardDetail.expiry.split('/')[0].trim(),
          expiry_year: '20' + data.cardDetail.expiry.split('/')[1].trim(),
          number: data.cardDetail.number.replace(/\s/g, ''),
          name: data.cardDetail.name
        }
      }

      sumupAxios.put('/checkouts/' + data.checkout.id, requestData).then(() => { alert('YAY!') })
    }
  }

}
</script>
