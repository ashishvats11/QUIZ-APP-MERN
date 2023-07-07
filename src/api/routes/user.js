import Express from 'express';
import { getUser, loginUser, registerUser } from '../controllers/user.js';
import { checkToken } from '../middlewares/auth.js';
const router = Express.Router();

router.get('/:userID', checkToken, getUser);

router.post('/register', registerUser);

router.post('/login', loginUser);

export default router;