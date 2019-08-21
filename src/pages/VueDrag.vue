<template>
    <div class="drag-container" id="container">
      <div class="child" v-drag v-for="num in number"></div>
    </div>
</template>

<script>
    import Vue from 'vue'
    //阻止浏览器后退
    // history.pushState(null,null,document.URL)
    // window.addEventListener("popstate",function () {
    //   alert("离开")
    //   history.pushState(null,null,document.URL)
    // })
    //浏览器关闭
    window.onbeforeunload = function(e){
      e = e || window.event
      if (e) {
        e.returnValue = '关闭提示';
      }
      // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
      return '关闭提示';
    }
    Vue.directive("drag",{
      inserted:function (el) {
        let i = 0;
        el.ondblclick = function (e) {
          //每双击一次 i+10  Z旋转10deg
          i += 10
          console.log(el.style)
          el.style.transform = 'rotateZ('+i+'deg)'
        }
        //鼠标按下
        el.onmousedown = function (e) {
          //获取当前的left right
          console.log(e.clientX+"--"+el.offsetLeft)
          let left = e.clientX - el.offsetLeft
          let top = e.clientY - el.offsetTop
          //鼠标移动
          //防止鼠标拖动太快 拖出元素范围 所以用document
          document.onmousemove = function (e) {
            let L = e.clientX - left
            let T = e.clientY - top
            //因为style设置了宽度为90% 所以这里*90% 不设置就不用 默认100%
            let R = document.documentElement.clientWidth*0.9 - el.offsetWidth
            let B = document.documentElement.clientHeight - el.offsetHeight - 20
            L = L < 0 ? 0 : L > R ? R : L
            T = T < 0 ? 0 : T > B ? B : T
            el.style.left =  L + 'px'
            el.style.top = T +'px'
          }
          //鼠标抬起
          //避免松开不是在拖动元素上 比如边界或者是有别的元素在拖拽停止的位置 用document
          document.onmouseup = function () {
            document.onmousemove = null
            document.onmouseup = null
          }
          //阻止浏览器默认行为
          return false
        }
      }
    })
    export default {
        name: "VueDrag",
        data(){
          return{
            number:[
              {},{},{}
            ]
          }
        },
        mounted(){
          //this.createDiv(1)
          let od = document.querySelectorAll(".child")

        },
        beforeDestroy(){
          alert("要离开这个页面了,请保存信息")
          // this.$Modal.confirm({
          //   title:"提示",
          //   content:"信息还未保存确定要离开吗?",
          //   okText:"确定",
          //   cancelText:"取消",
          //   onOk:()=>{
          //     alert("确认")
          //   },
          //   onCancel:()=>{
          //     alert("取消")
          //   }
          // })
        },
        methods:{
          //创建div
          createDiv(num){
            let pDiv = document.getElementById("container")
            for(let i = 0;i < num;i++){
                let oDiv = document.createElement("div")
                oDiv.style.position = 'absolute'
                oDiv.style.width = '40px'
                oDiv.style.height = '130px'
                oDiv.style.backgroundColor = this.randomColor()
                oDiv.setAttribute('v-drag','')
                console.log(oDiv)
                pDiv.appendChild(oDiv)
            }
          },
          //随机颜色
          randomColor(){
            let r = Math.ceil(Math.random()*255)
            let g = Math.ceil(Math.random()*255)
            let b = Math.ceil(Math.random()*255)
            let a = Math.random().toFixed(1)
            return 'rgba('+r+','+g+','+b+','+a+')'
          }
        },
        //离开页面前
        beforeRouteLeave(to,from,next){
            alert("即将要离开了")
          //next(false)
          this.$Modal.confirm({
            title:"提示",
            content:"信息还未保存确定要离开吗?",
            okText:"确定",
            cancelText:"取消",
            onOk:()=>{
              alert("确认")
              next()
            },
            onCancel:()=>{
              alert("取消")
              next(false)
            }
          })
        }
    }
</script>

<style lang="scss" scoped>
.drag-container{
  position: relative;
  width: 90%;
  margin: 10px auto;
  .child{
    position: absolute;
    width: 40px;
    height: 130px;
    border: 1px solid #666666;
    transform: rotateZ(0);
  }
}
</style>
