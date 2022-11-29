import { Router } from 'express';
import { authenticate } from '../authorisation/authentication';
import { isAuthorized } from '../authorisation/authorisation';
import {getBlog,getListOfBlogs,createBlog,updateBlog,deleteBlog} from './blogs.service'

const blogsRouterV1 = Router();

blogsRouterV1.post('/', authenticate, createBlog);
blogsRouterV1.get('/', authenticate,getListOfBlogs);
blogsRouterV1.get('/:resourceId', authenticate, isAuthorized,getBlog);
blogsRouterV1.put('/:resourceId', authenticate, isAuthorized,updateBlog);
blogsRouterV1.delete('/:resourceId', authenticate, isAuthorized,deleteBlog);
const router = Router();
router.use('/v1/blogs',blogsRouterV1)
export default router


