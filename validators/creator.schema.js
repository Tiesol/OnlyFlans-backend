const Joi = require("joi");

const updateCreatorProfileSchema = Joi.object({
    title: Joi.string().max(100).allow(null, '').optional(),
    description: Joi.string().max(1000).allow(null, '').optional(),
    username: Joi.string().min(3).max(50).optional()
});

module.exports = {
    updateCreatorProfileSchema
};