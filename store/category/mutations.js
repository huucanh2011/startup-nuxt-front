import {
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  SET_CATEGORIES,
  SET_LOADING,
  SET_META,
  UPDATE_CATEGORY,
} from '../mutation-types'

export default {
  [SET_CATEGORIES](state, payload) {
    state.categories = payload
  },
  [SET_LOADING](state, payload) {
    state.loading = payload
  },
  [SET_META](state, payload) {
    state.meta = payload
  },
  [CREATE_CATEGORY](state, payload) {
    const length = state.categories.length
    state.categories.unshift(payload)
    if (state.meta.limit === length) {
      state.categories.pop()
    }
  },
  [UPDATE_CATEGORY](state, payload) {
    const index = state.categories.find((c) => c.id === payload.id)
    state.categories.splice(index, 1, payload)
  },
  [DELETE_CATEGORY](state, id) {
    const index = state.categories.find((c) => c.id === id)
    state.categories.splice(index, 1)
  },
}
