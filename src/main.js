// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import {
  Button,
  Lazyload,
  Search,
  Row,
  Col,
  Swipe,
  SwipeItem,
  Field,
  NavBar,
  Toast
} from "vant";

Vue.use(Button)
  .use(Row)
  .use(Col)
  .use(Swipe)
  .use(Search)
  .use(Lazyload)
  .use(Field)
  .use(Toast)
  .use(NavBar)
  .use(SwipeItem);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: {
    App
  },
  template: "<App/>"
});
