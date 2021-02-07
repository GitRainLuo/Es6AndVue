<template>
  <!--转盘抽奖-->
  <div class="wrap">
    <div style="text-align: center">剩余抽奖次数{{avCount}}次</div>
    <div style="text-align: center" v-if="showPrize">恭喜你抽中了<span style="color: #fc262c">{{prizeData[this.prizeIndex]["prizeName"]}}</span>！</div>
    <rotate-prize-comp
      :prizeDataList="prizeData"
      @checkCount="checkPrizeCount"
      :prize="prize"
      @endRotate="endRotate"
      ref="rotatePrize"
      class="rotate-prize">
      <!--利用具名插槽slot 灵活 由父组件这里写-->
      <template slot="prizeDetail" slot-scope="scope">
        <div class="prize-name">{{scope.item.prizeName }}</div>
        <div class="prize-img">
          <img :src="scope.item.prizeImg">
        </div>
      </template>
    </rotate-prize-comp>
  </div>
</template>

<script>
  //引入组件
  import RotatePrizeComp from "../components/RotatePrizeComp";
  export default {
    name: "RotatePrizeIndex",
    components:{
      RotatePrizeComp
    },
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
        //抽奖次数
        avCount:999,
        //抽中奖品
        prize:{},
        //抽中奖品的index
        prizeIndex:-1,
        //上锁  默认 false
        isLock:false,
        showPrize:false
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {
      //校验抽奖次数
      checkPrizeCount(){
        //看看是否在抽奖机
        if(this.isLock){
          this.$Message.error("正在抽奖中！！！")
          return
        }
        //次数小于1次 return
        if(this.avCount <= 0){
          this.$Message.warning("抽奖次数不足！！！")
          return
        }
        this.showPrize = false
        //调用接口获取奖品
        this.getPrize()
        //上锁
        this.isLock = true
        //次数减1
        this.avCount --
        this.$refs.rotatePrize.startRotate(this.prizeIndex)
      },
      //获取奖品
      getPrize(){
        this.prizeIndex = parseInt(Math.random()*5)
      },
      //结束抽奖 停止旋转
      endRotate(index){
        this.showPrize = true
        console.log("奖励:"+index)
        console.log("恭喜您抽中了:"+this.prizeData[index]["prizeName"])
        //解锁
        this.isLock = false
      },
    }
  }
</script>

<style lang="scss" scoped>
.wrap{
  width: 100%;
  position: relative;
  margin: 10px auto;
  .rotate-prize{
    position: absolute;
    /*width: 400px;*/
    /*height: 400px;*/
    width: 30vw;
    height: 30vw;
    margin: 45px auto 20px auto;
  }
  .prize-name{
    position: absolute;
    /*左右预留10 然后居中*/
    width: calc(100% - 20px);
    left: 10px;
    top: 20px;
    text-align: center;
    color: #fff;
  }
  .prize-img{
    position: absolute;
    /*居中*/
    left: calc(50% - 80px / 2);
    top: 50px;
    width: 80px;
    height: 80px;
    img{
      display: inline-block;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
