import qs from 'query-string'

export const state = () => {
  return {
    users: [],
    meta: {},
  }
}

export const mutations = {
  FETCH_USERS(state, { data, meta }) {
    state.users = data
    state.meta = meta
  },
  UPDATE_USER(state, payload) {
    const index = state.users.findIndex((u) => u.id === payload.id)
    state.users.splice(index, 1, payload)
  },
  SET_LOADING(state, payload) {
    state.loading = payload
  },
}

export const actions = {
  async FETCH_USERS({ commit, rootState }) {
    const query = rootState.route.query
      ? `?${qs.stringify(rootState.route.query)}`
      : ''
    commit('SET_LOADING', true, { root: true })
    const res = await this.$axios.get(`/users${query}`)
    if (res.data && res.status === 200) {
      commit('FETCH_USERS', res.data)
    }
    commit('SET_LOADING', false, { root: true })
    return res
  },
}
