import Vuex from 'vuex'
import Vue from 'vue';
import axios from 'axios';

Vue.use(Vuex);
const state = {
    isAuthenticated: false,
    user: null,
    registeredUsers: null,
    issues: null,
    books: null,
}
const mutations = {
    setAuthenticated(state, isAuthenticated) {
        state.isAuthenticated = isAuthenticated;
    },
    setUser(state, user) {
        state.user = user;
    },
    setUsers(state, users) {
        state.users = users;
    },
    setIssues(state, issues) {
        state.issues = issues;
    },
    setBooks(state, books) {
        state.books = books;
    },
}
const actions = {
    login({ commit }, user) {
        commit("setAuthenticated", true);
        commit("setUser", user);
    },
    logout({ commit }) {
        commit("setAuthenticated", false);
        commit("setUser", null);
    },
    async setIssues({ commit }) {
        try {
            const res = await axios.get("http://localhost:3000/issues");
            return commit("setIssues", res.data);
        }
        catch (err) {
            console.log(err)
        }
    },
    async setBooks({ commit }) {
        const res = await axios.get("http://localhost:3000/books")
        commit("setBooks", res.data);
    },
    async addNewBook({ commit }, bookPayload) {
        await axios.post("http://localhost:3000/books", bookPayload);
        commit("setBooks", bookPayload);
    },
    async deleteBook(context, bookId) {
        try {
            await axios.delete("http://localhost:3000/books/" + bookId);
        } catch (error) {
            console.log(error);
        }
    },
    async registerUser(context, registeredUserPayload) {
        try {
            await axios.post("http://localhost:3000/users", registeredUserPayload);
        } catch (error) {
            console.log(error);
        }
    },
    async getUser(context, userCredentials) {
        try {
            const res = await axios.get(`http://localhost:3000/users?email=${userCredentials.email}&password=${userCredentials.password}`);
            if (res.status === 200 && res.data.length) {
                localStorage.setItem("user-info", JSON.stringify(res.data[0]));
            }
        } catch (error) {
            console.log(error);
        }
    },
    async addToIssues(context, issuePayload) {
        try {
            await axios.post("http://localhost:3000/issues", issuePayload);
        } catch (error) {
            console.log(error);
        }
    },
    async updateBookAvailability(context, bookPayload) {
        try {
            await axios.put(`http://localhost:3000/books/${bookPayload.id}`, bookPayload);
        } catch (error) {
            console.log(error);
        }
    },
}
const getters = {
    isAuthenticated: state => state.isAuthenticated,
    user: state => state.user,
    issues: state => state.issues,
    books: state => state.books,
};
export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
});