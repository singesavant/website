//-*- mode: vue; js-indent-level: 2; -*-

<template lang="html">
  <div>
    <div class="auth" v-if="isAuthenticated">
      <div class="picture-wrapper">
        <img v-if="user.picture" v-bind:src="user.picture" class="picture" alt="user picture"/>
        <img v-else class="picture" src="/images/default_avatar.jpeg" alt="default user picture">
      </div>
      <span class="name">
        <span class="firstname">{{ user.first_name }}</span>
        <span class="lastname">{{ user.last_name }}</span>
      </span>
        <b-button v-b-tooltip.hover title="Déconnexion" variant="dark" @click="logout()"><b-icon icon="power"></b-icon></b-button>
    </div>
    <div class="auth" v-else>
      <b-button v-b-tooltip.hover title="via Google. Les autres moyens arrivent bientôt !" variant="primary" @click.prevent="authenticate('google')">Se Connecter</b-button>
    </div>
  </div>
</template>

<script lang="js">

import { mapState } from 'vuex'

export default {
  name: 'Auth',
  methods: {
    authenticate: function (provider) {
      this.$store.dispatch('authenticate', { provider })
    },
    logout: function () {
      this.$store.dispatch('logout')
    }
  },
  computed:
  mapState(['isAuthenticated', 'user'])
}
</script>


<style lang="scss">

.auth {
    display: flex;

    flex-direction: row;
    align-items: center;

    color: white;

    display: flex;

    height: 100%;

    .picture-wrapper {
        height: 65%;
        margin: 10px;
        border:1px solid white;
        border-radius: 500px;
        overflow: hidden;

        .picture {
            height: 100%;
        }
    }

    .name {

      .lastname {
          font-variant: small-caps;
          font-size: 1.5em;
      }

      .firstname {
          font-size: 1.1em;
      }


      font-size: 0.8em;

      line-height: 1.2em;

      display: flex;
      flex-direction: column;
      align-items: left;
      align-content: center;

      margin-right: 10px;

    }
}
</style>
