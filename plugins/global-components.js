import Vue from 'vue'

import AppAlert from '~/components/ui/AppAlert'
import AppAvatar from '~/components/ui/AppAvatar'
import AppBackdrop from '~/components/ui/AppBackdrop'
import AppButton from '~/components/ui/AppButton'
import AppCard from '~/components/ui/AppCard'
import AppConfirm from '~/components/ui/AppConfirm'
import AppIconButton from '~/components/ui/AppIconButton'
import AppInput from '~/components/ui/AppInput'
import AppInputSearch from '~/components/ui/AppInputSearch'
import AppPagination from '~/components/ui/AppPagination'
import AppRadio from '~/components/ui/AppRadio'
import AppSelect from '~/components/ui/AppSelect'
import AppTable from '~/components/ui/AppTable'
import AppTag from '~/components/ui/AppTag'

const components = {
  AppAlert,
  AppAvatar,
  AppBackdrop,
  AppButton,
  AppCard,
  AppConfirm,
  AppIconButton,
  AppInput,
  AppInputSearch,
  AppPagination,
  AppRadio,
  AppSelect,
  AppTable,
  AppTag,
}

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})
