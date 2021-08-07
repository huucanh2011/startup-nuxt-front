<template>
  <app-modal :show="show" :title="title" size="xl" @close="onClose">
    <ValidationObserver ref="form" v-slot="{ handleSubmit, invalid }" slim>
      <form @submit.prevent="handleSubmit(onSave)">
        <div class="my-4">
          <div class="flex justify-between">
            <app-input
              v-model="editedItem.code"
              class="w-1/2 mr-2"
              rules="required"
              name="code"
              label="Mã"
              placeholder="Nhập mã"
            />
            <app-select
              v-model="editedItem.categoryId"
              :options="categories"
              label="Thể loại"
              class="w-1/2 ml-2"
              rules="required"
              name="category"
            />
          </div>
          <div class="flex">
            <app-input
              v-model="editedItem.name"
              class="w-full"
              rules="required"
              name="name"
              label="Tên"
              placeholder="Nhập tên"
            />
          </div>
          <div class="flex justify-between">
            <app-select
              v-model="editedItem.brandId"
              :options="brands"
              label="Hãng"
              class="w-1/2 mr-2"
              rules="required"
              name="brand"
            />
            <app-select
              v-model="editedItem.sizeId"
              :options="sizes"
              label="Size"
              class="w-1/2 ml-2"
              rules="required"
              name="size"
            />
          </div>
          <div class="flex justify-between">
            <app-input
              v-model="editedItem.image"
              class="w-1/2 mr-2"
              name="image"
              label="Ảnh"
              placeholder="Nhập ảnh"
            />
            <app-input
              v-model="editedItem.gallery"
              class="w-1/2 ml-2"
              name="gallery"
              label="Gallery"
              placeholder="Nhập gallery"
            />
          </div>
          <div class="flex justify-between">
            <app-input
              v-model="editedItem.price"
              class="w-1/2 mr-2"
              name="price"
              label="Số tiền"
              placeholder="Nhập số tiền"
            />
            <app-input
              v-model="editedItem.stocks"
              class="w-1/2 ml-2"
              name="stocks"
              label="Còn lại trong kho"
              placeholder="Nhập còn lại trong kho"
            />
          </div>
          <app-input
            v-model="editedItem.feature"
            control-type="textarea"
            name="feature"
            label="Tính năng nổi bật"
            placeholder="Nhập tính năng nổi bật"
          />
          <app-input
            v-model="editedItem.description"
            control-type="textarea"
            name="description"
            label="Mô tả sản phẩm"
            placeholder="Nhập mô tả"
          />
        </div>
        <div class="flex items-center justify-end">
          <app-button class="mr-3" size="sm" type="button" @click="onClose">
            Đóng
          </app-button>
          <app-button
            color="primary"
            size="sm"
            type="submit"
            :disabled="invalid"
          >
            Lưu
          </app-button>
        </div>
      </form>
    </ValidationObserver>
  </app-modal>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import AppModal from '~/components/ui/AppModal.vue'
export default {
  components: { ValidationObserver, AppModal },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    product: {
      type: Object,
      required: false,
      default: () => {
        return {}
      },
    },
  },
  computed: {
    editedItem() {
      return this.product
        ? { ...this.product }
        : {
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
          }
    },
    brands() {
      const brands = this.$store.state.brands
      return brands.map((b) => ({ value: b.id, title: b.name }))
    },
    sizes() {
      const sizes = this.$store.state.sizes
      return sizes.map((s) => ({
        value: s.id,
        title: `${s.name} - ${s.shirt ? 'Áo' : 'Quần'}`,
      }))
    },
    categories() {
      const categories = this.$store.state.category.categories
      return categories.map((c) => ({ value: c.id, title: c.name }))
    },
  },
  created() {
    this.$nuxt.$on('reset-form', () => this.resetForm())
  },
  beforeDestroy() {
    this.$nuxt.$off('reset-form')
  },
  methods: {
    async onSave() {
      const isValid = await this.$refs.form.validate()
      if (isValid) {
        const gallery = this.editedItem.gallery
          .replace(' ', '')
          .replace(/.$/, '')
        this.$emit('submit', { ...this.editedItem, gallery })
      }
    },
    resetForm() {
      this.$refs.form && this.$refs.form.reset()
    },
    onClose() {
      this.$emit('close')
    },
  },
}
</script>
