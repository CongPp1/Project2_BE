'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id' });
      Post.belongsTo(models.Attribute, { foreignKey: 'attributesId', targetKey: 'id' });
      Post.belongsTo(models.Images, { foreignKey: 'imagesId', targetKey: 'id' });
      Post.belongsTo(models.Overview, { foreignKey: 'overviewId', targetKey: 'id' });
    }
  }
  Post.init({
    title: DataTypes.STRING,
    star: DataTypes.STRING,
    labelCode: DataTypes.STRING,
    address: DataTypes.STRING,
    attributesId: DataTypes.INTEGER,
    categoryCode: DataTypes.STRING,
    description: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    overviewId: DataTypes.INTEGER,
    imagesId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};