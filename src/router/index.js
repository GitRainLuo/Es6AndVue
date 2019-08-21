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

const vueUse = () =>import('@/pages/VueUse')

const vueDrag = () =>import('@/pages/VueDrag')

const comment = () =>import('@/pages/Comment')

const testComment = ()=> import('@/pages/testComment')

const optimizationComment = ()=>import('@/pages/OptimizationComment')

const feedBackAndRate = ()=>import('@/pages/FeedBackAndRate')

const store = ()=>import('@/pages/Store')

const lookInfo = () =>import('@/pages/LookInfo')

const lifeCircle = ()=>import('@/pages/LifeCircle')

const functionalComponent = ()=>import('@/pages/FunctionalComponent')

const vueApi = ()=>import('@/pages/VueApi')

const fatherTree = ()=>import('@/pages/FatherTree')

const treeMenu = ()=>import('@/pages/TreeMenu')

const selecte = () =>import('@/pages/Event/SelectEvent')

const robotApi = ()=>import('@/pages/RobotApi')

const barrage = ()=>import('@/pages/Barrage')

const slot = ()=>import('@/pages/Parent')

const brothers = ()=>import('@/pages/Brothers')

const throttle =()=>import('@/pages/Throttle')

const debounce =()=>import('@/pages/Debounce')

const eventAgent =()=>import('@/pages/event/EventAgent')

const render =()=>import('@/pages/Render')
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
    },
    {
      path:"/VueUse",
      name:"VueUse",
      title:"Vue",
      component:vueUse
    },
    {
      path:"/VueDrag",
      name:"VueDrag",
      title:"拖拽",
      component:vueDrag
    },
    {
      path:"/Comment",
      name:"Comment",
      title:"评论",
      component:comment
    },
    {
      path:"/testComment",
      name:"testComment",
      title:"评论回复",
      component:testComment
    },
    {
      path:"/OptimizationComment",
      name:"OptimizationComment",
      title:"评论优化",
      component:optimizationComment
    },
    {
      path:"/feedBackAndRate",
      name:"feedBackAndRate",
      title:"反馈评星",
      component:feedBackAndRate
    },
    {
      path:"/Store",
      name:"Store",
      title:"Store",
      component:store
    },
    {
      path:"/LookInfo",
      name:"LookInfo",
      title:"查看信息",
      component:lookInfo
    },
    {
      path:"/LifeCircle",
      name:"LifeCircle",
      title:"生命周期",
      component:lifeCircle
    },
    {
      path:"/FunctionalComponent",
      name:"FunctionalComponent",
      title:"函数化组件",
      component:functionalComponent
    },
    {
      path:"/VueApi",
      name:"VueApi",
      title:"vueAPI",
      component:vueApi
    },
    {
      path:"/FatherTree",
      name:"FatherTree",
      title:"递归组件",
      component:fatherTree
    },
    {
      path:"/TreeMenu",
      name:"TreeMenu",
      title:"树菜单",
      component:treeMenu
    },
    {
      path:"/SelectEvent",
      name:"SelectEvent",
      title:"选中事件",
      component:selecte
    },
    {
      path:"/RobotApi",
      name:"RobotApi",
      title:"实用查询",
      component:robotApi
    },
    {
      path:"/Barrage",
      name:"Barrage",
      title:"弹幕",
      component:barrage
    },
    {
      path:"/Parent",
      name:"Parent",
      title:"slot",
      component:slot
    },
    {
      path:"/Brothers",
      name:"Brothers",
      title:"兄弟组件通信",
      component:brothers
    },
    {
      path:"/Throttle",
      name:"Throttle",
      title:"函数节流",
      component:throttle
    },
    {
      path:"/Debounce",
      name:"Debounce",
      title:"函数防抖",
      component:debounce
    },
    {
      path:"/Event/EventAgent",
      name:"EventAgent",
      title:"事件代理/委托",
      component:eventAgent
    },
    {
      path:"/Render",
      name:"Render",
      title:"render",
      component:render
    }
  ],
  //滚动
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 300 }
    }
  }
})

export default router
