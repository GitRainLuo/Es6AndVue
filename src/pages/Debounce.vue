<template>
    <!--函数防抖-->
  <!--
    描述: 触发事件后在n秒内函数只执行一次，如果在n秒内又触发了事件 则会重新计算事件
  -->
  <div>
    <div ref="throttle" style="width:200px;height: 200px;margin: 0 auto;text-align: center;line-height: 200px;background-color: #515a6e;color: #fff" @mousemove="debounceNumberAdd">{{i}}</div>
  </div>
</template>

<script>
    import {_debounce} from "../utils/common";
    function debounce(fn,wait) {
      let timeout = 0
      return function () {
        let context = this
        clearTimeout(timeout)
        timeout = setTimeout(function () {
          fn.apply(context)
        },wait)
      }
    }
    export default {
        name: "Debounce",
        data(){
          return{
            i:1
          }
        },
        methods:{
          numberAdd(){
            this.i ++
          },
          debounceNumberAdd:_debounce(function () {
            this.numberAdd()
          },1000,false),
          /**
           * @desc 函数防抖版本一
           * @param fn 函数
           * @param wait 延迟多少毫秒执行
           */
          debounce1(fn,wait = 1000){
            let timeout = 0
            return function () {
              let context = this
              clearTimeout(timeout)
              timeout = setTimeout(function () {
                fn.apply(context)
              },wait)
            }
          }
        }
    }
</script>

<style lang="scss" scoped>

</style>
