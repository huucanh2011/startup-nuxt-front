<template>
  <div class="fixed top-0 w-full h-16 z-30">
    <header
      class="
        h-16
        flex
        justify-between
        items-center
        px-4
        bg-white
        border-b border-gray-100
      "
    >
      <nuxt-link to="/">
        <span class="text-2xl font-bold uppercase mr-1">Up</span
        ><small class="font-light">team</small>
      </nuxt-link>

      <div class="flex items-center">
        <outline-bell-icon class="h-6 w-6 cursor-pointer mr-4" />

        <div ref="dropdown" class="relative">
          <div class="flex items-center cursor-pointer rounded" @click="toggle">
            <span class="mr-1"> {{ $auth.user.name }} </span>
            <app-avatar :src-img="$auth.user.avatarPath" />
          </div>
          <div
            v-show="isShow"
            class="absolute right-0 top-11 w-32 bg-white rounded-sm shadow p-3"
          >
            <ul>
              <li>
                <a class="flex items-center cursor-pointer" @click="logout">
                  <outline-logout-icon class="h-5 w-5 mr-2" />
                  Đăng xuất
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
    }
  },
  mounted() {
    document.addEventListener('click', this.close)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.close)
  },
  methods: {
    toggle() {
      this.isShow = !this.isShow
    },
    close(e) {
      if (!this.$refs.dropdown.contains(e.target)) {
        this.isShow = false
      }
    },
    async logout() {
      await this.$auth.logout()
    },
  },
}
</script>
