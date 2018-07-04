<template lang="html">


    <div class="item-container">
      <b-list-group>

        <b-list-group-item v-b-toggle="'collapse-description'+index" v-for="(item, index) in orderBy(items, 'name')" class="flex-column align-items-start clickable-item" :key="index">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{ item.name }}</h5>

            <small>
              <span class="stock" v-if="item.total_projected_qty <= 0">Rupture de stock</span>
              <span class="price" v-else>{{ item.price/10 }}€/100g</span>
            </small>
          </div>

          <b-collapse :id="'collapse-description'+index" class="mt-2">
            <div v-html='item.website_long_description_html'></div>
          </b-collapse>


        </b-list-group-item>

      </b-list-group>
    </div>

</template>

<script lang="js">
import { mapState } from 'vuex'

export default {
  name: 'HopList',
  components: {
  },
  filters: {
    erp_static_url (uri) {
      return 'https://erp.singe-savant.com/' + uri
    }
  },
  computed:
    mapState({
      items: 'hop_items'
    }),
  mounted: function () {
    this.$store.dispatch('LOAD_HOP_ITEM_LIST')
  }
}
</script>

<style lang="scss" scoped>

.clickable-item {
    cursor: pointer;
}

</style>
