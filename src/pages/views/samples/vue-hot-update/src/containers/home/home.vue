<template lang="pug">
  .home
    img(src="../../assets/app_logo.png")
    a-date-picker(@change='onChange')
</template>

<script>
export default {
  name: "home",
  methods: {
    onChange(date, dateString) {
      this.$message.info(dateString);
    },
  },
};
</script>

<style lang="stylus" scoped>
  @import "./home.styl";
</style>
