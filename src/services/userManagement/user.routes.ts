import { Router } from 'express';
import { signUp ,logIn} from './user.service';
const userRouterV1 = Router();

// Version 1 routes for users route
userRouterV1.post('/signup',signUp)
userRouterV1.post('/login',logIn)


const router = Router();
router.use('/v1/user',userRouterV1)

export default router