<template>
  <app-table :headers="headers">
    <loading-row-table v-if="loading" :column-size="headers.length" />
    <notfound-table
      v-else-if="products.length === 0"
      :col-span="headers.length"
    />
    <product-list-item
      v-for="(product, i) in products"
      v-else
      :key="product.id"
      :product="product"
      :no="++i"
      @edit="onEdit"
      @changeActive="onChangeActive"
      @delete="onDelete"
    />
  </app-table>
</template>

<script>
import LoadingRowTable from '../shared/LoadingRowTable.vue'
import NotfoundTable from '../shared/NotfoundTable.vue'
import ProductListItem from './ProductListItem.vue'
export default {
  components: { LoadingRowTable, ProductListItem, NotfoundTable },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    products: {
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
          title: 'Code',
        },
        {
          title: 'Tên',
        },
        {
          title: 'Hãng',
        },
        {
          title: 'Giá',
        },
        {
          title: 'Còn lại',
        },
        {
          title: 'Hiển thị',
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
    onChangeActive(val) {
      this.$emit('changeActive', val)
    },
    onDelete(val) {
      this.$emit('delete', val)
    },
  },
}
</script>
