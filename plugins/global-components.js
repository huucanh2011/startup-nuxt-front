import Vue from 'vue'

import AppButton from '~/components/ui/AppButton'
import AppCard from '~/components/ui/AppCard'
import AppInputSearch from '~/components/ui/AppInputSearch'
import AppTable from '~/components/ui/AppTable'
import AppPagination from '~/components/ui/AppPagination'

const components = {
  AppButton,
  AppCard,
  AppInputSearch,
  AppTable,
  AppPagination,
}

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})
