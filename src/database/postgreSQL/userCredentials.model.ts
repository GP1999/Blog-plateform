import postgresAdaptor from './postgres.adaptor';
import { DataTypes } from 'sequelize';

const sequelize = postgresAdaptor.getConnection();

const tableSchema = {
  userId:{
    type: DataTypes.UUID,
    allowNull: false,
    unique:true
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
const UserCreds = sequelize.define('UserCreds', tableSchema, {
  tableName: 'UserCreds',
});

export default UserCreds;
