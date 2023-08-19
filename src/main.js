import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import LoginPage from './views/LoginPage';
import RegisterPage from './views/RegisterPage';
import AdminPage from './views/AdminPage';
import HomePage from './views/HomePage';
import IssueBook from './views/IssueBook';
import AddBook from './views/AddBook';
import CustomerDetails from './views/CustomerDetails';
import store from './store/store'

Vue.use(VueRouter);
const routes = [
  {
    path: '/login', name: 'LoginPage', meta: {
      requiresAuth: true
    }, component: LoginPage
  },
  {
    path: '/register', name: 'RegisterPage', meta: {
      requiresAuth: true
    }, component: RegisterPage
  },
  {
    path: '/', name: 'AdminPage', meta: {
      requiresAuth: true
    }, component: AdminPage
  },
  {
    path: '/home', name: 'HomePage', meta: {
      requiresAuth: true
    }, component: HomePage
  },
  {
    path: '/issueBook', name: 'IssueBook', meta: {
      requiresAuth: true
    }, component: IssueBook
  },
  {
    path: '/add', name: 'AddBook', meta: {
      requiresAuth: true
    }, component: AddBook
  },
  { path: '/custDetails', name: 'CustomerDetails', component: CustomerDetails },
  //metadata (read abt it)
];
// const router = new VueRouter({
//   routes
// })
let router = new VueRouter({ mode: 'history', routes });

Vue.config.productionTip = false

async function setStore() {
  // userData = localStorage.getItem('user');
  // if (userData) {
  //   store.commit('setUser', JSON.parse(userData));
  // }
  let user = JSON.parse(localStorage.getItem("user-info"));
  if (user) {
    try {
      await store.dispatch('login', user);
      // this.$store.commit('setUser', JSON.parse(user));
    } catch (error) {
      console.error(error);
      // Show error message
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
