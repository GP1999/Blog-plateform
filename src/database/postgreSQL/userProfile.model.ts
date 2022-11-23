import postgresAdaptor from './postgres.adaptor';
import { DataTypes } from 'sequelize';

const sequelize = postgresAdaptor.getConnection();

const tableSchema = {
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNUmber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profilePicUrl: {
    type: DataTypes.STRING
  }
};

const UserProfile=sequelize.define('UserProfile',tableSchema,{
    tableName:'UserProfile'
})

export default UserProfile