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
import { mapGetters, mapActions } from 'vuex'
import CategoryList from '~/components/category/CategoryList.vue'
import CategoryModal from '~/components/category/CategoryModal.vue'
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
    ...mapGetters({
      categories: 'category/categories',
      loading: 'category/loading',
      meta: 'category/meta',
    }),
    formTitle() {
      return this.editedIndex === -1 ? 'Thêm mới' : 'Cập nhật'
    },
  },
  watchQuery: ['q', 'page', 'limit'],
  mounted() {
    this.fetchCategories()
  },
  methods: {
    ...mapActions({
      fetchCategories: 'category/fetchCategories',
      createCategory: 'category/createCategory',
      updateCategory: 'category/updateCategory',
      deleteCategory: 'category/deleteCategory',
    }),
    onSearch(q) {
      q && this.$router.push({ query: { q } })
    },
    onChangePage(page) {
      this.$router.push({ query: { ...this.$route.query, page } })
    },
    onChangeLimit(limit) {
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
      this.deleteCategory(this.editedItem.id)
      this.closeDelete()
    },
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
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
          await this.createCategory(category)
        } else {
          await this.updateCategory(category)
        }
        this.close()
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style></style>
