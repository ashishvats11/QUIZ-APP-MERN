import Express from 'express';
const router = Express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({ message: 'api working' });
})

export default router;