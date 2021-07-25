<template>
  <ValidationProvider
    v-slot="{ errors, required, ariaMsg }"
    class="flex flex-col mb-4"
    tag="div"
    :vid="vid"
    :rules="rules"
    immediate
  >
    <label v-if="label" class="flex items-center font-semibold mb-1">
      {{ label }}
      <span class="ml-1 text-red-500">{{ required ? '*' : '' }}</span>
      <span v-if="errors[0]" v-bind="ariaMsg" class="text-red-500">
        {{ errors[0] }}
      </span>
    </label>
    <div class="flex justify-items-stretch">
      <label
        v-for="(radio, i) in radios"
        :key="`label_${name}_${radio.value}_${i}`"
        class="flex-1 text-center p-1 cursor-pointer"
        :class="{
          'bg-gray-900 text-gray-200 border-gray-900':
            innerValue === radio.value,
          border: innerValue !== radio.value,
        }"
        :for="`${name}_${radio.value}`"
      >
        {{ radio.label }}
        <input
          :id="`${name}_${radio.value}`"
          v-model="innerValue"
          class="hidden"
          type="radio"
          :name="name"
          :value="radio.value"
        />
      </label>
    </div>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
export default {
  components: {
    ValidationProvider,
  },
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
    radios: {
      type: Array,
      required: true,
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
