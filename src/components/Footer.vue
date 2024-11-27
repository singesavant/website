// -*- mode: vue; js-indent-level: 2; -*-
<template lang="html">
  <!-- footer -->
  <b-row class="footer" no-gutters>
    <b-col cols="6" class="left">
      <b-button :to="{name: 'contact'}" class="btn-black">CONTACT</b-button>
      <b-button id="facebook-button" variant="primary" target="_new" href="http://facebook.com/brasserie.singe.savant/" class="black facebook"> </b-button>
      <b-button id="instagram-button" variant="primary" target="_new" href="https://www.instagram.com/singesavantbrew/" class="black instagram"> </b-button>
    </b-col>

    <b-col cols="6" class="right">
<!--      <mailchimp-subscribe action="https://singe-savant.us14.list-manage.com/subscribe/post?u=999332df614031c8e90ec190c&id=91d6425351"></mailchimp-subscribe> -->
      <mailchimp-subscribe action="http://eepurl.com/h-fVtr"></mailchimp-subscribe> 

    </b-col>

  </b-row>
</template>

<script lang="js">
import MailchimpSubscribe from './Mailchimp'

export default {
  name: 'MonkeyFooter',

  components: {
    MailchimpSubscribe
  }
}
</script>

<style lang="scss">
.footer {
    border-left: 4px solid white;
    border-right: 4px solid white;
    background-color: black;
    padding: 3px;

    .col-6 {
        display: flex;
        align-items: center;

        &.right {
            justify-content: flex-end;
        }

        &.left {
            justify-content: flex-start;
        }

        flex-direction: row;
        flex-wrap: no-wrap;
        
        span {
            padding-left: 10px;
            padding-right: 10px;
        }
    }

    color: white;

    button.black, a.black {
        background-color: black !important;
        border: none;
        border-radius: 0;
        font-variant: small-caps;
        font-weight: 300;
        padding-right: 20px;

        &.instagram {
            background-image: url(/images/home/instagram.png);
            background-repeat: no-repeat;
            background-size: 50%;
            background-position: center;
            height: 100%;
            color: rgba(0, 0, 0, 0);
        }

        &.facebook {
            background-image: url(/images/home/facebook.png);
            background-repeat: no-repeat;
            background-size: 50%;
            background-position: center;
            height: 100%;
            color: rgba(0, 0, 0, 0);
        }
    }
}
</style>
