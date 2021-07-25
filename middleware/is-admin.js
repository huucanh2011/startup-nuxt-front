export default async ({ $auth }) => {
  if ($auth.$state.loggedIn) {
    if ($auth.$state.user.role !== 'ADMIN') {
      await $auth.logout()
      console.log('Bạn phải là admin mới được vào.')
    }
  }
}
