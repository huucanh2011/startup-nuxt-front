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

    <user-modal
      :show="dialog"
      :title="formTitle"
      :user="editedItem"
      :is-edit="editedIndex"
      @submit="onSubmit"
      @close="close"
    />
  </app-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import UserList from '~/components/user/UserList.vue'
import UserModal from '~/components/user/UserModal.vue'
import { message } from '~/helpers/constants'
export default {
  components: { UserList, UserModal },
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {
        name: '',
        email: '',
        password: '',
        avatarPath: '',
        address: '',
        phoneNumber: '',
        deliveryAddress: '',
        role: 'USER',
      },
      defaultItem: {
        name: '',
        email: '',
        password: '',
        avatarPath: '',
        address: '',
        phoneNumber: '',
        deliveryAddress: '',
        role: 'USER',
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
      'CREATE_USER',
      'UPDATE_USER',
      'DELETE_USER',
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
      this.DELETE_USER(this.editedItem.id)
      this.$toast.success(message.deleted)
      this.closeDelete()
    },
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
      this.$nuxt.$emit('reset-form')
    },
    editItem(user) {
      this.editedIndex = this.users.indexOf(user)
      this.editedItem = user
      this.dialog = true
    },
    async onSubmit(user) {
      try {
        if (this.editedIndex === -1) {
          await this.CREATE_USER(user)
          this.$toast.success(message.created)
        } else {
          await this.UPDATE_USER(user)
          this.$toast.success(message.updated)
        }
        this.close()
      } catch (error) {
        this.$toast.error(error.response.data.errors[0])
      }
    },
  },
}
</script>
