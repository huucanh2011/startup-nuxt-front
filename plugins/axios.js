export default async function ({ $axios, $cookies, app, redirect }) {
  const token = await $cookies.get('auth._token.local')
  if (token) {
    $axios.setHeader('Authorization', token)
  }

  $axios.onError((error) => {
    if (error.response && error.response.satus === 500) {
      redirect('/500')
    }
    return Promise.reject(error)
  })
}
