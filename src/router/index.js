// -*- mode: js; js-indent-level: 2; -*-

import Vue from 'vue'
import Router from 'vue-router'
import Shop from '@/components/shop/Shop'
import BrewShop from '@/components/shop/BrewShop'
import SumUpPayment from '@/components/shop/Payment'
import Home from '@/components/home/Home'
import Recycle from '@/components/Recycle'
import BeerDetail from '@/components/beers/BeerDetail'
import BeerList from '@/components/beers/BeerList'
import DealerList from '@/components/dealers/DealerList'
import SalesOrderList from '@/components/shop/preOrderList'

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
      path: '/shop/orders/:slug/payment',
      name: 'so-payment',
      components: {
        'default': SumUpPayment
      }
    },
    {
      path: '/shop/orders/',
      name: 'sales-orders',
      components: {
        'default': SalesOrderList
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
      path: '/dealers',
      name: 'dealers',
      components: {
        'default': DealerList
      }
    },
    {
      path: '/b',
      name: 'beer-list',
      components: {
        'default': BeerList
      }
    },
    {
      path: '/b/:slug',
      name: 'beer-detail',
      components: {
        'default': BeerDetail
      }
    }
  ]
})
