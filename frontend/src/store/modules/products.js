import axios from 'axios'
const url = 'http://localhost:3000/api/products/';

const actions = {
    async fetchProducts({commit}) {
        const response = await axios.get(url);
        commit('setProducts', response.data, {root: true});
    },
};

export default { actions }
