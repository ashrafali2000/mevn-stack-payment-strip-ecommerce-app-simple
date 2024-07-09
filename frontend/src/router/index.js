import Router from 'vue-router'
import Vue from 'vue'
import {store} from '../store/index'

import MainContainer from "@/components/container/MainContainer";
import Login from '@/components/Login'
import Register from '@/components/Register'
import Cart from '@/components/Cart'
import CheckOut from '@/components/CheckOut'
import ProductPage from '@/components/ProductPage'
import Payment from '@/components/Payment'

Vue.use(Router)

const router = new Router({
    mode: 'hash',
    linkActiveClass: 'active',
    scrollBehavior: (to) => {
        if (to.hash) {
            return {
                selector: to.hash
            }
        }
    },
    routes: [
        {
            path: '/',
            name: 'Home',
            component: MainContainer,
        },
        {
            path: '/product/:id',
            name: 'product',
            component: ProductPage,
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
                //requiresAuth: true
            },
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
            meta: {
                //requiresAuth: true
            },
        },
        {
            path: '/cart',
            name: 'cart',
            component: Cart,
            meta: {
                requiresAuth: true
            },
        },
        {
            path: '/checkout',
            name: 'checkout',
            component: CheckOut,
            meta: {
                requiresAuth: true
            },
        },
        {
            path: '/payment',
            name: 'payment',
            component: Payment,
            meta: {
                requiresAuth: true
            },
        },
    ],
});

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth) &&  to.path !== '/Login') {
        if (store.getters.isLoggedIn) {
            next()
            return
        }
        next('/Login')
    } else {
        next()
    }
})

export default router