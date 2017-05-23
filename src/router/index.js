import Vue from 'vue'
import Router from 'vue-router'
import Shop from '@/components/shop/Shop'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/shop',
      name: 'SigneSavant',
      component: Shop
    }
  ]
})
