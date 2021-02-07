<template>
  <div class="turn-wrap" ref="turnWrap">
    <div class="turn-container" :style="{transform: rotateAngle, transition: rotateTransition}">
      <!--利用canvas-->
      <canvas id="canvas" ref="canvas">
        当前浏览器版本过低，请使用其他浏览器尝试
      </canvas>
      <!--填充转盘-->
      <div class="turn-prize-container">
        <div v-for="(item,index) in prizeData" class="turn-prize" :style="getRotateAngle(index)">
          <div class="turn-prize-relative">
            <div class="turn-prize-name">{{item.prizeName }}</div>
            <div class="turn-prize-img">
              <img :src="item.prizeImg">
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--放出来 不随着转盘转动-->
    <div class="start-btn" @click="startRotate"></div>
  </div>
</template>

<script>
  export default {
    name: "TurnPrize",
    data() {
      return {
        prizeData:[
          {
            id: 1,
            prizeName: '2000元京东券',
            prizeImg: 'http://demo.sc.chinaz.net/Files/DownLoad/webjs1/201803/jiaoben5789/images/1.png',
            // prizeImg: 'http://hmj.kim/image/1.jpg'
          },
          {
            id: 2,
            prizeName: '300元京东券',
            prizeImg: 'http://demo.sc.chinaz.net/Files/DownLoad/webjs1/201803/jiaoben5789/images/7.png',
            // prizeImg: 'http://hmj.kim/image/2.jpg'
          },
          {
            id: 3,
            prizeName: '50个比特币',
            prizeImg: 'http://demo.sc.chinaz.net/Files/DownLoad/webjs1/201803/jiaoben5789/images/3.png',
            // prizeImg: 'http://hmj.kim/image/3.jpg'
          },
          {
            id: 4,
            prizeName: '50元话费券',
            prizeImg: 'http://demo.sc.chinaz.net/Files/DownLoad/webjs1/201803/jiaoben5789/images/4.png',
            // prizeImg: 'http://hmj.kim/image/4.jpg'
          },
          {
            id: 5,
            prizeName: '100元话费券',
            prizeImg: 'http://demo.sc.chinaz.net/Files/DownLoad/webjs1/201803/jiaoben5789/images/5.png',
            // prizeImg: 'http://hmj.kim/image/5.jpg'
          },
          {
            id: 6,
            prizeName: '100个比特币',
            prizeImg: 'http://demo.sc.chinaz.net/Files/DownLoad/webjs1/201803/jiaoben5789/images/6.png',
            // prizeImg: 'http://hmj.kim/image/6.jpg'
          }
        ],
        //圆环配置项
        turnStyleOption: {
          // 背景色
          prizeBgColors: ['#AE3EFF', '#4D3FFF', '#FC262C', '#3A8BFF', '#EE7602', '#FE339F','#3DE1AD','#88ADA6','#00E079','#FF4500'],
          // 转盘的外边框颜色
          borderColor: '#199301'
        },
        //开始旋转角度
        startRotateDegree:0,
        //旋转角度
        rotateAngle:0,
        rotateTransition:"",
        //旋转时间
        duringTime:4.5,
        //旋转圈数
        rotateCircle:6
      }
    },
    created() {
    },
    mounted() {
      this.initCanvas()
    },
    methods: {
      //绘制圆环
      initCanvas: function () {
        let canvas = this.$refs.canvas
        let turnWrap = this.$refs.turnWrap
        let ctx = canvas.getContext("2d")
        let prizeCount = this.prizeData.length

        let {prizeBgColors,borderColor} = this.turnStyleOption
        //画布大小
        let cw = canvas.width = turnWrap.clientWidth
        let ch = canvas.height = turnWrap.clientHeight
        // translate方法重新映射画布上的 (0,0) 位置
        ctx.translate(0,ch)
        // rotate方法旋转当前的绘图，因为文字适合当前扇形中心线垂直的！
        ctx.rotate(-90 * Math.PI / 180);
        //外圆环半径
        let outerRadius = cw / 2
        //内圆半径
        let innerRadius = 0
        //计算绘制扇形区域
        //每个扇形占的弧度数
        let baseAngle = Math.PI * 2 / prizeCount
        //去掉默认的背景色
        ctx.clearRect(0,0,cw,ch)
        //设置线条颜色
        ctx.strokeStyle = borderColor
        //循环绘制扇形区域
        for (let i = 0; i < prizeCount; i++) {
          //开始角度
          let startAngle = baseAngle * i
          let endAngle = baseAngle * (i + 1)
          // console.log(startAngle,endAngle)
          //扇形颜色
          ctx.fillStyle = prizeBgColors[i]
          //开始绘制
          ctx.beginPath()
          // 标准圆弧：arc(x,y,radius,startAngle,endAngle,anticlockwise)
          //anticlockwise 默认false 顺时针  true 逆时针
          ctx.arc(cw*0.5,ch*0.5,outerRadius,startAngle,endAngle,false)
          //
          ctx.arc(cw*0.5,ch*0.5,innerRadius,endAngle,startAngle,true)
          ctx.stroke()//连线
          ctx.fill() //填充颜色
          ctx.closePath()
          ctx.save() //保存当前环境的状态
        }
      },
      //计算旋转角度
      getRotateAngle(index){
        let prizeCount = this.prizeData.length
        //计算分每块占的角度 360/prizeCount
        //第index（index+1）块旋转到自己所占角度的一半加上自己前面所有角度
        // 即(360 / prizeCount) / 2 + 360 / prizeCount * index
        // let angle = 360 / prizeCount * index + (180 / prizeCount)
        let angle = (360 / prizeCount) / 2 + 360 / prizeCount * index
        // console.log("第"+(index+1)+"个旋转:"+angle+"度")
        return {
          // transform: `rotate(${angle}deg)`
          transform:"rotate("+angle+"deg)"
        }
      },
      startRotate(){
        //初始化
        this.rotateCircle = 6
        //这里应该请求后台获取市具体哪个奖品
        let index = parseInt(Math.random()*7) //随机 0 - 7
        this.startRotatePrize(index)
      },
      //开始旋转 index 中了第几个
      startRotatePrize(index){
        //计算旋转角度 根据index
        console.log(this.startRotateDegree)
        let rotate = this.startRotateDegree + this.rotateCircle * 360 + 360 - (180 / this.prizeData.length + 360 / this.prizeData.length * index) - this.startRotateDegree % 360
        this.startRotateDegree = rotate
        this.rotateAngle = `rotate(${rotate}deg)`;
        console.log("旋转:"+rotate)
        this.rotateTransition = `transform ${this.duringTime}s cubic-bezier(0.250, 0.460, 0.455, 0.995)`;
        setTimeout(() => {
          // this.$emit('endRotation');
        }, this.duringTime * 1000 + 500)
      }
    }
  }
