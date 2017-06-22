<template>
  <one-popup
    class="mt-message"
    :class="[customClass, messageClass]"
    v-model="visible"
    position="top"
    :modal="false">
    <p>{{ message }}</p>
  </one-popup>
</template>
<style>
  .mt-message {
    width: 100%;
    text-align: center;
    opacity: 0.8;
  }
  .mt-message-error {
    background-color: crimson;
    color: white;
  }
</style>
<script>
  export default {
    name: 'OneMessage',
    props: {
      message: String,
      type: String,
      customClass: String,
      duration: {
        type: Number,
        default: 3000,
      },
      visible: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      messageClass() {
        return `mt-message-${this.type}`;
      },
    },
    watch: {
      visible: {
        immediate: true,
        handler(val) {
          if (val && this.duration !== 0) {
            setTimeout(() => {
              this.$emit('update:visible', false);
            }, this.duration);
          }
        },
      },
    },
  };
</script>
