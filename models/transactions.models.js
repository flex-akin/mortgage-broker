
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

          transaction_code: {
            type: Sequelize.STRING(20),
            allowNull: false,
            unique: true,
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
            type: Sequelize.STRING(30),
          },

          net_monthly_income: {
            type: Sequelize.STRING(30),
          },

          name_of_business: {
            type: Sequelize.STRING(100),
          },
        
          no_of_years_ops: {
            type: Sequelize.INTEGER,
          },

          gross_annual_turnover: {
            type: Sequelize.STRING(30),
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


          property_format: {
            type: Sequelize.STRING(100),
            allowNull: false,
            validate: {
              notNull: true,
              notEmpty: true
            }
          },

          property_price: {
            type: Sequelize.STRING(30),
            allowNull: false,
            validate: {
              notNull: true,
              notEmpty: true
            }
          },

          loan_request_amount: {
            type: Sequelize.STRING(30),
            allowNull: false,
            validate: {
              notNull: true,
              notEmpty: true
            }

          },

          down_payment: {
            type: Sequelize.STRING(30),
            allowNull: false,
            validate: {
              notNull: true,
              notEmpty: true
            }
          },

          use_rsa: {
            type: Sequelize.STRING(10),
            allowNull: false,
            validate: {
              notNull: true,
              notEmpty: true
            }
          },

          current_rsa_balance: {
            type: Sequelize.STRING(30),
          },

          rsa_portion: {
            type: Sequelize.STRING(30),
          },

          status: {
            type: Sequelize.STRING(30),
            defaultValue: "pending"
          }

      },
      
      {
        tableName: "transactions",
        underscored: true,
      }
    );

    return Transactions;
  };
  