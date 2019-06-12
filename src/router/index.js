import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//路由懒加载
// const Foo = () => Promise.resolve({ /* 组件定义对象 */ })
//import('./Foo.vue') // 返回 Promise
//异步加载
// const index = () => import('@/pages/index')

//按需引入
const index = resolve => require(['@/pages/index'],resolve)

const cAndPCommunication = () => import('@/pages/ChildAndParentCommunication')

const selectOptions =  () =>import('@/pages/SelectOptions')

const table = () => import('@/pages/TableExport')

const async = () => import('@/pages/AsyncAwait')

const tableSlotScope = () => import('@/pages/TableSlotScope')

const echarts = () =>import('@/pages/Echarts')

const router = new Router({
  routes:[
    {
      path:"/",
      name:"index",
      component:index
    },
    {
      path:"/ChildAndParent",
      name:"ChildAndParent",
      title:"通信",
      component:cAndPCommunication
    },
    {
      path:"/SelectOptions",
      name:"SelectOptions",
      title:"水果",
      component:selectOptions
    },
    {
      path:"/FileInfo",
      name:"FileInfo",
      title:"文件",
      component: resolve => require(['../pages/FileInfo'],resolve),
      // component: r => require.ensure([],() => r(require('../pages/FileInfo')),'FileInfo')
    },
    {
      path:"/TableExport",
      name:"TableExport",
      title:"表格",
      component:table
    },
    {
      path:"/AsyncAwait",
      name:"AsyncAwait",
      title:"异步",
      component:async
    },
    {
      path:"/TableSlotScope",
      name:"TableSlotScope",
      title:"表格scope",
      component:tableSlotScope
    },
    {
      path:"/Echarts",
      name:"Echarts",
      title:"图表",
      component:echarts
    }
  ]
})

export default router
