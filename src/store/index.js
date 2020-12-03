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
    },
    activeIndex:'/main'
  },
  mutations: {
    updateUserInfo(state,info){
      state.userInfo = {...info}
    },
    updateActiveIndex(state,index){
      state.activeIndex = index
    }
  },
  actions: {
  },
  modules: {
  }
})
