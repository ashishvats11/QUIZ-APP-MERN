import jwt from 'jsonwebtoken';

export const checkToken = (req, res, next) => {
    let token = req.headers.authorization;
    // console.log(token);
    if (!token) {
        return res.status(401).json({ message: 'Access Denied / Unauthorized Request' });
    } else {
        try {
            token = token.split(' ')[1]
            // console.log(token);
            if (token == null || !token) {
                return res.status(401).json({ message: 'Unauthorized Request' });
            }
            const verifiedUser = jwt.verify(token, process.env.JWT_SECRET);
            if (!verifiedUser) {
                return res.status(401).json({ message: 'Unauthorized Request' });
            }
            req.user = verifiedUser;
            next();
        } catch (err) {
            res.status(401).json({ message: 'Invalid Token', error: err });
        }
    }
};