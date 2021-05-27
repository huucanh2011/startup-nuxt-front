<template>
  <div class="text-center mt-4">
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
            mx-3
          "
        >
          <outline-chevron-left-icon class="h-4 w-4 text-gray-600" />
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
          :class="{ 'border-blue-500 text-blue-500': active }"
        >
          1
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
            mx-3
          "
        >
          2
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
          3
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
            mx-3
          "
        >
          <outline-chevron-right-icon class="h-4 w-4 text-gray-600" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: true,
    }
  },
}
</script>
