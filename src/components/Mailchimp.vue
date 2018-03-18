// -*- mode: vue; js-indent-level: 2; -*-
<template lang="html">
  <div class="email-subscribe">
    <b-form inline v-if="!successMessage" @submit.prevent="subscribe($event)">
      <b-input v-model="email" name="EMAIL" type="text" placeholder="Votre e-mail" id="email" />
      <b-button variant="primary">C'est parti !</b-button>
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

  ready: function () {
    // We need to receive jsonp from Mailchimp. So we update the
    // action string.
    this.action = this.action.replace('/post?', '/post-json?').concat('&c=?')
  },

  methods: {
    subscribe: function (e) {
      /*
      var params = $(e.currentTarget).serialize()

      $.ajax({
        type: 'POST',
        url: this.action,
        data: params,
        dataType: 'jsonp',
        success: function (res) {
          if (res.result === 'success') {
              this.successMessage = res.msg
          }
          else {
            this.errorMessage = res.msg
            // Mailchimp returns error messages prefixed with numbers (ie "0 - Message"), so we'll
            // strip that out for the end user.
            this.errorMessage = this.errorMessage.substring(this.errorMessage.indexOf('-')+1, this.errorMessage.length)
          }
        }
      })
   */
    }
  }
}

</script>

<style lang="scss">
</style>
