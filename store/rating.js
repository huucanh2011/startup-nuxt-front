import qs from 'query-string'
import { FETCH_RATINGS, SET_LOADING, UPDATE_RATING } from './mutations-types'

export const state = () => {
  return {
    ratings: [],
    meta: {},
  }
}

export const mutations = {
  [FETCH_RATINGS](state, { data, meta }) {
    state.ratings = data
    state.meta = meta
  },
  [UPDATE_RATING](state, payload) {
    const index = state.ratings.findIndex((r) => r.id === payload.id)
    state.ratings.splice(index, 1, payload)
  },
}

export const actions = {
  async FETCH_RATINGS({ commit, rootState }) {
    commit(SET_LOADING, true, { root: true })
    const query = rootState.route.query
    const queryString = query ? `?${qs.stringify(query)}` : ''
    const res = await this.$axios.get(`/ratings${queryString}`)
    if (res.data && res.status === 200) {
      commit(FETCH_RATINGS, res.data)
    }
    commit(SET_LOADING, false, { root: true })
    return res
  },
  async UPDATE_STATUS_RATING({ commit }, payload) {
    const { id, isActive } = payload
    const res = await this.$axios.patch(`/ratings/${id}`, { isActive })
    if (res.data && res.status === 200) {
      commit(UPDATE_RATING, res.data)
    }
    return res
  },
  async DELETE_RATING({ dispatch }, ratingId) {
    const res = await this.$axios.delete(`/ratings/${ratingId}`)
    if (res.status === 204) {
      dispatch(FETCH_RATINGS)
    }
    return res
  },
}
