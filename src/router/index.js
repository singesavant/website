// -*- mode: js; js-indent-level: 2; -*-

import Vue from 'vue'
import Router from 'vue-router'
import Shop from '@/components/shop/Shop'
import BrewShop from '@/components/shop/BrewShop'
import BoxScop from '@/components/shop/BoxScop'
import BrewLab from '@/components/brewlab/BrewLab'
import ResaBrewlab from '@/components/brewlab/Resa'
import Checkout from '@/components/shop/Checkout'
import Home from '@/components/home/Home'
import Contact from '@/components/Come'
import Taproom from '@/components/taproom/Taproom'
import Brewery from '@/components/brewery/Brewery'
import Visit from '@/components/brewery/Visit'
import Recycle from '@/components/Recycle'
import BeerDetail from '@/components/beers/BeerDetail'
import ItemDetail from '@/components/beers/ItemDetail'
import BeerList from '@/components/beers/BeerList'
import DealerList from '@/components/dealers/DealerList'
import SalesOrderList from '@/components/shop/preOrderList'
import GiveAway from '@/components/shop/GiveAway'
import ThankYou from '@/components/shop/ThankYou'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home
    },
    {
      name: 'contact',
      path: '/contact',
      component: Contact
    },
    {
      path: '/shop',
      name: 'shop',
      components: {
        'default': Shop
      }
    },
    {
      path: '/shop/orders/:slug/checkout',
      name: 'so-checkout',
      components: {
        'default': Checkout
      }
    },
    {
      path: '/shop/orders/:slug/giveaway',
      name: 'so-giveaway',
      components: {
        'default': GiveAway
      }
    },
    {
      path: '/shop/orders/:slug/thank-you',
      name: 'so-thank-you',
      components: {
        'default': ThankYou
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
      path: '/taproom',
      name: 'taproom',
      components: {
        'default': Taproom
      }
    },
    {
      path: '/brewery',
      name: 'brewery',
      components: {
        'default': Brewery
      }
    },
    {
      path: '/brewery/visit',
      name: 'brewery/visit',
      components: {
        'default': Visit
      }
    },
    {
      path: '/brewlab',
      name: 'brewlab',
      components: {
        'default': BrewLab
      }
    },
    {
      path: '/brewlab/resa',
      name: 'brewlab/resa',
      components: {
        'default': ResaBrewlab
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
      path: '/boxscop',
      name: 'boxscop',
      components: {
        'default': BoxScop
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
      path: '/i/:slug',
      name: 'item-detail',
      components: {
        'default': ItemDetail
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
