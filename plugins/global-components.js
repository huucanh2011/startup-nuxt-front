import Vue from 'vue'

import AppCard from '~/components/ui/AppCard'

const components = { AppCard }

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})
