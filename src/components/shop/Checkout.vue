// -*- mode: vue; js-indent-level: 2; -*-
<template lang="html">
  <b-container fluid class="brick-background">

    <b-modal id="payment-modal" :title="sales_order.name" hide-footer="true">
      <SumUpPayment/>
    </b-modal>


    <b-row class="justify-content-md-center">
      <b-col cols="10">

              <b-overlay :show="is_loading" rounded="sm">
        <b-card border-variant="light" header="Vérification de commande" class="text-center" >
            <b-card-title v-if="sales_order != null">Un dernier check avant d'envoyer</b-card-title>

            <b-row class="justify-content-md-center" v-if="sales_order != null">


                <!-- Shipping -->
                <b-col cols="6">
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
                        <b-form-input v-model="address.city" id="input-city" readonly required></b-form-input>
                      </b-input-group>

                    </b-form-group>


                    <div class="text-right">

                      <ValidationProvider v-slot="{ errors }">
                        <b-form-checkbox required id="checkbox-1" name="checkbox-1" value="accepted" unchecked-value="not_accepted">J'atteste sur l'honneur avoir plus de 18 ans</b-form-checkbox>
                        <span>{{ errors[0] }}</span>
                      </ValidationProvider>

                      <b-button :disabled="invalid" type="submit" variant="primary">Procéder au paiement <b-icon icon="credit-card"></b-icon></b-button>
                    </div>

                    <div class="text-left">
                      <b-link :to="{name: 'shop'}"><b-icon icon="x-circle"></b-icon>&nbsp;Retourner à la boutique</b-link>
                    </div>


                  </b-form>
                  </ValidationObserver>
                </b-col>

                <!-- Order summary -->
                <b-col cols="5" class="order-list">

                  <b-card bg-variant="light">
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
                    </b-table-simple>

                    <hr/>

                    <!-- Taxes list -->
                    <b-table-simple class="taxes-list" v-if="sales_order.taxes.length > 0" cellspacing="0" cellpadding="0">
                      <b-tr v-for="tax in sales_order.taxes" v-bind:key="tax.name">

                        <!-- Livraison -->
                        <div v-if="tax.description == 'Livraison'">
                          <b-td class="border-0 align-middle">
                            <b-img width="100%" src="/images/shop/shipping-icon.png" blank-color="#777" rounded alt="Tax Preview"></b-img>
                          </b-td>
                          <b-td class="align-middle text-left">
                            {{ tax.description }}
                            <br/>
                            <em>N'oubliez pas : la livraison est offerte à partir de 58€ !</em>
                          </b-td>
                          <b-td class="align-middle">
                            <span v-if="tax.amount > 0">{{ tax.tax_amount }}€</span>
                            <span v-else>OFFERTE !</span>
                          </b-td>
                        </div>

                      </b-tr>
                    </b-table-simple>

                    <b-table-simple v-else class="taxes-list">
                      <!-- No taxes -->
                      <b-tr>
                        <b-td>
                          <b-img width="75px" height="75px" src="/images/shop/shipping-icon.png" blank-color="#777" rounded alt="Tax Preview"></b-img>
                        </b-td>
                        <b-td class="align-middle">
                          Livraison
                        </b-td>
                        <b-td class="align-middle">
                          OFFERT !
                        </b-td>
                      </b-tr>
                    </b-table-simple>


                    <!-- Charity -->
                    <!--
                    <b-row>
                      <b-col cols="12">
                        <b-media no-body>
                          <b-media-aside vertical-align="top">
                            <b-img blank blank-color="#ccc" width="120px" height="120px" alt="placeholder"></b-img>
                          </b-media-aside>
                          <b-media-body align="left" class="ml-3">
                            <h5 class="mt-0">CORONAVIRUS : Soutenez vos établissement lillois fermés !&nbsp;<b-icon icon="heart-fill"/></h5>
                            <p>
                              Avec votre commande, offrez un crédit de X€ à l'établissement :
                            <b-form>
                              <b-form-select v-model="charity_selected" :options="charity_options" size="sm" class="mt-3"></b-form-select>
                            </b-form>
                            </p>

                          </b-media-body>
                        </b-media>


                      </b-col>
                    </b-row>

                    -->

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
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { extend } from 'vee-validate'
import { digits } from 'vee-validate/dist/rules'
import SumUpPayment from './Payment.vue'

extend('digits', digits);

var data = {
  is_loading: true,
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
    mobileno: ''
  },

  // Charity
  charity_selected: null,
  charity_options: [
    { value: null, text: '--' },
    {
      label: 'Bar',
      options: [
        { value: { C: 'DIY' }, text: 'DIY Café' },
        { value: { R: 'Lovibond' }, text: 'Le Lovibond' }
      ]
    }
  ]
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

  computed: mapState({
  }),

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
      axios.post('/customer/address', data.address).then(() => {
        console.debug('Address updated successfully.')

        axios.post('/customer/contact', data.contact).then(() => {
          console.debug('Contact updated successfully.')

          // go to checkout!
          //this.$router.replace({name: 'so-payment', params: {slug: data.sales_order.name}})
          this.$bvModal.show('payment-modal')


        }, (err) => {
          console.log(err)
          alert.error(err)
        })

      }, (err) => {
        console.log(err)
        alert.error(err)
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
