// -*- mode: vue; js-indent-level: 2; -*-
<script lang="js">
export default {
  name: 'Banniere',
  props: {
    isModalVisible: {
      type: Boolean,
      default: true
    },
    isMenubarVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showNotification: false,
      wasModalVisible: true,
    };
  },
  methods: {
    isNotificationPeriod() {
      const now = new Date();
      const month = now.getMonth(); // 0-11, décembre = 11
      const day = now.getDate(); // 1-31
      
      // Vérifier si on est en décembre (month === 11) et entre le 1er et le 25
      return month === 11 && day >= 1 && day <= 25;
    },
    closeBanner() {
      this.showNotification = false;
    }
  },
  watch: {
    // Afficher la bannière après la fermeture de la popup seulement pendant la période
    isModalVisible(newVal) {
      if (this.wasModalVisible && !newVal && this.isNotificationPeriod()) {
        this.showNotification = true;
      }
      this.wasModalVisible = newVal;
    }
  }
}
</script>

<template lang="html">
  <transition name="fade" mode="out-in" appear>
    <div v-if="showNotification" class="notification-banner" :class="{ 'below-menubar': isMenubarVisible }">
      <router-link :to="{name: 'beer-list'}" class="notification-link">
        <i class="las la-gift"></i> Découvrez nos packs cadeaux <i class="las la-gift"></i>
      </router-link>
      <button @click="closeBanner" class="close-button" aria-label="Fermer la bannière">
        <i class="las la-times"></i>
      </button>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.notification-banner {
  width: 100%;
  background-color: #d06f5a;
  color: white;
  padding: 15px 20px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  
  &.below-menubar {
    margin-top: 8vh; /* Hauteur du menubar fixe */
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

.close-button {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: white;
  font-size: 1.5em;
  cursor: pointer;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.7;
  }
  
  &:focus {
    outline: 2px solid white;
    outline-offset: 2px;
  }
  
  i {
    line-height: 1;
  }
}
</style>

