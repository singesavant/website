// -*- mode: vue; js-indent-level: 2; -*-
<template lang="html">
  <b-container fluid class="brick-background">

    <b-modal v-if="sales_order != null" id="payment-modal" :title="sales_order.name" hide-footer>
      <SumUpPayment/>
    </b-modal>


    <b-row class="justify-content-md-center" align-h="center">
      <b-col sm="12" md="10">

              <b-overlay :show="is_loading" rounded="sm">
        <b-card border-variant="light" header="Vérification de commande" class="text-center" >
            <b-card-title v-if="sales_order != null">Un dernier check avant d'envoyer</b-card-title>

            <b-row class="justify-content-md-center" v-if="sales_order != null">


                <!-- Shipping -->
                <b-col sm="12" md="6">
                  <ValidationObserver v-slot="{ invalid }">
                  <b-form id="shipping-info-form" @submit.prevent="onSubmit">
                    <b-form-group id="input-group-2" label="Pour qui ?" label-for="input-2">

                      <b-input-group>
                        <b-input-group-prepend is-text>
                          <b-icon icon="person"></b-icon>
                        </b-input-group-prepend>

                        <b-form-input id="input-first-name" v-model="contact.first_name" required placeholder="Prénom"></b-form-input>
                        <b-form-input id="input-last-name" v-model="contact.last_name" required placeholder="Nom"></b-form-input>

                      </b-input-group>

                      <!-- telephone -->
                      <b-input-group>
                        <b-input-group-prepend is-text>
                          <b-icon icon="phone"></b-icon>
                        </b-input-group-prepend>

                        <ValidationProvider rules="digits:10">
                          <b-form-input type="tel" v-model="contact.mobile_no" id="input-phone" required placeholder="Numéro de téléphone"></b-form-input>
                        </ValidationProvider>

                        <b-input-group-append is-text>
                          <b-icon icon="question-fill" v-b-tooltip.hover title="Pour vous contacter en cas de galère !"></b-icon>
                        </b-input-group-append>
                      </b-input-group>

                    </b-form-group>

                    <b-form-group id="input-group-2" label="Où ?" label-for="input-2">
                      <b-input-group>
                        <b-input-group-prepend is-text>
                          <b-icon icon="house"></b-icon>
                        </b-input-group-prepend>

                        <b-form-input v-model="address.address_line1" id="input-2" required placeholder="Numéro et rue"></b-form-input>
                      </b-input-group>


                      <b-form-input v-model="address.address_line2" id="input-2" placeholder="Appt, étage, ... (optionnel)"></b-form-input>

                      <b-input-group>
                        <b-form-input v-model="address.pincode" id="input-zipcode" readonly required></b-form-input>
                        <b-form-input v-b-tooltip.hover title="Nous livraison uniquement sur LILLE pour le moment, désolé !" v-model="address.city" id="input-city" readonly required></b-form-input>
                      </b-input-group>

                    </b-form-group>


                    <div class="text-right">

                      <ValidationProvider v-slot="{ errors }">
                        <b-form-checkbox required id="checkbox-1" name="checkbox-1" value="accepted" unchecked-value="not_accepted">J'atteste sur l'honneur avoir plus de 18 ans</b-form-checkbox>
                        <span>{{ errors[0] }}</span>
                      </ValidationProvider>

                      <b-overlay :show="is_processing">
                        <b-button :disabled="invalid" type="submit" variant="primary">Procéder au paiement&nbsp;<b-icon icon="credit-card"></b-icon></b-button>
                      </b-overlay>

                    </div>

                    <div class="text-left">
                      <b-link :to="{name: 'shop'}"><b-icon icon="x-circle"></b-icon>&nbsp;Retourner à la boutique</b-link>
                    </div>


                  </b-form>
                  </ValidationObserver>
                </b-col>

                <!-- Order summary -->
                <b-col sm="12" md="5" class="order-list">

                  <b-card bg-variant="light">
                    <!--
                    <div class="text-right">
                      <b-icon icon="gear"></b-icon>&nbsp;
                      <router-link :to="{name: 'shop'}"><em>Retourner aux articles</em></router-link>
                    </div>
                    -->

                    <b-table-simple class="item-list">
                      <b-tr v-for="item in sales_order.items" v-bind:key="item.item_code">
                        <b-td>
                          <div class="item-picture-container">
                            <b-img :src=item.image|erp_static_url width="75px" height="75px" blank-color="#777" rounded alt="Item Preview"></b-img>
                            <b-badge variant="dark" class="topright-badge">{{ item.quantity }}</b-badge>
                          </div>
                        </b-td>
                        <b-td class="align-middle text-left">
                          {{ item.item_name }}
                        </b-td>
                        <b-td class="align-middle">
                          x{{ item.quantity }}
                        </b-td>
                        <b-td class="align-middle">
                          {{ item.amount }}€
                        </b-td>
                      </b-tr>

                      <!-- Taxes list -->
                        <!-- Livraison -->
                        <b-tr v-for="tax in sales_order_taxes_filtered" v-bind:key="tax.name">
                          <b-td class="align-middle">
                            <b-img src="/images/shop/shipping-icon.png" blank-color="#777" width="75px" rounded alt="Tax Preview"></b-img>
                          </b-td>
                          <b-td colspan="2" class="align-middle text-left">
                            {{ tax.description }}
                            <br/>
                            <em v-if="tax.tax_amount > 0">N'oubliez pas : la livraison est offerte à partir de 50€ !</em>
                          </b-td>
                          <b-td class="align-middle">
                            <span v-if="tax.tax_amount > 0">{{ tax.tax_amount }}€</span>
                            <span v-else>OFFERTE !</span>
                          </b-td>
                        </b-tr>

                    </b-table-simple>

                    <hr/>

                    <!-- TOTAL -->
                    <b-row class="total">
                      <b-col cols="6" class="text-left">
                        TOTAL
                      </b-col>
                      <b-col cols="6" class="text-right">
                        {{ sales_order.amount_total }}€
                      </b-col>
                    </b-row>

                  </b-card>
                </b-col>
              </b-row>
            <!-- If order does not exist -->

              <b-row align-v="center" v-else-if="is_loading == false">
                <b-col>
                  <h1>Cette commande n'existe pas !</h1>
                </b-col>
              </b-row>

        </b-card>
              </b-overlay>


      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="js">
