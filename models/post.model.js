const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

    const Post = sequelize.define(
        'post',
        {
            postImageUrl: {
                type: DataTypes.STRING,
            },
            caption: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            creatorId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }
        }
    );
    return Post;
}