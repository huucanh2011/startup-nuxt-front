<template>
  <table class="table-auto min-w-full overflow-x-auto">
    <thead>
      <tr class="border-b border-gray-200">
        <th
          v-for="(header, i) in headers"
          :key="i"
          class="text-left font-semibold text-gray-400 py-2"
        >
          {{ header.title }}
        </th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
      <slot />
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    headers: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style>
.row td {
  padding: 16px 0;
}
</style>
