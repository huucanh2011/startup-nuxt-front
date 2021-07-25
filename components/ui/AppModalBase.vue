<template>
  <div
    class="
      absolute
      top-1/2
      left-1/2
      transform
      -translate-y-1/2 -translate-x-1/2
      w-auto
      h-auto
      bg-white
      rounded
      border
      shadow
      p-3
      z-50
      transition
      duration-300
    "
    :style="modalStyles"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 'md',
    },
  },
  computed: {
    modalStyles() {
      let classes
      switch (this.size) {
        case 'sm':
          classes = 'width: 400px'
          break
        case 'md':
          classes = 'width: 500px'
          break
        case 'lg':
          classes = 'width: 600px'
          break
        case 'xl':
          classes = 'width: 700px'
          break
        default:
          classes = 'width: 500px'
          break
      }
      return classes
    },
  },
}
</script>
