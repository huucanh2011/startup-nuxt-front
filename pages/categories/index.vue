<template>
  <app-card @onSearch="onSearch" @openModal="dialog = true">
    <category-list
      :categories="categories"
      :loading="loading"
      @edit="editItem"
      @delete="deleteItem"
    />
    <app-pagination
      :meta="meta"
      @onChangePage="onChangePage"
      @onChangeLimit="onChangeLimit"
    />
    <app-confirm :show="dialogDelete" @close="closeDelete" @ok="confirmOk" />
    <category-modal
      :show="dialog"
      :title="formTitle"
      :category="editedItem"
      @submit="onSubmit"
      @close="close"
    />
  </app-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import CategoryList from '~/components/category/CategoryList.vue'
import CategoryModal from '~/components/category/CategoryModal.vue'
import { message } from '~/helpers/constants'
export default {
  components: { CategoryList, CategoryModal },
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {
        name: '',
      },
      defaultItem: {
        name: '',
      },
    }
  },
  head() {
    return {
      title: 'Thể loại',
    }
  },
  computed: {
    ...mapState('category', ['categories', 'meta']),
    loading() {
      return this.$store.state.loading
    },
    formTitle() {
      return this.editedIndex === -1 ? 'Thêm mới' : 'Cập nhật'
    },
  },
  watchQuery: ['q', 'page', 'imit'],
  created() {
    this.FETCH_CATEGORIES()
  },
  methods: {
    ...mapActions('category', [
      'FETCH_CATEGORIES',
      'CREATE_CATEGORY',
      'UPDATE_CATEGORY',
      'DELETE_CATEGORY',
    ]),
    onSearch(q) {
      q && this.$router.push({ query: { q } })
    },
    onChangePage(page) {
      this.$router.push({ query: { ...this.$route.query, page } })
    },
    onChangeLimit(limit) {
      this.$route.query.page = 1
      this.$router.push({ query: { ...this.$route.query, limit } })
    },
    deleteItem(category) {
      this.editedIndex = this.categories.indexOf(category)
      this.editedItem = category
      this.dialogDelete = true
    },
    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    confirmOk() {
      this.DELETE_CATEGORY(this.editedItem.id)
      this.$toast.success(message.deleted)
      this.closeDelete()
    },
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
        this.$nuxt.$emit('reset-form')
      })
    },
    editItem(category) {
      this.editedIndex = this.categories.indexOf(category)
      this.editedItem = category
      this.dialog = true
    },
    async onSubmit(category) {
      try {
        if (this.editedIndex === -1) {
          await this.CREATE_CATEGORY(category)
          this.$toast.success(message.created)
        } else {
          await this.UPDATE_CATEGORY(category)
          this.$toast.success(message.updated)
        }
        this.close()
      } catch (error) {
        this.$toast.error(error.response.data.errors[0])
      }
    },
  },
}
</script>
