const db = require("../models");

const commentService = {
    createComment: async (followerId, postId, content) => {
        return await db.comment.create({ followerId, postId, content });
    }
};

module.exports = commentService;
