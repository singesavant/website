// -*- mode: vue; js-indent-level: 2; -*-

<template lang="html">
  <div class="cart-buttons" v-if="item && item_details">

    <div v-if="is_out_of_stock(item_details)">
  <h2><em>Pas dispo en ligne</em></h2>
    </div>

    <div v-else>
    <!-- this item has variants, show them all -->
    <div v-if="item_details.has_variants">
      <b-form-select @change="variant_updated($event)" v-model="variant_selected_code">
        <option value="null">&darr;&nbsp;Choisissez votre format</option>

        <option :value="variant.code" v-for="variant in item_details.variants" :key="variant.code" v-bind:class="{ 'soldout': variant.orderable_qty <= 0 }" :disabled="variant.orderable_qty <= 0"><span v-if="variant.orderable_qty <= 0">RUPTURE XXXX </span>{{ variant.name }} <span v-if="variant.orderable_qty > 0">(Stock : {{ variant.orderable_qty }})</span><span v-if="variant.orderable_qty > 0"> - {{ variant.price }}€</span></option>

      </b-form-select>

      <div class="product-qtty" v-if="variant_selected">
      <b-overlay :show="is_loading" rounded="sm">
        <b-form>
          <b-input-group>
            <b-button @click="qtty_down(variant_selected)">-</b-button>
            <b-input @change="check_qtty_input(variant_selected)" type="number" v-model="qtty[variant_selected.name]" :value="0" min="1" :max="variant_selected.orderable_qty"/>
            <b-button @click="qtty_up(variant_selected)">+</b-button>

            <b-button :disabled="qtty[variant_selected.name] <= 0" variant="primary" class="add-to-cart" @click="addOrderableItemToCart(variant_selected)"><b-icon icon="bucket"/>&nbsp;Ajouter au panier</b-button>
          </b-input-group>

        </b-form>
        </b-overlay>
      </div>

    </div>

    <!-- we have no variant -->

    <div class="product-qtty" v-else>
      <h3 class="price">{{ item.price }}€</h3>
      <b-overlay :show="is_loading" rounded="sm">
        <b-form>
          <b-input-group>
            <b-button @click="qtty_down(item)">-</b-button>
            <b-input @change="check_qtty_input(item)" type="number" v-model="qtty[item.name]" :value="0" min="1" :max="item.orderable_qty"/>
            <b-button @click="qtty_up(item)">+</b-button>

            <b-button :disabled="qtty[item.name] <= 0" variant="primary" class="add-to-cart" @click="addOrderableItemToCart(item)"><b-icon icon="bucket"/>&nbsp;Ajouter au panier</b-button>
          </b-input-group>

        </b-form>
        </b-overlay>
      </div>

    </div>
    </div>
</template>

<script lang="js">
  import { mapState } from 'vuex'
import _ from 'lodash'

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
      qtty: defaultDict(function () { return 1 }),
      variant_selected_code: null,
      variant_selected: null,
      is_loading: false
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
    /*
    if (this.item_details == undefined) {
      this.$store.dispatch('LOAD_ORDERABLE_ITEM_DETAILS', {item: this.item})
        .then(() => this.$forceUpdate())
    }*/
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
    variant_updated (variant_code) {
      this.variant_selected = _.find(this.item_details['variants'], {'name': variant_code})
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

      if (item.has_variants)
      {
        item['variants'].forEach(function (variant) {
          if (parseInt(variant.orderable_qty) > 0) {
            out_of_stock = false
          }
        })
      } else {
        if (parseInt(item.orderable_qty) > 0) {
          out_of_stock = false
        }
      }

      return out_of_stock

    },

    addOrderableItemToCart (item) {
      this.is_loading = true
      this.$store.dispatch('ADD_ORDERABLE_ITEM_TO_CART', {item: item, quantity: this.qtty[item.name]})
        .then(() => {
          this.$bvToast.toast(`${ item['name'] } x ${ this.qtty[item.name] }`, {
            autoHideDelay: 3000,
            title: `Ajouté au panier !`,
            variant: "secondary"
          })

        }).finally(() => this.is_loading = false)
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
    text-decoration: line-through !important;
    color: grey;
}

.price {
    color: black;
}

</style>
