// import { SET_FILTER } from '~/store/mutation-types'

export default ({ app: { store, router } }) => {
  if (!(store && router)) {
    return
  }

  // router.afterEach((to, _from) => {
  //   store.commit(SET_FILTER, to.query.filter)
  // })

  store.watch(
    (state) => state.filter,
    (filter) => {
      router.push({ query: { filter } })
    }
  )
}
