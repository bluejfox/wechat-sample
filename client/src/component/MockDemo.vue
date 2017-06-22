<template>
  <div>
    <one-field label="Service Id" v-model="serviceId"></one-field>
    <one-button type="primary" @click="doCallService">调用服务</one-button>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        serviceId: '',
      };
    },
    methods: {
      doCallService() {
        this.$service.call(`sample/${this.serviceId}`, ['1', '2'])
          .then((res) => {
            console.log(res);
          });
      },
    },
  };
</script>
