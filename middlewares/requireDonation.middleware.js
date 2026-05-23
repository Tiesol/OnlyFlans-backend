const donationService = require('../services/donation.service');

const requireDonation = async (req, res, next) => {
    const follower = req.user.follower;
    const creatorId = req.params.id;
    const hasDonated = await donationService.hasDonated(follower.id, creatorId);
    if (!hasDonated) {
        return res.status(403).json({ message: 'Debes donar para ver el contenido de este creador' });
    }
    next();
};

module.exports = requireDonation;
