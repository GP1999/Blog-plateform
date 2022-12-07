import { DataTypes } from 'sequelize';
import { PostgresTable } from '../postgresTable.model';

class UserCredentialTable extends PostgresTable {
  constructor(tableName: string) {
    const tableSchema = {
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
    super(tableName, 'UserCredentialTable', tableSchema);
  }

  async getUserCreds(username: string) {
    const userCredsInfo = await this.table.findOne({
      where: { username },
      attributes: ['password', 'userId'],
    });
    return userCredsInfo?.dataValues;
  }
}

export default new UserCredentialTable('UserCreds');
