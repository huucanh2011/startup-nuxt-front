import { SET_LOADING } from './mutations-types'

export const state = () => {
  return {
    loading: false,
  }
}

export const mutations = {
  [SET_LOADING](state, payload) {
    state.loading = payload
  },
}

export const actions = {}
