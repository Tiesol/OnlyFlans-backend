const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

    const Comment = sequelize.define(
        'comment',
        {
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            followerId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            postId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }
        }
    );
    return Comment;
}
