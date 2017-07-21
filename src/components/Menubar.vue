//-*- mode: vue; js-indent-level: 2; -*-

<template lang="html">
  <div id="menubar">
    <div class="logo">
      <router-link :to="{name: 'home'}">
        <img alt="Logo" src="/static/images/menubar_logo.png" />
        <span>Le<br/>Singe<br/>Savant<br/></span>
      </router-link>
    </div>

    <button class="toggle-button">
      <span class="text">Menu</span>
    </button>

    <div class="menu-right">
      <auth class="auth" />

      <cart />

      <router-view name="menubar-actions"></router-view>
    </div>
  </div>
</template>

<script lang="js">

import { mapState } from 'vuex'
import Auth from './Auth.vue'
import Cart from './shop/Cart.vue'

export default {
  name: 'Menubar',

  methods: {
  },
  components: {
    Auth,
    Cart
  },
  computed:
    mapState(['isAuthenticated', 'user'])
}
</script>

<style lang="scss" scoped>
#menubar {
  position: fixed;
  z-index: 100;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);

  height: 8vh;
  min-height: 50px;

  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;
  justify-content: space-between;
  align-items: center;

  .toggle-button {
      position: absolute;

      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      left: 50%;
      right: 50%;
      margin-left: -20px;


      background: none;
      border: 1px solid white;
      padding: 5px;

      .text {
          font-size: 0.7em;
          text-transform: uppercase;
          border-bottom: 2px solid white;
          border-top: 2px solid white;
      }
  }

  .logo {
      display: flex;
      flex-direction: row;

      align-items: center;

      padding-left: 2vw;

      text-transform: uppercase;

      position: relative;
      height: 100%;

  }

  .logo > a {

      display: flex;
      flex-direction: row;
      align-items: center;

      position: relative;

      color: white;

      line-height: 1em;

      font-size: 0.8em;
      letter-spacing: 0.02em;

      height: 100%;

      img {
          position: relative;
          height: 80%;
          margin-right: 10px;
      }
  }

  .menu-right {
      display: flex;
      flex-direction: row;
      align-items: center;
      flex-wrap: no-wrap;

      margin-right: 3vw;
      height: 100%;
  }

  .cart {
      margin-left: 30px;
      padding-right: 2vw;
  }
}
</style>

