// -*- mode: vue; js-indent-level: 2; -*-
<template lang="html">
  <div class="welcome">
    Welcome

    <button @click="authenticate('github')">auth Github</button>
    <button @click="authenticate('facebook')">auth Facebook</button>
    <button @click="authenticate('google')">auth Google</button>
    <button @click="authenticate('twitter')">auth Twitter</button>
  </div>
</template>

<script lang="js">

var data = {
}

export default {
  name: 'Welcome',

  components: {
  },

  data: function () {
    return data
  },
  mounted: function () {
  },
  methods: {
    login () {
      this.$store.dispatch('login')
    },
    authenticate () {

    }
  }
}
</script>
