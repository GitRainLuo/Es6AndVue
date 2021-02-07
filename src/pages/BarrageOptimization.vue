<template>
  <!--弹幕优化
    1.弹幕过去后移除掉该条弹幕dom
    2.可以选择弹幕的显示区域
    3.弹幕颜色设置
    4.弹幕移动速度设置
    5.增加弹幕点赞/反对功能
  -->
  <div class="box">
    <div class="container">
      <div class="barrage-container" id="barrage-container"></div>
      <div class="input-container">
        <Input v-model="barrage" placeholder="请输入弹幕内容" class="input" @keyup.enter.native="sendBarrage"/>
        <Button @click="sendBarrage">发送</Button>
      </div>
    </div>
    <!--弹幕设置-->
    <div class="barrage-settings">
      <h4>弹幕设置</h4>
      <Select v-model="barragePosition" style="width: 80px">
        <Option v-for="p in positionList" :key="p.code" :value="p.code">{{p.description}}</Option>
      </Select>
      <ColorPicker v-model="barrageColor" placeholder="选择弹幕颜色"/>
      <Select v-model="barrageSpeed" style="width: 65px">
        <Option value="1">超慢</Option>
        <Option value="3">慢</Option>
        <Option value="8">中</Option>
        <Option value="13">快</Option>
        <Option value="18">中快</Option>
        <Option value="23">超快</Option>
      </Select>
    </div>
  </div>
</template>

