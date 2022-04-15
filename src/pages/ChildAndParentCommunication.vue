<template>
    <!--父组件-->
    <div class="container">
      <child-component :toChild="parent.message" @update:msg="parent.receiveData = $event" :key="refreshKey" v-model="toggleData"></child-component>
      <!--<child-component :toChild="parent.message" :msg.sync="parent.receiveData"></child-component>-->
      <!--<child-component @msg="receiveMsg"></child-component>-->
      <h2>我是父组件</h2>
      <Form>
        <FormItem>
          <div>接收子组件传递过来的值</div>
          <Input v-model="parent.receiveData" placeholder="我接收到的子组件的数据"/>
          <div>传递给子组件的值</div>
          <Input v-model="parent.message" placeholder="我传递给子组件"/>
          <div>当前toggle: {{ toggleData }}</div>
        </FormItem>
      </Form>
      <Button @click="refreshComp">强制刷新</Button>
    </div>
</template>

<script>
    import ChildComponent from '../components/ChildComponent'
    export default{
        name:"ChildAndParentCommunication",
        components:{
            ChildComponent
        },
        data () {
            return {
                parent:{
                    message:"test",
                    receiveData:"",
                },
                //刷新组件的key
                refreshKey:0,
                toggleData: true
            }
        },
        mounted(){

        },
        watch:{
            "parent.receiveData":function (val,old) {
//              this.parent.receiveData = val
            }
        },
        methods:{
          receiveMsg(val){
              this.parent.receiveData = val
          },
          refreshComp(){
            // this.$forceUpdate()
            this.refreshKey++
          }
        }
    }
</script>

<style lang="scss" scoped>
.container{
  width: 60%;
  margin: 0 auto;
}
</style>
