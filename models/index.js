'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/dbconfig.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.js")(sequelize, Sequelize);
db.lesson = require("./lesson.js")(sequelize, Sequelize);
db.notes = require("./note.js")(sequelize, Sequelize);

db.lesson.belongsToMany(db.user, {
  through: "user_lesson",
  as: "users",
  foreignKey: "lesson_id",
});
db.user.belongsToMany(db.lesson, {
  through: "user_lesson",
  as: "lessons",
  foreignKey: "user_id",
});


db.lesson.hasMany(db.notes, { as: "notes" });
db.notes.belongsTo(db.lesson, {
  foreignKey: "lesson_id",
  as: "lesson",
});

db.user.hasMany(db.notes, { as: "notes" });
db.notes.belongsTo(db.user, {
  foreignKey: "user_id",
  as: "user",
});

module.exports = db;

