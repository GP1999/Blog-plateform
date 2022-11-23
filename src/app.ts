import postgresDatabase from './database/postgreSQL/postgres.adaptor';
import { Server } from 'https';

export default class App {
  private server: Server;
  constructor(server: Server) {
    this.server = server;
    process.on('exit', (code) => {
      console.log(`Process exited with code: ${code}`);
      postgresDatabase.closeConnection();
    });
  }

  async initialisePostgres() {
    const options = {
      database: process.env.POSTGRES_DB,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASS,
      port: +process.env.POSTGRES_PORT,
    };
    await postgresDatabase.initialiseDataBase(options);
  }

  async initialiseConnections() {
    await this.initialisePostgres();
  }
  listen(port: number) {
    this.initialiseConnections()
      .then(() => {
        try {
          this.server.listen(port, () => {
            console.log(`Started Server on port ${port}`);
          });
        } catch (error: any) {
          postgresDatabase.closeConnection();
        }
      })
      .catch((error: any) => {
        console.error(error);
      });
  }
}
