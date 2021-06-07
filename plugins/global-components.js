import Vue from 'vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'

import AppAlert from '~/components/ui/AppAlert'
import AppBackdrop from '~/components/ui/AppBackdrop'
import AppButton from '~/components/ui/AppButton'
import AppCard from '~/components/ui/AppCard'
import AppConfirm from '~/components/ui/AppConfirm'
import AppInput from '~/components/ui/AppInput'
import AppInputSearch from '~/components/ui/AppInputSearch'
import AppTable from '~/components/ui/AppTable'
import AppPagination from '~/components/ui/AppPagination'

const components = {
  AppAlert,
  AppBackdrop,
  AppButton,
  AppCard,
  AppConfirm,
  AppInput,
  AppInputSearch,
  AppTable,
  AppPagination,
  ValidationProvider,
  ValidationObserver,
}

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})
