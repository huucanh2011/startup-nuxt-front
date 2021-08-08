<template>
  <app-table :headers="headers">
    <loading-row-table v-if="loading" :column-size="headers.length" />
    <notfound-table
      v-else-if="ratings.length === 0"
      :col-span="headers.length"
    />
    <rating-list-item
      v-for="(rating, i) in ratings"
      v-else
      :key="rating.id"
      :rating="rating"
      :no="++i"
      @changeActive="onChangeActive"
      @delete="onDelete"
    />
  </app-table>
</template>

<script>
import LoadingRowTable from '../shared/LoadingRowTable.vue'
import NotfoundTable from '../shared/NotfoundTable.vue'
import RatingListItem from './RatingListItem.vue'
export default {
  components: { LoadingRowTable, RatingListItem, NotfoundTable },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    ratings: {
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
          title: 'Sản phẩm',
        },
        {
          title: 'Người đánh giá',
        },
        {
          title: 'Điểm',
        },
        {
          title: 'Nội dung',
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
    onChangeActive(val) {
      this.$emit('changeActive', val)
    },
    onDelete(val) {
      this.$emit('delete', val)
    },
  },
}
</script>
