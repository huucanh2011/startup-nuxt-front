<template>
  <app-card
    :has-search-box="false"
    :has-add-btn="false"
    @onSearch="onSearch"
    @openModal="dialog = true"
  >
    <rating-list
      :ratings="ratings"
      :loading="loading"
      @changeActive="changeActive"
      @delete="deleteItem"
    />
    <app-pagination
      :meta="meta"
      @onChangePage="onChangePage"
      @onChangeLimit="onChangeLimit"
    />
    <app-confirm :show="dialogDelete" @close="closeDelete" @ok="confirmOk" />
  </app-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import RatingList from '~/components/rating/RatingList.vue'
import { message } from '~/helpers/constants'
export default {
  components: { RatingList },
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {
        name: '',
      },
      defaultItem: {
        name: '',
      },
    }
  },
  head() {
    return {
      title: 'Đánh giá',
    }
  },
  computed: {
    ...mapState('rating', ['ratings', 'meta']),
    loading() {
      return this.$store.state.loading
    },
    formTitle() {
      return this.editedIndex === -1 ? 'Thêm mới' : 'Cập nhật'
    },
  },
  watchQuery: ['q', 'page', 'imit'],
  created() {
    this.FETCH_RATINGS()
  },
  methods: {
    ...mapActions('rating', [
      'FETCH_RATINGS',
      'UPDATE_STATUS_RATING',
      'DELETE_RATING',
    ]),
    onSearch(q) {
      // q && this.$router.push({ query: { q } })
      this.$toast.info('Chưa search được nhé.')
    },
    onChangePage(page) {
      this.$router.push({ query: { ...this.$route.query, page } })
    },
    onChangeLimit(limit) {
      this.$route.query.page = 1
      this.$router.push({ query: { ...this.$route.query, limit } })
    },
    deleteItem(rating) {
      this.editedIndex = this.ratings.indexOf(rating)
      this.editedItem = rating
      this.dialogDelete = true
    },
    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    confirmOk() {
      this.DELETE_RATING(this.editedItem.id)
      this.$toast.success(message.deleted)
      this.closeDelete()
    },
    async changeActive(rating) {
      const { id, active } = rating
      await this.UPDATE_STATUS_RATING({ id, isActive: !active })
      this.$toast.success(message.updated)
    },
  },
}
</script>
