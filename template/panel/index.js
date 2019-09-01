import Vue from 'vue'
import router from './route'
import store from './store'
import index from './index.vue'

Vue.prototype.$twitch = window.Twitch.ext

window.vm = new Vue({
  components: { index },
  el: '#vue-root',
  store,
  router
})

vm.$twitch.onContext(context => {
  vm.$store.commit('setContext', context)
})
vm.$twitch.onAuthorized(auth => {
  vm.$store.dispatch('authorized', auth)
})
