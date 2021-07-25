import qs from 'query-string'

export const state = () => {
  return {
    products: [],
    meta: {},
  }
}

export const mutations = {
  FETCH_PRODUCTS(state, { data, meta }) {
    state.products = data
    state.meta = meta
  },
  UPDATE_PRODUCT(state, payload) {
    const index = state.products.findIndex((p) => p.id === payload.id)
    state.products.splice(index, 1, payload)
  },
}

export const actions = {
  async FETCH_PRODUCTS({ commit, rootState }) {
    const query = rootState.route.query
    const queryString = query ? `?${qs.stringify(query)}` : ''
    commit('SET_LOADING', true, { root: true })
    const res = await this.$axios.get(`/products${queryString}`)
    if (res.data && res.status === 200) {
      commit('FETCH_PRODUCTS', res.data)
    }
    commit('SET_LOADING', false, { root: true })
  },
}
