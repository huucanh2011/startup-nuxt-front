<template>
  <app-modal
    :show="show"
    :title="title"
    @submit="submit"
    @close="$emit('close')"
  >
    <app-input
      v-model="editedItem.name"
      label="Tên thể loại"
      placeholder="Nhập tên thể loại"
    />
  </app-modal>
</template>

<script>
import AppModal from '~/components/ui/AppModal.vue'
export default {
  components: { AppModal },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    category: {
      type: Object,
      required: false,
      default: () => {
        return {}
      },
    },
  },
  computed: {
    editedItem() {
      return this.category ? { ...this.category } : { name: '' }
    },
  },
  methods: {
    submit() {
      this.$emit('submit', this.editedItem)
    },
  },
}
</script>
