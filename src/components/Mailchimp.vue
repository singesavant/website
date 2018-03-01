// -*- mode: vue; js-indent-level: 2; -*-
// To get the `action` prop:
// 1. Go to your dashboard on mailchimp.com and navigate 
//    to Lists > Signup Forms > Embedded Forms.
// 2. Copy the `<form>` action from the generated HTML code.
// 3. Pass that into the component via the prop, like so:
//      <mailchimp-subscribe 
//          action="//yourname.us10.list-manage.com/subscribe/post?u=012345678910&id=ab12345
//      ></mailchimp subscribe>

<template lang="html" type="text/x-template" id="mailchimp-subscribe-template">
  <form v-if="!successMessage" @submit.prevent="subscribe($event)">
    <input v-model="email" name="EMAIL" type="text" placeholder="Email" id="email" />
    <input type="submit" />
  </form>
  <p v-if="errorMessage && !successMessage" transition="fade">{{ errorMessage }}</p>
  <p v-if="successMessage" transition="fade">{{ successMessage }}</p>
</template>

<script lang="js">
import { Vue } from 'vue'

var data = {
  email: '',
  response: {},
  errorMessage: null,
  successMessage: null
}

Vue.component('mailchimpSubscribe', {

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

  template: '#mailchimp-subscribe-template',

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
})

</script>
