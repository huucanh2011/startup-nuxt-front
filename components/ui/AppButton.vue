<template>
  <button
    class="
      px-4
      border
      rounded
      focus:outline-none
      group
      hover:font-medium
      transition
      duration-300
    "
    :class="[buttonClasses, sizeClasses]"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <div v-if="!loading" class="flex items-center justify-center">
      <component
        :is="icon"
        v-if="icon"
        :class="iconClasses"
        class="h-5 w-5 mr-1"
      />
      <span><slot /></span>
    </div>
    <span v-else>Loading...</span>
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
      default: '',
    },
    loading: {
      type: Boolean,
      default: false,
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
          classes =
            'bg-gray-900 text-gray-100 hover:bg-white hover:text-gray-900 hover:border-gray-900'
          break

        default:
          classes =
            'bg-white border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-gray-100'
          break
      }
      return classes
    },
    iconClasses() {
      let classes
      switch (this.type) {
        case 'primary':
          classes = 'text-gray-100 group-hover:text-gray-900'
          break

        default:
          classes = 'text-gray-900 group-hover:text-gray-100'
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
  },
}
</script>
