<template>
  <div>
    你已登录 {{ currentCount }} 次。
    <input type="button" @click="doLogin" value="登录"/>
    <br/>
    用户昵称: {{ user.nickname }}
    <br/>
    <img :src="user.headimgurl">
    <input type="button" @click="doForward" value="JSSDK Demo"/>
    <input type="button" @click="popupVisible = true" value="showPopup">
    <one-message
      :visible.sync="popupVisible"
      type="error"
      message="123457">
    </one-message>
  </div>
</template>
<style scoped>
</style>
<script>
  import Util from '@/model/Util';

  export default {
    data() {
      return {
        currentCount: 0,
        user: {},
        popupVisible: false,
      };
    },
    created() {
      let i = window.localStorage.getItem('index');
      if (!i) {
        i = 0;
      } else {
        i = parseInt(i, 10);
      }
      this.currentCount = i + 1;
      window.localStorage.setItem('index', this.currentCount);
    },
    methods: {
      doLogin() {
        const code = Util.getUrlParameter('code');
        this.$service.call('login', {
          code,
        }).then((res) => {
          this.user = res;
        });
      },
      doForward() {
        this.$navi.to('JSSdkDemo', { id: 'id1' });
      },
    },
  };
</script>
