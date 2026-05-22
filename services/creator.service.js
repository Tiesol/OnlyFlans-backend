const db = require("../models");

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
    updateProfile: async (userId, data) => {
        const creator = await db.creator.findOne({ where: { userId } });
        if (creator) {
            return await creator.update(data);
        }
        return null;
    }
};

module.exports = creatorService;