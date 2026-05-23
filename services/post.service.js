const { Op } = require('sequelize');
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
    getFeedForFollower: async (followerId) => {
        const donations = await db.donation.findAll({
            where: { followerId },
            attributes: ['creatorId'],
            group: ['creatorId']
        });
        const creatorIds = donations.map(d => d.creatorId);
        if (!creatorIds.length) return [];
        return await db.post.findAll({
            where: { creatorId: { [Op.in]: creatorIds } },
            include: [{ model: db.creator, attributes: ['id', 'username', 'profileImageUrl'] }],
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
