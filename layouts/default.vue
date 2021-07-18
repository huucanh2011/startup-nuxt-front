<template>
  <app-layout>
    <client-only>
      <notifications position="top right" />
    </client-only>
    <nuxt :key="$route.fullPath" />
  </app-layout>
</template>

<script>
import AppLayout from '~/components/layouts/AppLayout'
export default {
  components: { AppLayout },
}
</script>