</script>

<style lang="scss" scoped>
.turn-wrap{
  position: relative;
  /*width: 40vw;*/
  /*height: 40vw;*/
  /*固定一下宽高度 用vw这里有个问题旋转的时候回抖动*/
  width: 400px;
  height: 400px;
  margin: 0 auto;
  .turn-container{
    width: 100%;
    height: 100%;
    position: relative;
    /*奖品列表*/
    .turn-prize-container{
      position: absolute;
      left: 25%;
      top: 0;
      width: 50%;
      height: 50%;
      /*每个奖品*/
      .turn-prize {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        transform-origin: center bottom;
        .turn-prize-relative{
          /*当父级 让下面的绝对定位以这个为父级*/
          position: relative;
          /*奖品name*/
          .turn-prize-name{
            position: absolute;
            /*减掉20 后面left 10然后就居中了 */
            width: calc(100% - 20px);
            height: 100%;
            left: 10px;
            top: 20px;
            text-align: center;
            color: #fff;
          }
          /*奖品图片*/
          .turn-prize-img{
            position: absolute;
            /*居中*/
            left: calc(50% - 80px / 2);
            width: 80px;
            height: 80px;
            text-align: center;
            top: 60px;
            img {
              display: inline-block;
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
  /*开始按钮  不随着转盘转动*/
  .start-btn{
    position: absolute;
    left: calc(50% - 47px);
    top: calc(50% - 50px);
    width: 100px;
    height: 100px;
    background-image: url("http://hmj.kim/image/start.png");
    background-size: contain;
    background-repeat: no-repeat;
  }
}
</style>
