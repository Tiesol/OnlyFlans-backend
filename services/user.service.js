const db = require("../models");

const userService = {
    getById: async (id) => {
        return await db.user.findByPk(id, {
            include: [db.creator, db.follower] 
        });
    },
    findUserByEmail: async (email) => {
        return await db.user.scope('withPassword').findOne({
            where: { email }
        });
    },
    createUser: async (email, password, role) => {
        return await db.user.create({
            email,
            password,
            role
        });
    },
    updateEmail: async (id, email) => {
        const user = await db.user.findByPk(id);
        if (user) {
            user.email = email;
            return await user.save();
        }
        return null;
    },
    deleteUser: async (id) => {
        const user = await db.user.findByPk(id);
        if (user) {
            return await user.destroy();
        }
        return null;
    }
};

module.exports = userService;