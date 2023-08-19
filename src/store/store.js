import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
const state = {
    isAuthenticated: false,
    user: null
}
const mutations = {
    SET_AUTHENTICATED(state, isAuthenticated) {
        state.isAuthenticated = isAuthenticated;
    },
    SET_USER(state, user) {
        state.user = user;
    },
}
const actions = {
    login({ commit }, user) {
        commit("SET_AUTHENTICATED", true);
        commit("SET_USER", user);
    },
    logout({ commit }) {
        commit("SET_AUTHENTICATED", false);
        commit("SET_USER", null);
    },
}
const getters = {
    isAuthenticated: state => state.isAuthenticated,
    user: state => state.user,
}
export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})