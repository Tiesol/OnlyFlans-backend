const db = require('../models');
const commentService = require('../services/comment.service');
const donationService = require('../services/donation.service');

exports.createComment = async (req, res) => {
    const follower = req.user.follower;
    const postId = req.params.postId;
    const { content } = req.body;

    const post = await db.post.findByPk(postId);
    if (!post) return res.status(404).json({ message: 'Post no encontrado' });

    const hasDonated = await donationService.hasDonated(follower.id, post.creatorId);
    if (!hasDonated) return res.status(403).json({ message: 'Debes donar para comentar en este creador' });

    try {
        const comment = await commentService.createComment(follower.id, postId, content);
        res.status(201).json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear comentario' });
    }
};
