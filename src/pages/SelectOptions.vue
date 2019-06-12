<template>
  <!--下拉框-->
    <div>
      <select v-model="selectedFruit" @change="changeValue" class="select-option">
        <option class="option-css" v-for="item in fruitList"  :key="item.code" :value="item.code">{{item.description}}</option>
      </select>
    </div>
</template>

<script>
    export default{
        name:"SelectOptions",
        data () {
            return {
                selectedFruit:"",
                defaultFruit:"XJ",
                fruitList:[
                  {
                    code:"",
                    description:"请选择"
                  },
                  {
                    code:"PG",
                    description:"苹果"
                  },
                  {
                    code:"XJ",
                    description:"香蕉"
                  },
                  {
                    code:"JZ",
                    description:"橘子"
                  },
                  {
                    code:"XG",
                    description:"西瓜"
                  }
                ]
            }
        },
        mounted(){
//            if(this.selectedFruit != this.defaultFruit){
//                this.selectedFruit = this.defaultFruit
//            }
        },
        methods:{
          changeValue(){
              if(this.selectedFruit != this.defaultFruit){
                setTimeout(()=>{
                  this.selectedFruit = this.defaultFruit
                },2000)
              }
          }
        }
    }
</script>

<style lang="scss">
  .select-option{
    /*去掉默认样式 小三角*/
    /*-webkit-appearance: none;*/
    /*-moz-appearance: none;*/
    /*appearance: none;*/
    width: 200px;
    height: 28px;
    font: Helvetica 16px/1;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    /*去掉点击时的外边框*/
    outline: none;
    background: transparent;
    .option-css{
      display: block;
      width: 100%;
      height: 40px;
      line-height: 1;
      padding: 5px;
      text-align: right;
      color: #515a6e;
    }
    .option-css:hover{
      background-color: yellow;
    }
  }
  .select-option:hover{
    border: 1px solid #57a3f3;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }
</style>
