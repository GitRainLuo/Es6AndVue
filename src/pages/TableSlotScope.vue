<template>
  <div>
    <!--iview 3.20开始支持slot-scope-->
    <div class="table-container">
      <Table :columns="table.columns" :data="table.data" stripe border class="table">
        <template slot-scope="{row,column,index}" slot="name">
          <Input v-model="info.name" type="text" v-if="focusIndex == index" ref="name"/>
          <span v-else><strong>{{ row.name }}</strong></span>
        </template>
        <template slot-scope="{row,column,index}" slot="sex">
          <Input v-model="info.sex" type="text" v-if="focusIndex == index" ref="sex"/>
          <span v-else>{{!!row.sex ? "男":"女"}}</span>
        </template>
        <template slot-scope="{row,column,index}" slot="age">
          <Input v-model="info.age" type="text" v-if="focusIndex == index" ref="age"/>
          <span v-else>{{ row.age }}</span>
        </template>
        <template slot-scope="{row,column,index}" slot="addr">
          <Input v-model="info.addr" type="text" v-if="focusIndex == index" ref="addr"/>
          <span v-else>{{ row.addr }}</span>
        </template>
        <template slot-scope="{row,column,index}" slot="action">
          <Button @click="look(row,column,index)" v-if="isSaved && focusIndex != index">查看</Button>
          <Button @click="add(index)" v-if="isSaved && focusIndex != index">增加</Button>
          <Button @click="del(row,column,index)" v-if="isSaved && focusIndex != index" :disabled="!isAdd">删除</Button>
          <Button @click="cancel(index)" v-if="focusIndex == index">取消</Button>
          <Button @click="save(index)" v-if="focusIndex == index">保存</Button>
          <Button @click="edit(row,column,index)" v-if="isSaved && focusIndex != index" :disabled="!isAdd">编辑</Button>
        </template>
      </Table>
    </div>
  </div>
</template>

<script>
  export default{
    name:"TableSlotScope",
    data () {
      return {
        table:{
          columns:[
            {
              type:"index",
              title:"编号",
              width:70
            },
            {
              key:"name",
              slot:"name",
              title:"姓名",
              align:"center"
            },
            {
              key:"age",
              slot:"age",
              title:"年龄",
              align:"center"
            },
            {
              key:"sex",
              slot:"sex",
              title:"性别",
              align:"center"
            },
            {
              key:"addr",
              slot:"addr",
              title:"地址",
              align:"center"
            },
            {
              slot:"action",
              title:"操作",
              align:"center"
            }
          ],
          data:[
            {
              name:"1号",
              age:12,
              sex:0,
              addr:"四川绵阳"
            },
            {
              name:"2号",
              age:13,
              sex:1,
              addr:"四川成都"
            },
            {
              name:"3号",
              age:14,
              sex:0,
              addr:"四川雅安"
            },
            {
              name:"4号",
              age:15,
              sex:1,
              addr:"四川德阳"
            },
          ]
        },
        focusIndex:-1,
        info:{
          name:"",
          age:"",
          sex:"",
          addr:"",
        },
        isAdd:true,
        isSaved:true
      }
    },
    methods:{
      look(row,column,index){
        alert(JSON.stringify(row))
        alert(JSON.stringify(column))
        alert(JSON.stringify(index))
      },
      edit(row,column,index){
        this.focusIndex = index
        this.info.name = row.name
        this.info.age = row.age
        this.info.sex = row.sex
        this.info.addr = row.addr
      },
      add(index){
//              this.isSaved = false
        console.log(this.focusIndex,index)
        if(this.isAdd){
          this.info.name = ""
          this.info.age = ""
          this.info.sex = ""
          this.info.addr = ""
          this.focusIndex = index+1
          let ele = {
            name:"",
            age:"",
            sex:"",
            addr:""
          }
          this.table.data.splice(index+1,0,ele)
          //让输入框获取焦点
          this.$nextTick(()=>{
            this.$refs["name"].focus()
          })
          this.isAdd = false
        }else {
          this.$Message.warning("请先保存后再添加")
          //获取焦点
          this.$nextTick(()=>{
            this.$refs["name"].focus()
          })
        }
      },
      del(row,column,index){
        this.table.data.splice(index,1)
      },
      save(index){
        //this.table.data[index] = Object.assign({},this.info)
        if(!this.info.name){
          this.$Message.error("请输入姓名")
          this.$refs["name"].focus()
          return
        }
        if(!this.info.age){
          this.$Message.error("请输入年龄")
          this.$refs["age"].focus()
          return
        }
        if(!this.info.sex){
          this.$Message.error("请输入性别")
          this.$refs["sex"].focus()
          return
        }
        if(!this.info.addr){
          this.$Message.error("请输入地址")
          this.$refs["addr"].focus()
          return
        }
        this.table.data[index].name = this.info.name
        this.table.data[index].age = this.info.age
        this.table.data[index].sex = Number(this.info.sex)
        this.table.data[index].addr = this.info.addr
        this.focusIndex = -1
        this.isAdd = true
//            this.isSaved = true
      },
      cancel(index){
        this.focusIndex = -1
        if(!this.isAdd){
          this.table.data.splice(index,1)
        }
        this.isAdd = true
      },
    }
  }
</script>

<style lang="scss" scoped>
.table-container{
  width: 90%;
  margin: 10px auto;
  .table{
    width: 100%;
  }
}
</style>
