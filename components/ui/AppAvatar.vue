<template>
  <div>
    <img
      v-if="src"
      class="h-10 w-10 rounded-full"
      :src="src"
      :alt="alt"
      v-bind="$attrs"
    />
    <div v-else class="h-10 w-10 rounded-full bg-gray-300"></div>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: false,
      default: 'https://randomuser.me/api/portraits/men/81.jpg',
    },
    alt: {
      type: String,
      default: 'avatar',
    },
  },
}
</script>
