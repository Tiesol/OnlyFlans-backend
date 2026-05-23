const Joi = require("joi");

const createPostSchema = Joi.object({
    caption: Joi.string().min(1).max(2000).required()
});

module.exports = { createPostSchema };
