<template>
  <!--九宫格抽奖-->
  <div class="wrap">
    <div class="prize-container">
      <div class="prize-box" v-for="(item,index) in prizeList" :key="item.awardId">
        <template v-if="index == prizeList.length - 1">
          <div class="prize-btn" @click="startPrize">
            <div class="start-btn"></div>
            <div class="prize-av-count">(可抽奖次数{{avCount}})</div>
          </div>
        </template>
        <template v-else>
          <div class="prize-content">{{item.name}}</div>
          <div v-if="index == curIndex" class="prize-mask"></div>
        </template>
      </div>
    </div>
    <div class="deposit">
      <Button size="default" type="primary" @click="refreshPrize">刷新奖励</Button>
      <Button size="default" type="primary" @click="deposit">充值</Button>
    </div>
    <!--充值-->
    <Modal title="充值次数" width="300" v-model="showDepositModal" :mask-closable="false" >
      <div>
        <Form>
          <Row>
            <FormItem>
              <Input v-model="depositCount" v-number-only placeholder="请输入充值的次数"/>
            </FormItem>
          </Row>
        </Form>
      </div>
      <div slot="footer">
        <Button type="default" size="small" @click="cancelDeposit">取消</Button>
        <Button type="primary" size="small" @click="confirmDeposit">确认</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import awardList from "@/data/awardData";
  export default {
    name: "SquaredPrize",
    data() {
      return {
        //奖品list
        prizeList:[],
        //当前奖品index
        curIndex:-1,
        //抽奖时间
        prizeTime:"",
        //速度(延时定时器时间)
        speed:200,
        //速度基数
        diff:10,
        //是否抽奖中
        isProgressing:false,
        //抽中的奖品
        prize:{},
        //可抽奖次数
        avCount:3,
        //展示充值modal
        showDepositModal:false,
        //充值次数
        depositCount:"",
      }
    },
    created() {
      //console.log(JSON.stringify(awardList))
    },
    mounted() {
      this.initPrizeList()
    },
    methods: {
      //初始化奖品
      initPrizeList(){
        //先清空
        this.prizeList = []
        //奖励库随机取8个奖励 给上awardId 不与原id冲突
        for (let i = 0; i < 8; i++) {
          let randomIndex = parseInt(Math.random()*(awardList.length - 1))
          //console.log(randomIndex)
          //拷贝一份出来
          let temp = JSON.parse(JSON.stringify(awardList[randomIndex]))
          temp["awardId"] = i+1
          this.prizeList.push(temp)
        }
        //插入开始抽奖按钮
        this.prizeList.push({awardId:9,name:""})
      },
      //开始抽奖
      startPrize(){
        //判断抽奖次数
        console.log("可抽奖次数:"+this.avCount)
        if(this.avCount < 1){
          console.log("亲，抽奖次数不够了")
          this.$Message.error("亲，您没有抽奖次数了，请去充值")
          this.curIndex = -1
          return
        }
        //抽奖中 提示
        if(this.isProgressing){
          this.$Message.error("正在抽奖中，请勿多次操作！！！")
          return;
        }
        //初始化
        this.initData()
        this.getPrize()
      },
      //初始化数据
      initData(){
        this.prizeTime = +new Date()
        this.curIndex = -1
        this.speed = 150
      },
      //请求获取中的奖品
      getPrize(){
        //从8个奖品中随机中一个  模拟请求接口
        //先清空奖品
        this.prize = {}
        setTimeout(()=>{
          this.prize = this.prizeList[parseInt(Math.random()*7)]
          console.log("服务端返回的抽中的奖品:"+JSON.stringify(this.prize))
        },2000)
        this.isProgressing = true
        this.move()
      },
      //转动抽奖
      move(){
        let timer = setTimeout(()=>{
          ++this.curIndex
          if(this.curIndex > 8){
            this.curIndex = 0
          }
          //若抽中的奖品index存在，那么转圈圈的速度减慢
          console.log("用时:"+(+new Date() - this.prizeTime)/1000+"秒")
          //这里的2秒作为服务端请抽中求奖品的时间
          if(this.prize.awardId && (+new Date() - this.prizeTime)/1000 > 2){
            this.speed += this.diff //转动减速
            //如果转到了抽到的奖品，且时间大于6秒 停下来
            if(this.prize.awardId == this.prizeList[this.curIndex]["awardId"] && (+new Date() - this.prizeTime)/1000 > 6){
              clearTimeout(timer)
              this.avCount --
              if(this.avCount < 0){
                this.avCount = 0
              }
              console.log("恭喜你抽中了:"+this.prizeList[this.curIndex]["name"])
              //3是没有抽中
              if(this.prizeList[this.curIndex]["awardId"] == 3){
                this.$Modal.success({
                  title:"中奖提示",
                  content:`很遗憾，没有中奖，再接再厉吧`
                })
              }else {
                let award = `<span style="color: red">${this.prizeList[this.curIndex]["name"]}</span>`
                this.$Modal.success({
                  title:"中奖提示",
                  content:`恭喜你抽中了:${award}`
                })
              }
              setTimeout(()=>{
                this.$Modal.remove()
              },2000)
              //抽奖结束 标识置回
              this.isProgressing = false
              return false
            }
          }else {
            //时间两秒前速度一直增加
            if((+new Date() - this.prizeTime)/1000 < 2){
              this.speed -= this.diff
            }
            //没有抽到奖品且时间大于2秒 那么速度然后减少 到一定程度就不变化 一直转
            if(!this.prize.awardId && (+new Date() - this.prizeTime)/1000 > 2){
              if(this.speed <= 300){
                this.speed += this.diff
              }
              console.log(this.speed)
            }
            //大于20秒了 清除定时器
            if((+new Date() - this.prizeTime)/1000 > 20){
              clearTimeout(timer)
              this.initData()
              this.isProgressing = false
              return false
            }
          }
          // else {
          //   //方案一
          //   // 若抽中奖品不存在，那么转圈圈的速度加速
          //   this.speed -= this.diff
          //   //方案二
          //   //速度到一定程度就不变了
          //   if(this.speed){}
          // }
          this.move()
        },this.speed)
      },
      //充值次数
      deposit(){
        this.depositCount = ""
        this.showDepositModal = true
      },
      cancelDeposit(){
        this.depositCount = ""
        this.showDepositModal = false
      },
      //确认充值提交
      confirmDeposit(){
        if(!this.depositCount){
          this.$Message.error("请输入充值的次数！！！")
          return
        }
        this.avCount += this.depositCount*1
        this.$Notice.success({
          title:"成功提示",
          desc:`恭喜你成功充值次数${this.depositCount}次，当前可抽奖次数${this.avCount}次`
        })
        this.showDepositModal = false
        console.log("当前抽奖次数:"+this.avCount)
      },
      //刷新奖品
      refreshPrize(){
        if(this.isProgressing){
          this.$Message.error("抽奖进行中，刷新失败！！！")
          return
        }
        this.initData()
        this.initPrizeList()
      }
    }
  }
