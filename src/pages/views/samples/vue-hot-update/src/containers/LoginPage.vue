<template>
  <div class="login">
    <mt-field label="username" placeholder="Input username" v-model="username"></mt-field>
    <mt-button type="primary" class="login-btn" @click.native.stop="handleLogin">登录</mt-button>
    <div class="system">
      <img src="~static/app_logo.png" />
      <div>{{ platform }}</div>
      <div class="screen">
        <span>width: {{ width + 'px' }}</span>
        <span>height: {{ height + 'px' }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "login",
  components: {},
  mixins: [],
  computed: {
    ...mapState({
      userInfo: (state) => state.account.userInfo,
      width: (state) => state.system.width,
      height: (state) => state.system.height,
      platform: (state) => state.system.platform,
    }),
  },
  data() {
    return {
      username: "",
    };
  },
  methods: {
    handleLogin() {
      this.$store.dispatch("login", {
        username: this.username,
      });
    },
  },
};
</script>

<style lang="css" scoped>
  .login {
    position: relative;
    padding: 5px 0;
    width: 100%;
    text-align: center;
  }

  .login .login-btn {
    width: 80%;
    height: 32px;
  }

  .login .system {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 5px 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .login .system .screen {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      span {
        padding: 0 5px;
      }
    }
</style>
