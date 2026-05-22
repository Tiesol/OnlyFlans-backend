const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

    const Favorite = sequelize.define(
        'favorite',
        {
            creatorId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            followerId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }
        }
    );
    return Favorite;
}
