<template>
  <div>
    <router-link :to="{ path: 'ccccc', params: { 'cc': '33' } }">跳转至C</router-link>
    <navi-link :to="{ name: 'A' }">跳转至A</navi-link>
    <button @click="doForward">to CCCCCC</button>
  </div>
</template>
<script>
  export default {
    methods: {
      doForward() {
        this.$navi.to('C');
      },
    },
  };
</script>
