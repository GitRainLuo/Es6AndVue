<template>
    <div class="box">
      <div class="container">
        <div class="barrage-container" id="barrage-container"></div>
        <div class="input-container">
          <Input v-model="barrage" placeholder="请输入弹幕内容" class="input" @keyup.enter.native="sendBarrage"/>
          <Button @click="sendBarrage">发送</Button>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Barrage",
        data(){
          return{
            barrage:"",
            barrageList:[]
          }
        },
        methods:{
          sendBarrage(){
            // if(this.barrage){
            //   this.barrageList.push(this.barrage)
            // }else {
            //   this.$Message.warning("请输入点内容")
            //   return
            // }
            // this.barrage = ""
            if(!this.barrage){
              this.$Message.warning("请随便输入点内容")
              return
            }
            //创建span
            let oSpan = document.createElement("span")
            let con = document.getElementById("barrage-container")
            oSpan.style.width = "20%"
            oSpan.style.height = "25px"
            oSpan.style.lineHeight = "25px"
            oSpan.style.position = "absolute"
            oSpan.style.left = con.clientWidth + "px"
            oSpan.style.top = Math.floor(Math.random()*con.clientHeight/3) + "px"
            oSpan.style.color = "rgb("+Math.random()*256+","+Math.random()*256+","+Math.random()*256+")"
            oSpan.innerText = this.barrage
            oSpan.style.textAlign = "left"
            con.appendChild(oSpan)
            let timer = null
            timer = setInterval(function () {
              let tmp = oSpan.style.left.substring(0,oSpan.style.left.indexOf("px"))
              oSpan.style.left = tmp - 10 +"px"
              if(oSpan.style.left.substring(0,oSpan.style.left.indexOf("px"))*1 + oSpan.offsetWidth <= 0){
                oSpan.style.right = 0
                //移除掉
                con.removeChild(oSpan)
                clearInterval(timer)
              }
            },150)
            //清除
            this.barrage = ""
          }
        }
    }
</script>

<style lang="scss" scoped>
.box{
  width: 100%;
  .container{
    width: 90%;
    margin: 0 auto;
    .barrage-container,.input-container{
      width: 60%;
      margin: 0 auto;
    }
    .barrage-container{
      position: relative;
      /*包含上下边框2px*/
      min-height: 202px;
      border: 1px solid #ccc;
      overflow: hidden;
    }
    .input-container{
      margin: 10px auto;
      .input{
        width: 70%;
        margin-right: 10px;
      }
    }
  }
}
</style>
