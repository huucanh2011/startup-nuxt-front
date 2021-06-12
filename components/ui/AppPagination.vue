<template>
  <div
    class="flex flex-col sm:flex-row items-center justify-between mt-2 lg:mt-4"
  >
    <div class="hidden sm:block">
      Hiển thị từ {{ startRecord }} - {{ endRecord }} trên tổng số
      {{ meta.totalCount }}
    </div>

    <div class="flex items-center">
      <select
        class="h-8 p-1 border border-gray-400 rounded"
        @change="onChangeLimit"
      >
        <option
          v-for="(option, i) in options"
          :key="i"
          :value="option.value"
          :selected="limitSelected(option)"
        >
          {{ option.title }}
        </option>
      </select>

      <div class="flex flex-col items-center">
        <div class="flex text-gray-600">
          <button
            class="
              flex
              items-center
              justify-center
              h-8
              w-8
              bg-white
              border border-gray-400
              rounded
              hover:border-blue-500
              hover:text-blue-500
              focus:outline-none
              ml-4
              mr-3
            "
            :disabled="meta.currentPage === 1"
            @click="onChangePage(meta.currentPage - 1)"
          >
            <outline-chevron-left-icon class="h-4 w-4 text-gray-600" />
          </button>
          <button
            v-for="page in meta.totalPages"
            :key="page"
            class="
              flex
              items-center
              justify-center
              h-8
              w-8
              bg-white
              border border-gray-400
              rounded
              hover:border-blue-500
              hover:text-blue-500
              focus:outline-none
              mr-3
            "
            :class="{
              'border-blue-500 text-blue-500 font-semi-bold':
                page === meta.currentPage,
            }"
            :disabled="meta.currentPage === page"
            @click="onChangePage(page)"
          >
            {{ page }}
          </button>
          <button
            class="
              flex
              items-center
              justify-center
              h-8
              w-8
              bg-white
              border border-gray-400
              rounded
              hover:border-blue-500
              hover:text-blue-500
              focus:outline-none
            "
            :disabled="meta.currentPage === meta.totalPages"
            @click="onChangePage(meta.currentPage + 1)"
          >
            <outline-chevron-right-icon class="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    meta: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      active: true,
      options: [
        {
          title: '5/page',
          value: 5,
        },
        {
          title: '10/page',
          value: 10,
        },
        {
          title: '15/page',
          value: 15,
        },
      ],
    }
  },
  computed: {
    startRecord() {
      const { currentPage, limit } = this.meta
      return currentPage === 1 ? 1 : limit * currentPage - limit + 1
    },
    endRecord() {
      const { totalCount, currentPage, limit } = this.meta
      return limit * currentPage > totalCount ? totalCount : limit * currentPage
    },
  },
  methods: {
    onChangePage(page) {
      this.$emit('onChangePage', page)
    },
    onChangeLimit(e) {
      this.$emit('onChangeLimit', e.target.value)
    },
    limitSelected({ value }) {
      return +value === +this.$store.state.route.query.limit
    },
  },
}
</script>
