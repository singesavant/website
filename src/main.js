// -*- mode: js; js-indent-level: 2; -*-
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import router from './router'
import store from './store'

import App from './App'

import Menubar from '@/components/Menubar'
import Vue2Filters from 'vue2-filters'
import VueAnalytics from 'vue-analytics'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import browserDetect from "vue-browser-detect-plugin";

import VueLodash from 'vue-lodash'
import lodash from 'lodash'

import * as Sentry from '@sentry/browser';
import { Vue as VueIntegration } from '@sentry/integrations';

import '@/assets/css/globals.scss'
import 'bootstrap/dist/css/bootstrap-reboot.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-grid.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueLodash, { name: 'custom' , lodash: lodash })
Vue.use(Vue2Filters)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(browserDetect)

if (process.env.NODE_ENV == 'production') {
  Sentry.init({
    dsn: process.env.VUE_APP_SENTRY_DSN,
    integrations: [new VueIntegration({Vue, attachProps: true})],
  });
}

Vue.use(VueAnalytics, {
  id: 'UA-75870516-1',
  debug: {
    sendHitTask: process.env.NODE_ENV === 'production'
  },
  router
})

// Override leaflet/webpack problem
import L from 'leaflet'
delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

axios.defaults.baseURL = process.env.VUE_APP_API_REST_SERVER
axios.defaults.withCredentials = true

/* eslint-disable no-new */
new Vue({
  render: h=> h(App),
  el: '#app',
  store,
  router,
  components: { Menubar }
})
