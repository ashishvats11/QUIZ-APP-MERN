import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.js';

export const registerUser = (req, res, next) => {
    User.find({ $or: [{ email: req.body.email }, { username: req.body.username }] })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({ message: 'E-mail or username already exists.' });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hashPass) => {
                    if (err) {
                        return res.status(500).json({ error: err });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            username: req.body.username,
                            email: req.body.email,
                            password: hashPass,
                        });
                        user.save()
                            .then((registeredUser) => {
                                const payload = { _id: registeredUser._id, username: registeredUser.username };
                                const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' });
                                res.status(201).json({
                                    message: 'User Created',
                                    username: registeredUser.username,
                                    token: token
                                });
                            })
                            .catch(err => {
                                res.status(500).json({ error: err });
                            });
                    }
                });
            }
        });
};

export const loginUser = (req, res, next) => {
    User.find({ $or: [{ email: req.body.email }, { username: req.body.username }] })
        .exec()
        .then(user => {
            if (user.length < 1) {
                res.status(404).json({ message: 'User not found' });
            } else {
                // console.log(user);
                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if (err) {
                        return res.status(401).json({ message: 'Authorization failed. Check e-mail or password.' });
                    }
                    if (result) {
                        const payload = { _id: user[0]._id, username: user[0].username };
                        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' });
                        return res.status(200).header('auth-token', token).json({
                            message: 'Authorization successful',
                            username: user[0].username,
                            token: token
                        });
                    }
                    res.status(401).json({ message: 'Authorization failed. Check e-mail or password.' });
                });
            }
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
};

export const getUser = (req, res, next) => {
    User.findById(req.params.userID)
        .select('_id username email')
        .exec()
        .then(user => {
            if (user) {
                res.status(200).json({
                    _id: user._id,
                    username: user.username,
                    email: user.email
                });
            } else {
                res.status(404).json({ message: 'User not found.' });
            }
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
};