
module.exports = (sequelize, Sequelize) => {
    const MortgageCalculator = sequelize.define(
      "mortgage_calculator",
      {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },

        monthlyIncome: {
          type: Sequelize.STRING(20),
          allowNull: false,
          validate: {
            notNull: true,
            notEmpty: true
          }
        },  

        propertyPrice: {
            type: Sequelize.STRING(20),
          allowNull: false,
          validate: {
            notNull: true,
            notEmpty: true
          }
        },  

        equity: {
            type: Sequelize.STRING(20),
          allowNull: false,
          validate: {
            notNull: true,
            notEmpty: true
          }
        },  

        loanAmount: {
            type: Sequelize.STRING(20),
          allowNull: false,
          validate: {
            notNull: true,
            notEmpty: true
          }
        },  

        age: {
            type: Sequelize.STRING(3),
          allowNull: false,
          validate: {
            notNull: true,
            notEmpty: true
          }
        },  

        tenure: {
            type: Sequelize.STRING(20),
          allowNull: false,
          validate: {
            notNull: true,
            notEmpty: true
          }
        },  

        interestPerAnnum: {
            type: Sequelize.STRING(20),
          allowNull: false,
          validate: {
            notNull: true,
            notEmpty: true
          }
        },  

        monthlyRepaymentResult: {
            type: Sequelize.STRING(20),
          allowNull: false,
          validate: {
            notNull: true,
            notEmpty: true
          }
        },  

        dtiResult: {
            type: Sequelize.STRING(20),
          allowNull: false,
          validate: {
            notNull: true,
            notEmpty: true
          }
        },  


       
      },
      
      {
        tableName: "mortgage_calculator",
        underscored: true,
      }
    );

    return MortgageCalculator;
  };
  