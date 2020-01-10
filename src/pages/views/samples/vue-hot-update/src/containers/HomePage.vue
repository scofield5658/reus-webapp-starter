<template>
  <div class="home">
    <div>username: {{ userInfo.username }}</div>
    <hello-world />
  </div>
</template>

<script>
import { mapState } from "vuex";
import HelloWorld from "../components/HelloWorld.vue";

export default {
  name: "home",
  components: { HelloWorld },
  mixins: [],
  computed: {
    ...mapState({
      isLogin: (state) => state.account.isLogin,
      userInfo: (state) => state.account.userInfo,
    }),
  },
  created() {
    if (!this.isLogin) {
      this.$router.replace("/login");
    }
  },
};
</script>

<style lang="css" scoped>
  .home {
    position: relative;
    padding: 5px 0;
    width: 100%;
    text-align: center;
  }
</style>
