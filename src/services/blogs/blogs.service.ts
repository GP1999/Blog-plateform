import { NextFunction, Response } from 'express';
import { Transaction } from 'sequelize';
import uuid from 'uuid4';
import blogs from '../../database/postgreSQL/models/blogs.model';
import userPermissions from '../../database/postgreSQL/models/userPermissions.model';
import postgresAdaptor from '../../database/postgreSQL/postgres.adaptor';
import ServiceError from '../../util/serviceError';
import { AuthenticatedRequest } from '../../util/shared.interface';

export async function getListOfBlogs(
  _request: AuthenticatedRequest,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const result = await blogs.getListOfBlogsTitles(
      postgresAdaptor.getConnection(),
    );
    response.status(200).send(result);
    return;
  } catch (error) {
    next(error);
  }
}
export async function createBlog(
  request: AuthenticatedRequest,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const transaction = (await postgresAdaptor
    .getConnection()
    .transaction()
    .catch((error) => next(error))) as Transaction;
  try {
    const { body, header, footer } = request.body;
    // console.log(request.body)
    const userId = request.context?.userId;
    if (!body?.trim() || !header?.trim() || !footer?.trim())
      throw new ServiceError('BR-1', 400, 'Invalid request payload');

    const blog = {
      blogId: uuid(),
      writerId: request.context.userId,
      body,
      header,
      footer,
    };
    const result = await blogs.createBlog(blog, transaction);
    await userPermissions.addUserAndPermission(
      { userId, resourceId: blog.blogId, permission: 'WRITE' },
      transaction,
    );
    transaction.commit();
    console.log(result);
    response.status(201).send({ blogId: blog.blogId });
    return;
  } catch (error) {
    transaction.rollback();
    next(error);
  }
}

export async function getBlog(
  request: AuthenticatedRequest,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const blogId = request.params.resourceId;
    const result = await blogs.getBlog(blogId);
    response.status(200).send(result);
    return;
  } catch (error) {
    next(error);
  }
}
export async function updateBlog(
  request: AuthenticatedRequest,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const blogId = request.params.resourceId;
    const { body, header, footer } = request.body;
    const blog = {
      blogId,
      writerId: request.context.userId,
      body,
      header,
      footer,
    };
    const result = await blogs.updateBlog(blog);
    if (result[0] === 0)
      throw new ServiceError('BR-2', 400, 'No blog with given blogId');
    response.status(200).send();
    return;
  } catch (error) {
    next(error);
  }
}
export async function deleteBlog(
  request: AuthenticatedRequest,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const blogId = request.params.resourceId;
    const result = await blogs.deleteBlog(blogId);
    console.log(result);
    response.status(200).send();
    return;
  } catch (error) {
    next(error);
  }
}
