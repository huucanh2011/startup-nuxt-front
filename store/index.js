import { SET_FILTER } from './mutation-types'

export const state = () => ({
  filter: '',
})

export const mutations = {
  [SET_FILTER](state, payload) {
    state.filter = payload || ''
  },
}
