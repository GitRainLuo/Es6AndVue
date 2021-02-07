<template>
  <!--转盘抽奖组件-->
  <!--外围转动 按钮不转动-->
  <div class="rotate-prize-wrap" ref="rotatePrizeWrap">
    <!--旋转的部分-->
    <div class="rotate-container" :style="{transform:rotateAngle,transition:rotateTransition}">
      <!--canvas绘制转盘-->
      <canvas id="canvas" ref="canvas">
        当前浏览器版本过低，请使用其他浏览器尝试
      </canvas>
      <!--抽奖箱-->
      <div class="prize-container">
        <div v-for="(item,index) in prizeDataList" class="prize" :style="getRotateAngle(index)">
          <!--用slot 由父组件决定传过来-->
          <slot name="prizeDetail" :item="item"></slot>
          <!--在子组件写 那么用一个包起来相对定位做绝对定位父级-->
<!--          <div class="prize-name">{{item.prizeName }}</div>-->
<!--          <div class="prize-img">-->
<!--            <img :src="item.prizeImg">-->
<!--          </div>-->
        </div>
      </div>
    </div>
    <!--按钮 放出来 不随着转盘转动-->
    <div class="start-btn" @click="startClick"></div>
  </div>
</template>

<script>
  export default {
    name: "RotatePrizeComp",
    props:{
      //抽奖项
      prizeDataList:{
        required:true,
        type:Array,
        default:()=>{
          return []
        }
      },
      //转盘圆盘配置
      rotateStyleOption:{
        required:false,
        type:Object,
        //默认是6色圆盘
        default:()=>{
          return {
            // 背景色
            prizeBgColors: ['#AE3EFF', '#4D3FFF', '#FC262C', '#3A8BFF', '#EE7602', '#FE339F','#3DE1AD','#88ADA6','#00E079','#FF4500'],
            // 转盘的外边框颜色
            borderColor: '#199301'
          }
        }
      },
      //旋转圈数
      rotateCircle:{
        required:false,
        type:Number,
        default:6
      },
      //旋转时间 单位秒
      rotateTime:{
        required:false,
        type:Number,
        //默认4.5秒吧
        default:4.5
      }
    },
    data() {
      return {
        //开始旋转角度
        startRotateDegree:0,
        //旋转角度
        rotateAngle:0,
        rotateTransition:"",
        //抽奖上锁 抽奖中 lock true
        lock:false
      }
    },
    created() {
    },
    mounted() {
      this.initCanvas()
    },
    methods: {
      //绘制
      initCanvas(){
        let prizeCount = this.prizeDataList.length
        let canvas = this.$refs.canvas
        let rotatePrizeWrap = this.$refs.rotatePrizeWrap
        let ctx = canvas.getContext("2d")
        //配置项
        let {prizeBgColors,borderColor} = this.rotateStyleOption
        //画布大小
        let cw = canvas.width = rotatePrizeWrap.clientWidth
        let ch = canvas.height = rotatePrizeWrap.clientHeight
        // translate方法重新映射画布上的 (0,0) 位置
        ctx.translate(0,ch)
        // rotate方法旋转当前的绘图，旋转成当前扇形中心线竖直的！
        // ctx.rotate(-90 * Math.PI / 180)
        ctx.rotate(-Math.PI / 2)
        //外圆半径
        let outerRadius = cw/2
        //内圆半径
        let innerRadius = 0
        //开始绘制扇形区域
        //计算每块奖项占据的角度(弧度)
        let baseAngle = Math.PI * 2 / prizeCount
        //先清除画布区域
        ctx.clearRect(0,0,cw,ch)
        //画扇形
        //线条颜色
        ctx.strokeStyle = borderColor
        for (let i = 0; i < prizeCount; i++) {
          let startAngle = baseAngle * i
          let endAngle = baseAngle * (i + 1)
          ctx.beginPath()
          // 标准圆弧：arc(x,y,radius,startAngle,endAngle,anticlockwise) false 顺时针
          ctx.arc(cw/2,ch/2,outerRadius,startAngle,endAngle,false)
          //内圆反着画
          ctx.arc(cw/2,ch/2,innerRadius,endAngle,startAngle,true)
          //填充色
          ctx.fillStyle = prizeBgColors[i]
          ctx.fill()
          ctx.stroke()
          //关闭路径 保存当前环境
          ctx.closePath()
          ctx.save()
        }
      },
      //计算布局时每个奖品的旋转角度
      getRotateAngle(index){
        let prizeCount = this.prizeDataList.length
        //第index个旋转第index-1个奖品的所占据区域的角度加上自身的角度的一半
        //计算分每块占的角度 360/prizeCount
        //第index（index+1）块旋转到自己所占角度的一半加上自己前面所有角度
        // 即(360 / prizeCount) / 2 + 360 / prizeCount * index
        // let angle = 360 / prizeCount * index + (180 / prizeCount)
        let baseAngle = 360 / prizeCount
        let angle = baseAngle * index + baseAngle / 2
        return {
          transform:"rotate("+angle+"deg)"
          // transform:`rotate(${angle}deg)`
        }
      },
      //开始按钮点击 去父组件校验次数 及 获取奖品
      startClick() {
        //点了
        this.$emit("checkCount",this.lock)
      },
      //转动转盘进行抽奖
      startRotate(index){
        let prizeCount = this.prizeDataList.length
        //旋转角度
        //开始旋转角度+旋转圈数*360+(360-第index+1个的角度)[这里算是多转了的]-多转了的
        //第index+1个的角度 360/prizeCount*index + 360/prizeCount*index/2
        //因为下一次转的时候基线不是以0开始了 转动就要减去基线旋转的 this.startRotateDegree % 360
        let rotate = this.startRotateDegree + this.rotateCircle*360 + 360 - (360/prizeCount*index + 360/prizeCount/2) - this.startRotateDegree % 360
        // console.log(this.startRotateDegree % 360,rotate - this.startRotateDegree % 360)
        // let rotate = this.startRotateDegree + this.rotateCircle * 360 + 360 - (180 / prizeCount + 360 / prizeCount * index) - this.startRotateDegree % 360
        this.startRotateDegree = rotate
        this.rotateAngle = `rotate(${rotate}deg)`;
        this.rotateTransition = `transform ${this.rotateTime}s cubic-bezier(0.250, 0.460, 0.455, 0.995)`
        console.log(this.rotateAngle,this.rotateTransition)
        setTimeout(()=>{
          //通知抽奖结果
          this.$emit("endRotate",index)
        },this.rotateTime*1000 + 200)
      },
    }
  }
