import { Router } from 'express';
import { signUp } from './user.service';
const userRouterV1 = Router();

// Version 1 routes for users route
userRouterV1.post('/signup',signUp)


const router = Router();
router.use('/v1/user',userRouterV1)

export default router