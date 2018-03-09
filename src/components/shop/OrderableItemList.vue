// -*- mode: vue; js-indent-level: 2; -*-
<template lang="html">
  <ul class="item-list">
    <b-row class="orderable-item-container justify-content-md-center">
      <b-col sm=3 v-for="item in orderBy(items, 'name')" :key="item.name">
        <beer-item :item="item"></beer-item>
      </b-col>
    </b-row>
  </ul>

</template>

<script lang="js">
import { mapState } from 'vuex'
import BeerItem from './BeerItem'

export default {
  name: 'orderableItemList',
  components: {
    BeerItem
  },
  props: {
    item_group: null
  },
  filters: {
    erp_static_url (uri) {
      return 'https://erp.singe-savant.com/' + uri
    }
  },
  computed:
    mapState({
      items: 'orderable_items'
    }),
  mounted: function () {
    this.$store.dispatch('LOAD_ORDERABLE_ITEM_LIST', { item_group: this.item_group })
  }
}
</script>

<style lang="scss" scoped>
ul.item-list {
    width:100%;
    margin: 0px;
    padding: 0px;
    margin-bottom: 0px !important;

    z-index: 3;

    list-style-type: none;
}

.orderable-item-container {
    z-index: 3;
}

</style>
