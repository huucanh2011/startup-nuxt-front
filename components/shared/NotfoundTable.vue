<template>
  <tr class="row">
    <td class="text-center" :colspan="colSpan">Không có dữ liệu.</td>
  </tr>
</template>

<script>
export default {
  props: {
    colSpan: {
      type: Number,
      required: true,
    },
  },
}
</script>
