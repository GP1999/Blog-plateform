import { DataTypes, Sequelize, Transaction, QueryTypes } from 'sequelize';
import { PostgresTable } from '../postgresTable.model';

interface BlogsItem {
  blogId?: string;
  writerId?: string;
  header?: string;
  footer?: string;
  body?: string;
}

class Blogs extends PostgresTable {
  constructor(tableName: string) {
    const tableShema = {
      blogId: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      writerId: DataTypes.UUID,
      header: DataTypes.TEXT,
      footer: DataTypes.TEXT,
      body: DataTypes.TEXT,
    };
    super(tableName, 'Blogs', tableShema);
  }
  async createBlog(payload: BlogsItem, transaction?: Transaction) {
    return await this.table.create({ ...payload }, { transaction });
  }
  async updateBlog(payload: BlogsItem, transaction?: Transaction) {
    return await this.table.update(
      { ...payload },
      { where: { blogId: payload.blogId }, transaction },
    );
  }
  async getBlog(blogId: string) {
    return await this.table.findOne({
      where: {
        blogId,
      },
    });
  }
  async deleteBlog(blogId: string) {
    return await this.table.destroy({ where: { blogId } });
  }
  async getListOfBlogsTitles(sequelize: Sequelize) {
    return await sequelize.query(
      `SELECT "blogId","writerId","header",bl."createdAt" as createdAt ,us."name" as writer FROM public."Blogs" as bl,public."UserProfile" as us where bl."writerId"=us."userId" ORDER BY bl."createdAt" DESC;`,
      { type: QueryTypes.SELECT },
    );
  }
}

export default new Blogs('Blogs');
