'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserPokemon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  UserPokemon.init({
    userId: DataTypes.INTEGER,
    pokemonId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserPokemon',
  });
  return UserPokemon;
};