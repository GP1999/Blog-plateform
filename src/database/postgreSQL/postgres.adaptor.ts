import { Sequelize } from 'sequelize';
import userCreds from './models/userCredentials.model';
import userProfile from './models/userProfile.model';
import userPermissions from './models/userPermissions.model';
import blogs from './models/blogs.model';
import { PostgresTable } from './postgres.interface';

interface PostgresConnectionOptions {
  database: string;
  username: string;
  password: string;
  port: number;
}

class PostgresAdaptor {
  private connection: Sequelize;
  private tables: PostgresTable[];
  constructor(tables: PostgresTable[]) {
    this.tables=tables;
  }
  async initialiseDataBase(options: PostgresConnectionOptions): Promise<void> {
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
          force: false, //only for dev purpose
        },
      },
    );
    await this.connection.authenticate();
    this.createOrAlterTables();
    this.connection.sync()
    console.log('Connected to DB');
  }
  getConnection(): Sequelize {
    return this.connection;
  }
  closeConnection(): void {
    console.log('Closing PostGres connection');
    this.connection.close();
  }
  createOrAlterTables(): void {
    const models: any = {};
    console.log("Creating tables")
    //initialise table
    for (let i = 0; i < this.tables.length; i++) {
      this.tables[i].createOrAlterTable(this.connection);
      models[this.tables[i].modelName] = this.tables[i].getTable();
    }
    //define  relations between table

    for (let i = 0; i < this.tables.length; i++) {
      if (this.tables[i].associate) {
        this.tables[i].associate(models);
      }
    }

  }
}

export default new PostgresAdaptor([userCreds, userProfile,userPermissions,blogs]);
