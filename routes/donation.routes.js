const requireAuth = require('../middlewares/user.middleware');
const requireRole = require('../middlewares/requireRole.middleware');
const { isJsonRequestValid } = require('../middlewares/isJsonRequestValid.middleware');
const schemaValidation = require('../middlewares/schemaValidation.middleware');
const { createDonationSchema } = require('../validators/donation.schema');

module.exports = app => {
    let router = require('express').Router();
    const controller = require('../controllers/donation.controller');

    router.use(requireAuth);
    router.use(requireRole('follower'));

    router.post('/', isJsonRequestValid, schemaValidation(createDonationSchema), controller.createDonation);
    router.get('/history', controller.getHistory);

    app.use('/donations', router);
};
