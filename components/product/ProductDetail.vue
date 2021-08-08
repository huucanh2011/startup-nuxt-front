<template>
  <div class="flex flex-col">
    <div class="flex">
      <div class="w-1/2 mr-2">
        <img
          v-if="product.image"
          v-lazy-load
          :src="product.image"
          :alt="product.name"
          :title="product.name"
        />
        <div v-else>Không có ảnh.</div>
      </div>
      <div class="w-1/2 ml-2">
        <div class="text-2xl font-semibold mb-4">
          {{ product.name }} - #{{ product.code }}
        </div>
        <table>
          <tbody>
            <tr class="text-lg">
              <td>Thể loại</td>
              <td class="pl-5">&#58;&nbsp;&nbsp;{{ product.category.name }}</td>
            </tr>
            <tr class="text-lg">
              <td>Hãng</td>
              <td class="pl-5">&#58;&nbsp;&nbsp;{{ product.mbrand.name }}</td>
            </tr>
            <tr class="text-lg">
              <td>Size</td>
              <td class="pl-5">&#58;&nbsp;&nbsp;{{ sizeComputed }}</td>
            </tr>
            <tr class="text-lg">
              <td>Giá</td>
              <td class="pl-5 flex">
                &#58;&nbsp;&nbsp;
                <app-tag type="blue-2">
                  {{ product.price | currencyVN }}
                </app-tag>
              </td>
            </tr>
            <tr class="text-lg">
              <td>Tồn kho</td>
              <td class="pl-5">
                &#58;&nbsp;&nbsp;{{ product.stocks }} chiếc/cái
              </td>
            </tr>
            <tr class="text-lg">
              <td>Tính năng nổi bật</td>
              <td class="pl-5">&#58;&nbsp;&nbsp;{{ product.feature }}</td>
            </tr>
            <tr class="text-lg">
              <td>Mô tả</td>
              <td class="pl-5">&#58;&nbsp;&nbsp;{{ product.description }}</td>
            </tr>
            <tr class="text-lg">
              <td>Trạng thái</td>
              <td class="pl-5 flex">
                &#58;&nbsp;&nbsp;
                <app-tag :type="activeType">
                  {{ activeName }}
                </app-tag>
              </td>
            </tr>
            <tr class="text-lg">
              <td>Ngày tạo</td>
              <td class="pl-5">
                &#58;&nbsp;&nbsp;{{ product.entryDate | dateTime }}
              </td>
            </tr>
            <tr class="text-lg">
              <td>Mô tả</td>
              <td class="pl-5">
                &#58;&nbsp;&nbsp;{{ product.updateDate | dateTime }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-if="gallery.length > 0" class="-mx-2 flex flex-wrap">
      <img
        v-for="(g, i) in gallery"
        :key="i"
        v-lazy-load
        :src="g"
        :alt="`${product.code}__${i}`"
        class="w-1/3 mt-4 px-2"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  computed: {
    sizeComputed() {
      const { shirt, name, value } = this.product.msizeProduct
      const shirtOrNot = shirt ? 'Áo' : 'Quần'
      return `${shirtOrNot}_${name}_${value}`
    },
    activeType() {
      return this.product.isActive ? 'green' : 'red'
    },
    activeName() {
      return this.product.isActive ? 'Hiển thị' : 'Không hiển thị'
    },
    gallery() {
      return this.product.gallery !== '' ? this.product.gallery.split(';') : []
    },
  },
}
</script>
