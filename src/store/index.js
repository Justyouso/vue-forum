import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo:{},
    isLive: false,
    isCollapse: false,
    count:10
  },
  getters:{ //computed 监听计算取值
    count: state =>state.count + 10
  },
  // 更改state里面的值
  mutations: {
    SET_COUNT(state,value){
      state.count = value
    },
    SET_USERINFO(state,value){
      state.userInfo = value
    },
    SET_ISLIVE(state,value){
      state.isLive = value
    },
  },
  actions: {},
  modules: {}
});
