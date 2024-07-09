import axios from 'axios'
const url = 'http://localhost:3000/api/users/';

const state = {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {}
};

const getters = {
    isLoggedIn: state => !!state.token,
    getUser: state => state.user,
    getUserName: state => state.user.name
};

const actions = {
    async login({commit}, user) {
        try {
            const response = await axios.post(url + 'login/', {
                email: user.email,
                password: user.password,
            });
            const token = response.data.token;
            const loggedUser = response.data.user;
            localStorage.setItem('user', JSON.stringify(loggedUser));
            localStorage.setItem('token', token);
            commit('auth_success_token', token,);
            commit('auth_success_user', loggedUser);
            return  response;
        } catch (error) {
            console.log(error)
            commit('auth_error');
            localStorage.removeItem('token');
        }
    },

    async register({commit}, user) {
       try {
            commit('auth_request');
            const response = await axios.post(url + 'register/', {
                name: user.name,
                email: user.email,
                password: user.password,
            });
            const token = response.data.token;
            const newUser = response.data.user;
            localStorage.setItem('user', JSON.stringify(newUser));
            localStorage.setItem('token', token);
            commit('auth_success_token', token);
            commit('auth_success_user', newUser);
            return  response;
        } catch (error) {
            commit('auth_error');
            localStorage.removeItem('token');
        }
    },

    /*async getUser({dispatch}) {
        try {
         await axios.get(url + 'me/', {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
        } catch (err) {
            dispatch('logout')
        }
},*/

    async logout({ commit, rootState }) {
        try {
           await axios.post(url + 'logout/', null,{
               headers: {
                   'Authorization': localStorage.getItem('token')
               }
           })
            commit('logout', rootState);
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('cart');
        } catch (err) {
            commit('auth_error')
        }
    },
};

const mutations = {
    auth_request: (state) => {
        state.status = 'loading';
    },
    auth_success_user: (state, user) => {
        state.user = user;
    },
    auth_success_token: (state, token) => {
        state.status = 'success';
        state.token = token;
    },
    auth_error: (state) => {
        state.status = "error";
    },
    logout:(state, rootState) => {
        state.token = '';
        state.status = '';
        state.user = {};
        rootState.orders.cart = [];
    }
};
export default {
    state,
    getters,
    actions,
    mutations
}