import { mapState } from 'vuex'
     import axios from 'axios'
     import _ from 'lodash';
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { extend } from 'vee-validate'
import { digits } from 'vee-validate/dist/rules'
import SumUpPayment from './Payment.vue'


extend('digits', digits);

var data = {
  is_loading: true,
  is_processing: false,
  sales_order: null,
  itemPictureProps: { blank: true, width: 75, height: 75, class: 'm1' },

  // Address
  address: {
    city: 'Lille',
    pincode: 59000
  },

  // Contact
  contact: {
    first_name: '',
    last_name: '',
    mobile_no: ''
  }

}

export default {
  name: 'Checkout',

  components: {
    ValidationProvider,
    ValidationObserver,
    SumUpPayment
  },

  created: function () {
  },

  filters: {
    erp_static_url (uri) {
      return 'https://erp.singe-savant.com/' + uri
    }
  },

  data: function () {
    return data
  },

  computed: {
    sales_order_taxes_filtered () {
      return _.filter(data.sales_order.taxes, {'description': 'Livraison'})
    },
    ...mapState({
    })
  },

  mounted: function () {
    axios.get('/shop/orders/' + this.$route.params.slug)
      .then((response) => {
        data.sales_order = response.data;
      })
      .catch(() => data.sales_order = null )
      .finally(() => data.is_loading = false)


    // XXX 'Lille' Hardcoded!
    axios.get('/customer/address')
      .then((response) => { data.address = response.data; data.address.city = 'Lille'; data.address.pincode = 59000 })

    axios.get('/customer/contact')
      .then((response) => { data.contact = response.data })
  },

  methods: {
    onSubmit: function () {
      data.is_processing = true

      axios.post('/customer/address', data.address).then(() => {

        axios.post('/customer/contact', data.contact).then(() => {

          // go to checkout!
          //this.$router.replace({name: 'so-payment', params: {slug: data.sales_order.name}})
          this.$bvModal.show('payment-modal')

          data.is_processing = false


        }, (err) => {
          alert.error(err)
          data.is_processing = false
        })

      }, (err) => {
        alert.error(err)
        data.is_processing = false
      })
    }
  }

}
</script>

<style lang="scss">

  .item-list {
    .item-picture-container {
        position: relative;

        img {
            border: 1px solid #ddd;
        }

    }
  }

.order-list {

  }


.topright-badge {
    position: absolute;
    top: -4px;
    right: -4px;
}

h2 {
    margin-bottom: 20px;
}

#shipping-info-form .input-group {
    margin-bottom: 10px;
}


.brick-background {
    background: url('/images/shop/background.jpg'), url('/images/shop/wall_floor.jpg');
    background-repeat: repeat, repeat;
    background-attachment: fixed, fixed;
    background-position: center, bottom;
    background-size: cover, 100% 20vh;

    min-height: 100%;

    padding-top: 10vh;
}

table tr:first-child td{
    border-top: none;
}

.total {
    font-size: 1.4em;
    padding-left: 20px;
    padding-right: 20px;
}


</style>
