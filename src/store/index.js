import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        repo: null,
        profile: null,
    },

    mutations: {
        updateProfile (state, payload) {
            state.profile = payload
        },
        updateRepo (state, payload) {
            state.repo = payload
        }
    },

    actions: {
        updateProfileAction ({commit}, payload) {
            commit('updateProfile', payload)
        },
        updateRepoAction ({commit}, payload) {
            commit('updateRepo', payload)
        }
    },

    getters: {
        profile (state) {
            return state.profile
        },
        repo (state) {
            return state.repo
        }
    }
})