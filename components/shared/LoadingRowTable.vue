<template>
  <tr class="row">
    <td :colspan="columnSize" class="text-center">Loading...</td>
  </tr>
</template>

<script>
export default {
  props: {
    columnSize: {
      type: Number,
      default: 0,
    },
  },
}
</script>
