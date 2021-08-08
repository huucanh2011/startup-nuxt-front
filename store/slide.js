import { FETCH_SLIDES, SET_LOADING, UPDATE_SLIDE } from './mutations-types'

export const state = () => {
  return {
    slides: [],
  }
}

export const mutations = {
  [FETCH_SLIDES](state, data) {
    state.slides = data
  },
  [UPDATE_SLIDE](state, payload) {
    const index = state.slides.findIndex((s) => s.id === payload.id)
    state.slides.splice(index, 1, payload)
  },
}

export const actions = {
  async FETCH_SLIDES({ commit }) {
    commit(SET_LOADING, true, { root: true })
    const res = await this.$axios.get('/slides')
    if (res.data && res.status === 200) {
      commit(FETCH_SLIDES, res.data)
    }
    commit(SET_LOADING, false, { root: true })
    return res
  },
  async CREATE_SLIDE({ dispatch }, payload) {
    const res = await this.$axios.post('/slides', payload)
    if (res.data && res.status === 201) {
      dispatch(FETCH_SLIDES)
    }
    return res
  },
  async UPDATE_SLIDE({ commit }, payload) {
    const slideId = payload.id
    delete payload.entryDate
    delete payload.updateDate
    const res = await this.$axios.put(`/slides/${slideId}`, payload)
    if (res.data && res.status === 200) {
      commit(UPDATE_SLIDE, res.data)
    }
    return res
  },
  async UPDATE_STATUS_SLIDE({ commit }, payload) {
    const { id, isActive } = payload
    const res = await this.$axios.patch(`/slides/${id}`, { isActive })
    if (res.data && res.status === 200) {
      commit(UPDATE_SLIDE, res.data)
    }
    return res
  },
  async DELETE_SLIDE({ dispatch }, slideId) {
    const res = await this.$axios.delete(`/slides/${slideId}`)
    if (res.status === 204) {
      dispatch(FETCH_SLIDES)
    }
    return res
  },
}
