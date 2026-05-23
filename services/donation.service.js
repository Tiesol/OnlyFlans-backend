const { Op } = require('sequelize');
const db = require('../models');

const buildDateWhere = (start, end) => {
    if (start && end) return { [Op.between]: [new Date(start), new Date(new Date(end).setHours(23, 59, 59, 999))] };
    if (start) return { [Op.gte]: new Date(start) };
    if (end) return { [Op.lte]: new Date(new Date(end).setHours(23, 59, 59, 999)) };
    return null;
};

const donationService = {
    createDonation: async (followerId, creatorId, quantity, supportTypeId) => {
        return await db.donation.create({ followerId, creatorId, quantity, supportTypeId });
    },
    hasDonated: async (followerId, creatorId) => {
        const d = await db.donation.findOne({ where: { followerId, creatorId } });
        return !!d;
    },
    getHistoryByFollower: async (followerId, { start, end, creatorId } = {}) => {
        const where = { followerId };
        const dateRange = buildDateWhere(start, end);
        if (dateRange) where.createdAt = dateRange;
        if (creatorId) where.creatorId = creatorId;
        return await db.donation.findAll({
            where,
            include: [
                { model: db.creator, attributes: ['username', 'profileImageUrl'] },
                { model: db.supportType, attributes: ['name', 'price'] }
            ],
            order: [['createdAt', 'DESC']]
        });
    },
    getReportByCreator: async (creatorId, { start, end } = {}) => {
        const where = { creatorId };
        const dateRange = buildDateWhere(start, end);
        if (dateRange) where.createdAt = dateRange;
        const donations = await db.donation.findAll({
            where,
            include: [
                { model: db.follower, attributes: ['username'] },
                { model: db.supportType, attributes: ['name', 'price'] }
            ],
            order: [['createdAt', 'DESC']]
        });
        const totalFlanes = donations.reduce((sum, d) => sum + d.quantity, 0);
        return { donations, totalFlanes };
    }
};

module.exports = donationService;
