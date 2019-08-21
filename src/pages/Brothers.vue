<template>
    <div>
      <brother-one></brother-one>
      <brother-two></brother-two>
      <Form style="width: 60%;margin: 10px auto">
        <Input v-model="formData.name" placeholder="姓名" class="inp"/>
        <Input v-model="formData.age" placeholder="年龄" class="inp"/>
        <Input v-model="formData.sex" placeholder="性别" class="inp"/>
      </Form>
      <Button @click="resetFormData">清空</Button>
      <Button @click="destroyComponent">销毁组件</Button>
    </div>
</template>

<script>
    import BrotherOne from "@/components/BrotherOne"
    import BrotherTwo from "@/components/BrotherTwo"
    export default {
        name: "Brothers",
        components:{
          BrotherOne,
          BrotherTwo
        },
        data(){
          return{
            msg:"123",
            formData:{
              name:"",
              age:"",
              sex:""
            }
          }
        },
        mounted(){
          console.log(this.$root)
          console.log(this.$options)
          console.log(this.$options.data())
        },
        methods:{
          resetFormData(){
            //清空  骚操作
            this.formData = this.$options.data()
          },
          destroyComponent(){
            this.$destroy()
          }
        }
    }
</script>

<style lang="scss" scoped>
.inp+.inp{
  margin-top: 10px;
}
</style>
