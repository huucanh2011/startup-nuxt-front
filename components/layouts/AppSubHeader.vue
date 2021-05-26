<template>
  <header class="h-10 flex items-center justify-between mb-4">
    <div
      class="
        capitalize
        tracking-wide
        font-medium
        text-gray-900
        border-l-2 border-blue-600
        px-2
      "
    >
      {{ routeName }}
    </div>
  </header>
</template>

<script>
export default {
  computed: {
    routeName() {
      return this.$route.name === 'index' ? 'Dashboard' : this.$route.name
    },
  },
}
</script>
