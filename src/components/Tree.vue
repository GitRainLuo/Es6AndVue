<template>
    <!--递归组件子组件-->
    <div>
      <ul>
        <li v-for="(item,index) in list" @click="expandChild" class="parent">
          <checkbox @on-change="showCur(item,index)" v-model="item.checked"></checkbox>
          {{item.name}}
          <Tree :list="item.children" style="margin-left: 20px;text-align: left" ></Tree>
        </li>
      </ul>
    </div>
</template>

<script>
    export default {
        name: "Tree",
        data(){
          return {
            curIndex:-1,
            click:false,
            checked:false,
            checkedList:[]
          }
        },
        props:{
          list:Array
        },
        methods:{
          expandChild(e){
            console.log(e)
            // console.log(e.target)
            if(e.target.children.length > 0){
              this.click = !this.click
              e.target.children[1].style.display = this.click ? "none" : "block"
            }
            console.log(this.checkedList)
          },
          showCur(item,index){
            //console.log(e)
            // alert(index+"--"+JSON.stringify(this.list[index]))
            if(item.isParent){
              this.recursionSelect(this.list[index])
            }
          },
          //递归选中
          recursionSelect(data,is = false){
            let _this = this
            // data = data[index]
            console.log(data,777666)
            alert(JSON.stringify(data)+"xsssssss")
            this.checked = is ? this.checked : !this.checked
            if(Array.isArray(data)){
              alert("shi")
              for (let j = 0;j<data.length;j++){
                data[i].checked = this.checked
                childrenChecked(data[i])
              }
            }else{
              alert("fou")
              data.checked = this.checked
              childrenChecked(data)
            }
            function childrenChecked(data) {
              if(data.children.length>0){
                alert(111)
                for(let i = 0;i<data.children.length;i++){
                  data.children[i].checked = _this.checked
                  if(data.children[i].children.length>0){
                    alert(222)
                    _this.recursionSelect(data.children[i].children,true)
                  }
                }
              }
            }
            // if(data.children.length>0){
            //   alert(111)
            //   for(let i = 0;i<data.children.length;i++){
            //     data.children[i].checked = this.checked
            //     if(data.children[i].children.length>0){
            //       alert(222)
            //       _this.recursionSelect(data.children[i].children,true)
            //     }
            //   }
            // }
            // this.recursionSelect(index,data)
          }
        }
    }
</script>

<style lang="scss" scoped>
ul{
  margin-left: 10px;
  li{
    list-style: none;
    text-align: left;
  }
}
</style>
