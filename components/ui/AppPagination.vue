<template>
  <div class="flex items-center justify-between mt-4">
    <div>Hiển thị từ 1 - 10 trên tổng số {{ meta.totalCount }}</div>

    <div class="flex items-center">
      <select class="h-8 p-1 border border-gray-400 rounded">
        <option v-for="(option, i) in options" :key="i" :value="option.value">
          {{ option.title }}
        </option>
      </select>

      <div class="flex flex-col items-center">
        <div class="flex text-gray-600">
          <div
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
              cursor-pointer
              ml-4
              mr-3
            "
          >
            <outline-chevron-left-icon class="h-4 w-4 text-gray-600" />
          </div>
          <div
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
              cursor-pointer
              mr-3
            "
            :class="{
              'border-blue-500 text-blue-500': page === meta.currentPage,
            }"
            @click="onChangePage(page)"
          >
            {{ page }}
          </div>
          <div
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
              cursor-pointer
            "
          >
            <outline-chevron-right-icon class="h-4 w-4 text-gray-600" />
          </div>
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
          title: '10/page',
          value: 10,
        },
        {
          title: '20/page',
          value: 20,
        },
        {
          title: '30/page',
          value: 30,
        },
      ],
    }
  },
  methods: {
    onChangePage(page) {
      this.$emit('onChangePage', page)
    },
  },
}
</script>
