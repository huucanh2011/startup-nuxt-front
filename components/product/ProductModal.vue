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
            <app-input
              v-model="editedItem.name"
              class="w-1/2 ml-2"
              rules="required"
              name="name"
              label="Tên"
              placeholder="Nhập tên"
            />
          </div>
          <div class="flex justify-between">
            <select v-model="editedItem.brandId">
              <option v-for="brand in brands" :key="brand.id" :value="brand.id">
                {{ brand.name }}
              </option>
            </select>
            <select v-model="editedItem.sizeId">
              <option v-for="size in sizes" :key="size.id" :value="size.id">
                {{ size.name }} - {{ size.shirt ? 'Áo' : 'Quần' }}
              </option>
            </select>
          </div>
          <div class="flex justify-between">
            <select v-model="editedItem.categoryId">
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </select>
            <input v-model="editedItem.isActive" type="checkbox" />
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
    isEdit: {
      type: Number,
      default: -1,
    },
  },
  data() {
    return {
      roles: [
        { label: 'Admin', value: 'ADMIN' },
        { label: 'User', value: 'USER' },
      ],
    }
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
      return this.$store.state.brands
    },
    sizes() {
      return this.$store.state.sizes
    },
    categories() {
      return this.$store.state.category.categories
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
      isValid && this.$emit('submit', this.editedItem)
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
