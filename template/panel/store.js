import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

{{#if_eq i18n true}}
import vuexI18n from 'vuex-i18n'
import languages from '../locales'
{{/if_eq}}

Vue.use(Vuex)

const _state = () => ({
  context: {},
  auth: null,
  token: {},
  uid: null,

  message: []
})

const store = new Vuex.Store({
  state: _state(),
  mutations: {
    // #region twitch auth
    setContext(state, context) {
      Vue.set(state, 'context', context)
    },
    setAuth(state, auth) {
      Vue.set(state, 'auth', auth)
      axios.defaults.headers.Authorization = 'Bearer ' + auth.token
    },{{#if_eq useIdShare true}}
    setToken(state, token) {
      Vue.set(state, 'token', token)
    },
    setUid(state, uid) {
      Vue.set(state, 'uid', uid)
    },{{/if_eq}}
    // #endregion
    helloWorld(state) {
      state.message.push('Hello, World!')
    }
  },
  getters: {
  },
  actions: { {{#if_eq useIdShare true}}
    // #region twitch auth
    // if your extension doesn't require identity link, ignore this section
    authorized({ commit, dispatch }, data) {
      commit('setAuth', data)
      dispatch('init')

      try {
        let token = data.token.split('.')[1]
        let decoded = atob(token)
        let parsed = JSON.parse(decoded)
        commit('setToken', parsed)
        commit('setUid', parsed.user_id)

        // if(!parsed.user_id && router.route.path !== '/') {
        //   router.push('/request-permission')
        // } else if(router.route.path === '/request-permission') {
        //   router.push('/')
        // }
      } catch(e) {
        // router.push('/')
      }
    },
    // #endregion{{/if_eq}}
    init({ commit }) {
      commit('helloWorld')
    }
  }
})

{{#if_eq i18n true}}
const lang = languages()
Vue.use(vuexI18n.plugin, store)
Object.keys(lang).forEach(l => Vue.i18n.add(l, lang[l]))
Vue.i18n.set('{{ i18nLang }}')
{{/if_eq}}
export default store
