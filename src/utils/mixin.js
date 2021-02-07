/**
 * @Auther: hmj
 * @Description:vue mixin混入
 * @Date: 2020/3/10 13:48
 * @Version:1.0
 */

/*暴露mixin*/
export const mixin1 = {
  created(){
    this.testMixin1()
  },
  mounted(){
    console.log(11111)
  },
  methods:{
    testMixin1(){
      console.log("我是混入的1")
    }
  }
}

export const mixin2 = {
  created(){
    this.testMixin2()
  },
  methods:{
    testMixin2(){
      console.log("我是混入的2")
    }
  }
}
