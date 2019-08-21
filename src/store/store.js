/**
 * @Auther: hmj
 * @Description:状态管理
 * @Date: 2019/7/9 09:53
 * @Version:1.0
 */
import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
const store = new Vuex.Store({
  //state 状态
  state:{
    userInfo:{
      name:""
    },
    uId:""
  },
  //getters
  getters:{
    getUserInfo: state => {
      return state.userInfo
    }
  },
  //mutations 事件
  //事件  更改状态  通过commit触发  同步
  //通过dispatch 触发 异步
  mutations:{
    setUserInfo:(state,data)=>{
      // alert(JSON.stringify(state)+"++++++"+data)
      state.userInfo.name = data
    }
  },
  //actions事件  处理异步事件
  //可以通过commit提交一个mutations
  actions:{
    dUserInfo({commit},data){
      // alert(JSON.stringify({commit})+"--"+data)
      commit("setUserInfo",data)
    }
  }
})

export default store
