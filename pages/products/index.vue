<template>
  <app-card @onSearch="onSearch" @openModal="dialog = true">
    <product-list
      :products="products"
      :loading="loading"
      @edit="editedItem"
      @delete="deleteItem"
    />
    <app-pagination
      :meta="meta"
      @onChangePage="onChangePage"
      @onChangeLimit="onChangeLimit"
    />
    <app-confirm :show="dialogDelete" @close="closeDelete" @ok="confirmOk" />
    <product-modal
      :show="dialog"
      :title="formTitle"
      :product="editedItem"
      :is-edit="editedIndex"
      @submit="onSubmit"
      @close="close"
    />
  </app-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ProductList from '~/components/product/ProductList.vue'
import ProductModal from '~/components/product/ProductModal.vue'
import { message } from '~/helpers/constants'
export default {
  components: { ProductList, ProductModal },
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {
        brandId: '',
        categoryId: '',
        code: '',
        description: '',
        feature: '',
        gallery: '',
        image: '',
        isActive: true,
        name: '',
        price: 0,
        sizeId: '',
        stocks: 0,
      },
      defaultItem: {
        brandId: '',
        categoryId: '',
        code: '',
        description: '',
        feature: '',
        gallery: '',
        image: '',
        isActive: true,
        name: '',
        price: 0,
        sizeId: '',
        stocks: 0,
      },
    }
  },
  head() {
    return {
      title: 'Thể loại',
    }
  },
  computed: {
    ...mapState('product', ['products', 'meta']),
    loading() {
      return this.$store.state.loading
    },
    formTitle() {
      return this.editedIndex === -1 ? 'Thêm mới' : 'Cập nhật'
    },
  },
  created() {
    this.FETCH_PRODUCTS()
  },
  methods: {
    ...mapActions('product', [
      'FETCH_PRODUCTS',
      'CREATE_PRODUCT',
      'UPDATE_PRODUCT',
      'DELETE_PRODUCT',
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
    deleteItem(product) {
      this.editedIndex = this.products.indexOf(product)
      this.editedItem = product
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
      this.DELETE_PRODUCT(this.editedItem.id)
      this.$toast.success(message.deleted)
      this.closeDelete()
    },
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
      this.$nuxt.$emit('reset-form')
    },
    editItem(product) {
      this.editedIndex = this.products.indexOf(product)
      this.editedItem = product
      this.dialog = true
    },
    async onSubmit(product) {
      try {
        if (this.editedIndex === -1) {
          await this.CREATE_PRODUCT(product)
          this.$toast.success(message.created)
        } else {
          await this.UPDATE_PRODUCT(product)
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
