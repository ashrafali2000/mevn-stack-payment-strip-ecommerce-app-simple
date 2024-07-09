import axios from 'axios'
const url = 'http://localhost:3000/api/stripe/'

const state = {
    chargeState: ''
};

const actions = {
    async charge({commit, dispatch}, dt) {
        try {
            const response = await axios.post(url + '/charge', dt, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });
            console.log(response)
            if(response.status === 200){
                if (response.data.charge === false) {
                    console.log(response.data.error.decline_code)
                    alert(response.data.error.code)
                } else {
                    alert("Transaction succeeded")
                    dispatch('emptyCart', null, {root: true})
                    this.lockSubmit = false
                    commit('charge_success')
                }
            } else {
                commit('charge_fail')
                throw new Error("transaction failed")
            }
        } catch (err) {
            alert("error: "+err.message)
            this.lockSubmit=false
        }
    },
};

const mutations = {
    charge_success: (state) => {
        state.chargeState = 'Successful payment'
    },
    charge_fail: (state) => {
        state.chargeState = 'Payment failed'
    },
}
export default {
    actions,
    mutations,
    state
}