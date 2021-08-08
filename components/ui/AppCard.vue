<template>
  <div class="bg-white rounded-sm p-4">
    <div v-if="showCardHeader" class="flex items-center justify-between mb-4">
      <div class="flex items-center">
        <app-input-search
          v-if="hasSearchBox"
          class="mr-4"
          @onSearch="onSearch"
        />
        <app-button
          v-if="hasRefreshBtn"
          icon="outline-refresh-icon"
          @click="onRefresh"
        >
          Tải lại
        </app-button>
      </div>
      <app-button
        v-if="hasAddBtn"
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
  props: {
    hasSearchBox: {
      type: Boolean,
      default: true,
    },
    hasRefreshBtn: {
      type: Boolean,
      default: true,
    },
    hasAddBtn: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    showCardHeader() {
      return this.hasSearchBox || this.hasRefreshBtn || this.hasAddBtn
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
