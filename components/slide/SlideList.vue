<template>
  <app-table :headers="headers">
    <loading-row-table v-if="loading" :column-size="headers.length" />
    <notfound-table
      v-else-if="slides.length === 0"
      :col-span="headers.length"
    />
    <slide-list-item
      v-for="(slide, i) in slides"
      v-else
      :key="slide.id"
      :slide="slide"
      :no="++i"
      @changeActive="onChangeActive"
      @edit="onEdit"
      @delete="onDelete"
    />
  </app-table>
</template>

<script>
import LoadingRowTable from '../shared/LoadingRowTable.vue'
import NotfoundTable from '../shared/NotfoundTable.vue'
import SlideListItem from './SlideListItem.vue'
export default {
  components: { LoadingRowTable, SlideListItem, NotfoundTable },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    slides: {
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
          title: 'Hình',
        },
        {
          title: 'Tiêu đề',
        },
        {
          title: 'Link',
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
    onEdit(val) {
      this.$emit('edit', val)
    },
    onDelete(val) {
      this.$emit('delete', val)
    },
  },
}
</script>
