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

    <div class="w-1/2">
      <validation-observer ref="form" v-slot="{ handleSubmit }">
        <form class="flex flex-col pl-10" @submit.prevent="handleSubmit(login)">
          <div class="font-semibold uppercase text-center mb-5">Đăng nhập</div>

          <app-alert :messages="serverErrors" />

          <validation-provider
            v-slot="{ errors }"
            name="email"
            rules="required|email"
          >
            <app-input
              v-model="user.email"
              type="email"
              label="Email"
              placeholder="Nhập email"
            />
            <span class="text-red-500">{{ errors[0] }}</span>
          </validation-provider>

          <validation-provider
            v-slot="{ errors }"
            name="mật khẩu"
            rules="required|min:6"
          >
            <app-input
              v-model="user.password"
              type="password"
              label="Mật khẩu"
              placeholder="Nhập mật khẩu"
            />
            <span class="text-red-500">{{ errors[0] }}</span>
          </validation-provider>
          <app-button
            class="mt-2"
            type="submit"
            color="primary"
            size="lg"
            :loading="loading"
            @click="login"
            >Đăng nhập</app-button
          >
        </form>
      </validation-observer>
    </div>
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
      loading: false,
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
        const isValid = await this.$refs.form.validate()
        if (isValid) {
          this.loading = true
          await this.$auth.loginWith('local', {
            data: this.user,
          })
          this.$toast.success('Đăng nhập thành công.')
        }
      } catch (error) {
        this.serverErrors = error.response.data.errors
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
