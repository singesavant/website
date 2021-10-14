// -*- mode: vue; js-indent-level: 2; -*-
<template lang="html">
  <b-container fluid class="brick-background">

    <b-modal v-if="sales_order != null" id="payment-modal" :title="sales_order.name" hide-footer>
      <StripePayment/>
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

                    <b-form-group label="Comment ?">
                      <b-form-radio-group @change="changeShippingRule" id="shipping-rule" v-model="shipping_rule" name="radio-sub-component" buttons button-variant="outline-primary" required class="w-100">
                        <b-form-radio value="drive"><b-icon icon="bell-fill"/>&nbsp;Au Drive, à la Brasserie</b-form-radio>
			<!-- <b-form-radio value="shipping"><b-icon icon="house-fill"/>&nbsp;En livraison, chez moi</b-form-radio> -->
                      </b-form-radio-group>
                    </b-form-group>

                    <!-- Notice Drive -->
                    <div v-show="shipping_rule == 'drive'">
                      <b-alert show>
                          <p>Les créneaux de retrait à la brasserie sont <strong>du Lundi au Vendredi</strong> de <strong>16h à 19h</strong> et le <strong>Samedi de 11h à 18h</strong>.</p>
                          <p>Vous pouvez retirer votre commande le jour même si vous commandez avant 16h !</p>
                        <p><b-icon icon="check"/>&nbsp;Veuillez vous munir d'une pièce d'identité.</p>
                        <p><b-icon icon="bell"/>&nbsp;Pensez à mettre un masque et à vous protéger !</p>
                      </b-alert>
                    </div>


                    <!-- Address -->
                    <b-form-group v-if="shipping_rule == 'shipping'" id="input-group-2" label-for="input-2">

                      <b-input-group>
                        <b-input-group-prepend is-text>
                          <b-icon icon="house"></b-icon>
                        </b-input-group-prepend>

                        <b-form-input v-model="address.address_line1" id="input-2" required placeholder="Numéro et rue"></b-form-input>
                      </b-input-group>


                      <b-form-input v-model="address.address_line2" id="input-2" placeholder="Appt, étage, ... (optionnel)"></b-form-input>

                      <b-input-group>
                        <b-form-select v-model="city_selected" :options="city_select_options" required>
                          <template v-slot:first>
                            <b-form-select-option :value="null" disabled>-- Choisissez votre Ville --</b-form-select-option>
                          </template>

                          <b-form-select-option disabled>Pas dans la liste ? Contactez-nous pour négocier ;-)</b-form-select-option>

                        </b-form-select>
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
                            <b-img v-if="item.image" :src=item.image|erp_static_url width="75px" height="75px" blank-color="#777" rounded alt="Item Preview"></b-img>
                            <b-img v-else src="https://pbs.twimg.com/profile_images/785074692088598528/NU-A_vcH_400x400.jpg" width="75px" height="75px" rounded alt="Item"/>
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
                        <!-- Livraison
                        <b-tr v-for="tax in sales_order_taxes_filtered" v-bind:key="tax.name">
                          <b-td class="align-middle">
                            <b-img src="/images/shop/shipping-icon.png" blank-color="#777" width="75px" rounded alt="Tax Preview"></b-img>
                          </b-td>
                          <b-td colspan="2" class="align-middle text-left">
                            {{ tax.description }}
                            <br/>
                            <em v-if="tax.tax_amount > 0">N'oubliez pas : la livraison est offerte à partir de 50€ ou en passant par le drive !</em>
                          </b-td>
                          <b-td class="align-middle">
                            <span v-if="tax.tax_amount > 0">{{ tax.tax_amount }}€</span>
                            <span v-else>OFFERTE !</span>
                          </b-td>
                        </b-tr> -->

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
// import SumUpPayment from './Payment.vue'
import StripePayment from './StripePayment.vue'


extend('digits', digits);