<script>
  export default {
    name: "BarrageOptimization",
    data() {
      return {
        barrage: "",
        barrageList: [],
        //弹幕位置 默认顶部(大概1/3位置)  顶部 半屏 全屏
        barragePosition:"top",
        //1/3
        barrageArea:1/3,
        //弹幕颜色
        barrageColor:"#ff6600",
        //弹幕滚动速度 中等速度
        barrageSpeed:"8",
        positionList:[
          {
            code:"top",
            description:"顶部"
          },
          {
            code:"halfScreen",
            description:"半屏"
          },
          {
            code:"fullScreen",
            description:"全屏"
          },
          {
            code:"bottom",
            description:"底部"
          }
        ]
      }
    },
    methods: {
      sendBarrage() {
        if (!this.barrage) {
          this.$Message.warning("请随便输入点内容")
          return
        }
        //创建弹幕
        this.createBarrage()
        //清除
        this.barrage = ""
      },
      // createBarrage(){
      //   let _this = this
      //   //创建span
      //   let oSpan = document.createElement("span")
      //   //创建点赞图标  <Icon type="ios-thumbs-up-outline" />
      //   let thumbsUp = document.createElement("i")
      //   thumbsUp.classList.add('icon-thumb-up')
      //   let con = document.getElementById("barrage-container")
      //   //样式设置
      //   oSpan.style.position = "absolute"
      //   oSpan.style.width = "fit-content"
      //   oSpan.style.height = "25px"
      //   oSpan.style.lineHeight = "25px"
      //   oSpan.style.left = con.clientWidth + "px"
      //   oSpan.style.textAlign = "left"
      //   //弹幕span的高
      //   let sH = oSpan.style.height.substring(0,oSpan.style.height.indexOf("px")) * 1
      //   // oSpan.style.top = Math.floor(Math.random() * con.clientHeight / 3) + "px"
      //   // oSpan.style.color = "rgb(" + Math.random() * 256 + "," + Math.random() * 256 + "," + Math.random() * 256 + ")"
      //   /*加入弹幕动态设置*/
      //   //显示区域
      //   this.computedBarrageArea(this.barragePosition)
      //   oSpan.style.top = Math.floor(Math.random() * ((con.clientHeight - sH) * this.barrageArea)) + "px"
      //   oSpan.style.color = this.barrageColor
      //   oSpan.innerText = this.barrage
      //   con.appendChild(oSpan)
      //   con.appendChild(thumbsUp)
      //   let timer = null
      //   timer = setInterval(function () {
      //     let tmp = oSpan.style.left.substring(0, oSpan.style.left.indexOf("px"))
      //     oSpan.style.left = tmp - _this.barrageSpeed + "px"
      //     if (oSpan.style.left.substring(0, oSpan.style.left.indexOf("px")) * 1 + oSpan.offsetWidth <= 0) {
      //       oSpan.style.right = 0
      //       //移除掉
      //       con.removeChild(oSpan)
      //       clearInterval(timer)
      //     }
      //   }, 150)
      // },
      createBarrage(){
        let _this = this
        let thumbUpNum = 0
        let thumbDownNum = 0
        //所有弹幕容器
        let con = document.getElementById("barrage-container")
        //创建当前弹幕的容器
        let oCurBarrageCon = document.createElement("div")
        //创建弹幕span
        let oSpan = document.createElement("span")
        //创建点赞图标
        let thumbsUp = document.createElement("i")
        //创建不赞成/反对图标
        let thumbsDown = document.createElement("i")
        //创建点赞的数字容器
        let thumbUpNumSpan = document.createElement("span")
        //创建不赞成/反对的数字容器
        let thumbDownNumSpan = document.createElement("span")
        //先隐藏起来 有点赞了在显示
        thumbUpNumSpan.style.display = "none"

        thumbDownNumSpan.style.display = "none"
        //样式设置
        oCurBarrageCon.style.position = "absolute"
        oCurBarrageCon.style.width = "fit-content"
        oCurBarrageCon.style.height = "25px"
        oCurBarrageCon.style.lineHeight = "25px"
        oCurBarrageCon.style.left = con.clientWidth + "px"
        oCurBarrageCon.style.textAlign = "left"
        //弹幕样式
        oSpan.style.width = "fit-content"
        // oSpan.style.height = "25px"
        // oSpan.style.lineHeight = "25px"
        // oSpan.style.left = con.clientWidth + "px"
        oSpan.style.textAlign = "left"
        //点赞图标样式
        // thumbsUp.style.lineHeight = "25px"
        thumbsUp.classList.add("icon-thumb-up")
        //不赞成/反对图标样式
        thumbsDown.classList.add("icon-thumb-down")
        //加左右padding 好点击
        thumbsUp.style.padding = "0 3px"
        thumbsDown.style.padding = "0 3px"
        //当前弹幕容器的高
        let cBarrageConH = oCurBarrageCon.style.height.substring(0,oCurBarrageCon.style.height.indexOf("px")) * 1
        // oSpan.style.top = Math.floor(Math.random() * con.clientHeight / 3) + "px"
        // oSpan.style.color = "rgb(" + Math.random() * 256 + "," + Math.random() * 256 + "," + Math.random() * 256 + ")"
        /*加入弹幕动态设置*/
        //显示区域
        this.computedBarrageArea(this.barragePosition)
        let areaDis = Math.floor(Math.random() * ((con.clientHeight - cBarrageConH) * Math.abs(this.barrageArea))) + "px"
        if(this.barrageArea >0){
          //顶部 半屏 全屏
          oCurBarrageCon.style.top = areaDis
        }else {
          //底部
          oCurBarrageCon.style.bottom = areaDis
        }
        oSpan.style.color = this.barrageColor
        oSpan.innerText = this.barrage
        //弹幕span
        oCurBarrageCon.appendChild(oSpan)
        //点赞图标及数字
        oCurBarrageCon.appendChild(thumbsUp)
        oCurBarrageCon.appendChild(thumbUpNumSpan)
        //不赞成/反对图标及数字
        oCurBarrageCon.appendChild(thumbsDown)
        oCurBarrageCon.appendChild(thumbDownNumSpan)
        con.appendChild(oCurBarrageCon)
        //点赞点击
        thumbsUp.addEventListener("click",function () {
          thumbUpNum++
          if(thumbUpNum>0){
            thumbUpNumSpan.innerText = thumbUpNum
            thumbUpNumSpan.style.display = 'inline-block'
          }
          //_this.addThumbsUp()
        })
        //不赞成/反对点击
        thumbsDown.addEventListener("click",function () {
          thumbDownNum++
          if(thumbDownNum>0){
            thumbDownNumSpan.innerText = thumbDownNum
            thumbDownNumSpan.style.display = 'inline-block'
          }
        })
        let timer = null
        timer = setInterval(function () {
          let tmp = oCurBarrageCon.style.left.substring(0, oCurBarrageCon.style.left.indexOf("px"))
          oCurBarrageCon.style.left = tmp - _this.barrageSpeed + "px"
          if (oCurBarrageCon.style.left.substring(0, oCurBarrageCon.style.left.indexOf("px")) * 1 + oCurBarrageCon.offsetWidth <= 0) {
            oCurBarrageCon.style.right = 0
            //移除掉
            con.removeChild(oCurBarrageCon)
            clearInterval(timer)
          }
        }, 150)
      },
      computedBarrageArea(position){
        if(position == "top"){
          this.barrageArea = 1/3
        }else if(position == "halfScreen"){
          this.barrageArea = 2/3
        }else if(position == "fullScreen"){
          this.barrageArea = 1
        }else if(position == "bottom"){
          this.barrageArea = -1/3
        }
      },
      //点赞
      addThumbsUp(){
        alert("+1")
      }
    }
  }
</script>

<style lang="scss">
  /*
    height:内容可视区域高度 不包含padding border margin
    clientHeight: 可视区域高度 包含padding(height+padding) 不包含border
    offsetHeight: 包含padding border 水平滚动条
  */
  .box {
    width: 100%;
    margin: 10px auto;
    .container {
      display: inline-block;
      width: 79%;
      margin: 0 auto;
      .barrage-container, .input-container {
        width: 90%;
        margin: 0 auto;
      }
      .barrage-container {
        position: relative;
        /*包含上下边框2px*/
        min-height: 302px;
        border: 1px solid #ccc;
        overflow: hidden;
      }
      .input-container {
        margin: 10px auto;
        .input {
          width: 90%;
          margin-right: 10px;
        }
      }
    }
    .barrage-settings{
      display: inline-block;
      width: 20%;
      vertical-align: top;
      h4{
        padding: 5px 0;
      }
    }
  }
  /*修改占位符样式*/
  .ivu-input::placeholder{
    color: #eb7350;
  }
  /*选择内容*/
  .ivu-input::selection{
    color: #3abbaa;
  }
  /*第一个单词*/
  /*.ivu-input::first-letter{*/
  /*  font-size: 20px;*/
  /*  color: #ff2200;*/
  /*}*/
  /*第一行*/
  .ivu-input::first-line{
    color: #fc6700;
  }
</style>
