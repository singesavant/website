// -*- mode: js; js-indent-level: 2; -*-
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'

import router from './router'
import store from './store'

import Vue2Filters from 'vue2-filters'
Vue.use(Vue2Filters)

axios.defaults.baseURL = 'http://localhost:5000/v0.1'
axios.defaults.withCredentials = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,

  computed: {
    isAuthenticated: function () {
      return this.$store.getters.isAuthenticated()
    }
  }
})