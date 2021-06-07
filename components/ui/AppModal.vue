<template>
  <div v-show="show">
    <app-backdrop />
    <app-modal-base>
      <div class="flex items-center justify-between mb-3">
        <div class="font-semibold">{{ title }}</div>
        <button @click="onCancel">
          <outline-x-icon class="w-6 h-6" />
        </button>
      </div>
      <form @submit.prevent="onSave">
        <div class="my-4">
          <slot />
        </div>
        <div class="flex items-center justify-end">
          <app-button class="mr-3" size="sm" type="button" @click="onCancel"
            >Đóng</app-button
          >
          <app-button color="primary" size="sm" type="submit">Lưu</app-button>
        </div>
      </form>
    </app-modal-base>
  </div>
</template>

<script>
import AppModalBase from './AppModalBase'
export default {
  components: { AppModalBase },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
  },
  watch: {
    show() {
      document.body.style.overflow = this.show ? 'hidden' : ''
    },
  },
  methods: {
    onSave() {
      this.$emit('submit')
    },
    onCancel() {
      this.$emit('close')
    },
  },
}
</script>
