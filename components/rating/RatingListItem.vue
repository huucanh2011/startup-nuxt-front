<template>
  <tr class="row">
    <td>{{ no }}</td>
    <td>{{ rating.product.name }}</td>
    <td>{{ rating.user.name }}</td>
    <td class="flex items-center">
      <span>{{ rating.scores }}</span>
      <OutlineStarIcon class="h-4 w-4 ml-1 text-yellow-500" />
    </td>
    <td>{{ rating.content }}</td>
    <td>
      <input
        type="checkbox"
        :checked="rating.active"
        @change="onChangeActive(rating)"
      />
    </td>
    <td>{{ rating.entryDate | dateTime }}</td>
    <td>{{ rating.updateDate | dateTime }}</td>
    <td>
      <div class="flex items-center">
        <span @click="$emit('delete', rating)">
          <outline-trash-icon class="h-4 w-4 text-red-500 cursor-pointer" />
        </span>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    rating: {
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
    onChangeActive(rating) {
      this.$emit('changeActive', rating)
    },
  },
}
</script>
