/**
 * @Auther: hmj
 * @Description:
 * @Date: 2019/5/27 14:54
 * @Version:1.0
 */
const fn = {}
fn.log = function () {
  //apply第一个参数 console使得this指向console
  //arguments  用于不确定参数
  console.log.apply(console,arguments)
}

fn.dateFormat = function (date,format = "yyyy-MM-dd hh:mm:ss") {
  let o = {
    'M+': date.getMonth() + 1,//月
    'd+': date.getDate(),//日
    'h+': date.getHours(),//时
    'm+': date.getMinutes(),//分
    's+': date.getSeconds(),//秒
    'q+': Math.floor((date.getMonth()+3)/3),//季度
    'S+': date.getMilliseconds()//毫秒
  }
  //年  分组
  if(/(y+)/.test(format)){
    //确保年的位数正确 yy 2位  yyyy4位
    format = format.replace(RegExp.$1,(date.getFullYear()+'').substring(4 - RegExp.$1.length))
  }
  for (let i in o){
    if(new RegExp('('+i+')').test(format)){
      // console.log(RegExp.$1,i)
      format = format.replace(RegExp.$1,RegExp.$1.length == 1 ? o[i] : ('00' + o[i]).substring((''+o[i]).length))
    }
  }
  return format
}
/**
 * 函数防抖
 * @param fn 函数
 * @param delay 延时多少毫秒执行
 * @private
 */
fn._debounce = function (fn,delay = 1000,immediate) {
  //immediate 是否立即执行
  let timeout = 0
  return function () {
    let context = this
    let args = arguments
    if (timeout) clearTimeout(timeout)
    if (immediate) {
      let callNow = !timeout
      timeout = setTimeout(function () {
        timeout = null
      }, delay)
      if (callNow) fn.apply(context, args)
    } else {
      timeout = setTimeout(function () {
        fn.apply(context, args)
      }, delay)
    }
  }
}

/**
 * 函数节流
 * @param fn
 * @param delay
 * @returns {Function}
 * @private
 */
fn._throttle = function(fn,delay = 1000) {
  let previous = 0
  return function () {
    let context = this
    let args = arguments
    let now = +new Date()
    //如果当前时间戳减去上一次大于设置的触发周期  执行函数
    //小于0 不执行
    if(now - previous > delay){
      //将当前时间戳赋值给上一次
      fn.apply(context,args)
      previous = now
    }
  }
}

export function _throttle(fn,delay = 1000) {
  let previous = 0
  return function () {
    let context = this
    let args = arguments
    let now = +new Date()
    //如果当前时间戳减去上一次大于设置的触发周期  执行函数
    //小于0 不执行
    if(now - previous > delay){
      //将当前时间戳赋值给上一次
      fn.apply(context,args)
      previous = now
    }
  }
}

export function _debounce(fn,delay = 1000,immediate) {
  //immediate 是否立即执行
  let timeout = 0
  return function () {
    let context = this
    let args = arguments
    if(timeout) clearTimeout(timeout)
    if(immediate){
      let callNow = !timeout
      timeout = setTimeout(function () {
        timeout = null
      },delay)
      if (callNow) fn.apply(context,args)
    }else {
      timeout = setTimeout(function () {
        fn.apply(context,args)
      },delay)
    }
  }
}

/**
 * @desc 函数节流 setTimeout版
 * @param fn
 * @param delay
 * @private
 */
export function __throttle(fn,delay = 1000) {
  let timeout = 0
  return function () {
    let context = this
    let args = arguments
    //如果定时器存在 不做
    //直到定时器执行，然后执行函数，清空定时器，这样就可以设置下个定时器
    if(!timeout){
      timeout = setTimeout(function () {
        timeout = null
        fn.apply(context,args)
      },delay)
    }
  }
}

/**
 * 判断类型
 * @param value 参数
 * @returns {string} 返回类型 如Object
 */
fn.getType = function (value) {
  let str = Object.prototype.toString.call(value)
  let exp = /\[object (.*?)\]/
  console.log(str.match(exp))
  let proType = str.match(exp)[1]
  return proType
}

/**
 * 函数柯里化封装
 * @param fn
 * @param args
 * @returns {Function}
 */
fn.currying = function (f,args = []) {
  let _this = this
  //原函数的参数长度
  let len = f.length
  return function () {
    //取得所有参数
    let rest = [...args,...arguments]
    if(rest.length < len){
      //递归
      return fn.currying.call(_this,f,rest)
    }
    return f.apply(_this,rest)
  }
}

/**
 * 判断两是否相等(引用类型则判断内容)
 * @param a
 * @param b
 * @returns {boolean}
 */
fn.isEqual = function (a,b) {
  //严谨点的话用Object.prototype.toString.call(a) 来判断类型比较好
  //此处用 typeof 简单判断
  let typeA = typeof a,
      typeB = typeof b
  //类型不相同 直接返回false
  if(typeA !== typeB){
    return false
  }
  //number string null undefined boolean 与object (symbol)分开判断
  //所谓的对象相等 一般是值相等 如果存储的地址不一样 值一样 也不相等 比如{}和[]
  //null 的类型是object 判断object时撇开
  if(typeA === "object" && typeA && typeB){
    //object
    //获取keys  数组  用for of
    let keysA = Object.keys(a),
        keysB = Object.keys(b)
    //先判断长度 长度不一样 不相等
    if(keysA.length !== keysB.length){
      return false
    }
    //循环
    for(let key of keysA){
     //都有值 继续
      if(a[key] && b[key]){
        //判断一下类型是否相同 不同false
        if(typeof a[key] === typeof b[key]){
          //判断一下a[key]的类型 object就递归 不是就是直接判断
          if(typeof a[key] === "object"){
            //递归
            this.isEqual(a[key],b[key])
          }else {
            //不相等 false
            if(a[key] !== b[key]){
              return false
            }
          }
        }else {
          return false
        }
      }else{
        return false
      }
    }
  }else {
    //number string null undefined boolean
    return a === b
  }
  return true
}
export default fn
