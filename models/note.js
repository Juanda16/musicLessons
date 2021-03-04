'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class note extends Model {
    
    static associate(models) {
      
    }
  };
  note.init({
    text: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'note',
  });
  return note;
};