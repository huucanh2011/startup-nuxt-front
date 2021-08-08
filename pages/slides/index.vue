<template>
  <app-card
    :has-search-box="false"
    :has-refresh-btn="false"
    @onSearch="onSearch"
    @openModal="dialog = true"
  >
    <slide-list
      :slides="slides"
      :loading="loading"
      @changeActive="changeActive"
      @edit="editItem"
      @delete="deleteItem"
    />
    <app-confirm :show="dialogDelete" @close="closeDelete" @ok="confirmOk" />
    <slide-modal
      :show="dialog"
      :title="formTitle"
      :slide="editedItem"
      @submit="onSubmit"
      @close="close"
    />
  </app-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SlideList from '~/components/slide/SlideList.vue'
import SlideModal from '~/components/slide/SlideModal.vue'
import { message } from '~/helpers/constants'
export default {
  components: { SlideList, SlideModal },
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {
        title: '',
        image: '',
        link: '',
      },
      defaultItem: {
        title: '',
        image: '',
        link: '',
      },
    }
  },
  head() {
    return {
      title: 'Slides',
    }
  },
  computed: {
    ...mapState('slide', ['slides']),
    loading() {
      return this.$store.state.loading
    },
    formTitle() {
      return this.editedIndex === -1 ? 'Thêm mới' : 'Cập nhật'
    },
  },
  created() {
    this.FETCH_SLIDES()
  },
  methods: {
    ...mapActions('slide', [
      'FETCH_SLIDES',
      'CREATE_SLIDE',
      'UPDATE_SLIDE',
      'UPDATE_STATUS_SLIDE',
      'DELETE_SLIDE',
    ]),
    onSearch(q) {
      // q && this.$router.push({ query: { q } })
      this.$toast.info('Cái này không có search nhé.')
    },
    deleteItem(slide) {
      this.editedIndex = this.slides.indexOf(slide)
      this.editedItem = slide
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
      this.DELETE_SLIDE(this.editedItem.id)
      this.$toast.success(message.deleted)
      this.closeDelete()
    },
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
        this.$nuxt.$emit('reset-form')
      })
    },
    editItem(slide) {
      this.editedIndex = this.slides.indexOf(slide)
      this.editedItem = slide
      this.dialog = true
    },
    async changeActive(slide) {
      const { id, active } = slide
      await this.UPDATE_STATUS_SLIDE({ id, isActive: !active })
      this.$toast.success(message.updated)
    },
    async onSubmit(slide) {
      try {
        if (this.editedIndex === -1) {
          await this.CREATE_SLIDE(slide)
          this.$toast.success(message.created)
        } else {
          await this.UPDATE_SLIDE(slide)
          this.$toast.success(message.updated)
        }
        this.close()
      } catch (error) {
        this.$toast.error(error.response.data.errors[0])
      }
    },
  },
}
</script>
