// -*- mode: js; js-indent-level: 2; -*-
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'

import router from './router'
import store from './store'

import Menubar from '@/components/Menubar'
import Vue2Filters from 'vue2-filters'

import BootstrapVue from 'bootstrap-vue'

import '@/assets/css/globals.scss'
import 'bootstrap/dist/css/bootstrap-reboot.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-grid.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Vue2Filters)
Vue.use(BootstrapVue)

axios.defaults.baseURL = 'http://localhost:5000/v0.1'
axios.defaults.withCredentials = true
axios.defaults.headers.common.crossDomain = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { Menubar }
})
