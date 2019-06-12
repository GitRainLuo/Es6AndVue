<template>
  <div class="charts-container">
    <Alert>柱状图</Alert>
    <div ref="barChart" class="chart-size"></div>
    <Alert>折线图</Alert>
    <div ref="lineChart" class="chart-size"></div>
    <Alert>树图</Alert>
    <div ref="treeChart" class="chart-size"></div>
  </div>
</template>

<script>
    import echart from 'echarts'
    export default {
        name: "Echarts",
        data(){
          return{
            //柱状图
            barChart:null,
            //折线图
            lineChart:null,
            //树图
            treeChart:null
          }
        },
        mounted(){
          console.log(echart,7654)
          this.drawBarChart()
          this.drawLineChart()
          this.drawTreeChart()
        },
        methods:{
          //柱状图
          drawBarChart(){
            this.barChart = echart.init(this.$refs.barChart)
            // let options = {
            //   title:{
            //     text:"某地区蒸发量和降水量",
            //     //副标题
            //     subtext:"纯属虚构"
            //   },
            //   //图例
            //   //legend:{},
            //   //网格
            //   //grid:{}
            //   //x轴
            //   xAxis: {
            //     name:"月份",
            //     type:"category",
            //     // data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
            //     data:[]
            //   },
            //   //y轴
            //   yAxis: {
            //     name:"统计量",
            //     type:"value",
            //   },
            //   //数据集
            //   dataset:{
            //     // dimensions:["zf","js"],
            //     source:[]
            //   },
            //   //类型
            //   series: {
            //     type:'bar',
            //   }
            // }
            // for(let i = 0;i < 12;i++){
            //   let val = Math.random()*(40 - 20)+20
            //   let zf = {
            //     month:i+1,
            //     value:val
            //   }
            //   options.dataset.source.push(zf)
            //   options.xAxis.data.push(i+1+"月")
            // }
            // let options = {
            //   legend: {},
            //   tooltip: {},
            //   dataset: {
            //     source: [
            //       ['product', '2012', '2013', '2014', '2015'],
            //       ['Matcha Latte', 41.1, 30.4, 65.1, 53.3],
            //       ['Milk Tea', 86.5, 92.1, 85.7, 83.1],
            //       ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4]
            //     ]
            //   },
            //   xAxis: [
            //     {type: 'category', gridIndex: 0},
            //     {type: 'category', gridIndex: 1}
            //   ],
            //   yAxis: [
            //     {gridIndex: 0},
            //     {gridIndex: 1}
            //   ],
            //   grid: [
            //     {bottom: '55%'},
            //     {top: '55%'}
            //   ],
            //   series: [
            //     // 这几个系列会在第一个直角坐标系中，每个系列对应到 dataset 的每一行。
            //     {type: 'bar', seriesLayoutBy: 'row'},
            //     {type: 'bar', seriesLayoutBy: 'row'},
            //     {type: 'bar', seriesLayoutBy: 'row'},
            //     // 这几个系列会在第二个直角坐标系中，每个系列对应到 dataset 的每一列。
            //     {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
            //     {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
            //     {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
            //     {type: 'bar', xAxisIndex: 1, yAxisIndex: 1}
            //   ]
            // }
            let options={
              title:{
                text:"某地区蒸发量和降水量",
                subtext:"纯属虚构"
              },
              legend:{
                data:["蒸发量","降水量"]
              },
              xAxis: {
                name:"月份",
                type:"category",
                data:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
              },
              yAxis: {
                name:"统计量",
                type:"value"
              },
              //提示框
              tooltip:{
                //axis 坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
                //item 数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
                type:"axis"
              },
              //工具栏
              toolbox:{
                //导出图片，数据视图，动态类型切换，数据区域缩放，重置
                show:true,
                //各工具配置项
                feature:{
                  mark:{show:true},
                  //数据视图
                  dataView:{
                    show:true,
                    readOnly:false,
                  },
                  //动态类型切换
                  magicType:{
                    show:true,
                    type:["line","bar"]
                  },
                  //重置
                  restore:{
                    show:true
                  },
                  //保存为图片
                  saveAsImage:{
                    show:true
                  },
                  //数据区域缩放
                  dataZoom:{
                    show:true
,                  },
                  //选框组件控制
                  brush:{
                    show:true
                  }
                }
              },
              series: [
                {
                  type:"bar",
                  name:"蒸发量",
                  data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                  markPoint:{
                    data:[
                      {
                        name:"最大蒸发量",
                        type:"max"
                      },
                      {
                        name:"最小蒸发量",
                        type:"min"
                      }
                    ]
                  },
                  markLine:{
                    data:[
                      {
                        name:"平均蒸发量",
                        type:"average"
                      }
                    ]
                  }
                },
                {
                  type:"bar",
                  name:"降水量",
                  data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                  markPoint:{
                    data:[
                      {
                        name:"最高降水量",
                        type:"max"
                      },
                      {
                        name:"最低降水量",
                        type:"min"
                      }
                    ]
                  },
                  markLine:{
                    data:[
                      {
                        name:"平均降水量",
                        type:"average"
                      }
                    ]
                  }
                }
              ]
            }
            this.barChart.setOption(options)
          },
          //折线图
          drawLineChart(){
            this.lineChart = echart.init(this.$refs.lineChart)
            let options = {
              xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
              },
              yAxis: {
                type: 'value'
              },
              series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                smooth: true
              }]
            }
            this.lineChart.setOption(options)
          },
          //树图
          //目前不支持在单个 series 中直接绘制森林，可以通过在一个 option 中配置多个 series 实现森林
          drawTreeChart(){
            this.treeChart = echart.init(this.$refs.treeChart)
            let options = {
              title:{
                text:"树图"
              },
              series:{
                name:"树图",
                type:"tree",
                //树图布局
                //正交(水平 垂直)orthogonal  径向radial
                layout:"orthogonal",
                //正交布局的方向
                //horizontal相当于LR vertical相当于TB
                orient:"vertical",
                //根节点的位置
                rootLocation:{x:"center",y:20},
                //每个节点的样式
                //文本标签样式
                label: {
                  show: false,
                  //字符串模板 {a}：系列名。{b}：数据名。{c}：数据值。{d}：百分比。
                  formatter: "{b}"
                },
                //树图边的样式
                lineStyle: {
                  color: '#48b',
                  shadowColor: '#000',
                  shadowBlur: 3,
                  shadowOffsetX: 3,
                  shadowOffsetY: 5,
                  type: 'curve' // 'curve'|'broken'|'solid'|'dotted'|'dashed'
                },
                //树图中个图形和标签高亮的样式。
                emphasis: {
                  label: {
                    show: true
                  }
                },
                //data数据格式是树状结构
                //最外层是一个对象 代表树的根节点
                data:[
                  {
                    //树节点的名字 来标识每一个节点
                    name:"根节点",
                    //节点的值 在tooltip中显示
                    value:6,
                    //子节点
                    children:[
                      //节点1
                      {
                        name:"节点1",
                        value:4,
                        //叶子节点
                        children:[
                          {
                            name:"叶子节点1",
                            value:4
                          },
                          {
                            name:"叶子节点2",
                            value:4
                          },
                          {
                            name:"叶子节点3",
                            value:4
                          },
                          {
                            name:"叶子节点4",
                            value:4
                          },
                          {
                            name:"叶子节点5",
                            value:4
                          },
                          {
                            name:"叶子节点6",
                            value:4
                          }
                        ]
                      },
                      //节点2
                      {
                        name:"节点2",
                        value:4,
                        //节点2的叶子节点
                        children:[
                          {
                            name:"叶子节点7",
                            value:4
                          },
                          {
                            name:"叶子节点8",
                            value:4
                          },
                          {
                            name:"叶子节点9",
                            value:4
                          }
                        ]
                      },
                      //节点3
                      {
                        name:"节点3",
                        value:4,
                        //叶子节点
                        children:[
                          {
                            name:"叶子节点10",
                            value:4
                          },
                          {
                            name:"叶子节点11",
                            value:4
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            }
            this.treeChart.setOption(options)
          }
        }
    }
</script>

<style lang="scss" scoped>
.charts-container{
  width: 80%;
  height: auto;
  margin: 0 auto;
  .chart-size{
    width: 100%;
    height: 300px;
  }
}
</style>
