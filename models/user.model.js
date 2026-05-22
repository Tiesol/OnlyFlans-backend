const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

    const User = sequelize.define(
        'user',
        {
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            role: {
                type: DataTypes.ENUM('creator', 'follower'),
                allowNull: false,
            }
        }, {
        defaultScope: {
            attributes: { exclude: ['password'] }
        },
        scopes: {
            withPassword: {
                attributes: { include: ['password'] },
            }
        }
    }
    );
    return User;
}