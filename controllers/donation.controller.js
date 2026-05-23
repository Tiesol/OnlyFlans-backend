const db = require('../models');
const donationService = require('../services/donation.service');

exports.createDonation = async (req, res) => {
    const follower = req.user.follower;
    const { creatorId, quantity, supportTypeId } = req.body;

    const creator = await db.creator.findByPk(creatorId);
    if (!creator) return res.status(404).json({ message: 'Creator no encontrado' });

    const supportType = await db.supportType.findByPk(supportTypeId);
    if (!supportType) return res.status(404).json({ message: 'Tipo de apoyo no encontrado' });

    try {
        const donation = await donationService.createDonation(follower.id, creatorId, quantity, supportTypeId);
        res.status(201).json(donation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al procesar donación' });
    }
};

exports.getHistory = async (req, res) => {
    const follower = req.user.follower;
    const { start, end, creator } = req.query;

    let creatorId = null;
    if (creator) {
        const creatorObj = await db.creator.findOne({ where: { username: creator } });
        if (creatorObj) creatorId = creatorObj.id;
    }

    try {
        const history = await donationService.getHistoryByFollower(follower.id, { start, end, creatorId });
        res.status(200).json(history);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener historial' });
    }
};
