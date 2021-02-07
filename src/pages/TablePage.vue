<template>
  <div>
    <DatePicker style="width:220px;" v-model="dateArr"
                type="daterange" split-panels placement="bottom-end" placeholder="有效期"></DatePicker>
    <br>
    <Table :columns="columns" :data="tableData" width="260"></Table>
    <Page show-total show-elevator show-sizer @on-change="pageChange" @on-page-size-change="pageSizeChange" :total="total"></Page>
    <Button @click="showModal = true">全屏打开</Button>
    <Modal v-model="showModal" fullscreen title="全屏">
      <div>全屏显示</div>
    </Modal>
    <div v-for="item in methodsList" @click="jumpOne">{{item.name}}</div>
  </div>
</template>

<script>
  export default {
    name: "TablePage",
    data(){
      return{
        dateArr:["2018-11-12","2019-12-13"],
        page:1,
        size:10,
        total:0,
        columns:[
          {
            type:"index",
            width:60
          },
          {
            key: "id",
            title: "id",
            width: 100,
            align: 'center'
          },
          {
            key: "name",
            title: "name",
            width: 100,
            align: "center"
          }
        ],
        tableData:[],
        tableList:[],
        showModal:false,
        methodsList:[
          {
            name:"跳转1",
            methodName:"jumpOne"
          },
          {
            name:"跳转2",
            methodName:"jumpTwo"
          },
        ]
      }
    },
    mounted() {
      for (let i = 0; i < 100; i++) {
        let o = {}
        o.id = i
        o.name = "name"+i
        this.tableList.push(o)
      }
      // this.tableData = JSON.parse(JSON.stringify(this.tableList)).splice(0,10)
      this.total = this.tableList.length
      this.getData()
    },
    methods:{
      pageChange(page){
        this.page = page
        this.getData()
      },
      pageSizeChange(size){
        this.size = size
        this.getData()
      },
      getData(){
        this.tableData = JSON.parse(JSON.stringify(this.tableList)).slice((this.page-1)*this.size,this.page*this.size)
      },
      jumpOne(){
        console.log(this.$options.methods,777777)
        // alert("jumpOne")
      },
      jumpTwo(){
        alert("jumpTwo")
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>
