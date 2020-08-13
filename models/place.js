'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class place extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  place.init({
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    long: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'place',
  });
  return place;
};