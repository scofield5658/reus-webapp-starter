<template>
  <div class="product">
    <div>产品列表</div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "product",
  computed: {
    ...mapState({
      isLogin: (state) => state.account.isLogin,
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
  .product {
    position: relative;
    padding: 5px 0;
    width: 100%;
    text-align: center;
  }
</style>
