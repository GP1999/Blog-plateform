import {ModelStatic, Sequelize}  from 'sequelize'
export interface  PostgresTable{
    [x: string]: any
    getTable():ModelStatic<any>
    createOrAlterTable(sequelize:Sequelize)
}