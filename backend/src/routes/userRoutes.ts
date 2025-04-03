import { Router } from 'express';
import { loginUser,createUser } from '../controllers/userController';

const router = Router();

router.post('/users', createUser );
router.post('/login', loginUser );

export default router;