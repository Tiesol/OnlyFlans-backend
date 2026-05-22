const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

    const Creator = sequelize.define(
        'creator',
        {
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            bannerUrl: {
                type: DataTypes.STRING,
                allowNull: false
            },
            profileImageUrl: {
                type: DataTypes.STRING,
                allowNull: false
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true,
            }
        }
    );
    return Creator;
}