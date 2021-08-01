<template>
  <app-modal :show="show" :title="title" size="xl" @close="onClose">
    <ValidationObserver ref="form" v-slot="{ handleSubmit, invalid }" slim>
      <form @submit.prevent="handleSubmit(onSave)">
        <div class="my-4">
          <div class="flex justify-between">
            <app-input
              v-model="editedItem.name"
              class="w-1/2 mr-2"
              rules="required"
              name="name"
              label="Tên"
              placeholder="Nhập tên"
            />
            <app-input
              v-model="editedItem.email"
              class="w-1/2 ml-2"
              type="email"
              rules="required|email"
              name="email"
              label="Email"
              placeholder="Nhập email"
            />
          </div>
          <div class="flex justify-between">
            <app-input
              v-if="isEdit === -1"
              v-model="editedItem.password"
              class="w-1/2 mr-2"
              type="password"
              rules="required"
              name="password"
              label="Mật khẩu"
              placeholder="Nhập mật khẩu"
            />
            <div v-else class="flex flex-col items-start justify-start">
              <span class="font-semibold mb-1">Mật khẩu</span>
              <span>Bạn không thể cập nhật mật khẩu.</span>
            </div>
            <app-radio
              v-model="editedItem.role"
              :radios="[
                { label: 'Admin', value: 'ADMIN' },
                { label: 'User', value: 'USER' },
              ]"
              class="w-1/2 ml-2"
              rules="required"
              name="role"
              label="Quyền"
            />
          </div>
          <div class="flex justify-between">
            <app-input
              v-model="editedItem.phoneNumber"
              class="w-1/2 mr-2"
              :rules="{ regex: /^0[0-9]{9}$/ }"
              name="phoneNumber"
              label="Số điện thoại"
              placeholder="Nhập số điện thoại"
            />
            <app-input
              v-model="editedItem.avatarPath"
              class="w-1/2 ml-2"
              name="avatarPath"
              label="Đường dẫn avatar"
              placeholder="Nhập đường dẫn avatar"
            />
          </div>
          <app-input
            v-model="editedItem.address"
            control-type="textarea"
            name="address"
            label="Địa chỉ"
            placeholder="Nhập địa chỉ"
          />
          <app-input
            v-model="editedItem.deliveryAddress"
            control-type="textarea"
            name="deliveryAddress"
            label="Địa chỉ nhận hàng"
            placeholder="Nhập địa chỉ nhận hàng"
          />
        </div>
        <div class="flex items-center justify-end">
          <app-button class="mr-3" size="sm" type="button" @click="onClose">
            Đóng
          </app-button>
          <app-button
            color="primary"
            size="sm"
            type="submit"
            :disabled="invalid"
          >
            Lưu
          </app-button>
        </div>
      </form>
    </ValidationObserver>
  </app-modal>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import AppModal from '~/components/ui/AppModal.vue'
export default {
  components: { ValidationObserver, AppModal },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    user: {
      type: Object,
      required: false,
      default: () => {
        return {}
      },
    },
    isEdit: {
      type: Number,
      default: -1,
    },
  },
  computed: {
    editedItem() {
      return this.user
        ? { ...this.user }
        : {
            name: '',
            email: '',
            password: '',
            avatarPath: '',
            address: '',
            phoneNumber: '',
            deliveryAddress: '',
            role: '',
          }
    },
  },
  methods: {
    async onSave() {
      const isValid = await this.$refs.form.validate()
      isValid && this.$emit('submit', this.editedItem)
    },
    onClose() {
      this.$refs.form.reset()
      this.$emit('close')
    },
  },
}
</script>
