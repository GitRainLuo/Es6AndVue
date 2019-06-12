<template>
    <!--父组件-->
    <div class="container">
      <child-component :toChild="parent.message" :msg.sync="parent.receiveData"></child-component>
      <!--<child-component @msg="receiveMsg"></child-component>-->
      <h2>我是父组件</h2>
      <Form>
        <FormItem>
          <div>接收子组件传递过来的值</div>
          <Input v-model="parent.receiveData" placeholder="我接收到的子组件的数据"/>
          <div>传递给子组件的值</div>
          <Input v-model="parent.message" placeholder="我传递给子组件"/>
        </FormItem>
      </Form>
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
                    message:"",
                    receiveData:""
                }
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
