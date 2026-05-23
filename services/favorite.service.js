const db = require('../models');

const favoriteService = {
    add: async (followerId, creatorId) => {
        const [favorite] = await db.favorite.findOrCreate({ where: { followerId, creatorId } });
        return favorite;
    },
    remove: async (followerId, creatorId) => {
        return await db.favorite.destroy({ where: { followerId, creatorId } });
    },
    getByFollower: async (followerId) => {
        const follower = await db.follower.findByPk(followerId);
        return await follower.getCreators({
            attributes: ['id', 'username', 'profileImageUrl', 'title'],
            joinTableAttributes: []
        });
    }
};

module.exports = favoriteService;
