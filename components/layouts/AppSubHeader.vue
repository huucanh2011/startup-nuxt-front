<template>
  <header v-if="routeName" class="h-10 flex items-center justify-between mb-4">
    <div
      class="
        capitalize
        tracking-wide
        font-medium
        text-gray-900
        border-l-2 border-blue-600
        px-2
      "
    >
      {{ routeName }}
    </div>
  </header>
</template>

<script>
import { menus } from '~/helpers/constants'
export default {
  computed: {
    routeName() {
      return menus.filter((m) => this.$route.name.includes(m.name))[0]?.text
    },
  },
}
</script>
