// -*- mode: js; js-indent-level: 2; -*-

import Vue from 'vue'
import Router from 'vue-router'
import Shop from '@/components/shop/Shop'
import BrewShop from '@/components/shop/BrewShop'
import Home from '@/components/home/Home'
import Recycle from '@/components/Recycle'
import ProductDetail from '@/components/product/ProductDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home
    },
    {
      path: '/shop',
      name: 'shop',
      components: {
        'default': Shop
      }
    },
    {
      path: '/recycle',
      name: 'recycle',
      components: {
        'default': Recycle
      }
    },
    {
      path: '/brewshop',
      name: 'brewshop',
      components: {
        'default': BrewShop
      }
    },
    {
      path: '/p/:slug',
      name: 'product',
      components: {
        'default': ProductDetail
      }
    }
  ]
})
