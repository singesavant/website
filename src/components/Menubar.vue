//-*- mode: vue; js-indent-level: 2; -*-
<template lang="html">
  <div id="menubar" class="sticky-top">
    <div class="logo">
      <router-link :to="{name: 'home'}">
        <img alt="Logo" src="/images/menubar_logo.png" />
        <span>Le<br/>Singe<br/>Savant<br/></span>
      </router-link>
    </div>

    <button @click="toggleMenu()" class="toggle-button">
      <span v-if="!menuIsVisible" class="text">Menu</span>
      <span v-else class="text">X</span>
    </button>

    <div @click="toggleMenu()" class="menu-expanded" :class="{visible: menuIsVisible}">
      <ul>
        <li><router-link :to="{name: 'brewery'}">La brasserie</router-link></li>
        <li><router-link :to="{name: 'brewery/visit'}">Visiter la brasserie</router-link></li>
        <li><router-link :to="{name: 'taproom'}">Le bar</router-link></li>
        <li><router-link :to="{name: 'beer-list'}">Les bières</router-link></li>
        <li><router-link :to="{name: 'brewshop'}">Le brewshop</router-link></li>
        <li><router-link :to="{name: 'dealers'}">Nos points de vente</router-link></li>
        <li><router-link :to="{name: 'brewlab'}">BrewLab</router-link></li>
        <li><router-link :to="{name: 'contact'}">Venir / Contact</router-link></li>
        <li><router-link :to="{name: 'home'}">Accueil</router-link></li>
      </ul>
    </div>

    <div class="menu-right">
<!--      <cart /> -->

<!--      <auth class="auth" /> -->
<!--      <router-view name="menubar-actions"></router-view> -->
    </div>
  </div>
</template>

<script lang="js">

import { mapState } from 'vuex'
// import Cart from './shop/Cart.vue'
// import Auth from './Auth.vue'

var data = {
  menuIsVisible: false
}

export default {
  name: 'Menubar',

  methods: {
    toggleMenu: function () {
      this.menuIsVisible = !this.menuIsVisible
    }
  },
  data: function () {
    return data
  },
  components: {
//    Cart,
//    Auth
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

  background-color: rgba(0, 0, 0, 0.95);

  height: 8vh;
  min-height: 50px;

  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;
  justify-content: space-between;
  align-items: center;

  .toggle-button {
      align-self: center;
      display: flex;
      flex-direction: row;
      align-items: center;
      align-content: center;
      justify-content: center;



      min-width: 4vw;


      background: none;
      border: 1px solid white;
      padding: 5px;

      .text {
          font-size: 0.7em;
          text-transform: uppercase;
          border-bottom: 2px solid white;
          border-top: 2px solid white;
          color: white;

          .visible {
              display: block;
          }

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

      color: white !important;

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

  .menu-expanded {
      &.visible {
          visibility: visible;
          opacity: 1;
          transition: visibility 0s, opacity .1s linear;
      }
      opacity: 0;
      visibility: hidden;

      transition: all .1s ease-in-out;

      position: absolute;
      width: 100%;
      top: 8vh;
      height: 92vh;
      left: 0;
      background-color: rgba(0, 0, 0, 0.95);

      > ul {
          padding-top: 3%;
          margin-left: auto;
          margin-right: auto;

          list-style-type: none;
          text-align: center;

          width: 70vw;

          li {
              color: white;
              font-size: 2vw;
              letter-spacing: 0.3em;
              text-transform: uppercase;
              border-bottom: 1px solid white;
              padding: 1vh;
              padding-top: 1.5vh;
              padding-bottom: 1.5vh;

              a {
                  color: white !important;
              }

          }
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

