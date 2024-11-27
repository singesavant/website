// -*- mode: vue; js-indent-level: 2; -*-
<script lang="js">
  import Menubar from '@/components/Menubar'
  import Popup from '@/components/Popup.vue'
  export default {
    components: {
      Menubar,
      Popup
    },
    data() {
      return {
        isModalVisible: true,
      };
    },
    methods: {
      showModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
      }
    }
  };
</script>

<template lang="html">
      <div id="app">
          <transition name="fade" mode="out-in" appear>
              <menubar v-if="['home'].indexOf($route.name) == -1"></menubar>
          </transition>

          <transition name="fade" mode="out-in" appear>
              <router-view :key="$route.fullPath"></router-view>
          </transition>
          <Popup v-show="isModalVisible" @close="closeModal" />
      </div>
</template>



<style lang="scss">

  @import "@/assets/css/globals.scss";

  html, body, #app {
  height: 100%;
  width: 100%;
  }



</style>
