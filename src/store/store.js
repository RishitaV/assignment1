import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
const state = {
    user: {}
}
const mutations = {
    setUser: (state, user) => {
        state.user = user;
    }
}
const actions = {
    setUser: async ({ commit }, payload) => {
        try {
            commit('setUser', payload)
            // console.log('user==> ', state.user);
        } catch (error) {
            console.log(error);
        }
    }
}
const getters = {
    getUser: state => state.user
}
export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})