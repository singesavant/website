//-*- mode: vue; js-indent-level: 2; -*-

<template lang="html">
  <div>
    <div class="auth" v-if="isAuthenticated">
      <img v-bind:src="user.picture" class="picture" alt="user picture"/>
      <span class="name">
        <span class="firstname">{{ user.first_name }}</span>
        <span class="lastname">{{ user.last_name }}</span>
      </span>
      <!-- <button @click="logout()">Logout</button> -->
    </div>
    <div class="auth" v-else>
      <button @click="authenticate('google')">auth Google</button>
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

    .picture {
        width: 3vh;
        height: 3vh;
        padding: 10px;
        margin: 10px;
        border:1px solid white;
        border-radius: 500px;
    }

    .name {
      font-size: 0.8em;

      line-height: 1.2em;

      display: flex;
      flex-direction: column;
      align-items: left;
      align-content: center;

    }
}
</style>
