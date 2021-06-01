import Vue from 'vue'

import AppAlert from '~/components/ui/AppAlert'
import AppButton from '~/components/ui/AppButton'
import AppCard from '~/components/ui/AppCard'
import AppInput from '~/components/ui/AppInput'
import AppInputSearch from '~/components/ui/AppInputSearch'
import AppTable from '~/components/ui/AppTable'
import AppPagination from '~/components/ui/AppPagination'

const components = {
  AppAlert,
  AppButton,
  AppCard,
  AppInput,
  AppInputSearch,
  AppTable,
  AppPagination,
}

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})
