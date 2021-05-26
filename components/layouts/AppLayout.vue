<template>
  <div>
    <app-header />
    <app-aside />
    <main class="main-container mt-16 pl-64 bg-gray-100">
      <div class="p-4">
        <app-sub-header />
        <slot />
      </div>
    </main>
  </div>
</template>

<script>
import AppHeader from './AppHeader'
import AppAside from './AppAside'
import AppSubHeader from './AppSubHeader'
export default {
  components: { AppHeader, AppAside, AppSubHeader },
}
</script>

<style scoped>
.main-container {
  min-height: calc(100vh - 64px);
}
</style>
