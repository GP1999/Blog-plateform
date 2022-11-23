import { Sequelize } from 'sequelize';

interface PostgresConnectionOptions {
  database: string;
  username: string;
  password: string;
  port: number;
}

class PostgresAdaptor {
  private connection: Sequelize;
  async initialiseDataBase(options: PostgresConnectionOptions) {
    console.log('Initialising DB ...');
    this.connection = new Sequelize(
      options.database,
      options.username,
      options.password,
      {
        port: options.port,
        host: 'localhost',
        dialect: 'postgres',
        sync: {
          alter: true, //only for dev purpose
        },
      },
    );
    await this.connection.authenticate();
    console.log('Connected to DB');
  }
  getConnection() {
    return this.connection;
  }
  closeConnection() {
    console.log('Closing PostGres connection');
    this.connection.close();
  }
}

export default new PostgresAdaptor();
