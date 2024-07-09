import axios from 'axios'

const cartUrl = 'http://localhost:3000/api/cart/';
const orderUrl = 'http://localhost:3000/api/order/';

const state = {
    products: [],
    cart: [],
    order: {},
    token: localStorage.getItem('token') || '',
    checkout: null
};

const getters = {
    allProducts: state => {
        return state.products;
    },

    getNumberOfProducts: state => {
        (state.cart) ? state.cart.length : 0
    },

    cartProducts: state => {
        return state.cart.map(({id, quantity}) => {
            const product = state.products.find(product => product._id === id)
            return {
                id: product._id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            }
        })
    },

    registeredOrder: state => state.order,
};

const actions = {
    async addToCart({commit, state}, product) {
        try {
            commit('addToCart', {id: product._id});
            const response = await axios.post(cartUrl, {
                id: product._id,
                price: product.price,
                quantity: state.cart.find(cartProduct => cartProduct.id === product._id).quantity,
            }, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
            commit('saveCart');
            return response;
        } catch (error) {
            console.log(error)
        }
    },

    async removeFromCart({commit}, id) {
        commit('removeFromCart', id);
        await axios.delete(`${cartUrl + 'deleteProduct/'}${id}`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        });
        commit('saveCart');
    },

    async registerOrder({commit}, [order, total]) {
        const response = await axios.post(orderUrl + 'registerOrder/', {
            name: order.name,
            email: order.email,
            phoneNumber: order.phoneNumber,
            street: order.street,
            city: order.city,
            country: order.country,
            zipCode: order.zipCode,
            total: total
        }, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
        commit('registerOrder', order)
        return response;
    },

    async emptyCart({commit}) {
        const response = await axios.delete(cartUrl + 'emptyCart', {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
        commit('emptyCart')
    },

    async showUserCart({commit}) {
        const response = await axios.get(cartUrl + 'getCart/', {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        });
        const loggedUserProducts = response.data.products
        if (loggedUserProducts) {
            commit('showUserCart', loggedUserProducts)
        }
        commit('saveCart');
    },
};

const mutations = {
    setProducts: (state, products) => (state.products = products),
    addToCart: (state, {id}) => {
        const product = state.cart.find(product => product.id === id)
        !product ? state.cart.push({id, quantity: 1}) : product.quantity++
    },
    registerOrder: (state, order) => state.order = order,
    showUserCart: (state, loggedUserProducts) => (state.cart = loggedUserProducts),
    removeFromCart: (state, id) => {
        let index = state.cart.findIndex(product => product.id === id);
        const product = state.cart.find(product => product.id === id)
        product.quantity > 1 ? product.quantity-- : state.cart.splice(index, 1)
    },
    saveCart: (state) => {
        localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    emptyCart: state => state.cart = []
};

export default {
    state,
    getters,
    actions,
    mutations
}