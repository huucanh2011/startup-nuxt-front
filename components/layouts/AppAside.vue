<template>
  <aside class="aside-container fixed top-16 left-0 w-16 lg:w-64 bg-gray-900">
    <div class="flex items-center justify-center lg:justify-start p-2 lg:p-4">
      <app-avatar class="mr-0 lg:mr-2" :src-img="$auth.user.avatarPath" />
      <div class="hidden lg:flex flex-col">
        <span class="text-gray-200">{{ $auth.user.name }}</span>
        <small class="text-xs text-gray-100 lowercase opacity-40">
          {{ $auth.user.role }}
        </small>
      </div>
    </div>
    <aside-menu :menus="menus" />
  </aside>
</template>

<script>
import AsideMenu from '../aside/AsideMenu.vue'
import { menus } from '~/helpers/constants'
export default {
  components: { AsideMenu },
  data() {
    return {
      menus,
    }
  },
}
</script>

<style scoped>
.aside-container {
  height: calc(100vh - 64px);
}
</style>
