const { sequelize } = require('../config/db.config');

const user = require('./user.model')(sequelize);
const creator = require('./creator.model')(sequelize);
const follower = require('./follower.model')(sequelize);
const supportType = require('./support-type.model')(sequelize);
const post = require('./post.model')(sequelize);
const comment = require('./comment.model')(sequelize);
const donation = require('./donation.model')(sequelize);
const favorite = require('./favorite.model')(sequelize);

// Associations
user.hasOne(creator, { foreignKey: 'userId', onDelete: 'CASCADE' });
creator.belongsTo(user, { foreignKey: 'userId' });

user.hasOne(follower, { foreignKey: 'userId', onDelete: 'CASCADE' });
follower.belongsTo(user, { foreignKey: 'userId' });

creator.hasMany(post, { foreignKey: 'creatorId', onDelete: 'CASCADE' });
post.belongsTo(creator, { foreignKey: 'creatorId' });

follower.hasMany(comment, { foreignKey: 'followerId', onDelete: 'CASCADE' });
comment.belongsTo(follower, { foreignKey: 'followerId' });

post.hasMany(comment, { foreignKey: 'postId', onDelete: 'CASCADE' });
comment.belongsTo(post, { foreignKey: 'postId' });

creator.hasMany(donation, { foreignKey: 'creatorId', onDelete: 'CASCADE' });
donation.belongsTo(creator, { foreignKey: 'creatorId' });

follower.hasMany(donation, { foreignKey: 'followerId', onDelete: 'CASCADE' });
donation.belongsTo(follower, { foreignKey: 'followerId' });

supportType.hasMany(donation, { foreignKey: 'supportTypeId', onDelete: 'CASCADE' });
donation.belongsTo(supportType, { foreignKey: 'supportTypeId' });

follower.belongsToMany(creator, { through: favorite, foreignKey: 'followerId', onDelete: 'CASCADE' });
creator.belongsToMany(follower, { through: favorite, foreignKey: 'creatorId', onDelete: 'CASCADE' });

module.exports = {
    user,
    creator,
    follower,
    supportType,
    post,
    comment,
    donation,
    favorite,
    sequelize,
    Sequelize: sequelize.Sequelize
}