<template>
  <div
    class="
      flex
      items-center
      group
      hover:bg-gray-500
      group
      rounded
      px-1
      py-2
      mb-1
    "
    :class="{ 'bg-gray-500': active }"
  >
    <component :is="icon" class="h-6 w-6 mr-4" />
    <span class="group-hover:text-white">{{ text }}</span>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  // watch: {
  //   $route: 'active',
  // },
  // methods: {
  //   active() {
  //     return this.$route.path === this.to ? true : false
  //   },
  // },
}
</script>
