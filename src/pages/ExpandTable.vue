<template>
  <div>
    <Table :data="data" :columns="columns" border></Table>
  </div>
</template>

<script>
    import ExpandComp from "../components/ExpandComp";
    export default {
        name: "ExpandTable",
        components:{
          ExpandComp
        },
        data() {
            return {
              data:[
                {
                  info:[
                    {
                      phone:'15234567890',
                      job:'it',
                      salary:'10000',
                      experience:3,
                      goodness:'java'
                    },
                    {
                      phone:'15234567890',
                      job:'teacher',
                      salary:'10000',
                      experience:3,
                      goodness:'chemistry'
                    }
                  ],
                  account:'it123456789',
                  name:"小张",
                  age:25,
                  sex:1
                },
                {
                  info:[
                    {
                      phone:'13235467890',
                      job:'it',
                      salary:'15000',
                      experience:2,
                      goodness:'js'
                    }
                  ],
                  account:'it12349876',
                  name:"小李",
                  age:24,
                  sex:1
                },
                {
                  info:[
                    {
                      phone:'13824567890',
                      job:'it',
                      salary:'30000',
                      experience:6,
                      goodness:'phython'
                    }
                  ],
                  account:'it987654321',
                  name:"小王",
                  age:27,
                  sex:1
                }
              ],
              columns:[
                {
                  type:'expand',
                  width:60,
                  render:(h,{row,column,index})=>{
                    return h(ExpandComp,{
                      props:{
                        expandData:row,
                        columnData:this.columnData
                      }
                    })
                  }
                },
                {
                  type:'selection',
                  width:60
                },
                {
                  key:'info',
                  width:200,
                  title:'个人信息',
                  render:(h,{row,column,index})=>{
                    return h("div",{},row.account)
                  }
                },
                {
                  key:'name',
                  width:100,
                  title:'姓名'
                },
                {
                  key:'age',
                  width:100,
                  title:'年龄'
                },
                {
                  key:'sex',
                  width:100,
                  title:'性别',
                  render:(h,{row,column,index})=>{
                    return h("div",{},row.sex == 1 ? '男' : '女')
                  }
                },
                {
                  type:'action',
                  width:100,
                  title:'操作',
                  render:(h,{row,column,index})=>{
                    return h("div",{},[
                      h("Button",{
                        styles:{},
                        on:{
                          click:()=>{

                          }
                        }
                      },"编辑")
                    ])
                  }
                }
              ],
              columnData:{}
            }
        },
        created() {
          //设置默认展开
          //this.data[0]['_expanded'] = true
          this.columns.forEach((item)=>{
            if(item['key']){
              let aa = item['key']
              this.columnData[aa] = item['width']
            }
          })
        },
        mounted() {

        },
        methods: {}
    }
</script>

<style lang="scss" scoped>

</style>
