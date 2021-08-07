<template>
  <div class="bg-white rounded-sm p-4">
    <div class="flex mb-4">
      <nuxt-link
        class="flex items-center underline text-blue-500"
        to="/products"
      >
        <OutlineArrowLeftIcon class="h-4 w-4 mr-1" />
        Quay lại danh sách
      </nuxt-link>
    </div>
    <div v-if="!product" class="text-center">Loading...</div>
    <product-detail v-else :product="product" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ProductDetail from '~/components/product/ProductDetail.vue'
export default {
  components: { ProductDetail },
  data() {
    return {
      product: null,
    }
  },
  head() {
    return {
      title: !this.product ? `Sản phẩm` : `Sản phẩm #${this.product.code}`,
    }
  },
  async created() {
    this.product = await this.GET_PRODUCT_BY_ID(this.$route.params.id)
  },
  methods: {
    ...mapActions('product', ['GET_PRODUCT_BY_ID']),
  },
}
</script>
