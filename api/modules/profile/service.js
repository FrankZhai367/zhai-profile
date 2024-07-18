const dao = require('./dao');

module.exports = {
  async getUserProfile() {
    const data = await dao.getProfileData();
    return {
      success: true,
      data,
    };
  },
  async updateUserProfile(query) {
    const msg = await dao.updateProfileData(query);
    return {
      success: !msg,
      msg: msg,
    };
  },
};
