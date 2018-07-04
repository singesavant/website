<template lang="html">

    <div class="item-container">
      <b-list-group>

        <b-list-group-item v-for="item in orderBy(malt_items, 'name')" :key="item.name" class="flex-column align-items-start">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{ item.name }}</h5>

            <small>
              <span class="stock" v-if="item.total_projected_qty <= 0">Rupture de stock</span>
              <span class="price" v-else>{{ item.price }}€/kg</span>
            </small>
          </div>

          <small>{{ item.website_long_description_html }}</small>

        </b-list-group-item>

      </b-list-group>
    </div>

</template>

<script lang="js">
import { mapState } from 'vuex'

export default {
  name: 'MaltList',
  components: {
  },
  filters: {
    erp_static_url (uri) {
      return 'https://erp.singe-savant.com/' + uri
    }
  },
  computed:
    mapState({
      malt_items: 'malt_items'
    }),
  mounted: function () {
    this.$store.dispatch('LOAD_MALT_ITEM_LIST')
  }
}
</script>

<style lang="scss" scoped>
</style>
