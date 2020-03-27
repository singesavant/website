// -*- mode: js; js-indent-level: 2; -*-
import Vue from 'vue'
import Vuex from 'vuex'
import VueAxios from 'vue-axios'
import axios from 'axios'

import VueAuthenticate from 'vue-authenticate'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

const vueAuth = VueAuthenticate.factory(Vue.prototype.$http, {
  baseUrl: process.env.VUE_APP_GAUTH_RETURN_URI,

  providers: {
    google: {
      clientId: '554963395859-rlie9i8k2th26gr1rk107d17b4fafils.apps.googleusercontent.com',
      redirectUri: process.env.VUE_APP_GAUTH_RETURN_URI, // Your client app URL
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
    orderable_item_details: {},
    sales_orders: [],
    malt_items: [],
    hop_items: [],
    beers: [],
    current_beer_details: {},
    orders: [],
    userProfile: {},
    cart: {},
    isAuthenticated: false,
    user: null
  },
  actions: {
    LOAD_BEER_DETAILS: function ({ commit }, { slug }) {
      return new Promise((resolve, reject) => {
        axios.get('/beers/' + slug).then((response) => {
          commit('SET_BEER_DETAILS', { details: response.data })
          resolve()
        }, () => {
          // console.log(err)
          reject()
        })
      })
    },

    LOAD_BEER_LIST: function ({ commit }) {
      axios.get('/beers/').then((response) => {
        commit('SET_BEER_LIST', { list: response.data })
      }, () => {
        // console.log(err)
      })
    },

    LOAD_SALESORDER_LIST: function ({ commit }) {
      axios.get('/shop/orders/').then((response) => {
        commit('SET_SALESORDER_LIST', { list: response.data })
      }, () => {
        // console.log(err)
      })
    },

    LOAD_ORDERABLE_ITEM_LIST: function ({ commit }, { item_group }) {
      axios.get('/shop/items/',
                { params: {item_group: item_group} }).then((response) => {
                  commit('SET_ORDERABLE_ITEM_LIST', { list: response.data })
                }, () => {
                  // console.log(err)
                })
    },

    // Move that to BrewShop own store
    LOAD_MALT_ITEM_LIST: function ({ commit }) {
      axios.get('/brewshop/items/?item_group=Malts').then((response) => {
        commit('SET_MALT_ITEM_LIST', { list: response.data })
      }, () => {
        // console.log(err)
      })
    },

    // Move that to BrewShop own store
    LOAD_HOP_ITEM_LIST: function ({ commit }) {
      axios.get('/brewshop/items/?item_group=Houblons').then((response) => {
        commit('SET_HOP_ITEM_LIST', { list: response.data })
      }, () => {
        // console.log(err)
      })
    },

    LOAD_ORDERABLE_ITEM_DETAILS: function ({ commit }, { item }) {
      axios.get('/shop/items/' + item.code).then((response) => {
        commit('SET_ORDERABLE_ITEM_DETAILS', { itemDetails: response.data })
      }, () => {
        //console.warn(err)
      })
    },

    // FIXME: remove that?
    LOAD_ORDERABLE_LIST: function ({ commit }) {
      axios.get('/shop/my/').then((response) => {
        commit('SET_ORDERABLE_LIST', { list: response.data })
      }, () => {
        // console.log(err)
      })
    },
    ADD_ORDERABLE_ITEM_TO_CART: function (_, { item, quantity }) {
      axios.post('/shop/items/' + item.code, {quantity: quantity}).then(() => {
        store.dispatch('LOAD_CART')
        // console.debug('Item added to cart.')
      }, () => {
        // console.log(err)
      })
    },
    REMOVE_ORDERABLE_ITEM_FROM_CART: function (_, { item }) {
      axios.delete('/shop/cart/', {data: {item_code: item.product.code}}).then(() => {
        // console.debug('Item deleted from cart.')
        store.dispatch('LOAD_CART')
      }, () => {
        // console.log(err)
      })
    },
    SUBMIT_CART: function () {
      return new Promise((resolve, reject) => {
        axios.post('/shop/cart/').then((response) => {
          // commit('SET_CART', { cart: [] })

          // store.dispatch('LOAD_ORDERABLE_LIST')

          var salesOrder = response.data
          resolve(salesOrder)
        }, () => {
          // console.log(err)
          reject()
        })
      })
    },
    LOAD_CART: function ({ commit }) {
      axios.get('/shop/cart/').then((response) => {
        commit('SET_CART', { cart: response.data })
      }, () => {
        // console.log(err)
      })
    },
    // Perform VueAuthenticate login using Vuex actions
    login (context, payload) {
      vueAuth.login(payload.user, payload.requestOptions).then(() => {
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
    SET_BEER_LIST: (state, { list }) => {
      state.beers = list
    },

    SET_BEER_DETAILS: (state, { details }) => {
      state.current_beer_details = details
    },

    SET_ORDERABLE_ITEM_LIST: (state, { list }) => {
      state.orderable_items = list
    },

    SET_SALESORDER_LIST: (state, { list }) => {
      state.sales_orders = list
    },

    SET_MALT_ITEM_LIST: (state, { list }) => {
      state.malt_items = list
    },

    SET_HOP_ITEM_LIST: (state, { list }) => {
      state.hop_items = list
    },

    SET_ORDERABLE_LIST: (state, { list }) => {
      state.orders = list
      // console.debug('loaded pre order list')
    },
    SET_CART: (state, { cart }) => {
      state.cart = cart
    },
    SET_ORDERABLE_ITEM_DETAILS: (state, { itemDetails }) => {
      state.orderable_item_details[itemDetails['name']] = itemDetails
    },
    isAuthenticated (state, payload) {
      state.isAuthenticated = payload.isAuthenticated
      state.user = payload.user
    }
  },
  getters: {
    isAuthenticated: function () {
      return vueAuth.isAuthenticated()
    }
  }
})

export default store
