<template>
  <tr class="row">
    <td>{{ no }}</td>
    <td>{{ category.name }}</td>
    <td>{{ category.slug }}</td>
    <td>{{ category.entryDate | dateTime }}</td>
    <td>{{ category.updateDate | dateTime }}</td>
    <td class="flex items-center">
      <span @click="$emit('edit', category)">
        <outline-pencil-icon
          class="h-4 w-4 text-blue-500 cursor-pointer mr-4"
        />
      </span>
      <span @click="$emit('delete', category)">
        <outline-trash-icon class="h-4 w-4 text-red-500 cursor-pointer" />
      </span>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    category: {
      type: Object,
      default: () => {
        return {}
      },
    },
    no: {
      type: Number,
      default: 0,
    },
  },
}
</script>
