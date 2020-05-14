<template lang="pug">
  #app
    router-view
</template>

<script>
export default {
  name: "app",
  methods: {
    getWindowSize() {
      this.$store.commit("WINDOW_RESIZE", {
        width: window.innerWidth,
        height: window.innerHeight,
      });
    },
  },
  async created() {
    this.$store.dispatch("setPlatform", window.navigator.platform);
    this.getWindowSize();
    // const response = await this.$http({
    //   method: "get",
    //   url: "/api/ping",
    // });
    // console.log(response);
    window.onresize = () => {
      this.getWindowSize();
    };
  },
};
</script>

<style lang="stylus">
#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: left
  padding: 0
  margin: 0
  margin-top: 40px
  color: #2c3e50
</style>
