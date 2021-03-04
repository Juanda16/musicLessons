'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class lesson extends Model {
   
    static associate(models) {
            
    }
  };
  lesson.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    state: {
      type: DataTypes.ENUM,
      values: ['completed', 'pending', 'review']
    }
  }, {
    sequelize,
    modelName: 'lesson',
  });
  return lesson;
};