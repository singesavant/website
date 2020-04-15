// -*- mode: vue; js-indent-level: 2; -*-
<template lang="html">
  <ul class="item-list">
    <b-row class="orderable-item-container justify-content-md-center">
      <b-col sm="6" md="3" v-for="item in orderBy(getOrderableListByGroup(item_group), 'name')" :key="item.name">
        <slot :item="item">
          <item :item="item"/>
        </slot>
      </b-col>
    </b-row>
  </ul>

</template>

<script lang="js">
import { mapGetters } from 'vuex'
import Item from './Item'
import Vue2Filters from 'vue2-filters'

export default {
  name: 'orderableItemList',
  components: {
    Item
  },
  props: {
    item_group: null
  },

  mixins: [Vue2Filters.mixin],
  computed:
  mapGetters([
    'getOrderableListByGroup'
    ]),
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
