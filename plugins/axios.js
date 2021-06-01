export default async function ({ $axios, $cookies }) {
  const token = await $cookies.get('auth._token.local')
  token && $axios.setHeader('Authorization', token)
}
