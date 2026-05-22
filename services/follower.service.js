const db = require("../models");

const followerService = {
    createFollower: async (username, userId) => {
        return await db.follower.create({
            username,
            userId
        });
    },
    getByUserId: async (userId) => {
        return await db.follower.findOne({ where: { userId } });
    }
};

module.exports = followerService;