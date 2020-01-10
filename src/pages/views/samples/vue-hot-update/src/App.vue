<template>
  <div id="app">
    <mt-header :title="$route.name" :fixed="true"></mt-header>
    <router-view />
    <mt-tabbar v-if="isLogin" v-model="selected" :fixed="true">
      <mt-tab-item id="/home">
        <icon slot="icon" name="home" />
        主页
      </mt-tab-item>
      <mt-tab-item id="/product">
        <icon slot="icon" name="bookmark-o" />
        产品
      </mt-tab-item>
      <mt-tab-item id="/mine">
        <icon slot="icon" name="user-circle-o" />
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "app",
  components: {},
  mixins: [],
  computed: {
    ...mapState({
      isLogin: (state) => state.account.isLogin,
      theme: (state) => state.system.theme,
    }),
  },
  data() {
    return {
      selected: "/login",
    };
  },
  methods: {
    handleTheme(theme) {
      // TODO:
      console.log(theme);
    },
    getWindowSize() {
      this.$store.commit("WINDOW_RESIZE", {
        width: window.innerWidth,
        height: window.innerHeight,
      });
    },
  },
  async created() {
    this.$store.dispatch("setPlatform", window.navigator.platform);
    this.handleTheme(this.theme);
    this.getWindowSize();
    const response = await this.$http({
      method: "get",
      url: "/api/ping",
    });
    console.log(response);
    window.onresize = () => {
      this.getWindowSize();
    };
  },
  watch: {
    theme(newVal) {
      this.handleTheme(newVal);
    },
    selected(newVal) {
      if (newVal === "/login") {
        return;
      }
      this.$router.replace(newVal);
    },
    isLogin(newVal) {
      if (newVal) {
        this.selected = "/home";
      } else {
        this.selected = "/login";
        this.$router.replace("/login");
      }
    },
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  padding: 0;
  margin: 0;
  margin-top: 40px;
  color: #2c3e50;
}
</style>
