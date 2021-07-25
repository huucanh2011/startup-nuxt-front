<template>
  <div>
    Products
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('product', ['products']),
  },
  created() {
    this.FETCH_PRODUCTS()
  },
  methods: {
    ...mapActions('product', ['FETCH_PRODUCTS']),
  },
}
</script>
