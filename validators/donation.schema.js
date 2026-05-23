const Joi = require("joi");

const createDonationSchema = Joi.object({
    creatorId: Joi.number().integer().required(),
    quantity: Joi.number().integer().min(1).required(),
    supportTypeId: Joi.number().integer().required()
});

module.exports = { createDonationSchema };
