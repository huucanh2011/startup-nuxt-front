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

    <app-modal
      :show="dialog"
      :title="formTitle"
      @submit="onSubmit"
      @close="close"
    >
      <app-input
        v-model="editedItem.name"
        label="Tên thể loại"
        placeholder="Nhập tên thể loại"
      />
    </app-modal>
  </app-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CategoryList from '~/components/category/CategoryList.vue'
import AppModal from '~/components/ui/AppModal.vue'
export default {
  components: { AppModal, CategoryList },
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
    async onSubmit() {
      try {
        if (this.editedIndex === -1) {
          await this.createCategory(this.editedItem)
        } else {
          await this.updateCategory(this.editedItem)
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
