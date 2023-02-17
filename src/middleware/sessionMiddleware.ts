import { Request, Response, NextFunction } from "express";
import session from "express-session";
const mysqlStore = require('express-mysql-session')(session);
require('dotenv').config();


/**
 * Importing .env variables for dbconnection
 */
const dbConnection = {
    connectionLimit: 10,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    createDatabaseTable: true
}


/**
 * storing sessions in mysql database
 */
const sessionStore = new mysqlStore(dbConnection);


/**
 * Creating session and storing it in mysql database
 */
const sessionMiddleware = (req: Request, res: Response, next: NextFunction) => {
    return session({
        secret: 'Ar1234ar12',
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
        cookie: {
            maxAge: 1000 * 60 * 60
        }
    })(req, res, next);
}


export default sessionMiddleware;