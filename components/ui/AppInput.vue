<template>
  <ValidationProvider
    v-slot="{ errors, required, ariaInput, ariaMsg }"
    class="flex flex-col mb-4"
    tag="div"
    :vid="vid"
    :rules="rules"
  >
    <label v-if="label" class="flex items-center font-semibold mb-1">
      {{ label }}
      <span class="ml-1 text-red-500">{{ required ? '*' : '' }}</span>
    </label>
    <input
      v-if="controlType === 'input'"
      v-bind="ariaInput"
      :id="name"
      v-model="innerValue"
      class="
        py-1
        bg-transparent
        border-b
        focus:outline-none
        transition
        duration-300
        mb-3
      "
      :class="{
        'border-gray-400 focus:border-blue-600': !errors[0],
        'border-red-500': errors[0],
      }"
      :placeholder="placeholder"
      :type="type"
    />
    <span v-if="errors[0]" v-bind="ariaMsg" class="text-red-500">
      {{ errors[0] }}
    </span>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
export default {
  components: {
    ValidationProvider,
  },
  props: {
    controlType: {
      type: String,
      default: 'input',
    },
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
    placeholder: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
      validator(value) {
        return [
          'url',
          'text',
          'password',
          'tel',
          'search',
          'number',
          'email',
        ].includes(value)
      },
    },
    value: {
      type: null,
      default: '',
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
