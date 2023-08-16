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

Vue.use(VueRouter);
const routes = [
  { path: '/', name: 'LoginPage', component: LoginPage },
  { path: '/register', name: 'RegisterPage', component: RegisterPage },
  { path: '/admin', name: 'AdminPage', component: AdminPage },
  { path: '/home', name: 'HomePage', component: HomePage },
  { path: '/issueBook', name: 'IssueBook', component: IssueBook },
  {
    path: '/add', name: 'AddBook', meta: {
      requiresAuth: true
    }
    , component: AddBook
  },
  { path: '/custDetails', name: 'CustomerDetails', component: CustomerDetails },
  //metadata (read abt it)
];

// const router = new VueRouter({
//   routes
// })

let router = new VueRouter({ mode: 'history', routes });

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
