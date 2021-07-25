<template>
  <div v-show="show">
    <app-backdrop />
    <app-modal-base :size="size">
      <div class="flex items-center justify-between mb-3">
        <div class="font-semibold">{{ title }}</div>
        <button @click="onCancel">
          <outline-x-icon class="w-6 h-6" />
        </button>
      </div>
      <slot />
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
    size: {
      type: String,
      default: 'md',
    },
  },
  watch: {
    show() {
      document.body.style.overflow = this.show ? 'hidden' : ''
    },
  },
  methods: {
    onCancel() {
      this.$emit('close')
    },
  },
}
</script>
