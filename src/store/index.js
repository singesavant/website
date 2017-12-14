// -*- mode: js; js-indent-level: 2; -*-
import Vue from 'vue'
import Vuex from 'vuex'
import VueAxios from 'vue-axios'
import axios from 'axios'

import { VueAuthenticate } from 'vue-authenticate'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

const vueAuth = new VueAuthenticate(Vue.prototype.$http, {
  baseUrl: 'https://erp.singe-savant.com/',

  providers: {
    google: {
      clientId: '554963395859-rlie9i8k2th26gr1rk107d17b4fafils.apps.googleusercontent.com',
      redirectUri: 'http://localhost:8080/', // Your client app URL
      url: 'https://www.googleapis.com',
      scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'],
      responseType: 'token'
    }
  }
})

const store = new Vuex.Store({
  plugins: [createPersistedState()],

  state: {
    orderable_items: [],
    malt_items: [],
    preOrders: [],
    userProfile: {},
    cart: {},
    isAuthenticated: false,
    user: null
  },
  actions: {
    LOAD_ORDERABLE_ITEM_LIST: function ({ commit }) {
      axios.get('/preorders/items/').then((response) => {
        commit('SET_ORDERABLE_ITEM_LIST', { list: response.data })
      }, (err) => {
        console.log(err)
      })
    },

    // Move that to BrewShop own store
    LOAD_MALT_ITEM_LIST: function ({ commit }) {
      axios.get('/brewshop/items/?item_group=Malts').then((response) => {
        commit('SET_MALT_ITEM_LIST', { list: response.data })
      }, (err) => {
        console.log(err)
      })
    },

    // Move that to BrewShop own store
    LOAD_HOP_ITEM_LIST: function ({ commit }) {
      axios.get('/brewshop/items/?item_group=Houblons').then((response) => {
        commit('SET_HOP_ITEM_LIST', { list: response.data })
      }, (err) => {
        console.log(err)
      })
    },

    LOAD_ORDERABLE_LIST: function ({ commit }) {
      axios.get('/preorders/my/').then((response) => {
        commit('SET_ORDERABLE_LIST', { list: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    ADD_ORDERABLE_ITEM_TO_CART: function ({ commit }, { item, quantity }) {
      axios.post('/preorders/items/' + item.code, {quantity: quantity}).then((response) => {
        store.dispatch('LOAD_CART')
        console.debug('Item added to cart.')
      }, (err) => {
        console.log(err)
      })
    },
    REMOVE_ORDERABLE_ITEM_FROM_CART: function ({ commit }, { item }) {
      console.debug(item.product.code)
      axios.delete('/preorders/cart/', {data: {item_code: item.product.code}}).then((response) => {
        console.debug('Item deleted from cart.')
        store.dispatch('LOAD_CART')
      }, (err) => {
        console.log(err)
      })
    },
    SUBMIT_CART: function ({ commit }, { cart }) {
      axios.post('/preorders/cart/').then((response) => {
        commit('SET_CART', { cart: response.data })

        store.dispatch('LOAD_ORDERABLE_LIST')
      }, (err) => {
        console.log(err)
      })
    },
    LOAD_CART: function ({ commit }) {
      axios.get('/preorders/cart/').then((response) => {
        commit('SET_CART', { cart: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    // Perform VueAuthenticate login using Vuex actions
    login (context, payload) {
      vueAuth.login(payload.user, payload.requestOptions).then((response) => {
        context.commit('isAuthenticated', {
          isAuthenticated: vueAuth.isAuthenticated()
        })
      })
    },
    logout: function ({ commit }) {
      axios.get('/auth/logout').then(function () {
        commit('isAuthenticated', {isAuthenticated: false})
      })
    },
    authenticate: function ({ commit }, { provider }) {
      vueAuth.authenticate(provider).then(function () {
        axios.get('/auth/with', {params: {provider: provider, token: vueAuth.getToken()}}
                 ).then((response) => {
                   commit('isAuthenticated', {
                     isAuthenticated: vueAuth.isAuthenticated(),
                     user: response.data
                   })
                 })
      })
    }
  },
  mutations: {
    SET_ORDERABLE_ITEM_LIST: (state, { list }) => {
      state.orderable_items = list
    },

    SET_MALT_ITEM_LIST: (state, { list }) => {
      state.malt_items = list
    },

    SET_HOP_ITEM_LIST: (state, { list }) => {
      state.hop_items = list
    },

    SET_ORDERABLE_LIST: (state, { list }) => {
      state.preOrders = list
      console.debug('loaded pre order list')
    },
    SET_CART: (state, { cart }) => {
      state.cart = cart
    },
    isAuthenticated (state, payload) {
      state.isAuthenticated = payload.isAuthenticated
      state.user = payload.user
    }
  },
  getters: {
    isAuthenticated: function (state) {
      return vueAuth.isAuthenticated()
    }
  }
})

export default store
