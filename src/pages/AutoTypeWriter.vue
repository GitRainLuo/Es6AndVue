<template>
    <div class="auto-typing">Do You Want To Know More About CSS Development Skill</div>
</template>

<script>
    export default {
        name: "AutoTypeWriter"
    }
</script>

<style lang="scss" scoped>
  $blue:"#66f";
  $red:"f66";
  @mixin typing($count: 0, $duration: 0, $delay: 0) {
    overflow: hidden;
    border-right: 1px solid transparent;
    width: #{$count + 1}ch;
    font-family: Consolas, Monaco, Monospace;
    white-space: nowrap;
    animation: typing #{$duration}s steps($count + 1) #{$delay}s backwards, caret 500ms steps(1) #{$delay}s $duration * 2 forwards;
  }
  .auto-typing {
    font-weight: bold;
    font-size: 30px;
    color: $blue;
    @include typing(52, 5);
  }
  @keyframes typing {
    from {
      width: 0;
    }
  }
  @keyframes caret {
    50% {
      border-right-color: currentColor;
    }
  }
</style>
