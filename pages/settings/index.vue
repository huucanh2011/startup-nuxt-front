<template>
  <app-card v-bind="bind">
    <div>Trang cài đặt này làm sau nha.</div>
  </app-card>
</template>

<script>
export default {
  data() {
    return {
      bind: {
        hasSearchBox: false,
        hasRefreshBtn: false,
        hasAddBtn: false,
      },
    }
  },
  head() {
    return {
      title: 'Cài đặt',
    }
  },
}
</script>
