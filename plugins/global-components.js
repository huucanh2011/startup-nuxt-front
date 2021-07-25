import Vue from 'vue'

import AppAlert from '~/components/ui/AppAlert'
import AppAvatar from '~/components/ui/AppAvatar'
import AppBackdrop from '~/components/ui/AppBackdrop'
import AppButton from '~/components/ui/AppButton'
import AppCard from '~/components/ui/AppCard'
import AppConfirm from '~/components/ui/AppConfirm'
import AppInput from '~/components/ui/AppInput'
import AppInputSearch from '~/components/ui/AppInputSearch'
import AppPagination from '~/components/ui/AppPagination'
import AppRadio from '~/components/ui/AppRadio'
import AppTable from '~/components/ui/AppTable'

const components = {
  AppAlert,
  AppAvatar,
  AppBackdrop,
  AppButton,
  AppCard,
  AppConfirm,
  AppInput,
  AppInputSearch,
  AppPagination,
  AppRadio,
  AppTable,
}

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})
