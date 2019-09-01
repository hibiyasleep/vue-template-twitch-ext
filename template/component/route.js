import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: require('./pages/main.vue').default,
  }{{#if_eq useIdShare true}}, {
    path: '/request-permission',
    component: require('./pages/request-permission.vue').default
  }{{/if_eq}}
]

const router = new Router({
  routes
})

export default router
