'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    ociate(models) {
      
    }
  };
  user.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
    
  }, {
    sequelize,
    modelName: 'user',
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'user',
    classMethods: {}
});
  return user;
};