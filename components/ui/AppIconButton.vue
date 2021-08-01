<template>
  <button
    class="
      px-2
      border
      rounded
      focus:outline-none
      group
      hover:font-medium
      transition
      duration-300
    "
    :class="[buttonClasses, sizeClasses, disabledClasses]"
    :disabled="disabled"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <component :is="icon" :class="iconClasses" class="h-5 w-5" />
  </button>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    buttonClasses() {
      let classes
      switch (this.color) {
        case 'primary':
          classes = 'bg-gray-900 border-gray-900 text-gray-100'
          break

        default:
          classes =
            'bg-white border-gray-500 text-gray-500 hover:border-gray-900 hover:text-gray-900'
          break
      }
      return classes
    },
    iconClasses() {
      let classes
      switch (this.color) {
        case 'primary':
          classes = 'text-gray-100'
          break

        default:
          classes = 'text-gray-500'
          break
      }
      return classes
    },
    sizeClasses() {
      let classes
      switch (this.size) {
        case 'sm':
          classes = 'h-8'
          break
        case 'lg':
          classes = 'h-12'
          break

        default:
          classes = 'h-9'
          break
      }
      return classes
    },
    disabledClasses() {
      return this.disabled
        ? 'cursor-not-allowed opacity-50'
        : 'hover:opacity-80'
    },
  },
}
</script>
