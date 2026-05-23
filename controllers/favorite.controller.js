const favoriteService = require('../services/favorite.service');
const creatorService = require('../services/creator.service');

exports.addFavorite = async (req, res) => {
    const follower = req.user.follower;
    const creatorId = req.params.creatorId;

    const creator = await creatorService.getById(creatorId);
    if (!creator) return res.status(404).json({ message: 'Creator no encontrado' });

    try {
        const favorite = await favoriteService.add(follower.id, creatorId);
        res.status(201).json(favorite);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al agregar favorito' });
    }
};

exports.removeFavorite = async (req, res) => {
    const follower = req.user.follower;
    const creatorId = req.params.creatorId;

    try {
        const deleted = await favoriteService.remove(follower.id, creatorId);
        if (!deleted) return res.status(404).json({ message: 'Favorito no encontrado' });
        res.status(200).json({ message: 'Favorito eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar favorito' });
    }
};

exports.getFavorites = async (req, res) => {
    const follower = req.user.follower;
    try {
        const favorites = await favoriteService.getByFollower(follower.id);
        res.status(200).json(favorites);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener favoritos' });
    }
};
