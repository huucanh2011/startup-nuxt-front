<template>
  <div class="flex items-center flex-grow bg-white rounded-sm p-4">
    <div class="w-full flex flex-col items-center justify-center">
      <div class="text-4xl font-semibold mb-5">
        {{ data.value | thousands }}
      </div>
      <div class="font-light">{{ data.title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
}
</script>
