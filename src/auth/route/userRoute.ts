import Express, { Request, Response, NextFunction } from "express";
import { registerUser, homePage, loginPage, logOut } from "../service/userService";
const userRouter = Express.Router();
//@ts-ignore
import validUserSchema from "../../../shared/userSchema";
import passport from "../../middleware/passportMiddleware";
import isAuthenticated from "../../middleware/passportIsAuthenticated";


/**
 * User Registeration Route 
 */
userRouter.post('/register', validUserSchema, registerUser);
userRouter.get('/register', (req: Request, res: Response) => {
    res.render('registeration', { output: "" });
})

/**
 * User Login Route 
 */
userRouter.post('/login', passport.authenticate('local', { failureRedirect: '/login-failure' }), loginPage);
userRouter.get('/login', (req: Request, res: Response) => {
    res.render('login', { output: "" });
})

/**
 * Login Failure Route 
 */
userRouter.get('/login-failure', (req, res, next) => {
    return res.send({
        StatusCode: 200,
        Status: "false",
        Message: 'You entered the wrong email or password.',
        //@ts-ignore
        data: [req.user]
    });
});

/**
 * Login Success Route 
 */
userRouter.get('/login-success', homePage);

/**
 * Homepage Route
 */
userRouter.get('/homePage', isAuthenticated, homePage);

/**
 * Logout Route
 */
userRouter.get('/logOut', isAuthenticated, logOut);



export default userRouter;