<template>
  <select class="h-8 p-1 border border-gray-400 rounded" v-on="$listeners">
    <option
      v-for="(select, i) in selections"
      :key="i"
      :value="select.value"
      :selected="select.value === selected"
    >
      {{ select.title }}
    </option>
  </select>
</template>

<script>
export default {
  props: {
    selections: {
      type: Array,
      default: () => {
        return []
      },
    },
    selected: {
      type: [String, Number],
      default: '',
    },
  },
}
</script>
