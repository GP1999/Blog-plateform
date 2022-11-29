import userRouter from './services/userManagement/user.routes';
import blogRouter from './services/blogs/blogs.routes';
import { Express } from 'express';

export default function applyRoutes(app: Express): void {
  app.use('/api', [userRouter, blogRouter]);
}
