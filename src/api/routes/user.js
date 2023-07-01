import Express from 'express';
const router = Express.Router();
import { loginUser, registerUser } from '../controllers/user.js';

router.post('/register', registerUser);

router.post('/login', loginUser);

export default router;