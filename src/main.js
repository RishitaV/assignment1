import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import store from './store/store';
import axios from 'axios';
import router from './routes';

Vue.use(VueRouter);

Vue.config.productionTip = false

async function setStore() {
  let user = JSON.parse(localStorage.getItem("user-info"));
  if (user) {
    try {
      await store.dispatch('login', user);
    } catch (error) {
      console.error(error);
    }
  }
  let issues = await axios.get("http://localhost:3000/issues");
  issues = issues.data;
  if (issues) {
    try {
      await store.dispatch('setIssues', issues);
    } catch (error) {
      console.error(error);
    }
  }
}

setStore();

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
