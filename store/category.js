import qs from 'query-string'
import {
  FETCH_CATEGORIES,
  SET_LOADING,
  UPDATE_CATEGORY,
} from './mutations-types'

export const state = () => {
  return {
    categories: [],
    meta: {},
  }
}

export const mutations = {
  [FETCH_CATEGORIES](state, { data, meta }) {
    state.categories = data
    state.meta = meta
  },
  [UPDATE_CATEGORY](state, payload) {
    const index = state.categories.findIndex((c) => c.id === payload.id)
    state.categories.splice(index, 1, payload)
  },
}

export const actions = {
  async FETCH_CATEGORIES({ commit, rootState }, isGetAll) {
    let queryString
    commit(SET_LOADING, true, { root: true })
    if (!isGetAll) {
      const query = rootState.route.query
      queryString = query ? `?${qs.stringify(query)}` : ''
    } else {
      queryString = '?limit=100'
    }
    const res = await this.$axios.get(`/categories${queryString}`)
    if (res.data && res.status === 200) {
      commit(FETCH_CATEGORIES, res.data)
    }
    commit(SET_LOADING, false, { root: true })
    return res
  },
  async CREATE_CATEGORY({ dispatch }, payload) {
    const res = await this.$axios.post('/categories', payload)
    if (res.data && res.status === 201) {
      dispatch(FETCH_CATEGORIES)
    }
    return res
  },
  async UPDATE_CATEGORY({ commit }, payload) {
    const { id, name } = payload
    const res = await this.$axios.put(`/categories/${id}`, { name })
    if (res.data && res.status === 200) {
      commit(UPDATE_CATEGORY, res.data)
    }
    return res
  },
  async DELETE_CATEGORY({ dispatch }, id) {
    const res = await this.$axios.delete(`/categories/${id}`)
    if (res.status === 204) {
      dispatch(FETCH_CATEGORIES)
    }
    return res
  },
}
