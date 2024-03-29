'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
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

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.realtor = require("./realtors.models")(sequelize, Sequelize)
db.support_enquiry = require("./supportEnquiry.models")(sequelize, Sequelize);
db.transaction = require("./transactions.models")(sequelize, Sequelize);
db.transaction_upload = require("./transactionsUploads.models")(sequelize, Sequelize);
db.mortgage_calculator = require("./mortgageCalculator.models")(sequelize, Sequelize);


db.realtor.hasMany(db.transaction, {
  sourceKey: "user_id",
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.transaction.hasMany(db.transaction_upload, {
  sourceKey: "transaction_code",
  foreignKey: "transaction_code",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.transaction.hasMany(db.transaction_upload, {
  sourceKey: "transaction_code",
  foreignKey: "transaction_code",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.realtor.hasMany(db.support_enquiry, {
  sourceKey: "user_id",
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.realtor.hasMany(db.mortgage_calculator, {
  sourceKey: "user_id",
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});


module.exports = db;
