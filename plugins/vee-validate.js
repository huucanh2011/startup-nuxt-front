import { extend } from 'vee-validate'
import { required, email, min } from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: 'Vui lòng nhập {_field_}.',
})

extend('email', {
  ...email,
  message: 'Vui lòng nhập đúng định dạng email.',
})

extend('min', {
  ...min,
  params: ['length'],
  message: 'Vui lòng nhập {_field_} ít nhất {length} kí tự.',
})
