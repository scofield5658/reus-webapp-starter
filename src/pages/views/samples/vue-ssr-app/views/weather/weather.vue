<template>
  <div>
    <div v-for='(value, key) in weather' :key='key' class="ui-row ui-form-item ui-form-item-show ui-border-b">
      <span class="title ui-col ui-col-33">{{key}}</span>
      <span class="value ui-col ui-col-67">{{value}}</span>
    </div>
  </div>
</template>

<style lang='postcss' scoped>
  .title {
    color: #999;
  }

  .value {
    color: #333;
  }

</style>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      city: "",
    };
  },
  computed: {
    ...mapState({
      weather(state) {
        return state.weathers[this.city] || {};
      },
    }),
  },
  created() {
    const { city } = this.$route.query;
    this.city = city;
  },
  async asyncData({ store, route: { query: { city } } }) {
    await store.dispatch("GET_WEATHER_BY_CODE", { city });
  },
};
</script>
