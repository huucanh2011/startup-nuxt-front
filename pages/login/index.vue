<template>
  <div
    class="
      flex
      items-center
      justify-center
      max-w-5xl
      mx-auto
      h-screen
      overflow-hidden
    "
  >
    <div class="w-1/2 pr-10">
      <img src="~/assets/auth.png" alt="banner-left" />
    </div>
    <form class="w-1/2 flex flex-col pl-10" @submit.prevent="login">
      <div class="font-semibold uppercase text-center mb-5">Đăng nhập</div>

      <app-alert :messages="serverErrors" />

      <app-input v-model="user.email" label="Email" placeholder="Nhập email" />
      <app-input
        v-model="user.password"
        label="Mật khẩu"
        type="password"
        placeholder="Nhập mật khẩu"
      />
      <app-button
        class="mt-2"
        type="submit"
        color="primary"
        size="lg"
        @click="login"
        >Đăng nhập</app-button
      >
    </form>
  </div>
</template>

<script>
export default {
  auth: 'guest',
  layout: 'auth',
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      serverErrors: [],
    }
  },
  head() {
    return {
      title: 'Đăng nhập',
    }
  },
  methods: {
    async login() {
      try {
        await this.$auth.loginWith('local', {
          data: this.user,
        })
        this.$toast.success('Đăng nhập thành công.')
        this.$router.push('/')
      } catch (error) {
        this.serverErrors = error.response.data.errors
      }
    },
  },
}
</script>
