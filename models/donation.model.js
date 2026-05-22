const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

    const Donation = sequelize.define(
        'donation',
        {
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            creatorId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            followerId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            supportTypeId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }
        }
    );
    return Donation;
}
