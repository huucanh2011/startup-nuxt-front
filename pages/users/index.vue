<template>
  <app-card @onSearch="onSearch" @openModal="dialog = true">
    <user-list
      :users="users"
      :loading="loading"
      @edit="editItem"
      @delete="deleteItem"
    />
    <app-pagination
      :meta="meta"
      @onChangePage="onChangePage"
      @onChangeLimit="onChangeLimit"
    />

    <app-confirm :show="dialogDelete" @close="closeDelete" @ok="confirmOk" />
  </app-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import UserList from '~/components/user/UserList.vue'
export default {
  components: { UserList },
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {
        name: '',
      },
      defaultItem: {
        name: '',
      },
    }
  },
  head() {
    return {
      title: 'Tài khoản',
    }
  },
  computed: {
    ...mapState('user', ['users', 'meta']),
    loading() {
      return this.$store.state.loading
    },
    formTitle() {
      return this.editedIndex === -1 ? 'Thêm mới' : 'Cập nhật'
    },
  },
  watchQuery: ['q', 'page', 'imit'],
  created() {
    this.FETCH_USERS()
  },
  methods: {
    ...mapActions('user', [
      'FETCH_USERS',
      // 'CREATE_CATEGORY',
      // 'UPDATE_CATEGORY',
      // 'DELETE_CATEGORY',
    ]),
    onSearch(q) {
      q && this.$router.push({ query: { q } })
    },
    onChangePage(page) {
      this.$router.push({ query: { ...this.$route.query, page } })
    },
    onChangeLimit(limit) {
      this.$router.push({ query: { ...this.$route.query, limit } })
    },
    deleteItem(user) {
      this.editedIndex = this.users.indexOf(user)
      this.editedItem = user
      this.dialogDelete = true
    },
    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    confirmOk() {
      // this.DELETE_CATEGORY(this.editedItem.id)
      // this.closeDelete()
    },
    // close() {
    //   this.dialog = false
    //   this.$nextTick(() => {
    //     this.editedItem = Object.assign({}, this.defaultItem)
    //     this.editedIndex = -1
    //   })
    // },
    editItem(user) {
      this.editedIndex = this.users.indexOf(user)
      this.editedItem = user
      this.dialog = true
    },
    // async onSubmit(category) {
    //   try {
    //     if (this.editedIndex === -1) {
    //       await this.CREATE_CATEGORY(category)
    //     } else {
    //       await this.UPDATE_CATEGORY(category)
    //     }
    //     this.close()
    //     this.$notify({
    //       type: 'success',
    //       text: 'Thực hiện thành công.',
    //     })
    //   } catch (error) {
    //     this.$notify({
    //       type: 'error',
    //       text: error.response.data.errors[0],
    //     })
    //   }
    // },
  },
}
</script>
