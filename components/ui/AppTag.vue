<template>
  <div class="w-max mx-1 border px-1 rounded" :class="tagClasses">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'default',
    },
  },
  computed: {
    tagClasses() {
      let classes
      switch (this.type) {
        case 'default':
          classes = 'bg-gray-100'
          break
        case 'red':
          classes = 'bg-tag-red text-white'
          break
        case 'blue-1':
          classes = 'bg-tag-blue-1 text-white'
          break
        case 'green':
          classes = 'bg-tag-green text-white'
          break
        case 'blue-2':
          classes = 'bg-tag-blue-2 text-white'
          break

        default:
          classes = 'bg-gray-100'
          break
      }
      return classes
    },
  },
}
</script>
