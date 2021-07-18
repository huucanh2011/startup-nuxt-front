<template>
  <app-modal :show="show" :title="title" @close="onClose">
    <ValidationObserver ref="form" v-slot="{ handleSubmit, invalid }" slim>
      <form @submit.prevent="handleSubmit(onSave)">
        <div class="my-4">
          <app-input
            v-model="editedItem.name"
            rules="required"
            name="tên thể loại"
            label="Tên thể loại"
            placeholder="Nhập tên thể loại"
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
    category: {
      type: Object,
      required: false,
      default: () => {
        return {}
      },
    },
  },
  computed: {
    editedItem() {
      return this.category ? { ...this.category } : { name: '' }
    },
  },
  methods: {
    async onSave() {
      const isValid = await this.$refs.form.validate()
      isValid && this.$emit('submit', this.editedItem)
    },
    onClose() {
      this.$refs.form.reset()
      this.$emit('close')
    },
  },
}
</script>
