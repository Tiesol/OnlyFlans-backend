const requireAuth = require('../middlewares/user.middleware');
const requireRole = require('../middlewares/requireRole.middleware');
const requireDonation = require('../middlewares/requireDonation.middleware');
const isJsonRequestValid = require('../middlewares/isJsonRequestValid.middleware');
const schemaValidation = require('../middlewares/schemaValidation.middleware');
const { createCommentSchema } = require('../validators/comment.schema');

module.exports = app => {
    let router = require('express').Router();
    const controller = require('../controllers/follower.controller');
    const commentController = require('../controllers/comment.controller');
    const favoriteController = require('../controllers/favorite.controller');

    router.use(requireAuth);
    router.use(requireRole('follower'));

    router.get('/explore', controller.getCreators);
    router.get('/explore/:id', controller.getCreatorProfile);
    router.get('/supportTypes', controller.getSupportTypes);
    router.get('/feed', controller.getFeed);
    router.get('/creators/:id/posts', requireDonation, controller.getCreatorPosts);
    router.post('/posts/:postId/comments', isJsonRequestValid, schemaValidation(createCommentSchema), commentController.createComment);

    router.post('/favorites/:creatorId', favoriteController.addFavorite);
    router.delete('/favorites/:creatorId', favoriteController.removeFavorite);
    router.get('/favorites', favoriteController.getFavorites);

    app.use('/follower', router);
};
