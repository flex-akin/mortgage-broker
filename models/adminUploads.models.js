module.exports = (sequelize, Sequelize,) => {
    const AdminUploads = sequelize.define(
      "admin_uploads",
      {
        id: {
          type: Sequelize.BIGINT,
          primaryKey: true,
          autoIncrement: true,
        },
        file_name: {
          type: Sequelize.STRING(150),
          allowNull: false,
        },
        file_url: {
          type: Sequelize.STRING(250),
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
      {
        tableName: "admin_uploads",
        underscored: true,
        timestamps: false,
      }
    );
  
  
    return AdminUploads;
  };
  