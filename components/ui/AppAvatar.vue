<template>
  <div>
    <img
      v-if="srcImg"
      class="h-10 w-10 rounded-full"
      :src="srcImg"
      :alt="alt"
      v-bind="$attrs"
    />
    <div v-else class="h-10 w-10 rounded-full bg-gray-300"></div>
  </div>
</template>

<script>
export default {
  props: {
    srcImg: {
      type: String,
      default: '',
    },
    alt: {
      type: String,
      default: 'avatar',
    },
  },
}
</script>
