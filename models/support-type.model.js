const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

    const SupportType = sequelize.define(
        'supportType',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
        }
    );
    return SupportType;
}