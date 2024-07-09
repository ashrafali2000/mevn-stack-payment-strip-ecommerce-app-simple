import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/users'
import orders from './modules/orders'
import products from './modules/products';
import payments from './modules/payments';
import createPersistedState from 'vuex-persistedstate'
//import Cookies from 'js-cookie'

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        users,
        orders,
        products,
        payments
    },
    plugins: [createPersistedState({
        paths: ['users', "products", "orders", "payments"],
        /*storage: {
            getItem: key => Cookies.get(key),
            setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: true }),
            removeItem: key => Cookies.remove(key)
        }*/
    })],
});