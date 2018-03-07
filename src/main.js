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

// Override leaflet/webpack problem
import L from 'leaflet'
delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

axios.defaults.baseURL = 'http://localhost:5000/v0.1'
axios.defaults.withCredentials = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { Menubar }
})
