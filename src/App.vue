// -*- mode: vue; js-indent-level: 2; -*-
<script lang="js">
  import Menubar from '@/components/Menubar'

  export default {
    components: {
      Menubar
    }
  }
</script>

<template lang="html">
      <div id="app">
          <transition name="fade" mode="out-in" appear>
              <menubar v-if="['home'].indexOf($route.name) == -1"></menubar>
          </transition>

          <transition name="fade" mode="out-in" appear>
              <router-view :key="$route.fullPath"></router-view>
          </transition>
      </div>

</template>



<style lang="scss">

  @import "@/assets/css/globals.scss";

  html, body, #app {
  height: 100%;
  width: 100%;
  }



</style>
