<template>
  <app-table :headers="headers">
    <loading-row-table v-if="loading" :column-size="headers.length" />
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
import CategoryListItem from './CategoryListItem.vue'
export default {
  components: { LoadingRowTable, CategoryListItem },
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
