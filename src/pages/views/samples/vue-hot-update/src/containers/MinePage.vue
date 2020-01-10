<template>
  <div class="mine">
    <mt-button type="primary" class="logout-btn" @click.native.stop="handleLogout">登出</mt-button>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "mine",
  computed: {
    ...mapState({
      isLogin: (state) => state.account.isLogin,
    }),
  },
  methods: {
    handleLogout() {
      this.$store.dispatch("logout");
    },
  },
  created() {
    if (!this.isLogin) {
      this.$router.replace("/login");
    }
  },
};
</script>

<style lang="css" scoped>
  .mine {
    position: relative;
    padding: 5px 0;
    width: 100%;
    text-align: center;
  }
  .mine .logout-btn {
    width: 80%;
    height: 32px;
  }
</style>
