// -*- mode: vue; js-indent-level: 2; -*-
<template lang="html">
  <!-- footer -->
  <b-row class="footer" no-gutters>
    <b-col cols="6" class="left">
      <b-button>Nous contacter</b-button>
      <b-button>Venir</b-button>
      <span>Suivez-nous :</span>
      <b-button id="facebook-button" variant="primary" target="_new" href="http://facebook.com/brasserie.singe.savant/" class="facebook">F</b-button>
      <b-button id="twitter-button" variant="primary" target="_new" href="https://twitter.com/singesavantbrew" class="twitter">T</b-button>

      <b-tooltip target="twitter-button" placement="top" title="@singesavantbrew"/>
    </b-col>

    <b-col cols="6" class="right">
      <span>Nouveautés, bons plans et événements du singe :</span>

      <mailchimp-subscribe action="//singe-savant.us14.list-manage.com/subscribe/post?u=999332df614031c8e90ec190c&id=91d6425351"></mailchimp-subscribe>

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
    background-color: #00132c;
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

    color: #aaa;

    button, a {
        background-color: #001736 !important;
        border: none;
        border-radius: 0;
        font-variant: small-caps;
        font-weight: 300;
        padding-right: 20px;

        &.twitter {
            background-image: url(/static/images/home/twitter.png);
            background-repeat: no-repeat;
            background-size: auto 70%;
            background-position: center;
            color: rgba(0, 0, 0, 0);
        }

        &.facebook {
            background-image: url(/static/images/home/facebook.png);
            background-repeat: no-repeat;
            background-size: auto 70%;
            background-position: center;
            color: rgba(0, 0, 0, 0);
        }

    }

}
</style>
