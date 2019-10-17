/**
 * @Auther: hmj
 * @Description:i18n 国际化
 * @Date: 2019/9/18 11:35
 * @Version:1.0
 */
import Vue from 'vue'
import ViewUi from 'view-design'
/**
 * 引入vue-i18n
 */
import VueI18n from 'vue-i18n'
/**
 * 导入iview 自带语言包
 */
import en from 'view-design/dist/locale/en-US'
import zh from 'view-design/dist/locale/zh-CN'
/**
 * 导入 json语言包
 */
import US from './en-US'
import CN from './zh-CN'

Vue.use(VueI18n)
//6+版本
// Vue.locale = ()=>{}
//
// const message = {
//   "en-US": Object.assign(en,US),//将自己的英文包和iview提供的结合
//   "zh-CN": Object.assign(zh,CN)//将自己的中文包和iview提供的结合
// }
//
// const i18n = new VueI18n({
//   //locale: localStorage.getItem("locale") || "en",// 设置语言,如果本地存储了则用本地的,没有则默认 'en'
//   locale: "zh-CN",
//   message
// })
//
// Vue.use(ViewUi, {
//   i18n: (key, value) => i18n.t(key,value)
// })
// //上面这个比较重要 按照官网提供的方法 new Vue({ i18n }).$mount('#app'); 运行会出错 提示无法找到  _t 属性。 按照上述方法配置可以解决此问题(网上找的方法,亲测没问题)
//
// //将i18n 导出，在main.js 的 new Vue({}) 中需要配置
// console.log(i18n)
// export default i18n

//5+版本
// 合并两个语言包
Vue.locale('zh-CN',Object.assign(CN,zh))
Vue.locale('en-US',Object.assign(US,en))
//获取本机系统语言
console.log(navigator,777888999)
const navLang = navigator.language;
console.log("本机系统语言:"+navLang)
const localLang = (navLang === 'zh-CN' || navLang === 'en-US') ? navLang : false;
console.log(localLang,7)
const lang = window.localStorage.getItem('language') || localLang || 'zh-CN';
console.log("lang:"+lang)
//修改Vue.config.lang即可
Vue.config.lang = lang
export default {}

