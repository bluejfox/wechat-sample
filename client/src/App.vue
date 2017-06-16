<template>
  <transition :name="transitionName">
    <router-view></router-view>
  </transition>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
    };
  },
  computed: {
    transitionName() {
      return this.$store.state.common.direction === 'back' ? 'slide-out' : 'slide-in';
    },
  },
};
</script>

<style>
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
  }
  body {
    font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
    overflow: auto;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
  }
  .slide-in-enter-active,
  .slide-in-leave-active,
  .slide-out-enter-active,
  .slide-out-leave-active {
    will-change:transform;
    -webkit-transition:all .5s;
    transition:all .5s;
    -webkit-backface-visibility:hidden;
    backface-visibility:hidden;
    -webkit-perspective:1000;
    perspective:1000;
    height:100%;
    position:absolute;
  }
  .slide-out-enter {
    opacity:0;
    -webkit-transform:translate3d(-100%,0,0);
    transform:translate3d(-100%,0,0);
  }
  .slide-in-enter, .slide-out-leave-active {
    opacity:0;
    -webkit-transform:translate3d(100%,0,0);
    transform:translate3d(100%,0,0);
  }
  .slide-in-leave-active {
    opacity:0;
    -webkit-transform:translate3d(-100%,0,0);
    transform:translate3d(-100%,0,0);
  }
</style>
