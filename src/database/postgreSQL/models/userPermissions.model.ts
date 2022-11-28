import { DataTypes } from 'sequelize';
import { PostgresTable } from '../postgresTable.model';

interface UserPermissionsInterface {
  userId?: string;
  resourceId?: string;
  permission?: string;
}

class UserPermissions extends PostgresTable {
  constructor(tableName: string) {
    const tableSchema = {
      userId: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      resourceId: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      permission: {
        type: DataTypes.STRING,
      },
    };
    super(tableName, 'UserPermissions', tableSchema);
  }
  async addUserAndPermission(
    data: UserPermissionsInterface,
    transaction?: any,
  ) :Promise<void>{
    await this.table.create({ ...data }, { transaction });
  }
  async getUserPermission(
    userId: string,
    resourceId: string,
  ): Promise<UserPermissionsInterface> {
    const userPermission = await this.table.findOne({
      where: {
        userId,
        resourceId,
      },
    });
    return userPermission.dataValues;
  }
}

export default new UserPermissions('UserPermissions')