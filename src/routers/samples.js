module.exports = [
  {
    path: "/samples/calculator",
    title: "calculator",
    view: "/pages/views/samples/calculator/calculator.pug",
  },
  {
    path: "/samples/reference",
    title: "reference",
    view: "/pages/views/samples/reference/reference.pug",
  },
  {
    path: "/samples/react-client-app*",
    title: "react-client-app",
    view: "/pages/views/samples/react-client-app/app.pug",
  },
  {
    path: "/samples/vue-ssr-app*",
    title: "vue-ssr-app",
    view: "/pages/views/samples/vue-ssr-app/app.pug",
    preload: {
      ssr: {
        type: "vue",
        entry: "/pages/views/samples/vue-ssr-app/app.js",
      },
    },
  },
  {
    path: "/samples/vue-hot-update*",
    view: "/pages/views/samples/vue-hot-update/dist/index.html",
  },
];