</script>

<style lang="scss" scoped>
.wrap{
  position: relative;
  width: 99%;
  margin: 0 auto;
  /*奖励列表*/
  .prize-container{
    width: 30vw;
    height: 30vw;
    margin: 10px auto;
    padding: 5px;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;/*子元素之间取消空白间隙，并把项目放在容器顶部。*/
    background-color: #999;
    border-radius: 10px;
    /*每个奖项*/
    .prize-box{
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: calc(calc(100%/3) - 5px);
      height: calc(calc(100%/3) - 5px);
      margin:0 6.5px 6.5px 0;
      background-color: #fff;
      border-radius: 20px;
      .prize-content{
        color: #2b333f;
      }
      /*抽奖按钮*/
      .prize-btn{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #ec3423;
        border-radius: 20px;
        opacity: .9;
        .start-btn::after{
          content: "开始抽奖";
        }
        .prize-av-count{
          font-size: 12px;
        }
      }
      /*激活状态mask*/
      .prize-mask{
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 20px;
        background-color: #fded4f;
        opacity: 0.8;
      }
    }
    .prize-box:nth-child(1){
      order: 1;
    }
    .prize-box:nth-child(2){
      order: 2;
    }
    .prize-box:nth-child(3){
      order: 3;
      margin-right: 0;
    }
    .prize-box:nth-child(4){
      order: 6;
      margin-right: 0;
    }
    .prize-box:nth-child(5){
      order: 9;
      margin-right: 0;
    }
    .prize-box:nth-child(6){
      order: 8;
    }
    .prize-box:nth-child(7){
      order: 7;
    }
    .prize-box:nth-child(8){
      order: 4;
    }
    .prize-box:nth-child(9){
      order: 5;
    }
    /*.prize-box:nth-child(3n){*/
    /*  margin-right: 0;*/
    /*}*/
    /*.prize-box:nth-child(7),.prize-box:nth-child(8),.prize-box:nth-child(9){*/
    /*  margin-bottom: 0;*/
    /*}*/
  }

  /*充值按钮*/
  .deposit{
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
