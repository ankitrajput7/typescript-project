import { Request, Response } from 'express';
import userDao from '../dao/useDao';
import sgMail from '@sendgrid/mail';
require('dotenv').config();


/**
 * Function for registering new user
 */
export async function registerUser(req: Request, res: Response) {
    try {
        const email = req.body.email;

       
        //Checking email exist in database or not
        await userDao.emailExist(email)

        //Query for creating new user in database
        await userDao.createUser(req.body);

        return res.json({
            StatusCode: 200,
            Status: "true",
            Message: "New User Created.",
            data: []
        })
    } catch
    (error: any) {
        return res.json({
            StatusCode: 200,
            Status: "false",
            Message: error.message,
            data: []
        })
    }
}


/**
 * Function for homepage
 */
export async function homePage(req: Request, res: Response) {

    res.render('homePage', { Data: req.user });
    // return res.send({
    //     StatusCode: 200,
    //     Status: "true",
    //     Message: 'This is home page.',
    //     data: [req.user]
    // });
}


/**
 * Function for Login user
 */
export async function loginPage(req: Request, res: Response) {
    return res.send({
        StatusCode: 200,
        Status: "true",
        Message: 'Login Success.',
        data: []
    });
}


/**
 * Function for Loging Out user
 */
export async function logOut(req: Request, res: Response, done: any) {

    //Logouting user with logout method of passport authentication
    req.logout(err => res.send(err));

    return res.send({
        StatusCode: 200,
        Status: "true",
        Message: 'logOut.',
        data: [req.user]
    });
}


export default { registerUser, homePage, loginPage, logOut };