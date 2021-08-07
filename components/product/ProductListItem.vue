<template>
  <tr class="row">
    <td>{{ no }}</td>
    <td>
      <nuxt-link class="underline text-blue-500" :to="`/products/${product.id}`"
        >#{{ product.code }}</nuxt-link
      >
    </td>
    <td>{{ product.name }}</td>
    <td>{{ product.mbrand.name }}</td>
    <td>{{ product.price | currencyVN }}</td>
    <td>{{ product.stocks }}</td>
    <td>
      <input
        type="checkbox"
        :checked="product.isActive"
        @change="onChangeActive(product)"
      />
    </td>
    <td>{{ product.entryDate | dateTime }}</td>
    <td>{{ product.updateDate | dateTime }}</td>
    <td class="flex items-center">
      <span @click="$emit('edit', product.id)">
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
  methods: {
    onChangeActive(product) {
      this.$emit('changeActive', product)
    },
  },
}
</script>
