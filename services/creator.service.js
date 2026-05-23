const db = require("../models");
const { Op, fn, col } = require('sequelize');

const creatorService = {
    createCreator: async (username, userId) => {
        return await db.creator.create({
            username,
            userId,
            bannerUrl: 'uploads/defaults/default_banner.jpg',
            profileImageUrl: 'uploads/defaults/default_image.png',
            title: 'Título por definir',
            description: 'Descripción por definir'
        });
    },
    getByUserId: async (userId) => {
        return await db.creator.findOne({ where: { userId } });
    },
    getById: async (id) => {
        return await db.creator.findByPk(id);
    },
    getAll: async () => {
        return await db.creator.findAll({
            attributes: ['id', 'username', 'profileImageUrl', 'bannerUrl', 'title', 'description'],
            order: [[fn('LOWER', col('username')), 'ASC']]
        });
    },
    search: async (q) => {
        return await db.creator.findAll({
            where: { username: { [Op.like]: `%${q}%` } },
            attributes: ['id', 'username', 'profileImageUrl', 'title'],
            order: [[fn('LOWER', col('username')), 'ASC']]
        });
    },
    updateProfile: async (userId, data) => {
        const creator = await db.creator.findOne({ where: { userId } });
        if (creator) return await creator.update(data);
        return null;
    }
};

module.exports = creatorService;
