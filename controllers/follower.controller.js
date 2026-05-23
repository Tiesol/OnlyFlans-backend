const postService = require('../services/post.service');
const creatorService = require('../services/creator.service');
const db = require('../models');

exports.getCreators = async (req, res) => {
    const { q } = req.query;
    try {
        const creators = q ? await creatorService.search(q) : await creatorService.getAll();
        res.status(200).json(creators);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener creadores' });
    }
};

exports.getCreatorProfile = async (req, res) => {
    try {
        const creator = await db.creator.findByPk(req.params.id, {
            attributes: ['id', 'username', 'profileImageUrl', 'bannerUrl', 'title', 'description']
        });
        if (!creator) return res.status(404).json({ message: 'Creator no encontrado' });
        res.status(200).json(creator);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener perfil' });
    }
};

exports.getSupportTypes = async (req, res) => {
    try {
        const types = await db.supportType.findAll();
        res.status(200).json(types);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener tipos de apoyo' });
    }
};

exports.getCreatorPosts = async (req, res) => {
    const creatorId = req.params.id;
    try {
        const posts = await postService.getByCreatorId(creatorId);
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener posts' });
    }
};

exports.getFeed = async (req, res) => {
    const follower = req.user.follower;
    try {
        const posts = await postService.getFeedForFollower(follower.id);
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener feed' });
    }
};
