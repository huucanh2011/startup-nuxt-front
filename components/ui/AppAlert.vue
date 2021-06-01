<template>
  <div
    v-show="messages.length > 0"
    class="flex items-center justify-between w-full p-3 border rounded mb-5"
    :class="alertClasses"
  >
    <span class="whitespace-nowrap overflow-ellipsis">
      {{ messages[0] }}
    </span>
    <button v-show="closeButton" type="button" @click="$emit('closeAlert')">
      <outline-x-icon class="h-5 w-5" />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    messages: {
      type: Array,
      default: () => {
        return []
      },
    },
    type: {
      type: String,
      default: 'error',
    },
    closeButton: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    alertClasses() {
      let classes
      switch (this.type) {
        case 'success':
          classes = 'bg-green-300 border-green-500'
          break
        case 'info':
          classes = 'bg-blue-300 border-blue-500'
          break
        case 'warning':
          classes = 'bg-yellow-300 border-yellow-500'
          break

        default:
          classes = 'bg-red-300 border-red-500'
          break
      }
      return classes
    },
  },
}
</script>
