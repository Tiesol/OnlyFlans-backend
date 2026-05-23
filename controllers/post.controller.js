const fs = require('fs');
const postService = require('../services/post.service');

exports.createPost = async (req, res) => {
    const creator = req.user.creator;
    const { caption } = req.body;
    const postImageUrl = req.file ? `uploads/${req.file.filename}` : null;
    try {
        const post = await postService.createPost(creator.id, caption, postImageUrl);
        res.status(201).json(post);
    } catch (error) {
        console.error(error);
        if (req.file) fs.unlink(req.file.path, () => {});
        res.status(500).json({ message: 'Error al crear post' });
    }
};

exports.getMyPosts = async (req, res) => {
    const creator = req.user.creator;
    try {
        const posts = await postService.getByCreatorId(creator.id);
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener posts' });
    }
};

exports.deletePost = async (req, res) => {
    const post = req.obj;
    const creator = req.user.creator;

    if (post.creatorId !== creator.id) {
        return res.status(403).json({ message: 'No tienes permiso para eliminar este post' });
    }

    try {
        if (post.postImageUrl) fs.unlink(post.postImageUrl, () => {});
        await postService.deletePost(post.id);
        res.status(200).json({ message: 'Post eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar post' });
    }
};
