import qs from 'query-string'
import { FETCH_PRODUCTS, SET_LOADING, UPDATE_PRODUCT } from './mutations-types'

export const state = () => {
  return {
    products: [],
    meta: {},
  }
}

export const mutations = {
  [FETCH_PRODUCTS](state, { data, meta }) {
    state.products = data
    state.meta = meta
  },
  [UPDATE_PRODUCT](state, payload) {
    const index = state.products.findIndex((p) => p.id === payload.id)
    state.products.splice(index, 1, payload)
  },
}

export const actions = {
  async FETCH_PRODUCTS({ commit, rootState }) {
    commit(SET_LOADING, true, { root: true })
    const query = rootState.route.query
    const queryString = query ? `?${qs.stringify(query)}` : ''
    const res = await this.$axios.get(`/products${queryString}`)
    if (res.data && res.status === 200) {
      commit(FETCH_PRODUCTS, res.data)
    }
    commit(SET_LOADING, false, { root: true })
    return res
  },
  async CREATE_PRODUCT({ dispatch }, payload) {
    const res = await this.$axios.post('/products', payload)
    if (res.data && res.status === 201) {
      dispatch(FETCH_PRODUCTS)
    }
    return res
  },
  async UPDATE_PRODUCT({ commit }, payload) {
    const productId = payload.id
    delete payload.id
    delete payload.entryDate
    delete payload.updateDate
    const res = await this.$axios.put(`/products/${productId}`, payload)
    if (res.data && res.status === 200) {
      commit(UPDATE_PRODUCT, res.data)
    }
    return res
  },
  async DELETE_PRODUCT({ dispatch }, id) {
    const res = await this.$axios.delete(`/products/${id}`)
    if (res.status === 204) {
      dispatch(FETCH_PRODUCTS)
    }
    return res
  },
}
