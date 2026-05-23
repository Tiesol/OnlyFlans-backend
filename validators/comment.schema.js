const Joi = require("joi");

const createCommentSchema = Joi.object({
    content: Joi.string().min(1).max(500).required()
});

module.exports = { createCommentSchema };
