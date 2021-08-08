<template>
  <tr class="row">
    <td>{{ no }}</td>
    <td>
      <img
        v-lazy-load
        :src="slide.image"
        :alt="slide.title || slide.image"
        class="max-w-xs"
      />
    </td>
    <td>{{ slide.title | displayDataNull }}</td>
    <td>{{ slide.link | displayDataNull }}</td>
    <td>
      <input
        type="checkbox"
        :checked="slide.active"
        @change="onChangeActive(slide)"
      />
    </td>
    <td>{{ slide.entryDate | dateTime }}</td>
    <td>{{ slide.updateDate | dateTime }}</td>
    <td>
      <div class="flex items-center">
        <span @click="$emit('edit', slide)">
          <outline-pencil-icon
            class="h-4 w-4 text-blue-500 cursor-pointer mr-4"
          />
        </span>
        <span @click="$emit('delete', slide)">
          <outline-trash-icon class="h-4 w-4 text-red-500 cursor-pointer" />
        </span>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    slide: {
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
