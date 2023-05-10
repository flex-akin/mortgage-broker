module.exports = (sequelize, DataTypes) => {
    const transactionsUpload = sequelize.define("TransactionsUpload", {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        fileUrl: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true,
            }
        },
        fileUrlKey: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true,
            }
        },
        fileType: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true,
            }
        },
    },
    {
        tableName: "transaction_uploads",
        underscored: true,
        
      })
return transactionsUpload
}