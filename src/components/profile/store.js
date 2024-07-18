import { reactive, ref } from 'vue';
import { getProfileData, updateProfileData } from './api';
import { message } from 'ant-design-vue';

const defaultFormState = {
  username: '',
  email: '',
  phone: '',
};

export const useProfileStore = () => {
  // editing: false,
  const editing = ref(false);
  const loading = ref(false);
  const formState = reactive({ ...defaultFormState });
  const store = {
    formState,
    editing,
    loading,
    toggleEditing: () => {
      editing.value = !editing.value;
    },
    getProfile: () => {
      return getProfileData().then((res) => {
        const { data, success } = res;
        if (!success) {
          return;
        }
        Object.assign(formState, data);
      });
    },
    handleFinish: (formRef) => {
      formRef.validate().then(async () => {
        loading.value = true;
        const values = formState;
        const { success, msg } = await updateProfileData(values);
        if (!success) {
          message.error(msg);
        } else {
          editing.value = false;
        }
        loading.value = false;
        formRef.clearValidate();
      });
    },
  };
  return store;
};

// TODO 边界处理
