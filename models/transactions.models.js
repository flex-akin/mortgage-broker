
module.exports = (sequelize, Sequelize) => {
    const Transactions = sequelize.define(
      "transactions",
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

        age: {
            type: Sequelize.INTEGER,
            allowNull: false,
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



        employmnet: {
            type: Sequelize.STRING(50),
            allowNull: false,
            validate: {
              notNull: true,
              notEmpty: true
            }
          },

          name_of_employer: {
            type: Sequelize.STRING(100),
          },
        
          no_of_years_coy: {
            type: Sequelize.INTEGER,
          },

          gross_annual_income: {
            type: Sequelize.DECIMAL(18, 2),
          },

          net_monthly_income: {
            type: Sequelize.DECIMAL(18, 2),
          },

          name_of_business: {
            type: Sequelize.STRING(100),
          },
        
          no_of_years_ops: {
            type: Sequelize.INTEGER,
          },

          gross_annual_turnover: {
            type: Sequelize.DECIMAL(18, 2),
          },

          sector: {
            type: Sequelize.STRING(100),
          },


          property_location: {
            type: Sequelize.STRING(50),
            allowNull: false,
            validate: {
              notNull: true,
              notEmpty: true
            }
          },
          property_type: {
            type: Sequelize.STRING(50),
            allowNull: false,
            validate: {
              notNull: true,
              notEmpty: true
            }
          },

          no_of_bedrooms: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
              notNull: true,
              notEmpty: true
            }
          },

          property_status: {
            type: Sequelize.STRING(50),
            allowNull: false,
            validate: {
              notNull: true,
              notEmpty: true
            }
          },

          property_registered: {
            type: Sequelize.STRING(5),
            allowNull: false,
            validate: {
              notNull: true,
              notEmpty: true
            }
          },


          format: {
            type: Sequelize.STRING(100),
            allowNull: false,
            validate: {
              notNull: true,
              notEmpty: true
            }
          },

          property_price: {
            type: Sequelize.DECIMAL(18, 2),
            allowNull: false,
            validate: {
              notNull: true,
              notEmpty: true
            }
          },

          down_payment: {
            type: Sequelize.DECIMAL(18, 2),
            allowNull: false,
            validate: {
              notNull: true,
              notEmpty: true
            }
          },

      },
      
      {
        tableName: "transactions",
        underscored: true,
      }
    );

    return Transactions;
  };
  