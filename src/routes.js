import VueRouter from 'vue-router';
import LoginPage from './views/LoginPage';
import RegisterPage from './views/RegisterPage';
import AdminPage from './views/AdminPage';
import HomePage from './views/HomePage';
import IssueBook from './views/IssueBook';
import AddBook from './views/AddBook';
import CustomerDetails from './views/CustomerDetails';
import AGgrid from './views/AGgrid';

const routes = [
    {
        path: '/login',
        name: 'LoginPage',
        meta: {
            requiresAuth: true
        },
        component: LoginPage
    },
    {
        path: '/register',
        name: 'RegisterPage',
        meta: {
            requiresAuth: true
        },
        component: RegisterPage
    },
    {
        path: '/',
        name: 'AdminPage',
        meta: {
            requiresAuth: true
        },
        component: AdminPage
    },
    {
        path: '/home',
        name: 'HomePage',
        meta: {
            requiresAuth: true
        },
        component: HomePage
    },
    {
        path: '/issueBook',
        name: 'IssueBook',
        meta: {
            requiresAuth: true
        },
        component: IssueBook
    },
    {
        path: '/add',
        name: 'AddBook',
        meta: {
            requiresAuth: true
        },
        component: AddBook
    },
    {
        path: '/aggrid',
        name: 'AGgrid',
        meta: {
            requiresAuth: true
        },
        component: AGgrid
    },
    {
        path: '/custDetails',
        name: 'CustomerDetails',
        meta: {
            requiresAuth: true
        },
        component: CustomerDetails
    },
];

let router = new VueRouter({ mode: 'history', routes });

export default router;