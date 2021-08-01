import {
  FETCH_BRANDS,
  FETCH_ORDER_STATUSES,
  FETCH_SIZES,
  SET_LOADING,
} from './mutations-types'

export const state = () => {
  return {
    loading: false,
    brands: [],
    sizes: [],
    orderStatuses: [],
  }
}

export const mutations = {
  [SET_LOADING](state, payload) {
    state.loading = payload
  },
  [FETCH_BRANDS](state, payload) {
    state.brands = payload
  },
  [FETCH_SIZES](state, payload) {
    state.sizes = payload
  },
  [FETCH_ORDER_STATUSES](state, { listOrderStatus }) {
    state.orderStatuses = listOrderStatus
  },
}

export const actions = {
  nuxtClientInit({ dispatch }) {
    dispatch(FETCH_BRANDS)
    dispatch(FETCH_SIZES)
    dispatch(FETCH_ORDER_STATUSES)
    dispatch('category/FETCH_CATEGORIES')
  },
  async FETCH_BRANDS({ commit }) {
    const { data, status } = await this.$axios.get('/brands')
    if (data && status === 200) {
      commit(FETCH_BRANDS, data)
    }
  },
  async FETCH_SIZES({ commit }) {
    const { data, status } = await this.$axios.get('/sizes')
    if (data && status === 200) {
      commit(FETCH_SIZES, data)
    }
  },
  async FETCH_ORDER_STATUSES({ commit }) {
    const { data, status } = await this.$axios.get('/order-status')
    if (data && status === 200) {
      commit(FETCH_ORDER_STATUSES, data)
    }
  },
}
