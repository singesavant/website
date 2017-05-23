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
        <tr v-for="order in preOrders">
          <td>{{order.name}}</td>
          <td>{{order.date}}</td>
          <td>{{order.amount_total}}€</td>
          <td><button>Annuler</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'preOrderList',
  computed: mapState([
    'preOrders'
  ]),
  mounted: function () {
    this.$store.dispatch('LOAD_PREORDER_LIST')
  }
}
</script>

