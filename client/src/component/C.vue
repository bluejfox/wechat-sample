<template>
  <div>
    <router-link :to="{ name: 'A' }">跳转至AAAA</router-link>
    <button @click="doBack">Back</button>
  </div>
</template>
<script>
  export default {
    methods: {
      doBack() {
        this.$navi.back();
      },
    },
  };
</script>
