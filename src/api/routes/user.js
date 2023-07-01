import Express from 'express';
const router = Express.Router();
import { getUser, loginUser, registerUser } from '../controllers/user.js';
import { checkToken } from '../middlewares/auth.js';

router.get('/:userID', checkToken, getUser);

router.post('/register', registerUser);

router.post('/login', loginUser);

export default router;