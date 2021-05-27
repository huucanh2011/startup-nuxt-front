<template>
  <div class="bg-white rounded-sm p-4">
    <div class="flex items-center justify-between mb-4">
      <app-input-search @onSearch="onSearch" />
      <app-button
        type="primary"
        icon="outline-plus-circle-icon"
        @onClick="onClick"
      >
        Thêm
      </app-button>
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  methods: {
    onSearch(val) {
      this.$emit('onSearch', val)
    },
    onClick() {},
  },
}
</script>
