/**
 * @Auther: hmj
 * @Description:input输入限制 全局
 * @Date: 2019/6/13 14:36
 * @Version:1.0
 */
/*
  使用Vue.directive
  参数: id
        Function|Object
 */
/*
  钩子函数:
  参数:el binding vnode oldVnode
  bind:只调用一次,指令第一次绑定到元素时调用，可以在绑定时执行初始化动作
  inserted:被绑定元素插入到父节点时调用(父节点存在即可调用，不必存在于document中)
  update:被绑定元素所在模块更新时调用，不论绑定值是否发生变化.通过比较更新前后绑定的值，可以忽略不必要的模块更新
  componentUpdate:被绑定元素所在模块完成一次更新周期时调用
  unbind:只调用一次，指令与元素解绑时调用
  参数详解:
  el:被绑定的元素
  binding:(对象)
    name:指令名，不包括v-前缀 (但是使用时需要使用v-name)
    value:指令的绑定值 (例如:v-my-directive="1 + 1", value 的值是 2。)
    oldValue:指令绑定的前一个值 仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
    expression:绑定字符串形式  如：v-my-directive="1 + 1" ， expression 的值是 "1 + 1"
    arg:传递给指令的参数 如v-my-directive:foo arg的值是"foo"
    modifiers:包含修饰符的对象 例如： v-my-directive.foo.bar, 修饰符对象 modifiers 的值是 { foo: true, bar: true }
  vnode:虚拟DOM节点
  oldVnode:上一个虚拟DOM节点 仅在update和componentUpdate中使用
 */

import Vue from 'vue'
/*
  全局注册
 */
/*
  name:指令名
  regExp:正则
 */
const inputValidate = function (name,regExp) {
  Vue.directive(name,{
    //绑定
    bind:function (el) {
      el.handler =function (e) {
        let input = null
        console.log(el.tagName,"标签名")
        //根据标签名
        //input的标签名为INPUT
        if(el.tagName == 'INPUT'){
          input = el
        }else{
          //iview的
          input = el.getElementsByTagName('input')[0] || el.getElementsByTagName('textarea')[0]
        }
        console.log(input)
        input.value = input.value.replace(regExp,'')
      }
      el.addEventListener('input',el.handler,true)
    },
    //解绑
    unbind:function (el) {
      let input =el.tagName === 'INPUT' ? el : el.getElementsByTagName('input')[0]
      el.removeEventListener('input',el.handler,true )
    }
  })
}

/*正则中需要转义的字符:* . ? - + $ ^ [ ] ( ) { } | \ /*/
/*
  只允许数字或字母
  匹配不是这些的 replace为""
 */
const inputNumberLetterOnly = inputValidate('number-letter-only',/[^0-9a-zA-Z]+/)

/*
  只允许数字
 */
const inputNumberOnly = inputValidate('number-only',/[^0-9]+/)

/*
  只允许字母
 */
const inputLetterOnly = inputValidate('letter-only',/[^a-zA-Z]/)

/*
  只允许输入数字 字母 汉字
 */
const inputNumberLetterChineseOnly = inputValidate('number-letter-chinese-only',/[^0-9a-zA-Z\u4e00-\u9fa5]/)

/*
  只允许数字 字母 特殊符号
 */
const inputNumberLetterSymbolOnly = inputValidate('number-letter-symbol-only',/[^0-9a-zA-Z:'",;()!\.\?\/\-\+\=\_\~\@\#\$\%\&\*，。；：‘’“”！？]+/)

/*
  只允许数字 字母 特殊符号 空格
 */
const inputNUmberLetterSymbolSpaceOnly = inputValidate('number-letter-symbol-space-only',/[^0-9a-zA-Z\s:'",;()!\.\?\/\-\+\=\_\~\@\#\$\%\&\*，。；：‘’“”！？]+/)
export  {inputNumberLetterOnly,inputNumberOnly,inputLetterOnly,inputNumberLetterChineseOnly,inputNumberLetterSymbolOnly,inputNUmberLetterSymbolSpaceOnly}


