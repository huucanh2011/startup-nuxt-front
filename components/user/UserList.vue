<template>
  <app-table :headers="headers">
    <loading-row-table v-if="loading" :column-size="headers.length" />
    <user-list-item
      v-for="(user, i) in users"
      v-else
      :key="user.id"
      :user="user"
      :no="++i"
      @edit="onEdit"
      @delete="onDelete"
    />
  </app-table>
</template>

<script>
import LoadingRowTable from '../shared/LoadingRowTable.vue'
import UserListItem from './UserListItem.vue'
export default {
  components: { LoadingRowTable, UserListItem },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    users: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      headers: [
        {
          title: 'No.',
        },
        {
          title: 'Avatar',
        },
        {
          title: 'Tên',
        },
        {
          title: 'Email',
        },
        {
          title: 'Địa chỉ',
        },
        {
          title: 'Role',
        },
        {
          title: 'Ngày tạo',
        },
        {
          title: 'Ngày cập nhật',
        },
        {
          title: 'Tuỳ chọn',
        },
      ],
    }
  },
  methods: {
    onEdit(val) {
      this.$emit('edit', val)
    },
    onDelete(val) {
      this.$emit('delete', val)
    },
  },
}
</script>
