<script setup>
import { onMounted, ref } from 'vue';
import { useProfileStore } from './store.js';

const formRef = ref();
const profileStore = useProfileStore();

profileStore.getProfile();

const rules = {
  username: [
    { required: true, trigger: 'blur', message: '请输入用户名' },
    { min: 3, max: 10, message: '长度应为 3 到 10 个字符', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' },
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^\d{11}$/, message: '手机号应为 11 位数字', trigger: 'blur' },
  ],
};
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
};

// onMounted(() => {
//   console.log('Profile page mounted');
//   throw new Error('Profile page mounted');
// });
</script>

<template>
  <div class="w-[80vw] md:w-1/2 mx-auto my-10 bg-white rounded-lg shadow-lg p-8"
    :class="{ 'preview-editing-mode': !profileStore.editing.value }">
    <!-- 展示用户 Profile 信息，展示用户名、邮箱、手机号等字段 -->
    <!-- 编辑按钮，点击后切换到编辑模式，编辑模式下可修改所有字段，保存后会切换为展示模式 -->
    <div class="flex justify-between mb-4">
      <span class="text-4xl font-bold text-gray-500">Profile</span>
      <a-button type="primary" @click="profileStore.toggleEditing">
        {{ profileStore.editing.value ? '取消' : '编辑' }}
      </a-button>
    </div>
    <a-form ref="formRef" name="custom-validation" :model="profileStore.formState" :rules="rules" v-bind="layout">
      <a-form-item has-feedback label="用户名" name="username">
        <a-input v-model:value="profileStore.formState.username" v-if="profileStore.editing.value" />
        <span v-else>{{ profileStore.formState.username }}</span>
      </a-form-item>

      <a-form-item has-feedback label="邮箱" name="email">
        <a-input v-model:value="profileStore.formState.email" v-if="profileStore.editing.value" />
        <span v-else>{{ profileStore.formState.email }}</span>
      </a-form-item>

      <a-form-item has-feedback label="手机号" name="phone">
        <a-input v-model:value="profileStore.formState.phone" v-if="profileStore.editing.value" />
        <span v-else>{{ profileStore.formState.phone }}</span>
      </a-form-item>

      <a-form-item v-if="profileStore.editing.value" class="md:flex md:justify-center">
        <a-button type="primary" @click="() => profileStore.handleFinish(formRef)" class="w-full md:w-auto"
          :loading="profileStore.loading.value">提交</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style lang="less">
@media screen and (max-width: 768px) {
  .ant-form-item-row {
    >.ant-form-item-label {
      width: 100%;
    }
  }
}
</style>
