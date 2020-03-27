// -*- mode: vue; js-indent-level: 2; -*-
<template lang="html">
  <b-container fluid class="brick-background">

    <b-row class="justify-content-md-center giveaway">
      <b-col sm="7">

        <b-overlay :show="is_loading" rounded="sm">
          <b-card border-variant="light" header="CORONAVIRUS : Solidaires !" class="text-center" >
            <b-card-title>Hey, vous auriez acheté où ces bières habituellement ?</b-card-title>
            <p>A cause du CORONAVIRUS, vos lieux préférés (bars, restos, ...) sont fermés !</p>

            <p>
              Ça vous dit de transférer 5% de votre commande en crédit à votre établissement de cœur ?
            </p>


            <b-img src="/images/shop/corona/bouteille1.png" style="float: left;"/>
            <b-row class="justify-content-md-center">
              <b-form @submit="submit_giveaway">

                <b-form-group>
                  <p>
                    <b-form-select v-model="selected_partner" :options="partner_options"></b-form-select>
                  </p>

                  <b-button type="submit" variant="primary"><b-icon icon="heart-fill"></b-icon>&nbsp;Oui, je reverse !</b-button>
                  &nbsp;
                  <b-button :to="{'name': 'so-thank-you'}" variant="primary"><b-icon icon="x-octagon"></b-icon>&nbsp;Non le Singe, garde l'argent !</b-button>
                </b-form-group>
              </b-form>


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
import _ from "lodash"

var data = {
  is_loading: false,
  errors: "",
  partner_options: [],
  selected_partner: null
}

export default {
  name: 'GiveAway',
  components: {
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
  computed:
    mapState({
    }),

  mounted: function () {
    data.is_loading = true

    axios.get('/shop/orders/' + this.$route.params.slug + '/giveaway')
      .then((response) => {
        //If we get an empty response, it is probably already payed
        for (var part_name of response.data) {
          data.partner_options.push(part_name.name)
        }

        data.partner_options = _.orderBy(data.partner_options)

          data.is_loading = false
        })
  },
  methods: {

    submit_giveaway: function () {
      data.is_loading = true

      axios.post('/shop/orders/' + this.$route.params.slug + '/giveaway', {'partner_name': data.selected_partner})
        .then(()=> {
          this.$router.push({'name': 'so-thank-you', params: {slug: this.$route.params.slug}})
        })
        .catch(() => {
          alert("ERREUR !")
        })
        .finally(() => data.is_loading = false)
    }
  }

}
</script>

<style lang="scss" scoped>
.giveaway {
    padding-bottom: 50px;

    button {
        margin: 2px !important;
    }


    .card-body {

        background-position: 80% 0%;
        background-repeat: no-repeat;
    }


}


</style>
