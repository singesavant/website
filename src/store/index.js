// -*- mode: js; js-indent-level: 2; -*-
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import VueResource from 'vue-resource'
import VueAuthenticate from 'vue-authenticate'

Vue.use(Vuex)
Vue.use(VueResource)

const vueAuth = new VueAuthenticate(Vue.http, {
  baseUrl: 'http://localhost:8080',

  providers: {
    google: {
      clientId: '554963395859-rlie9i8k2th26gr1rk107d17b4fafils.apps.googleusercontent.com',
      redirectUri: 'http://localhost:8080/auth/callback' // Your client app URL
    }
  }
})

const store = new Vuex.Store({
  state: {
    preorderable_items: [],
    preOrders: [],
    userProfile: {},
    cart: {},
    isAuthenticated: false
  },
  actions: {
    LOAD_PREORDERABLE_ITEM_LIST: function ({ commit }) {
      axios.get('/preorders/items/').then((response) => {
        commit('SET_PREORDERABLE_ITEM_LIST', { list: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    LOAD_PREORDER_LIST: function ({ commit }) {
      axios.get('/preorders/my/').then((response) => {
        commit('SET_PREORDER_LIST', { list: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    ADD_PREORDERABLE_ITEM_TO_CART: function ({ commit }, { item, quantity }) {
      axios.post('/preorders/items/' + item.code, {quantity: quantity}).then((response) => {
        store.dispatch('LOAD_CART')
        console.debug('Item added to cart.')
      }, (err) => {
        console.log(err)
      })
    },
    REMOVE_PREORDERABLE_ITEM_FROM_CART: function ({ commit }, { item }) {
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

        store.dispatch('LOAD_PREORDER_LIST')
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
    }
  },
  mutations: {
    SET_PREORDERABLE_ITEM_LIST: (state, { list }) => {
      state.preorderable_items = list
    },
    SET_PREORDER_LIST: (state, { list }) => {
      state.preOrders = list
      console.debug('loaded pre order list')
    },
    SET_CART: (state, { cart }) => {
      state.cart = cart
    },
    isAuthenticated (state, payload) {
      state.isAuthenticated = payload.isAuthenticated
    }
  },
  getters: {
    isAuthenticated () {
      return vueAuth.isAuthenticated()
    }
  }
})

export default store
