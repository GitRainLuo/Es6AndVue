<template>
  <div>
    <video-player class="video-player"
                  ref="videoPlayer"
                  :playsinline="true"
                  :options="playersOptions"
                  @play="onPlayerPlay($event)"
                  @pause="onPlayerPause($event)"
                  @ended="onPlayerEnded($event)"
                  @waiting="onPlayerWaiting($event)"
                  @playing="onPlayerPlaying($event)"
                  @loadeddata="onPlayerLoadeddata($event)"
                  @timeupdate="onPlayerTimeupdate($event)"
                  @canplay="onPlayerCanplay($event)"
                  @canplaythrough="onPlayerCanplaythrough($event)"
                  @statechanged="playerStateChanged($event)"
                  @ready="playerReadied">
    </video-player>
  </div>
</template>

<script>
    export default {
        name: "VueVideoPlayer",
        data() {
            return {
              playersOptions:{
                muted:false,//默认情况下会消除任何音频
                loop:false,//是否循环
                language:'zh-CN',//语言
                preload:'auto',
                autoplay:false,//是否自动播放
                playbackRates:[0.7,1.0,1.5,2.0],//播放速度
                aspectRatio:'16:9',//将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid:true,//当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources:[
                  {
                    type:'video/mp4',//这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
                    src:'http://vjs.zencdn.net/v/oceans.mp4'//url地址
                  }
                ],
                poster:'http://vjs.zencdn.net/v/oceans.mp4',//封面地址
                notSupportedMessage:'此视频暂时无法播放,请稍后再试!',
                //控制按钮
                // controlBar:{
                //   timeDivider:true,
                //   durationDisplay:true,
                //   remainingTimeDisplay:false,
                //   fullscreenToggle:true,//全屏按钮
                //   volumeMenuButton:true,//音量 inline vertical
                // }
              }
            }
        },
        created() {
        },
        mounted() {
          console.log('this is current player instance object', this.player)
        },
        methods: {
          // listen event
          onPlayerPlay(player) {
            // console.log('player play!', player)
          },
          onPlayerPause(player) {
            // console.log('player pause!', player)
          },
          // ...player event

          // or listen state event
          playerStateChanged(playerCurrentState) {
            // console.log('player current update state', playerCurrentState)
          },

          // player is ready
          playerReadied(player) {
            console.log('the player is readied', player)
            // you can use it to do something...
            // player.[methods]
          }
        },
        computed:{
          player() {
            return this.$refs.videoPlayer.player
          }
        },
    }
</script>

<style lang="scss" scoped>
  .video-js .vjs-icon-placeholder {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>
