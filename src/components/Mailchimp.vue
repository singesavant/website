// -*- mode: vue; js-indent-level: 2; -*-
<template lang="html">
  <div class="email-subscribe">
    <b-modal lazy centered ok-only ok-title="Fermer" id="mailchimp-subscribe" title="Abonnement aux nouvelles">
      <iframe class="mailchimp" :src="action"/>
    </b-modal>

    <b-form inline v-if="!successMessage">
      <b-button v-b-modal.mailchimp-subscribe  variant="black">S'ABONNER À LA NEWSLETTER</b-button>
    </b-form>
    <p v-if="errorMessage && !successMessage" transition="fade">{{ errorMessage }}</p>
    <p v-if="successMessage" transition="fade">{{ successMessage }}</p>
  </div>
</template>

<script lang="js">
var data = {
  email: '',
  response: {},
  errorMessage: null,
  successMessage: null
}

export default {
  name: 'MailchimpSubscribe',

  props: {
    action: {
      required: true,
      type: String
    }
  },

  data: function () { return data },

  methods: {
    subscribe: function () {
    }
  }
}

</script>

<style lang="scss" scoped>
.mailchimp {
  width: 100%;
  border:none;
  outline:none;
  height: 60vh;
}

</style>
