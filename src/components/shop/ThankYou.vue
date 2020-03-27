// -*- mode: vue; js-indent-level: 2; -*-
<template lang="html">
  <b-container fluid class="brick-background">

    <b-row class="justify-content-md-center">
      <b-col sm="7">

        <b-overlay rounded="sm">
          <b-card border-variant="light" header="Votre commande est entre nos mains !" class="text-center" >
            <b-card-title>Merci {{ user.first_name }}, votre commande est validée !</b-card-title>
            <p>
              Comptez sur nous pour mettre la commande en préparation au plus vite.
              <br/>
                            Elle vous sera livrée Mardi ou Vendredi prochain.
            </p>

            <b-img src="/images/shop/corona/thumbup.png"></b-img>

            <p>
              <b-icon icon="chat"></b-icon>&nbsp;Nous vous contacterons très vite pour prendre rendez-vous !
            </p>

            <b-row class="justify-content-md-center">
              <router-link :to="{name: 'home'}"><b-icon icon="house"></b-icon>&nbsp;Retour à la page d'accueil</router-link>
            </b-row>
          </b-card>

        </b-overlay>
      </b-col>
    </b-row>
  </b-container>

</template>

<script lang="js">
import { mapState } from 'vuex'


var data = {
}

export default {
  name: 'ThankYou',
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
  mapState(['user']),

  mounted: function () {
  },

  methods: {

  }

}
</script>

<style lang="scss" scoped>
</style>
