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

    <app-pagination :meta="meta" @onChangePage="onChangePage" />
  </app-card>
</template>

<script>
export default {
  async asyncData({ $axios, route }) {
    let url = '/categories'
    if (route.query.q) {
      url += `?q=${route.query.q}`
    }
    if (route.query.page) {
      if (!route.query.q) {
        url += `?page=${route.query.page}`
      } else {
        url += `&page=${route.query.page}`
      }
    }
    const { data } = await $axios.get(url)
    return { categories: data.data, meta: data.meta }
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
  watchQuery: ['q', 'page', 'limit'],
  methods: {
    onSearch(q) {
      if (q) {
        this.$router.push({ query: { q } })
      }
    },
    onChangePage(page) {
      this.$router.push({ query: { page } })
    },
  },
}
</script>

<style></style>
