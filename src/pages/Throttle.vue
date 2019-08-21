<template>
    <!--函数节流-->
  <!--
    描述: 连续触发事件 但是在n秒内只执行一次函数， 节流会稀释函数的执行频率
  -->
  <div>
    <div ref="throttle" style="width:200px;height: 200px;margin: 10px auto;text-align: center;line-height: 200px;background-color: #515a6e;color: #fff" @mousemove="throttleNumberAdd">{{i}}</div>
    <Button @click="submitNoTwice">函数节流避免重复提交</Button>
    <Select v-model="city" style="width: 200px">
      <Option v-for="item in cityList" :key="item.code" :value="item.code" :label="item.value">
        <span style="text-align: left">{{item.value}}</span>
        <span style="float: right;color: #999">{{item.description}}</span>
      </Option>
    </Select>
    <div>
      <i class="icon-angry"></i>
    </div>
  </div>
</template>

<script>
    import {_throttle,__throttle} from "../utils/common"
    import  fn from "../utils/common"
    console.log(fn,99999)
    function throttle(fn,wait) {
      let previous = 0
      return function () {
        let context = this
        let args = arguments
        let now = +new Date()
        //如果当前时间戳减去上一次大于设置的触发周期  执行函数
        //小于0 不执行
        if(now - previous > wait){
          //将当前时间戳赋值给上一次
          fn.apply(context,args)
          previous = now
        }
      }
    }
    export default {
        name: "Throttle",
        data(){
          return{
            i:1,
            city:"",
            cityList:[
              {
                code:"New York",
                value:"纽约",
                description:"America"
              },
              {
                code:"London",
                value:"伦敦",
                description:"UK"
              },
              {
                code:"Sydney",
                value:"悉尼",
                description:"Australian"
              }
            ]
          }
        },
        mounted() {

        },
        watch:{
          city(val,old){
            //alert(val+"--old--"+old)
          }
        },
        methods:{
          numberAdd(){
            this.i ++
          },
          // throttleNumberAdd(){
          //   this.throttle1(this.numberAdd(),1000)
          // },
          // throttleNumberAdd:throttle(function () {
          //   this.numberAdd()
          // },1000),
          // throttleNumberAdd:fn._throttle(function () {
          //   this.numberAdd()
          // },1000),
          throttleNumberAdd:_throttle(function () {
            this.numberAdd()
          },1000),
          //防抖函数 第一版
          throttle1(fn,wait){
            let previous = 0
            return function () {
              let context = this
              let args = arguments
              let now = new Date().getTime()
              //如果当前时间戳减去上一次大于设置的触发周期  执行函数
              //小于0 不执行
              if(now - previous > wait){
                //将当前时间戳赋值给上一次
                fn.apply(context,args)
                previous = now
              }
            }
          },
          submit(){
            alert("5秒类不再重复提交数据")
          },
          submitNoTwice:_throttle(function () {
            this.submit()
          },5000),
          test(e){
            console.log(e.target.tagName,77777777)
          }
        },
    }
</script>

<style lang="scss" scoped>

</style>
