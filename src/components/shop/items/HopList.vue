<template lang="html">

    <div class="item-container">
      <ul class="item-list">

        <li class="item" v-for="item in items">

          <div class="info">
            <div class="header">
              <span class="name">{{ item.name }}</span>
              <span class="stock" v-if="item.total_projected_qty <= 0">Rupture de stock</span>
              <span class="price" v-else>{{ item.price / 10 }}€/100g</span>
            </div>
            <div class="more">
              <span class="description">{{ item.long_description_html }}</span>
            </div>
          </div>
        </li>

      </ul>
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
      items: 'hop_items'
    }),
  mounted: function () {
    this.$store.dispatch('LOAD_HOP_ITEM_LIST')
  }
}
</script>

<style lang="scss" scoped>

ul.item-list {
    margin: 0;
    padding: 0;
    list-style-type: none;

    display: flex;
    flex-direction: column;
    align-content: flex-start;

    width: 100%;

    max-height: 50vh;
    flex-wrap: wrap;

    li.item {
        min-width: 200px;
        width: 25vw;

        height: auto;

        margin-right: 20px;

        line-height: 1.3em;

        background-image: linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.5)), url(/static/images/brewshop/hops.jpg);
        background-position: left, right;

        border: 1px solid black;

        display: flex;
        flex-direction: row;
        align-items: flex-start;

        margin-top: 2px;
        margin-bottom: 2px;

            .info {
                width: 100%;
                height: 100%;
                color: white;
                font-size: 1.2em;
                padding: .8em;

                display: flex;
                flex-direction: column;

                .header {
                    display: flex;
                    flex-direction: row;
                    width: 100%;
                    justify-content: space-between;
                }

                .more {
                    display: flex;
                    flex-direction: row;
                    width: 100%;
                    justify-content: space-between;
                }

                    .name {
                        font-weight: bold;
                        margin-top: auto;
                        font-variant: small-caps;
                    }

            }
    }
}

#products {
}

</style>
