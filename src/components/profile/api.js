import api from '../../libs/api';

const isMock = false;

export async function getProfileData() {
  if (isMock) {
    return Promise.resolve({
      success: true,
      data: {
        username: 'admin',
        email: 'frank@163.com',
        phone: '18888888888',
      },
    });
  }
  return await api.get('/api/profile-data').then((res) => res.data);
}

export async function updateProfileData(data) {
  console.log('data: ', data);
  if (isMock) {
    return Promise.resolve({ success: true });
  }
  return await api.patch('/api/profile-data', data).then((res) => res.data);
}

export default {
  getProfileData,
  updateProfileData,
};
