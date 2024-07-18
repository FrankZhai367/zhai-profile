const { Level } = require('level');

// Create a database
const db = new Level('example', { valueEncoding: 'json' });

const defaultUserId = '10002';

module.exports = {
  getProfileData: async (id = defaultUserId) => {
    try {
      const value = await db.get(id);
      return value;
    } catch (error) {
      if (error.notFound) {
        console.log('User not found', error);
        return {
          id: defaultUserId,
          username: '',
          email: '',
          phone: '',
        };
      }
    }
  },
  updateProfileData: async (newProfile, id = defaultUserId) => {
    try {
      await db.put(id, newProfile);
    } catch (error) {
      return error.message;
    }
  },
};
