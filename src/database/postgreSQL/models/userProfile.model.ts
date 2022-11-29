import { DataTypes } from 'sequelize';
import { PostgresTable } from '../postgresTable.model';

class UserProfileTable extends PostgresTable {
  constructor(tableName: string) {
   
    const tableSchema = {
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNUmber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profilePicUrl: {
        type: DataTypes.STRING,
      },
    };
    super(tableName,'UserProfile',tableSchema)
   
  }
  
  associate(models: any): void {
    console.log(models)
    this.table.hasOne(models.UserCredentialTable, {
      foreignKey: 'userId',
      sourceKey: 'userId',
    });
  }
  
}

export default new UserProfileTable('UserProfile');