var data = {
    is_loading: true,
    is_processing: false,
    sales_order: null,
    shipping_rule: null,
    itemPictureProps: { blank: true, width: 75, height: 75, class: 'm1' },

    // Address
    address: {
        address_line1: '',
        address_line2: ''
    },

    city_selected: null,

    city_select_options: [
        {text: 'Faches-Thumesnil', value: {pincode: '59155', city: 'Faches-Thumesnil'}},
        {text: 'Hellemmes-Lille', value: {pincode: '59260', city: 'Hellemmes-Lille'}},
        {text: 'La Madeleine', value: {pincode: '59110', city: 'La Madeleine'}},
        {text: 'Lambersart', value: {pincode: '59130', city: 'Lambersart'}},
        {text: 'Lille', value: {city: 'Lille', 'pincode': '59000'}},
        {text: 'Lommes', value: {pincode: '59160', city: 'Lommes'}},
        {text: 'Loos', value: {pincode: '59120', city: 'Loos'}},
        {text: 'Mons-en-Baroeul', value: {pincode: '59370', city: 'Mons-en-Baroeul'}},
        {text: 'Ronchin', value: {pincode: '59790', city: 'Ronchin'}},
        {text: 'Saint-André-lez-Lille', value: {pincode: '59350', city: 'Saint-André-lez-Lille'}},
        {text: 'Villeneuve d\'Ascq', value: {pincode: '59491', city: 'Villeneuve d\'Ascq'}}
    ],

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
        //SumUpPayment,
        StripePayment
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
            return _.filter(data.sales_order.taxes, function(elt) { return elt.description.includes('Livraison') })
        },
        ...mapState({
        })
    },

    watch: {
        '$route.params.slug': function (slug) {
            axios.get('/shop/orders/' + slug)
                 .then((response) => {
                     this.sales_order  = response.data
                 })
        }
    },

    mounted: function () {
        axios.get('/shop/orders/' + this.$route.params.slug)
             .then((response) => {
                 data.sales_order = response.data;

                 switch (data.sales_order['shipping_rule']) {
                     case 'Emport Brasserie':
                         data.shipping_rule = 'drive'
                         break

                     case 'Livraison Centre Lille':
                         data.shipping_rule  = 'shipping'
                         break
                 }



             })
             .catch(() => data.sales_order = null )
             .finally(() => data.is_loading = false)


        axios.get('/customer/address')
             .then((response) => {
                 data.address = response.data
                 if (response.data.city && response.data.pincode) {
                     this.city_selected = {'city': response.data.city, 'pincode': response.data.pincode}
                 }
             })

        axios.get('/customer/contact')
             .then((response) => { data.contact = response.data })
    },

    methods: {
        changeShippingRule: function(value) {

            data.is_processing = true

            axios.post('/shop/orders/' + data.sales_order.name + '/shipping', {shipping_method: value})
                 .then((response) => {
                     data.sales_order = response.data
                 })
                 .catch(() => {
                     this.$bvToast.toast("Désolé, il y a eu une erreur, contactez nous !", {
                         autoHideDelay: 5000,
                         title: "Erreur de livraison",
                         variant: "error"
                     })
                 }).finally(() => {
                     data.is_processing = false
                 })
        },

        checkOrderAndPay: function () {

            // make sure we have enough in stock
            axios.get('/shop/orders/' + data.sales_order.name + '?update_qttys=True').then(() => {
                // go to checkout!
                this.$bvModal.show('payment-modal')
            })
                 .catch((error) => {
                     // Conflict: cart partly updated
                     if (error.response.status == 409)
                     {
                         axios.get('/shop/orders/' + data.sales_order.name)
                              .then((response) => {
                                  this.sales_order  = response.data
                                  this.$bvToast.toast("Il y a eu des commandes entre temps et les stocks ont changé : nous avons mis à jour votre panier en conséquence !", {
                                      autoHideDelay: 5000,
                                      title: "Mise à jour du panier",
                                      variant: "warning"
                                  })

                              })
                              .catch(() => data.sales_order = null )
                     }
                     // Gone: no more article in stock
                     else if (error.response.status == 410)
                     {
                         alert('Désolé, votre panier a expiré !')
                         this.$router.push({name: 'shop'})
                     }
                 })
                 .finally(() => {
                     this.$store.dispatch('LOAD_CART')
                     data.is_processing = false
                 })

        },

        onSubmit: function () {
            data.is_processing = true

            // No need to submit address if it is a pickup
            if ( this.shipping_rule == 'drive' ) {

                axios.post('/customer/contact', data.contact).then(() => {
                    this.checkOrderAndPay()
                }, (err) => {
                    alert.error(err)
                    data.is_processing = false
                })

            }
            // Any other shipping rule should save the customer address
            else {
                // Assign city and pincode to payload
                data.address.city = data.city_selected.city
                data.address.pincode = data.city_selected.pincode

                axios.post('/customer/address', data.address).then(() => {

                    axios.post('/customer/contact', data.contact).then(() => {
                        this.checkOrderAndPay()
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
