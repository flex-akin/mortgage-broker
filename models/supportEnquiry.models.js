module.exports = (sequelize, DataTypes) => {
    const SupportEnquiry = sequelize.define("supportEnquiry", {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true,
            }
        },
       
        subject: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true,
            }
        },
        message: {
            type: DataTypes.TEXT('long'),
            allowNull: false,
            validate:{
                notEmpty: true,
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true,
            }
        },
        isReplied: {
            type : DataTypes.BOOLEAN,
            allowNull : false,
            defaultValue : false,
        }
    },
    {
        tableName: "support_enquiry",
        underscored: true,
        
      })
return SupportEnquiry
}