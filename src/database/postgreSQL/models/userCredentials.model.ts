import { DataTypes, ModelStatic, Sequelize } from 'sequelize';
import { PostgresTable } from '../postgres.interface';

class UserCredentialTable implements PostgresTable {
  private userCreds: ModelStatic<any>;
  private tableName: string;
  private tableSchema: any;
  readonly modelName: string;
  constructor(tableName: string) {
    this.tableSchema = {
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    };
    this.tableName = tableName;
    this.userCreds = null;
    this.modelName = 'UserCreds';
  }
  createOrAlterTable(sequelize: Sequelize): void {
    this.userCreds = sequelize.define(this.modelName, this.tableSchema, {
      tableName: this.tableName,
    });
  }
 
  getTable(): ModelStatic<any> {
    return this.userCreds;
  }
}

export default new UserCredentialTable('UserCreds');
