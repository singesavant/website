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
          <transition name="slide-fade">
            <div v-if="showNotification" class="notification-bubble" @mouseenter="onNotificationMouseEnter" @mouseleave="onNotificationMouseLeave">
              <router-link :to="{name: 'beer-list'}" class="notification-link">
                Découvrez nos packs cadeaux
              </router-link>
            </div>
          </transition>
      </div>
</template>



<style lang="scss">

  @import "@/assets/css/globals.scss";

  html, body, #app {
  height: 100%;
  width: 100%;
  }

  .notification-bubble {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    background-color: #d06f5a;
    color: white;
    padding: 15px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    animation: slideIn 0.3s ease-out;
  }

  .notification-link {
    color: white !important;
    text-decoration: none;
    font-weight: 500;
    font-size: 1em;
    
    &:hover {
      color: white !important;
      text-decoration: none;
    }
  }

  .slide-fade-enter-active {
    transition: all 0.3s ease-out;
  }

  .slide-fade-leave-active {
    transition: all 0.3s ease-in;
  }

  .slide-fade-enter-from {
    transform: translateX(100%);
    opacity: 0;
  }

  .slide-fade-leave-to {
    transform: translateX(100%);
    opacity: 0;
  }

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

</style>
