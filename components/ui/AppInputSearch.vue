<template>
  <div class="relative">
    <input
      v-model="searchText"
      class="
        w-64
        py-1
        bg-t
        border-b border-gray-400
        focus:outline-none
        focus:border-blue-600
        transition
        duration-300
      "
      placeholder="Tìm kiếm..."
      @keydown.enter="onSearch"
      @keydown.esc="clear"
    />
    <span
      class="absolute right-0 top-1/2 transform -translate-y-1/2"
      @click="onSearch"
    >
      <outline-search-icon
        class="h-5 w-5 text-gray-400 cursor-pointer hover:text-blue-600"
      />
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchText: this.$store.state.route.query.q,
    }
  },
  methods: {
    onSearch() {
      this.$emit('onSearch', this.searchText)
    },
    clear() {
      this.searchText = ''
    },
  },
}
</script>
