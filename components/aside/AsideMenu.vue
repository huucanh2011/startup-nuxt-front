<template>
  <div class="p-2 lg:p-4 text-gray-200 opacity-60">
    <nuxt-link v-for="(menu, i) in menusComputed" :key="i" :to="menu.to">
      <aside-menu-item
        :text="menu.text"
        :icon="menu.icon"
        :active="menu.active"
      />
    </nuxt-link>
  </div>
</template>

<script>
import AsideMenuItem from './AsideMenuItem'
export default {
  components: { AsideMenuItem },
  props: {
    menus: {
      type: Array,
      required: true,
    },
  },
  computed: {
    menusComputed() {
      return this.menus.map((m) =>
        m.to === this.$route.path
          ? { ...m, active: true }
          : { ...m, active: false }
      )
    },
  },
}
</script>
