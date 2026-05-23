const requireAuth = require('../middlewares/user.middleware');
const requireRole = require('../middlewares/requireRole.middleware');
const { isJsonRequestValid } = require('../middlewares/isJsonRequestValid.middleware');
const schemaValidation = require('../middlewares/schemaValidation.middleware');
const { updateCreatorProfileSchema } = require('../validators/creator.schema');
const upload = require('../utils/upload.utils');

module.exports = app => {
    let router = require('express').Router();
    const controller = require('../controllers/creator.controller');

    router.use(requireAuth);
    router.use(requireRole('creator'));

    router.get('/profile', controller.getProfile);
    router.put('/profile', isJsonRequestValid, schemaValidation(updateCreatorProfileSchema), controller.updateProfile);
    router.put('/profile/image', upload.single('image'), controller.uploadProfileImage);
    router.put('/profile/banner', upload.single('banner'), controller.uploadBanner);

    app.use('/creators', router);
};
