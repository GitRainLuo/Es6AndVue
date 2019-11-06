<template>
    <!--事件代理
      当需要为一个父级下面多个元素添加相同事件时可以使用事件代理，将事件委托给父节点来触发处理函数
      点击子元素的时候会事件冒泡到父元素
      通过e.target.nodeName(e.target.tagName)来判断发生事件的是那个子元素

      优点:减少事件绑定 动态的DOM结构也可以监听 事件代理发生在冒泡阶段

      事件捕获 ==>从根元素逐下到事件目标 过程中事件相应监听函数不会被触发
      事件冒泡 ==>从事件目标逐上到根元素 绑定了事件监听函数的会被触发

      阻止事件冒泡 e.stopPropagation() 或者 e.cancelBubble = true(IE)

      取消(浏览器)默认事件  e.preventDefault() 或者 e.returnValue = false(IE)
    -->
    <div>
      <!--ul[id='container']>li[id='li$']{Li$$}*5-->
      <ul id="container">
        <li id="li1">Li01</li>
        <li id="li2">Li02</li>
        <li id="li3">Li03</li>
        <li id="li4">Li04</li>
        <li id="li5">Li05</li>
      </ul>
      <hr>
      <ul>
        <li v-for="item of itemCount" ref="item">{{item}}</li>
      </ul>
      <hr>
      <!--vue 事件代理-->
      <ul @click="eAgent">
        <li v-for="(i,index) in 5" :data-index="index">{{i}}</li>
      </ul>
    </div>
</template>

<script>
    export default {
        name: "EventAgent",
        data(){
          return{
            itemCount:5
          }
        },
        mounted(){
          let oUl = document.getElementById("container")
          oUl.addEventListener("click",(e)=>{
            console.log(e.target)
            console.log(e.target.tagName+"---"+e.target.nodeName)
            if(e.target && e.target.tagName.toUpperCase() === "LI"){
              alert("Li"+e.target.id.replace("li","")+"被点击了")
            }
          })
          console.log(this.$refs)
        },
        methods:{
          eAgent(e){
            console.log(e.target.nodeName)
            if(e.target.nodeName.toLowerCase() === "li"){
              const  index = parseInt(e.target.dataset.index)
              console.log(index,"index")
              this.doThings(index)
            }
          },
          doThings(index){
            alert(index)
          }
        }
    }
</script>

<style lang="scss" scoped>
#container{
  width: 50%;
  margin: 10px auto;
  li{
    list-style: none;
    float: left;
    width: 19%;
    height: 30px;
    line-height: 30px;
    border: 1px solid #ccc;
  }
  li+li{
    margin-left: 1%;
  }
}
  #container:after{
    content: "";
    display: block;
    height: 0;
    visibility: hidden;
    clear: both;
  }
</style>
