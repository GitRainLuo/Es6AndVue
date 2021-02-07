<template>
  <!--分页滑动小区-->
  <div style="width: 1300px">
    <div class="slide-page-container clear" :class="{borderColorE3:type == 'await'}">
      <!--20201228优化采用圣杯布局-->
      <template v-if="villageList && villageList.length > 0">
        <div class="page-content fl clear">
          <div class="content-item clear" :class="curIndex ==index && type == 'await' ? 'active':''" v-for="(item,index) in villageList"
               :key="item.id" @click="changeVillage(item,index)">
            <div class="left-content fl">
              <div class="padding10 fontSize16">
                <i class="iconfont c-iconxiaoqutubiao color368FFF"></i>
                <span class="content-title overflow-h-ellipsis color333 fontSize16">{{item.estateName}}</span>
              </div>
              <div class="padding10 fontSize14 color666">{{type == "revenue" ? "小区总营收" : "待收金额"}}</div>
              <div class="content-price overflow-h-ellipsis padding10 fontSize20 color368FFF">
                <span>{{item.price}}</span>
                <span class="color2A2A2A fontSize12">元</span>
              </div>
            </div>
            <div class="circle-percent fr">
            </div>
          </div>
        </div>
        <div class="btn fl pre">
          <div class="pre-btn btn-center" :class="preDis ? 'disable-btn' : ''" ref="preBtn" @click="throttleChangePage('pre')"></div>
        </div>
        <div class="btn fl next">
          <div class="next-btn btn-center" :class="nextDis ? 'disable-btn' : ''" ref="nextBtn" @click="throttleChangePage('next')"></div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SlideBlock",
    props: {
      // 类型 营收(revenue)还是待收(await)
      type: {
        type: String,
        default: () => {
          return "revenue"
        }
      },
      villageList: {
        type: Array,
        default: () => {
          return [
            {
              estateName:"xx",
              price:11
            },
            {
              estateName:"xx",
              price:11
            },
            {
              estateName:"xx",
              price:11
            },
            {
              estateName:"xx",
              price:11
            }
          ]
        }
      },
      // 页数
      totalPage: {
        type: Number,
        default: () => {
          return 0
        }
      },
      pageSize: {
        type: Number,
        default: () => {
          return 4
        }
      },
      year: {
        type: String,
        default: () => {
          return ""
        }
      },
      // 营收用 起始时间
      dateRange: {
        type: Array,
        required: false,
        default: () => {
          return ["", ""]
        }
      },
      checkDisable: {
        type: Boolean,
        default: () => {
          return false
        }
      }
    },
    data() {
      return {
        // 加载中
        dataLoading: false,
        curIndex: 0,
        // 当前分页
        page: 1,
        preDis: false,
        nextDis: false
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {
      // 待收
      getAwaitBillTableData() {

      },
      // 营收
      // 获取小区营收数据
      getRevenueVillageData() {

      },
      // 节流翻页 time 1.5s
      throttleChangePage(type){
        this.changePage(type)
      },
      changePage(type) {
        // console.log("触发翻页" + type)
        if (type == "pre") {
          this.page = this.page - 1
          if (this.page < 1) {
            this.page = 1
            return
          }
        } else {
          this.page = this.page + 1
          if (this.page > this.totalPage) {
            this.page = this.totalPage
            return
          }
        }
        this.isDisableChangePage()
        this.curIndex = 0
        if (this.type == "revenue") {
          this.getRevenueVillageData()
        } else {
          this.getAwaitBillTableData()
        }
      },
      changeVillage(item, index) {
        if (this.type == "revenue") return
        this.curIndex = index
        // 向父组件传递选中的小区id
        this.$emit("update:selectVillageId", item.estateId)
      },
      // 判断是否禁止翻页
      isDisableChangePage() {
        this.preDis = this.totalPage === 1 || this.page === 1 ? true : false
        this.nextDis = this.page === this.totalPage || this.totalPage === 1 ? true : false
      }
    },
    watch: {
      // 监听变化
      checkDisable(v) {
        if (v) {
          // console.log(v + "改变")
          this.isDisableChangePage()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

  .fl{float: left;}
  .fr{float: right;}
  .clear {zoom: 1;}
  .clear:after {content: '';display: block;width: 0;height: 0;clear: both;}
  .borderColorE3{
    border-bottom: 1px solid #E3E3E3;
  }
  .slide-page-container{
    /*width: 100%;*/
    height: 110px;
    padding: 20px 28px;
    /*display: flex;*/
    .btn{
      position: relative;
      /*display: flex;*/
      width: 28px;
      height: 110px;
      /*justify-content: center;*/
      /*align-items: center;*/
    }
    .btn-center{
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -14px;
      margin-top: -14px;
    }
    .pre{
      /*margin-right: 20px;*/
      position: relative;
      left: -28px;
      margin-left: -100%;
    }
    .next{
      /*margin-left: 20px;*/
      position: relative;
      left: 28px;
      margin-left: -28px;
    }
    .pre-btn{
      width: 28px;
      height: 28px;
      background: url("../assets/imgs/svg/pre-btn.svg");
    }
    .next-btn{
      width: 28px;
      height: 28px;
      background: url("../assets/imgs/svg/next-btn.svg");
    }

    .page-content{
      /*width: 1165px;*/
      width: 100%;
      /*display: flex;*/
      /*justify-content: flex-start;*/
      /*align-items: center;*/
      box-sizing: border-box;
      padding: 0 20px;
      .content-item{
        position: relative;
        float: left;
        width: 280px;
        height: 110px;
        /*display: flex;*/
        /*justify-content: space-between;*/
        border-radius: 4px;
        border: 1px solid #E3E3E3;
        box-sizing: border-box;
        .left-content{
          /*width: 150px;*/
          height: 70px;
          /*padding: 20px;*/
          padding: 20px 0 20px 20px;
          /*display: flex;*/
          /*flex-direction: column;*/
          /*justify-content: center;*/
          .content-title{
            display: inline-block;
            max-width: 135px;
          }
          .content-price{
            max-width: 140px;
          }
          .overflow-h-ellipsis{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            vertical-align: top;
          }
          .overflow-h-ellipsis:hover{
            text-overflow:inherit;
            white-space:normal;
          }
          .padding10+.padding10{
            padding-top: 10px;
          }
        }
        .circle-percent{
          /*display: flex;*/
          width: 83px;
          /*padding: 0 20px 0 0;*/
          padding: 13.6px 20px 13.5px 0;
          /*justify-content: center;*/
          /*align-items: center;*/
        }
      }
      .content-item+.content-item{
        margin-left: calc( (100% - 1120px) / 3);
      }
      .active{
        border: 1px solid #3976E6;
      }
      .active::before{
        content: "";
        position: absolute;
        bottom: -20px;
        left: 0;
        width: 280px;
        height: 110px;
        border-bottom: 2px solid #3976E6;
      }
      .active::after{
        content: "";
        position: absolute;
        width: 0;
        height: 0;
        bottom: -26px;
        left: 50%;
        margin-left: -5px;
        border-right: 5px solid transparent;
        border-left: 5px solid transparent;
        border-top: 5px solid #3976E6;
      }
    }
    .no-data{
      width: 100%;
      height: 110px;
      img{
        width: 100px;
        height: 100%;
      }
    }
    .disable-btn:hover{
      cursor: not-allowed;
    }
  }
</style>
