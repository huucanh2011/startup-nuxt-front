<template>
  <app-table :headers="headers">
    <loading-row-table v-if="loading" :column-size="headers.length" />
    <notfound-table
      v-else-if="categories.length === 0"
      :col-span="headers.length"
    />
    <category-list-item
      v-for="(category, i) in categories"
      v-else
      :key="category.id"
      :category="category"
      :no="++i"
      @edit="onEdit"
      @delete="onDelete"
    />
  </app-table>
</template>

<script>
import LoadingRowTable from '../shared/LoadingRowTable.vue'
import NotfoundTable from '../shared/NotfoundTable.vue'
import CategoryListItem from './CategoryListItem.vue'
export default {
  components: { LoadingRowTable, CategoryListItem, NotfoundTable },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    categories: {
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
