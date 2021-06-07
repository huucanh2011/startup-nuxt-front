import {
  SET_LOADING,
  SET_META,
  SET_CATEGORIES,
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
} from '../mutation-types'

export default {
  async fetchCategories({ commit, rootState }) {
    try {
      const query = rootState.route.query
      const q = query.q || ''
      const page = query.page || 1
      const limit = query.limit || 5
      let url = `/categories?page=${page}&limit=${limit}`
      q && (url += `&q=${q}`)
      commit(SET_LOADING, true)
      const { data, status } = await this.$axios.get(url)
      if (data && status === 200) {
        commit(SET_CATEGORIES, data.data)
        commit(SET_META, data.meta)
      }
    } catch (error) {
      console.log(error)
    } finally {
      commit(SET_LOADING, false)
    }
  },
  async createCategory({ commit }, payload) {
    try {
      const { data, status } = await this.$axios.post('/categories', payload)
      if (data && status === 201) {
        commit(CREATE_CATEGORY, data)
      }
    } catch (error) {
      console.log(error)
    }
  },
  async updateCategory({ commit }, payload) {
    try {
      const { data, status } = await this.$axios.put('/categories', payload)
      if (data && status === 200) {
        commit(UPDATE_CATEGORY, data)
      }
    } catch (error) {
      console.log(error)
    }
  },
  async deleteCategory({ commit }, id) {
    try {
      const { status } = await this.$axios.delete(`/categories/${id}`)
      if (status === 204) {
        commit(DELETE_CATEGORY, id)
      }
    } catch (error) {
      console.log(error)
    }
  },
}
