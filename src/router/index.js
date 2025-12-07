// -*- mode: js; js-indent-level: 2; -*-

import Vue from 'vue'
import Router from 'vue-router'
import Popup from '@/components/Popup'
import Home from '@/components/home/Home'
import Contact from '@/components/Come'
import Taproom from '@/components/taproom/Taproom'
import Brewery from '@/components/brewery/Brewery'
import Visit from '@/components/brewery/Visit'
import BeerDetail from '@/components/beers/BeerDetail'
import ItemDetail from '@/components/beers/ItemDetail'
import BeerList from '@/components/beers/BeerList'
import DealerList from '@/components/dealers/DealerList'

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
      name: 'popup',
      path: '/popup',
      component: Popup
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
