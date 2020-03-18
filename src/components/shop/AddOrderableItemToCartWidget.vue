// -*- mode: vue; js-indent-level: 2; -*-

<template lang="html">
  <div class="cart-buttons">

    <!-- this item has variants, show them all -->
    <div v-if="item_details.has_variants">
      <b-form-select @change="variant_updated(variant_selected_code)" v-model="variant_selected_code">
        <option :value="variant.code" v-for="variant in item_details.variants" :key="variant.code" :disabled="variant.orderable_qty <= 0">{{ variant.name }}</option>
      </b-form-select>

      <div class="product-qtty" v-if="variant_selected">

        <h3>{{ variant_selected.name }}</h3>
        <b-form>
          <b-input-group>
            <b-button @click="qtty_down(variant_selected)">-</b-button>
            <b-input type="number" v-model="qtty[variant_selected.name]" :value="0" min="0" :max="variant_selected.orderable_qty"/>
            <b-button @click="qtty_up(variant_selected)">+</b-button>
          </b-input-group>
          <b-button class="add-to-cart" @click="addOrderableItemToCart(variant_selected)">Ajouter au panier</b-button>
        </b-form>
      </div>

    </div>

    <!-- we have no variant -->
    <div class="product-qtty" v-else>
      <b-button class="qtty-modifier">-</b-button>
      <b-input type="number" v-model="qtty[item_details.name]" value="0" min="1" max="10"/>
      <b-button class="qtty-modifier">+</b-button>
    </div>
  </div>
</template>

<script lang="js">
import { mapState } from 'vuex'

function defaultDict (createValue) {
  return new Proxy(Object.create(null), {
    get (storage, property) {
      if (!(property in storage)) {
        storage[property] = createValue(property)
      }
      return storage[property]
    }
  })
}

export default {
  name: 'addOrderableItemToCartWidget',
  data: function () {
    return {
      qtty: defaultDict(function () { return 0 }),
      variant_selected_code: null,
      variant_selected: null
    }
  },
  props: [
    'item'
  ],
  computed: mapState({
    item_details: function (state) {
      return state.orderable_item_details[this.item['name']]
    }
  }),
  mounted: function () {
    this.$store.dispatch('LOAD_ORDERABLE_ITEM_DETAILS', {item: this.item})
  },
  methods: {
    qtty_down (item) {
      if (this.qtty[item.name] > 0) {
        this.qtty[item.name]--
        this.$forceUpdate()
      }
    },
    qtty_up (item) {
      if (this.qtty[item.name] < item.orderable_qty) {
        this.qtty[item.name]++
        this.$forceUpdate()
      }
    },
    variant_updated () {
      this.variant_selected = this.item_details['variants'][0]
      this.$forceUpdate()
    },
    addOrderableItemToCart (item) {
      this.$store.dispatch('ADD_ORDERABLE_ITEM_TO_CART', {item: item, quantity: this.qtty[item.name]})
    }
  }
}
</script>

<style lang="scss" scoped>

.soldout {
  text-decoration: line-through;
}
</style>
