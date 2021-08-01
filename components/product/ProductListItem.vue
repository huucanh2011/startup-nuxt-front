<template>
  <tr class="row">
    <td>{{ no }}</td>
    <td>{{ product.code }}</td>
    <td>{{ product.name }}</td>
    <td>{{ product.mbrand.name }}</td>
    <td>{{ product.price }}</td>
    <td>{{ product.stocks }}</td>
    <td>{{ product.isActive }}</td>
    <td>{{ product.entryDate | dateTime }}</td>
    <td>{{ product.updateDate | dateTime }}</td>
    <td class="flex items-center">
      <span @click="$emit('edit', product)">
        <outline-pencil-icon
          class="h-4 w-4 text-blue-500 cursor-pointer mr-4"
        />
      </span>
      <span @click="$emit('delete', product)">
        <outline-trash-icon class="h-4 w-4 text-red-500 cursor-pointer" />
      </span>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    product: {
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
