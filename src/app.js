const express = require('express');
const app = express();
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const compression = require('compression')
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

//init dbs
require('./v1/databases/init.redis')
const mongoose = require('./v1/databases/init.mongodb');
const UserModel = require('./v1/models/user.model');
const logger = require('./v1/utils/logger');
const accessConfig = require('./v1/config/access.config');
const store = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: 'sessions'
});

//user middleware
app.use(cors({
    origin: accessConfig.ALLOWED_ORIGINS,
    methods: '*',
    credentials: true
}))
app.use(helmet())
app.use(morgan('combined'))
// compress responses
app.use(compression())

// add body-parser
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: store,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 // 1 day
        }
    })
)

// identity user
app.use((req, res, next) => {
    if (!req.session.user) {
        return next()
    }
    UserModel.findById(req.session.user.id)
        .then(user => {
            req.user = user
            return next();
        })
        .catch(err => {
            logger.error(err)
            return next(err)
        })
})

//router
app.use('/',require('./v1/routes/index.router'))

// Error Handling Middleware called

app.use((req, res, next) => {
    const error = new Error("Not found URL");
    error.status = 404;
    next(error);
});


// error handler middleware
app.use((error, req, res, next) => {
    console.error(error)
    res.status(error.status || 500).send({
        error: {
            status: error.status || 500,
            message: error.message || 'Internal Server Error',
        },
    });
});

module.exports = app;