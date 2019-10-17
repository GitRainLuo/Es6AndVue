<template>
    <!--子组件-->
    <div>
      <div>
        <h2>我是子组件</h2>
        <div>
          <Form>
            <FormItem>
              <div>传给父组件</div>
              <Input v-model="child.msg" placeholder="请输入传递给父组件的数据" @input="changeParentMsg"/>
              <div>接收父组件过来的值</div>
              <Input v-model="toChild" placeholder="来自父组件"/>
            </FormItem>
          </Form>
        </div>
      </div>
    </div>
</template>

<script>
    export default{
        name:"ChildComponent",
        data () {
            return {
                child:{
                    msg:""
                }
            }
        },
        props:{
            toChild:{
              type: String,
              required: false,
              default : ""
              // validator:function (v) {
              //   return false
              // }
            }
        },
        mounted(){
          console.log(this.$props.toChild+"---"+this.toChild)
        },
        methods:{
          changeParentMsg(){
              this.$emit("update:msg",this.child.msg)
//            this.$emit("msg",this.child.msg)
          }
        }
    }
</script>

<style>

</style>
