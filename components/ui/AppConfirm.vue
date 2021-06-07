<template>
  <div v-show="show">
    <app-backdrop />
    <app-modal-base size="sm">
      <div class="text-lg mb-4">Bạn có chắn muốn thực hiện?</div>
      <div class="flex items-center justify-end">
        <app-button class="mr-3" size="sm" @click="$emit('close')"
          >Đóng</app-button
        >
        <app-button color="primary" size="sm" @click="$emit('ok')"
          >OK</app-button
        >
      </div>
    </app-modal-base>
  </div>
</template>

<script>
import AppModalBase from './AppModalBase.vue'
export default {
  components: { AppModalBase },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    show() {
      document.body.style.overflow = this.show ? 'hidden' : ''
    },
  },
}
</script>
