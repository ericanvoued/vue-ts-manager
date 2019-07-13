import Vue from 'vue'
import Vuex from 'vuex'
import HomeModule from './module/home/home-module'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    test:'ooo'
  },
  mutations: {
    set_yyy(state: any, payload: any) {
        console.log(payload)
    }
  },
  actions: {
    //
  },
  modules: {
    HomeModule 
  }
})