</script>

<style lang="scss" scoped>
.rotate-prize-wrap{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  /*旋转容器*/
  .rotate-container{
    position: relative;
    width: 100%;
    height: 100%;
    /*奖品contanier*/
    .prize-container{
      /*让居中*/
      position: absolute;
      width: 50%;
      height: 50%;
      /*宽高都是50% 只需要left 25%即可水平居中*/
      left: 25%;
      top: 0;
      /*每个奖品  需要计算旋转角度*/
      .prize{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        transform-origin: center bottom;
        /*.prize-name{*/
        /*  position: absolute;*/
        /*  !*左右预留10 然后居中*!*/
        /*  width: calc(100% - 20px);*/
        /*  left: 10px;*/
        /*  top: 20px;*/
        /*  text-align: center;*/
        /*  color: #fff;*/
        /*}*/
        /*.prize-img{*/
        /*  position: absolute;*/
        /*  !*居中*!*/
        /*  left: calc(50% - 80px / 2);*/
        /*  top: 50px;*/
        /*  width: 80px;*/
        /*  height: 80px;*/
        /*  img{*/
        /*    display: inline-block;*/
        /*    width: 100%;*/
        /*    height: 100%;*/
        /*  }*/
        /*}*/
      }
    }
  }
  /*按钮*/
  .start-btn{
    position: absolute;
    left: calc(50% - 40px);
    top: calc(50% - 40px);
    width: 80px;
    height: 80px;
    background: url("http://hmj.kim/image/start.png") no-repeat center center/contain;
    /*background-size: contain;*/
  }
}
</style>
