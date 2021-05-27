<template>
  <app-card @onSearch="onSearch">
    <div
      class="
        absolute
        top-1/2
        left-1/2
        transform
        -translate-x-1/2 -translate-y-1/2
        w-96
        h-64
        bg-white
        rounded
        border
      "
      style="display: none"
    >
      <div
        class="flex items-center justify-between p-3 border-b border-gray-200"
      >
        <div class="text-gray-500">Thêm mới</div>
        <outline-x-icon class="h-4 w-4 cursor-pointer" />
      </div>
      <div class="p-3">Body</div>
    </div>

    <app-table :headers="headers">
      <tr v-for="(category, i) in categories" :key="category.id" class="row">
        <td>{{ ++i }}</td>
        <td>{{ category.name }}</td>
        <td>{{ category.slug }}</td>
        <td>{{ category.entryDate | dateTime }}</td>
        <td>{{ category.updateDate | dateTime }}</td>
        <td class="flex items-center">
          <outline-pencil-icon
            class="h-4 w-4 text-blue-500 cursor-pointer mr-4"
          />
          <outline-trash-icon class="h-4 w-4 text-red-500 cursor-pointer" />
        </td>
      </tr>
    </app-table>

    <app-pagination />
  </app-card>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const { data } = await $axios.get('http://localhost:8080/api/v1/categories')
    return { categories: data }
  },
  data() {
    return {
      headers: [
        {
          title: 'No.',
        },
        {
          title: 'Tên thể loại',
        },
        {
          title: 'Slug',
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
  head() {
    return {
      title: 'Thể loại',
    }
  },
  methods: {
    onSearch(val) {},
  },
}
</script>

<style></style>
