<template>
  <app-modal :show="show" :title="title" @close="onClose">
    <ValidationObserver ref="form" v-slot="{ handleSubmit, invalid }" slim>
      <form @submit.prevent="handleSubmit(onSave)">
        <div class="my-4">
          <app-input
            v-model="editedItem.title"
            rules="required"
            name="title"
            label="Tiêu đề"
            placeholder="Nhập tiêu đề"
          />
          <app-input
            v-model="editedItem.image"
            rules="required"
            name="image"
            label="Hình"
            placeholder="Nhập link hình"
          />
          <app-input
            v-model="editedItem.link"
            name="link"
            label="Link"
            placeholder="Nhập link"
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
    slide: {
      type: Object,
      required: false,
      default: () => {
        return {}
      },
    },
  },
  computed: {
    editedItem() {
      return this.slide ? { ...this.slide } : { title: '', image: '', link: '' }
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
      this.resetForm()
      this.$emit('close')
    },
  },
}
</script>
