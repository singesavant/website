<template lang="html">
  <div class="">
    <table class="table">
      <thead>
        <tr>
          <th>Numéro de précommande</th>
          <th>Date</th>
          <th>Total</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in sales_orders">
          <td>{{order.name}}</td>
          <td>{{order.date}}</td>
          <td>{{order.amount_total}}€</td>
          <td>
            <b-button>Annuler</b-button>
            <b-button :to="{name: 'so-payment', params: {slug: order.name}}">Payer</b-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="js">
import { mapState } from 'vuex'

export default {
  name: 'SalesOrderList',
  computed: mapState([
    'sales_orders'
  ]),
  mounted: function () {
    this.$store.dispatch('LOAD_SALESORDER_LIST')
  }
}
</script>

