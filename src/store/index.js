import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        repo: null,
        profile: null,
        loading: null,
        error: null,
    },

    mutations: {
        updateProfile (state, payload) {
            state.profile = payload
        },
        updateRepo (state, payload) {
            state.repo = payload
        },
        updateLoading (state, payload) {
            state.loading = payload
        },
        updateError (state, payload) {
            state.error = payload
        }
    },

    actions: {
        updateProfileAction ({commit}, payload) {
            commit('updateProfile', payload)
        },
        updateRepoAction ({commit}, payload) {
            commit('updateRepo', payload)
        },
        updateLoadingAction ({commit}, payload) {
            commit('updateLoading', payload)
        },
        updateErrorAction ({commit}, payload) {
            commit('updateError', payload)
        }
    },

    getters: {
        profile (state) {
            return state.profile
        },
        repo (state) {
            return state.repo
        },
        loading (state) {
            return state.loading
        },
        error (state) {
            return state.error
        }
    }
})