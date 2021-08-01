import qs from 'query-string'
import { FETCH_USERS, SET_LOADING, UPDATE_USER } from './mutations-types'

export const state = () => {
  return {
    users: [],
    meta: {},
  }
}

export const mutations = {
  [FETCH_USERS](state, { data, meta }) {
    state.users = data
    state.meta = meta
  },
  [UPDATE_USER](state, payload) {
    const index = state.users.findIndex((u) => u.id === payload.id)
    state.users.splice(index, 1, payload)
  },
}

export const actions = {
  async FETCH_USERS({ commit, rootState }) {
    const query = rootState.route.query
      ? `?${qs.stringify(rootState.route.query)}`
      : ''
    commit(SET_LOADING, true, { root: true })
    const res = await this.$axios.get(`/users${query}`)
    if (res.data && res.status === 200) {
      commit(FETCH_USERS, res.data)
    }
    commit(SET_LOADING, false, { root: true })
    return res
  },
  async CREATE_USER({ dispatch }, payload) {
    const res = await this.$axios.post('/users', payload)
    if (res.data && res.status === 201) {
      dispatch('FETCH_USERS')
    }
    return res
  },
  async UPDATE_USER({ commit }, payload) {
    const userId = payload.id
    delete payload.id
    delete payload.entryDate
    delete payload.updateDate
    const res = await this.$axios.put(`/users/${userId}`, payload)
    if (res.data && res.status === 200) {
      commit(UPDATE_USER, res.data)
    }
  },
  async DELETE_USER({ dispatch }, id) {
    const res = await this.$axios.delete(`/users/${id}`)
    if (res.status === 204) {
      dispatch('FETCH_USERS')
    }
    return res
  },
}
