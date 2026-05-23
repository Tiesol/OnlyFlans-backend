const db = require("../models");

const postService = {
    createPost: async (creatorId, caption, postImageUrl = null) => {
        return await db.post.create({ creatorId, caption, postImageUrl });
    },
    getById: async (id) => {
        return await db.post.findByPk(id);
    },
    getByCreatorId: async (creatorId) => {
        return await db.post.findAll({
            where: { creatorId },
            include: [{ model: db.comment }],
            order: [['createdAt', 'DESC']]
        });
    },
    deletePost: async (id) => {
        const post = await db.post.findByPk(id);
        if (post) return await post.destroy();
        return null;
    }
};

module.exports = postService;
