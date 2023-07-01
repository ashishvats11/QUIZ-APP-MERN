import mongoose from "mongoose";
import Express from "express";
const app = Express()
import bodyParser from "body-parser";
import logger from 'morgan';
import testRoute from './routes/test.js';
import userRoutes from './routes/user.js';

try {
    mongoose.connect(`mongodb+srv://mukundks:${process.env.MONGOPASS}@quizcluster.rvftkgp.mongodb.net/?retryWrites=true&w=majority`)
} catch (err) {
    console.log(err);
}

app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// Handling CORS Error
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    next();
})

app.use('/', testRoute);

app.use('/user', userRoutes);

app.use((req, res, next) => {
    const err = new Error('Route not found.');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        error: {
            message: err.message
        }
    });
});

export default app;