// -*- mode: vue; js-indent-level: 2; -*-

<template lang="html">
  <div class="cart-buttons">

    <div v-if="is_out_of_stock(item)">
      <h2>KO!</h2>
    </div>

    <div v-else>
    <!-- this item has variants, show them all -->
    <div v-if="item_details.has_variants">
      <b-form-select @change="variant_updated(variant_selected_code)" v-model="variant_selected_code">
        <option :value="variant.code" v-for="variant in item_details.variants" :key="variant.code" :disabled="variant.orderable_qty <= 0">{{ variant.name }} <span v-if="variant.orderable_qty > 0">(Stock : {{ variant.orderable_qty }})</span> - {{ variant.price }}€</option>
      </b-form-select>

      <div class="product-qtty" v-if="variant_selected">
        <b-form>
          <b-input-group>
            <b-button @click="qtty_down(variant_selected)">-</b-button>
            <b-input @change="check_qtty_input(variant_selected)" type="number" v-model="qtty[variant_selected.name]" :value="0" min="0" :max="variant_selected.orderable_qty"/>
            <b-button @click="qtty_up(variant_selected)">+</b-button>
          </b-input-group>
          <b-button class="add-to-cart" @click="addOrderableItemToCart(variant_selected)">Ajouter au panier</b-button>
        </b-form>
      </div>

    </div>

    <!-- we have no variant -->
    <div class="product-qtty" v-else>
      <b-button class="qtty-modifier">-</b-button>
      <b-input type="number" v-model="qtty[item_details.name]" value="0" min="1" max="20"/>
      <b-button class="qtty-modifier">+</b-button>
    </div>
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

    check_qtty_input (item) {
      if (parseInt(item.orderable_qty) < this.qtty[item.name]) {
        // console.debug("FORCING!")
        this.qtty[item.name] = parseInt(item.orderable_qty)
      }
      this.$forceUpdate()
    },

    is_out_of_stock (item) {
      var out_of_stock = true
      item['variants'].forEach(function (variant) {
         if (parseInt(variant.orderable_qty) > 0) {
          out_of_stock = false
         }
      })

      return out_of_stock

    },

    addOrderableItemToCart (item) {
      this.$store.dispatch('ADD_ORDERABLE_ITEM_TO_CART', {item: item, quantity: this.qtty[item.name]})
    }
  }
}
</script>

<style lang="scss" scoped>

input[type=number],
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -moz-appearance: textfield !important;
    -webkit-appearance: none;
    margin: 0;
}


.soldout {
  text-decoration: line-through;
}
</style>
