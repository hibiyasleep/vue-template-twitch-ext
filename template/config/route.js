import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: require('./pages/index.vue').default,
  }
]

const router = new Router({
  routes
})

export default router
