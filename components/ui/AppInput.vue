<template>
  <div class="flex flex-col mb-4">
    <label class="font-semibold mb-1">{{ label }}</label>
    <input
      v-if="controlType === 'input'"
      class="
        py-1
        bg-transparent
        border-b border-gray-400
        focus:outline-none
        focus:border-blue-600
        transition
        duration-300
      "
      v-bind="$attrs"
      :value="value"
      @input="updateSelf($event.target.value)"
    />
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    controlType: {
      type: String,
      default: 'input',
    },
    value: {
      type: String,
      default: '',
    },
  },
  methods: {
    updateSelf(value) {
      this.$emit('input', value)
    },
  },
}
</script>
