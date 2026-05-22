const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

    const Follower = sequelize.define(
        'follower',
        {
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true,
            }
        }
    );
    return Follower;
}