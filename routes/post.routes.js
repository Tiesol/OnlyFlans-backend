const requireAuth = require('../middlewares/user.middleware');
const requireRole = require('../middlewares/requireRole.middleware');
const schemaValidation = require('../middlewares/schemaValidation.middleware');
const getObjectOr404 = require('../middlewares/getObjectOr404.middleware');
const { createPostSchema } = require('../validators/post.schema');
const upload = require('../utils/upload.utils');
const postService = require('../services/post.service');

module.exports = app => {
    let router = require('express').Router();
    const controller = require('../controllers/post.controller');

    router.use(requireAuth);
    router.use(requireRole('creator'));

    router.post('/', upload.single('image'), schemaValidation(createPostSchema), controller.createPost);
    router.get('/mine', controller.getMyPosts);
    router.delete('/:id', getObjectOr404(postService), controller.deletePost);

    app.use('/posts', router);
};
