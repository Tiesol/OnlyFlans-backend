const fs = require('fs');
const creatorService = require('../services/creator.service');

const deleteOldFile = (filePath) => {
    if (!filePath || filePath.startsWith('uploads/defaults/')) return;
    fs.unlink(filePath, (err) => {
        if (err) console.error('No se pudo borrar archivo viejo:', filePath);
    });
};

exports.getProfile = async (req, res) => {
    const creator = req.user.creator;
    if (!creator) {
        return res.status(404).json({ message: 'Perfil de creador no encontrado' });
    }
    res.status(200).json(creator);
};

exports.updateProfile = async (req, res) => {
    const { title, description, username } = req.body;
    const userId = req.user.id;
    try {
        const updated = await creatorService.updateProfile(userId, { title, description, username });
        if (!updated) {
            return res.status(404).json({ message: 'Perfil no encontrado' });
        }
        res.status(200).json(updated);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar perfil' });
    }
};

exports.uploadProfileImage = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No se subió ninguna imagen' });
    }
    const userId = req.user.id;
    const creator = req.user.creator;
    const profileImageUrl = `uploads/${req.file.filename}`;
    try {
        deleteOldFile(creator.profileImageUrl);
        const updated = await creatorService.updateProfile(userId, { profileImageUrl });
        res.status(200).json({ profileImageUrl: updated.profileImageUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al subir imagen de perfil' });
    }
};

exports.uploadBanner = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No se subió ninguna imagen' });
    }
    const userId = req.user.id;
    const creator = req.user.creator;
    const bannerUrl = `uploads/${req.file.filename}`;
    try {
        deleteOldFile(creator.bannerUrl);
        const updated = await creatorService.updateProfile(userId, { bannerUrl });
        res.status(200).json({ bannerUrl: updated.bannerUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al subir banner' });
    }
};
