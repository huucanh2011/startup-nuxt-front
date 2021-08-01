<template>
  <div class="bg-white rounded-sm p-4">
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center">
        <app-input-search class="mr-2" @onSearch="onSearch" />
        <app-icon-button
          icon="outline-refresh-icon"
          class="ml-2"
          :disabled="disabledRefresh"
          @click="onRefresh"
        />
      </div>
      <app-button
        color="primary"
        icon="outline-plus-circle-icon"
        @click="onClick"
      >
        Thêm
      </app-button>
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  computed: {
    disabledRefresh() {
      return Object.keys(this.$route.query).length === 0
    },
  },
  methods: {
    onSearch(val) {
      this.$emit('onSearch', val)
    },
    onRefresh() {
      this.$router.push(this.$route.path)
    },
    onClick() {
      this.$emit('openModal')
    },
  },
}
</script>
