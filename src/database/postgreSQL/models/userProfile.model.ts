import { DataTypes, ModelStatic, Sequelize } from 'sequelize';
import { PostgresTable } from '../postgres.interface';

class UserProfileTable implements PostgresTable {
  private userProfile: ModelStatic<any>;
  private tableName: string;
  private tableSchema: any;
  readonly modelName: string;
  constructor(tableName: string) {
    this.tableName = tableName;
    this.userProfile = null;
    this.modelName = 'UserProfile';
    this.tableSchema = {
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
  }
  createOrAlterTable(sequelize: Sequelize): void {
    this.userProfile = sequelize.define(this.modelName, this.tableSchema, {
      tableName: this.tableName,
    });
  }
  associate(models: any): void {
    this.userProfile.hasOne(models.UserCreds, {
      foreignKey: 'userId',
      sourceKey: 'userId',
    });
  }
  getTable(): ModelStatic<any> {
    return this.userProfile;
  }
}

export default new UserProfileTable('UserProfile');
