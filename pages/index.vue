<template>
  <div class="wrapper flex flex-nowrap">
    <div class="left flex flex-col justify-between pr-2">
      <statistics-card :data="statistics[0]" class="mb-4" />
      <statistics-card :data="statistics[1]" class="mb-4" />
      <statistics-card :data="statistics[2]" class="mb-4" />
      <statistics-card :data="statistics[3]" />
    </div>
    <div class="right pl-2">
      <my-chart />
    </div>
  </div>
</template>

<script>
import MyChart from '~/components/dashboard/MyChart.vue'
import StatisticsCard from '~/components/dashboard/StatisticsCard.vue'
export default {
  components: { StatisticsCard, MyChart },
  data() {
    return {
      statistics: [
        {
          title: 'Tổng số khách hàng',
          value: 22323,
        },
        {
          title: 'Tổng số sản phẩm',
          value: 546,
        },
        {
          title: 'Tổng số đơn hàng',
          value: 1236875,
        },
        {
          title: 'Tổng doanh thu',
          value: 213588000,
        },
      ],
    }
  },
  head() {
    return {
      title: 'Dashboard',
    }
  },
}
</script>

<style lang="css" scoped>
.wrapper {
  height: calc(100vh - 64px - 16px * 2 - 40px - 16px);
}
.left {
  flex: 25%;
}
.right {
  flex: 75%;
}
</style>
