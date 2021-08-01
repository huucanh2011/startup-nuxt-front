<template>
  <tr class="row">
    <td>{{ no }}</td>
    <td>
      <app-avatar :src="user.avatarPath" :alt="user.name" />
    </td>
    <td>{{ user.name }}</td>
    <td>{{ user.email }}</td>
    <td>{{ user.address | displayDataNull }}</td>
    <td>
      <app-tag :type="tagTypeRole(user.role)">
        {{ user.role.toLowerCase() }}
      </app-tag>
    </td>
    <td>{{ user.entryDate | dateTime }}</td>
    <td>{{ user.updateDate | dateTime }}</td>
    <td class="flex items-center">
      <span @click="$emit('edit', user)">
        <outline-pencil-icon
          class="h-4 w-4 text-blue-500 cursor-pointer mr-4"
        />
      </span>
      <span @click="$emit('delete', user)">
        <outline-trash-icon class="h-4 w-4 text-red-500 cursor-pointer" />
      </span>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {}
      },
    },
    no: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    tagTypeRole(val) {
      return val === 'ADMIN' ? 'red' : 'blue-2'
    },
  },
}
</script>
