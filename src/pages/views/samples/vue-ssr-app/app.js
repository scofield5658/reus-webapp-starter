import Vue from "vue";
import App from "./app.vue";
import { createRouter, routes } from "./router";
import { createStore } from "./store";
import { isBrowser, queryString, noop } from "../../../../helpers/utils";

Vue.config.productionTip = false;

// install plugins
Vue.use(require("./plugins/timeout").default);
Vue.use(require("./plugins/interval").default);

const createApp = () => {
  const router = createRouter();
  const store = createStore();

  // must use before inited
  if (isBrowser()) {
    // use navigation
    Vue.use(require("vue-navigation").default, { router, keyName: "vnk" });
    // replace vuex state
    if (window.__STATE__) {
      store.replaceState(window.__STATE__);
    }
  }

  const app = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");

  if (isBrowser()) {
    // before resolve
    const inst = app.$children[0];

    let event = "load";

    // onload
    const qs = queryString(location.href);
    if (!qs.__ssr) {
      inst.showLoading();
    }

    app.$navigation.on("forward", () => {
      event = "forward";

      inst.slideInView();
      inst.slideInLoading();
    });

    app.$navigation.on("back", () => {
      event = "back";

      inst.slideOutView();
      inst.slideOutLoading();

      setTimeout(() => {
        inst.hideLoading();
      }, 600);
    });

    const beforeResolve = (to, from, next = noop) => {
      const components = router.getMatchedComponents(to.path);
      if (!components.length) {
        throw new Error("not found");
      }

      Promise.all(components.map(async ({ asyncData }) => {
        // make sure asyncData function is called firstly
        const promise = asyncData && asyncData({ store, route: to });

        // then next
        next();

        return promise;
      })).then(() => {
        if (event === "load" || event === "forward") {
          inst.hideLoading();
        }
      });
    };

    if (qs.__ssr) {
      router.onReady(() => {
        inst.hideLoading();
        return router.beforeResolve(beforeResolve);
      });
    } else {
      beforeResolve(router.currentRoute, null, noop); // init with asyncData
      router.beforeResolve(beforeResolve);
    }
  }

  return { app, router, store };
};

createApp();

export { createApp, routes };
