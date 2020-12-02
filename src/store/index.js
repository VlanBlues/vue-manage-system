import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo:{
      birth: "",
      img: "",
      name: "",
      phone: "",
      readerId: 0,
      registerDate: "",
      sex: "",
      username: "",
    }
  },
  mutations: {
    updateUserInfo(state,info){
      state.userInfo = {...info}
    }
  },
  actions: {
  },
  modules: {
  }
})
