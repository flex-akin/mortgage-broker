const bcrypt = require("bcryptjs")

module.exports = (sequelize, Sequelize) => {
    const Realtors = sequelize.define(
      "realtors",
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

        name_of_business: {
            type: Sequelize.STRING(100),
            allowNull: false,
            validate: {
              notNull: true,
              notEmpty: true
            }
          },

          phone_number: {
            type: Sequelize.STRING(20),
            allowNull: false,
            validate: {
              notNull: true,
              notEmpty: true
            }
          },

          id_type: {
            type: Sequelize.STRING(100),
            allowNull: false,
            validate: {
              notNull: true,
              notEmpty: true
            }
          },

          id_number: {
            type: Sequelize.STRING(50),
            allowNull: false,
            unique: true,
            validate: {
              notNull: true,
              notEmpty: true
            }
          },

          user_id: {
            type: Sequelize.STRING(10),
            unique: true,
            allowNull: false,
            validate: {
              notNull: true,
              notEmpty: true
            }
          },

          cv_URL: {
            type: Sequelize.STRING(100),
            allowNull: false,
            validate: {
              notNull: true,
              notEmpty: true
            }
          },

          passport_URL: {
            type: Sequelize.STRING(100),
            allowNull: false,
            validate: {
              notNull: true,
              notEmpty: true
            }
          },

          id_URL: {
            type: Sequelize.STRING(100),
            allowNull: false,
            validate: {
              notNull: true,
              notEmpty: true
            }
          },


          cert_URL: {
            type: Sequelize.STRING(100),

          },

          username: {
            type: Sequelize.STRING(50),
            allowNull: false,
            unique: true,
            validate: {
              notNull: true,
              notEmpty: true
            }
          },


        address: {
            type: Sequelize.STRING(100),
            allowNull: false,
            validate: {
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
        tableName: "realtors",
        underscored: true,
      }
    );

    return Realtors;
  };
  