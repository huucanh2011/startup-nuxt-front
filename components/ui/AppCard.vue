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
import AppButton from './AppButton.vue'
import AppInputSearch from './AppInputSearch.vue'
export default {
  components: { AppInputSearch, AppButton },
  methods: {
    onSearch(val) {
      this.$emit('onSearch', val)
    },
    onClick() {},
  },
}
</script>
