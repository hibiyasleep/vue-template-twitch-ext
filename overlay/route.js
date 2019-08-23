import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: require('./pages/main.vue').default,
  }, {
    path: '/request-permission',
    component: require('./pages/request-permission.vue').default
  }
]

const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  //
  next()
})

export default router
