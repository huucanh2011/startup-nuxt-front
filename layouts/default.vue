<template>
  <div>
    <app-header />
    <app-aside />
    <div class="mt-16 pl-64">
      <nuxt :key="$route.fullPath" />
    </div>
  </div>
</template>

<script>
import AppHeader from '~/components/ui/AppHeader'
import AppAside from '~/components/ui/AppAside'
export default {
  components: { AppHeader, AppAside },
}
</script>

<style></style>
