<template>
  <div>
    <div class="scroll-wrap">
      <ul class="scroll-content" :style="{ top }" @mouseenter="Stop()" @mouseleave="Up()">
        <li v-for="item in prizeList" v-bind:key="item.id"><a :href="item.src">{{item.name}}</a></li >
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ListScroll',
    data() {
      return {
        prizeList: [
          {name: '城轨采购网', src: 'http://www.railunique.com'},
          {name: '天津地铁电子采购平台', src: 'http://www.railunique.com'},
          {name: '南昌地铁', src: 'http://www.railunique.com'},
          {name: '南昌地铁', src: 'http://www.railunique.com'},
          {name: '兰州地铁招标信息', src: 'http://www.railunique.com'},
          {name: '西安公共资源交易中心', src: 'http://www.railunique.com'},
        ],
        activeIndex: 0,
        intnum: undefined
      }
    },
    computed: {
      top() {
        return -this.activeIndex * 20 + 'px';
      }
    },
    beforeCreate() {
      console.log(JSON.stringify(this.$options.data()), JSON.stringify(this.$data), 111)
      this.time = new Date()
      console.log(JSON.stringify(this.$options.data()), JSON.stringify(this.$data), 222)
    },
    created() {
      this.ScrollUp();
      console.log(this.time)
      this.time = "xxx"
      console.log(JSON.stringify(this.$options.data()), JSON.stringify(this.$data), 333)
      console.log(this, JSON.stringify(this.$data))
    },
    methods: {
      ScrollUp() {
        // eslint-disable-next-line no-unused-vars
        this.intnum = setInterval(_ => {
          if (this.activeIndex < this.prizeList.length) {
            this.activeIndex += 1;
          } else {
            this.activeIndex = 0;
          }
        }, 1000);
      },

      Stop() {
        clearInterval(this.intnum);
      },
      Up() {
        this.ScrollUp();
      }
    },
  }
</script>
<style>
  .scroll-wrap {
    height: 150px;
    overflow: hidden;
  }

  .scroll-content {
    position: relative;
    transition: top 0.5s;
  }

  .scroll-content p {
    line-height: 50px;
    text-align: center;
  }
</style>
