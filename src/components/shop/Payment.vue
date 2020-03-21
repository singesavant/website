// -*- mode: vue; js-indent-level: 2; -*-
<template lang="html">
  <b-overlay :show="is_loading" rounded="sm">
    <!-- {{ checkout.amount }}{{ checkout.currency }}-->

    <form @submit="submit_payment">
      <card-form :form-data="cardData"/>
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
  checkout: null
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
    axios.get('/shop/orders/' + this.$route.params.slug + '/payment')
      .then((response) => { data.checkout = response.data })
  },
  methods: {
submit_payment: function () {
      console.debug(data.cardData.cardNumber);
      var sumupAxios = axios.create({
        baseURL: 'https://api.sumup.com/v0.1/',
        withCredentials: false
      })

      console.debug(data.cardData);
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

      sumupAxios.put('/checkouts/' + data.checkout.id, requestData).then(() => { alert('YAY!') })
    }
  }

}
</script>

<style lang="scss">
@import 'src/assets/css/creditcard.scss';
</style>
