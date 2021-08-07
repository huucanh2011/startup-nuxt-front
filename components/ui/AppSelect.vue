<template>
  <ValidationProvider
    v-slot="{ errors, required, airaInput, ariaMsg }"
    class="flex flex-col mb-4"
    tag="div"
    :vid="vid"
    :rules="rules"
  >
    <label v-if="label" class="flex items-center font-semibold mb-1">
      {{ label }}
      <span class="ml-1 text-red-500">{{ required ? '*' : '' }}</span>
    </label>
    <select
      :id="name"
      v-model="innerValue"
      class="h-8 w-full p-1 border-b mb-3 focus:outline-none"
      :class="{
        'border-gray-400 focus:border-blue-600': !errors[0],
        'border-red-500': errors[0],
      }"
      v-bind="airaInput"
    >
      <option value="">Chọn {{ name }}</option>
      <option v-for="option in options" :key="option.id" :value="option.value">
        {{ option.title }}
      </option>
    </select>
    <span v-if="errors[0]" v-bind="ariaMsg" class="text-red-500">
      {{ errors[0] }}
    </span>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
export default {
  components: { ValidationProvider },
  props: {
    vid: {
      type: String,
      default: undefined,
    },
    name: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    rules: {
      type: [Object, String],
      default: '',
    },
    value: {
      type: null,
      default: '',
    },
    options: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      innerValue: '',
    }
  },
  watch: {
    innerValue(value) {
      this.$emit('input', value)
    },
    value(val) {
      if (val !== this.innerValue) {
        this.innerValue = val
      }
    },
  },
  created() {
    if (this.value) {
      this.innerValue = this.value
    }
  },
}
</script>
