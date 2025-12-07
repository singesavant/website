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
        showNotification: false,
        notificationTimer: null,
      };
    },
    computed: {
      isMenubarVisible() {
        return this.$route.name !== 'home';
      }
    },
    methods: {
      showModal() {
        this.isModalVisible = true;
      },
      isNotificationPeriod() {
        const now = new Date();
        const month = now.getMonth(); // 0-11, décembre = 11
        const day = now.getDate(); // 1-31
        
        // Vérifier si on est en décembre (month === 11) et entre le 1er et le 25
        return month === 11 && day >= 1 && day <= 25;
      },
      closeModal() {
        this.isModalVisible = false;
        // Afficher l'infobulle après la fermeture de la popup seulement pendant la période
        if (this.isNotificationPeriod()) {
          this.showNotification = true;
          this.startNotificationTimer();
        }
      },
      startNotificationTimer() {
        // Annuler le timer précédent s'il existe
        if (this.notificationTimer) {
          clearTimeout(this.notificationTimer);
        }
        // La masquer après 5 secondes
        this.notificationTimer = setTimeout(() => {
          this.showNotification = false;
          this.notificationTimer = null;
        }, 5000);
      },
      onNotificationMouseEnter() {
        // Annuler le timer quand la souris entre
        if (this.notificationTimer) {
          clearTimeout(this.notificationTimer);
          this.notificationTimer = null;
        }
      },
      onNotificationMouseLeave() {
        // Relancer le timer quand la souris quitte
        this.startNotificationTimer();
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
          <transition name="slide-down">
            <div v-if="showNotification" class="notification-banner" :class="{ 'below-menubar': isMenubarVisible }" @mouseenter="onNotificationMouseEnter" @mouseleave="onNotificationMouseLeave">
              <router-link :to="{name: 'beer-list'}" class="notification-link">
                <i class="las la-gift"></i> Découvrez nos packs cadeaux <i class="las la-gift"></i>
              </router-link>
            </div>
          </transition>
          <transition name="fade">
            <div v-if="showNotification" class="notification-spacer" :class="{ 'below-menubar': isMenubarVisible }"></div>
          </transition>
      </div>
</template>



<style lang="scss">

  @import "@/assets/css/globals.scss";

  html, body, #app {
  height: 100%;
  width: 100%;
  }

  .notification-banner {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 101; /* Au-dessus du menubar (z-index: 100) */
    background-color: #d06f5a;
    color: white;
    padding: 15px 20px;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    
    &.below-menubar {
      top: 8vh; /* En dessous du menubar */
      z-index: 99; /* En dessous du menubar mais au-dessus du contenu */
    }
  }

  .notification-spacer {
    height: 53px; /* Hauteur du bandeau (padding 15px + 15px + ligne de texte ~23px) */
    width: 100%;
    
    &.below-menubar {
      margin-top: 8vh; /* Décalage pour compenser le menubar */
    }
  }

  .notification-link {
    color: white !important;
    text-decoration: none;
    font-weight: bold;
    font-size: 1em;
    
    &:hover {
      color: white !important;
      text-decoration: none;
    }
  }

  .slide-down-enter-active {
    transition: all 0.3s ease-out;
  }

  .slide-down-leave-active {
    transition: all 0.3s ease-in;
  }

  .slide-down-enter-from {
    transform: translateY(-100%);
    opacity: 0;
  }

  .slide-down-leave-to {
    transform: translateY(-100%);
    opacity: 0;
  }

</style>
