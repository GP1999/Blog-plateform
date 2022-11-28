import {ModelStatic, Sequelize } from 'sequelize';
export class PostgresTable {
  protected table: ModelStatic<any>;
  protected tableName: string;
  protected tableSchema: any;
  readonly modelName: string;
  constructor(tableName: string, modelName: string, tableSchema: any) {
    this.tableName = tableName;
    this.modelName = modelName;
    this.tableSchema = tableSchema;
    this.table = null;
  }
  createOrAlterTable(sequelize: Sequelize): void {
    this.table = sequelize.define(this.modelName, this.tableSchema, {
      tableName: this.tableName,
    });
  }
  getTable(): ModelStatic<any> {
    return this.table;
  }
}
