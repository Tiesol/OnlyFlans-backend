const requireAuth = require('../middlewares/user.middleware');
const requireRole = require('../middlewares/requireRole.middleware');
const requireDonation = require('../middlewares/requireDonation.middleware');

module.exports = app => {
    let router = require('express').Router();
    const controller = require('../controllers/follower.controller');

    router.use(requireAuth);
    router.use(requireRole('follower'));

    router.get('/explore', controller.getCreators);
    router.get('/explore/:id', controller.getCreatorProfile);
    router.get('/support-types', controller.getSupportTypes);
    router.get('/feed', controller.getFeed);
    router.get('/creators/:id/posts', requireDonation, controller.getCreatorPosts);

    app.use('/follower', router);
};
