<template>
    <div>
      <div style="width: 65%;margin: 0 auto">
        <Input placeholder="input选择事件" class="selected-input" v-model="message"/>
        <Input v-model="selectedData"  readonly @contextmenu.native.prevent="mouseRightClick" @click.native="mouseLeftClick"/>
      </div>
      <div id="rightMenu" style="width: 100px;height: 100px;border: 1px solid #ccc;position: absolute" v-show="show"></div>
    </div>
</template>

<script>
    //import Vue from 'vue'
    // //注册一个select
    // Vue.directive("select",{
    //   inserted:function (el) {
    //     //取input
    //     let input = null
    //     if(el.tagName == 'INPUT'){
    //       //原生的input
    //       input = el
    //     }else {
    //       //iview
    //       input = document.getElementsByTagName('input')[0] || document.getElementsByTagName('textarea')[0]
    //     }
    //     //为input添加select监听事件
    //     let str = ""
    //     input.addEventListener("select",(e)=>{
    //       str = e.target.value.substring(e.target.selectionStart,e.target.selectionEnd)
    //     })
    //     alert(str)
    //     return str
    //   }
    // })
    export default {
      name: "SelectEvent",
      data(){
        return{
          message:"结庐在人境，而无车马喧。问君何能尔？心远地自偏。采菊东篱下，悠然见南山。山气日夕佳，飞鸟相与还。此中有真意，欲辨已忘言。",
          selectedData:"",
          show:false
        }
      },
      mounted(){
        let _this = this
        let oInp = document.querySelector(".selected-input input")
        console.log(oInp)
        let oDiv = document.getElementById("rightMenu")
        //为input增加select监听事件
        oInp.addEventListener("select",(e)=>{
          //console.log(e,9999)
          console.log("input的内容:"+e.target.value)
          let selected = e.target.value.substring(e.target.selectionStart,e.target.value.selectionEnd)
          console.log("选中的内容:"+selected)
          _this.selectedData = selected
        })
        //粘贴事件
        oInp.addEventListener("paste",(e)=>{
          alert("粘贴")
        })
        //复制事件
        oInp.addEventListener("copy",(e)=>{
          alert("复制")
          let selection = document.getSelection()
          console.log("复制的内容:"+selection.toString())
          e.clipboardData.setData('text/plain',selection.toString().toUpperCase())
          e.preventDefault()
        })
        //剪切事件
        oInp.addEventListener("cut",(e)=>{
          alert("剪切")
          let selection = document.getSelection()
          console.log("剪切的内容:"+selection.toString())
          e.clipboardData.setData('text/plain',selection.toString().toUpperCase())
          selection.deleteFromDocument()
          e.preventDefault()
        })
        //鼠标右键点击事件
        document.oncontextmenu = function (e) {
          // alert("右键点击")
          console.log(e.offsetX+"--"+e.offsetY)
          //阻止浏览器默认事件  不要右键出来的菜单
          e.preventDefault()
          // document.body.style.position = "relative"
          // let oDiv = document.createElement("div")
          // oDiv.style.position = "absolute"
          // oDiv.style.width = "100px"
          // oDiv.style.height = "100px"
          // oDiv.style.border = "1px solid #ccc"
          // oDiv.style.left = e.offsetX + "px"
          // oDiv.style.top = e.offsetY + "px"
          // document.body.appendChild(oDiv)
          _this.show = true
          oDiv.style.left = e.offsetX + "px"
          oDiv.style.top = e.offsetY + "px"
          if(document.documentElement.clientWidth - e.offsetX <= oDiv.offsetWidth){
            oDiv.style.left = document.documentElement.clientWidth - oDiv.offsetWidth + "px"
          }
          if(document.documentElement.clientHeight - e.offsetY <= oDiv.offsetHeight){
            oDiv.style.top = document.documentElement.clientHeight - oDiv.offsetHeight + "px"
          }
        }
        //鼠标左键
        document.onclick = function (e) {
          _this.show = false
        }
      },
      methods:{
        mouseRightClick(e){
          alert("鼠标右键点击")
          // e.preventDefault()
        },
        mouseLeftClick(e){
          alert("鼠标左键点击")
        }
      }
    }
</script>

<style lang="scss" scoped>

</style>
