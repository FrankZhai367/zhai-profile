const middleware = require('@blocklet/sdk/lib/middlewares');
const service = require('../modules/profile/service');
const router = require('express').Router();

router.use('/user', middleware.user(), (req, res) => res.json(req.user || {}));

router.get('/profile-data', async (req, res) => {
  console.log('get profile data');
  const respData = await service.getUserProfile();
  res.json(respData);
});

router.patch('/profile-data', async (req, res) => {
  const params = req.body;
  const respData = await service.updateUserProfile(params);
  res.json(respData);
});

module.exports = router;
