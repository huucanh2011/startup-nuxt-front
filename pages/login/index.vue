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
      <ValidationObserver
        ref="loginForm"
        v-slot="{ handleSubmit, invalid }"
        slim
      >
        <form class="flex flex-col pl-10" @submit.prevent="handleSubmit(login)">
          <div class="font-semibold uppercase text-center mb-5">Đăng nhập</div>

          <app-alert :messages="serverErrors" />

          <app-input
            v-model="user.email"
            type="email"
            rules="required|email"
            label="Email"
            name="email"
            placeholder="Nhập email"
          />

          <app-input
            v-model="user.password"
            type="password"
            rules="required|min:6"
            label="Mật khẩu"
            name="mật khẩu"
            placeholder="Nhập mật khẩu"
          />

          <app-button
            class="mt-2"
            color="primary"
            size="lg"
            :loading="loading"
            :disabled="invalid"
            @click="login2"
          >
            Đăng nhập
          </app-button>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
export default {
  components: {
    ValidationObserver,
  },
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
        const isValid = await this.$refs.loginForm.validate()
        if (isValid) {
          this.loading = true
          await this.$auth.loginWith('local', {
            data: this.user,
          })
          // this.$nofity({
          //   group: 'success',
          //   text: 'Đăng nhập thành công.',
          // })
        }
      } catch (error) {
        this.serverErrors = error.response.data.errors
      } finally {
        this.loading = false
      }
    },
    async login2() {
      try {
        const isValid = await this.$refs.loginForm.validate()
        if (isValid) {
          this.loading = true
          await this.$auth.loginWith('local', {
            data: {
              email: 'canh@gmail.com',
              password: '123456',
            },
          })
          // this.$nofity({
          //   group: 'success',
          //   text: 'Đăng nhập thành công.',
          // })
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
