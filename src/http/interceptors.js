/**
 * @Auther: hmj
 * @Description:http请求拦截
 * @Date: 2019/5/28 15:57
 * @Version:1.0
 */
import axios from 'axios'
import Vue from 'vue'

//请求地址配置
let urlConfig = {
  baseUrl: process.env.BASE_URL
}
let vue = new Vue()
let _this = vue.__proto__
let ajax = axios.create({
  baseURL: urlConfig.baseUrl,
  //请求超时时间
  timeout: 30000,
  withCredentials: true,
  maxRedirects: 5,
  headers:{
    "Content-Type":"application/x-www-form-urlencoded"
  }
})
//添加请求拦截器
ajax.interceptors.request.use((config)=>{
  // console.log(vue,78)
  // console.log(new Vue())
  console.log(config,"config")
  console.log(vue.__proto__,77)
  //使用iview的一些
  // _this.$Message.loading("加载中....")
  //使用iview的spin
  _this.$Spin.show({
    render:(h)=>{
      return h("div",[
          h("span",{
            class:'icon-images',
            style:{
            },
            props:{}
          },
          ""),
          h("div",{},"loading...")
      ])
    }
  })
  //对请求前做点什么
  return config
},(error)=>{
  //对请求错误做些什么
  console.log(_this,99)
  _this.$Spin.hide();
  return Promise.reject(error)
})

//添加响应拦截器
ajax.interceptors.response.use((response)=>{
  //对响应成功做点什么
  // let result = response.data
  // return result
    _this.$Spin.hide();
    return response
},(error)=>{
  //对响错误做点什么
  console.log(_this,99)
  _this.$Spin.hide();
  return Promise.reject(error)
})

export default ajax
