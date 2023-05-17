const bcrypt = require("bcryptjs")

module.exports = (sequelize, Sequelize) => {
    const Admin = sequelize.define(
      "admin",
      {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },

        name: {
          type: Sequelize.STRING(200),
          allowNull: false,
          validate: {
            notNull: true,
            notEmpty: true
          }
        },  

        email: {
          type: Sequelize.STRING(70),
          allowNull: false,
          unique: true,
          validate: {
            isEmail : {
                msg: "Not a valid email address"
            },
            notNull: true,
            notEmpty: true
          }
        
        },

        password: {
          type: Sequelize.STRING(500),
          allowNull: false,
          validate: {
            notNull: true,
            notEmpty: true
          },
          set(value) {
            var hashedPassword = bcrypt.hashSync(value, 10);
            this.setDataValue('password', hashedPassword)
          }
        },
      },
      
      {
        tableName: "admin",
        underscored: true,
      }
    );

    return Admin;
  };
  